import { Calculator, Menu, PhoneCall, ShieldCheck, ShoppingBag, X } from 'lucide-react';
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CurrentView, Language } from '../../types';
import { Logo } from './Logo';

export const Navbar: React.FC = () => {
  const { lang, setLang, view, setView, tr, openLeadModal } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { view: CurrentView; label: string; badge?: string }[] = [
    { view: 'home', label: tr('nav_home') },
    { view: 'services', label: tr('nav_services') },
    { view: 'prices', label: tr('nav_prices') },
    { view: 'cases', label: tr('nav_cases') },
    { view: 'blog', label: tr('nav_blog') },
    { view: 'shop', label: tr('nav_shop'), badge: tr('coming_soon_badge') },
    { view: 'contacts', label: tr('nav_contacts') }
  ];

  const handleNavClick = (targetView: CurrentView) => {
    setView(targetView);
    setMobileMenuOpen(false);
  };

  const languages: { key: Language; label: string }[] = [
    { key: 'uk', label: 'UA' },
    { key: 'ru', label: 'RU' },
    { key: 'en', label: 'EN' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <Logo />

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-1.5 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800/60 shadow-inner">
          {navLinks.map((link) => {
            const isActive = view === link.view || (view === 'blog_detail' && link.view === 'blog');
            return (
              <button
                key={link.view}
                onClick={() => handleNavClick(link.view)}
                className={`relative px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? 'bg-[#22C55E] text-slate-950 shadow-md shadow-green-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {link.label}
                {link.badge && (
                  <span className={`absolute -top-2 -right-2 px-1.5 py-0.5 text-[9px] rounded-full font-bold uppercase shadow-sm ${
                    isActive ? 'bg-slate-900 text-green-400' : 'bg-amber-500 text-slate-950'
                  }`}>
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions & Lang Switcher */}
        <div className="hidden md:flex items-center gap-3">
          {/* Payback Calc Quick Shortcut */}
          <button
            onClick={() => {
              if (view !== 'home') setView('home');
              setTimeout(() => {
                const el = document.getElementById('calculator-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 px-3 py-2 rounded-xl border border-amber-500/20 transition-all"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>{tr('nav_calc')}</span>
          </button>

          {/* Language Tabs */}
          <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-bold">
            {languages.map((l) => (
              <button
                key={l.key}
                onClick={() => setLang(l.key)}
                className={`px-2 py-1 rounded-lg transition-all ${
                  lang === l.key
                    ? 'bg-slate-800 text-green-400 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* CTA Primary */}
          <button
            onClick={() => openLeadModal('10 kW', 'Hybrid SES', tr('lead_source_header'))}
            className="flex items-center gap-2 bg-[#22C55E] hover:bg-[#16A34A] text-slate-950 px-4 py-2.5 rounded-xl font-bold text-xs tracking-wide shadow-lg shadow-green-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <PhoneCall className="w-3.5 h-3.5 fill-slate-950" />
            <span>{tr('btn_call_me')}</span>
          </button>

          {/* Admin Demo Button (simulated CMS entry) */}
          <button
            onClick={() => setView('admin')}
            className={`p-2 rounded-xl border text-xs font-semibold transition-all ${
              view === 'admin' 
                ? 'bg-green-500/20 border-green-500 text-green-400' 
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title="Payload CMS Admin Simulator"
          >
            <ShieldCheck className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex xl:hidden items-center gap-2">
          <div className="flex md:hidden items-center bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-[10px] font-bold">
            {languages.map((l) => (
              <button
                key={l.key}
                onClick={() => setLang(l.key)}
                className={`px-1.5 py-1 rounded ${lang === l.key ? 'bg-slate-800 text-green-400' : 'text-slate-400'}`}
              >
                {l.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-green-400 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-950 border-b border-slate-800 px-4 pt-4 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.view}
                onClick={() => handleNavClick(link.view)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  view === link.view
                    ? 'bg-green-500/15 text-green-400 border border-green-500/30'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="px-2 py-0.5 text-[10px] bg-amber-500 text-slate-950 rounded-full font-bold">
                    {link.badge}
                  </span>
                )}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('admin')}
              className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-slate-400 hover:text-green-400 hover:bg-slate-900"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{tr('lead_admin_nav')}</span>
            </button>
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openLeadModal('10 kW', 'Hybrid SES', tr('lead_source_mobile'));
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#22C55E] text-slate-950 px-4 py-3 rounded-xl font-bold text-sm shadow-lg shadow-green-500/20"
            >
              <PhoneCall className="w-4 h-4 fill-slate-950" />
              <span>{tr('btn_call_me')}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
