import React from 'react';
import { useApp } from '../../context/AppContext';
import { CurrentView } from '../../types';
import { Logo } from './Logo';
import { Phone, Mail, MapPin, Clock, ArrowRight, ShieldCheck, FileText, Send } from 'lucide-react';

export const Footer: React.FC = () => {
  const { tr, setView, openLeadModal } = useApp();

  const handleNav = (v: CurrentView) => {
    setView(v);
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 pt-16 pb-12 relative overflow-hidden">
      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-green-500/5 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-900">
          
          {/* Col 1: Brand & Info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo />
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed pt-2">
              {tr('footer_desc')}
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-green-500/10 text-green-400 border border-green-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                {tr('footer_license')}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-900 text-slate-300 border border-slate-800">
                {tr('footer_partner')}
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">{tr('footer_nav_title')}</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><button onClick={() => handleNav('home')} className="hover:text-green-400 transition-colors">{tr('nav_home')}</button></li>
              <li><button onClick={() => handleNav('services')} className="hover:text-green-400 transition-colors">{tr('nav_services')}</button></li>
              <li><button onClick={() => handleNav('prices')} className="hover:text-green-400 transition-colors">{tr('nav_prices')}</button></li>
              <li><button onClick={() => handleNav('cases')} className="hover:text-green-400 transition-colors">{tr('nav_cases')}</button></li>
              <li><button onClick={() => handleNav('blog')} className="hover:text-green-400 transition-colors">{tr('nav_blog')}</button></li>
              <li><button onClick={() => handleNav('shop')} className="hover:text-green-400 transition-colors flex items-center gap-1"><span>{tr('nav_shop')}</span><span className="text-[9px] bg-amber-500 text-slate-950 px-1 rounded font-bold">{tr('coming_soon_badge')}</span></button></li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">{tr('footer_solutions_title')}</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><button onClick={() => { handleNav('services'); }} className="hover:text-green-400 transition-colors">{tr('calc_type_hybrid')}</button></li>
              <li><button onClick={() => { handleNav('services'); }} className="hover:text-green-400 transition-colors">{tr('calc_type_business')}</button></li>
              <li><button onClick={() => { handleNav('services'); }} className="hover:text-green-400 transition-colors">{tr('calc_type_ongrid')}</button></li>
              <li><button onClick={() => { handleNav('prices'); }} className="hover:text-green-400 transition-colors">{tr('tab_credits')}</button></li>
              <li><button onClick={() => openLeadModal('15 kW', 'Off-grid SES', 'Footer Link')} className="hover:text-green-400 transition-colors">{tr('form_type_home')}</button></li>
            </ul>
          </div>

          {/* Col 4: Contacts */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">{tr('footer_contacts_title')}</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-green-400 shrink-0 mt-0.5" />
                <a href="tel:0800330444" className="text-slate-200 font-bold hover:text-green-400 transition-colors">0 800 330 444</a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-green-400 shrink-0 mt-0.5" />
                <a href="mailto:info@guru-energy.com.ua" className="hover:text-green-400 transition-colors">info@guru-energy.com.ua</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-green-400 shrink-0 mt-0.5" />
                <span>{tr('footer_addr')}</span>
              </li>
              <li className="flex items-start gap-2 text-[11px] text-slate-500">
                <Clock className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>{tr('hours_val')}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-500">
            <span>{tr('footer_rights')}</span>
            <span>·</span>
            <span>ЄДРПОУ: 43892110</span>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setView('privacy')} className="hover:text-slate-300 transition-colors">
              {tr('footer_privacy')}
            </button>
            <button onClick={() => setView('admin')} className="text-green-400 font-semibold hover:underline flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{tr('footer_admin_btn')}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
