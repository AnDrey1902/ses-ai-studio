import React, { createContext, useContext, useEffect, useState } from 'react';
import { INITIAL_LEADS, INITIAL_WAITLIST } from '../data/mockData';
import { t } from '../i18n/translations';
import { CurrentView, Language, Lead, WaitlistEmail } from '../types';

interface LeadModalConfig {
  isOpen: boolean;
  power?: string;
  sesType?: string;
  source?: string;
}

interface AppContextType {
  lang: Language;
  setLang: (l: Language) => void;
  view: CurrentView;
  setView: (v: CurrentView) => void;
  selectedBlogSlug: string | null;
  setSelectedBlogSlug: (slug: string | null) => void;
  leadModal: LeadModalConfig;
  openLeadModal: (power?: string, sesType?: string, source?: string) => void;
  closeLeadModal: () => void;
  leads: Lead[];
  addLead: (leadData: Omit<Lead, 'id' | 'createdAt' | 'status' | 'lang'>) => Promise<void>;
  updateLeadStatus: (id: string, status: Lead['status']) => void;
  deleteLead: (id: string) => void;
  waitlist: WaitlistEmail[];
  addWaitlist: (email: string) => void;
  deleteWaitlist: (id: string) => void;
  tr: (key: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('uk');
  const [view, setViewState] = useState<CurrentView>('home');
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string | null>(null);

  const [leadModal, setLeadModal] = useState<LeadModalConfig>({
    isOpen: false,
    power: '10 kW',
    sesType: 'Hybrid',
    source: 'Header'
  });

  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem('guru_energy_leads');
    return saved ? JSON.parse(saved) : INITIAL_LEADS;
  });

  const [waitlist, setWaitlist] = useState<WaitlistEmail[]>(() => {
    const saved = localStorage.getItem('guru_energy_waitlist');
    return saved ? JSON.parse(saved) : INITIAL_WAITLIST;
  });

  useEffect(() => {
    localStorage.setItem('guru_energy_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('guru_energy_waitlist', JSON.stringify(waitlist));
  }, [waitlist]);

  // Handle browser back button & hash
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('blog/')) {
        const slug = hash.replace('blog/', '');
        setSelectedBlogSlug(slug);
        setViewState('blog_detail');
      } else if (['home', 'services', 'prices', 'cases', 'blog', 'shop', 'contacts', 'admin', 'privacy'].includes(hash)) {
        setViewState(hash as CurrentView);
        setSelectedBlogSlug(null);
      } else {
        setViewState('home');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const setView = (newView: CurrentView) => {
    setViewState(newView);
    window.location.hash = newView;
  };

  const openLeadModal = (power?: string, sesType?: string, source: string = 'Direct Call') => {
    setLeadModal({
      isOpen: true,
      power: power || '10 kW',
      sesType: sesType || 'Hybrid',
      source
    });
  };

  const closeLeadModal = () => {
    setLeadModal(prev => ({ ...prev, isOpen: false }));
  };

  const addLead = async (leadData: Omit<Lead, 'id' | 'createdAt' | 'status' | 'lang'>) => {
    const now = new Date();
    const formattedDate = `${String(now.getDate()).padStart(2, '0')}.${String(now.getMonth() + 1).padStart(2, '0')}.${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newLead: Lead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      status: 'new',
      createdAt: formattedDate,
      lang
    };

    setLeads(prev => [newLead, ...prev]);

    // Optional background sync attempt with Express backend if active
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLead)
      });
    } catch (e) {
      // Benign catch for purely static preview mode
    }
  };

  const updateLeadStatus = (id: string, status: Lead['status']) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  };

  const deleteLead = (id: string) => {
    setLeads(prev => prev.filter(l => l.id !== id));
  };

  const addWaitlist = (email: string) => {
    const now = new Date();
    const formattedDate = `${String(now.getDate()).padStart(2, '0')}.${String(now.getMonth() + 1).padStart(2, '0')}.${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newEntry: WaitlistEmail = {
      id: `w-${Date.now()}`,
      email,
      createdAt: formattedDate
    };

    setWaitlist(prev => [newEntry, ...prev]);
  };

  const deleteWaitlist = (id: string) => {
    setWaitlist(prev => prev.filter(w => w.id !== id));
  };

  const tr = (key: string): string => {
    return t[lang]?.[key] || key;
  };

  return (
    <AppContext.Provider value={{
      lang,
      setLang,
      view,
      setView,
      selectedBlogSlug,
      setSelectedBlogSlug,
      leadModal,
      openLeadModal,
      closeLeadModal,
      leads,
      addLead,
      updateLeadStatus,
      deleteLead,
      waitlist,
      addWaitlist,
      deleteWaitlist,
      tr
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
