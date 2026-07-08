import { Calculator, Menu, PhoneCall, ShieldCheck, ShoppingBag, X, MapPin, Phone, Mail, Clock } from 'lucide-react';
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
    <>
      {/* Mini Contact Bar */}
      <div className="bg-[#07140F] text-[#C5D4CB] text-[11px] hidden md:block">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 h-9 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-3 h-3 text-[#22C55E]" />
            <span>м. Київ, вул. Сонячна, 24 · працюємо по всій Україні</span>
          </div>
          <div className="flex items-center gap-5">
            <a href="tel:0800330444" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="w-3 h-3 text-[#22C55E]" />
              <span className="font-semibold">0 800 330 444</span>
            </a>
            <a href="mailto:info@guru-energy.com.ua" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail className="w-3 h-3 text-[#22C55E]" />
              <span>info@guru-energy.com.ua</span>
            </a>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-[#22C55E]" />
              <span>Пн–Сб · 9:00–19:00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-[#E8ECE9] shadow-[0_1px_3px_rgba(0,0,0,.04)] transition-all">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <Logo />

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-1.5 bg-[#F0F5F2] p-1.5 rounded-full border border-[#E2ECE6]">
            {navLinks.map((link) => {
              const isActive = view === link.view || (view === 'blog_detail' && link.view === 'blog');
              return (
                <button
                  key={link.view}
                  onClick={() => handleNavClick(link.view)}
                  className={`relative px-3.5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-[#22C55E] text-white shadow-md shadow-[rgba(34,197,94,.2)]'
                      : 'text-[#5A6E62] hover:text-[#1A2E23] hover:bg-white'
                  }`}
                >
                  {link.label}
                  {link.badge && (
                    <span className={`absolute -top-2 -right-2 px-1.5 py-0.5 text-[9px] rounded-full font-bold uppercase shadow-sm ${
                      isActive ? 'bg-white text-[#22C55E]' : 'bg-[#FBBF24] text-[#07140F]'
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
              className="flex items-center gap-2 text-xs font-semibold text-[#B8860B] hover:text-[#996515] bg-[rgba(251,191,36,.1)] hover:bg-[rgba(251,191,36,.18)] px-4 py-3 rounded-full border border-[rgba(251,191,36,.25)] transition-all"
            >
              <Calculator className="w-7 h-7" />
              <span>{tr('nav_calc')}</span>
            </button>

            {/* Language Tabs */}
            <div className="flex items-center bg-[#F0F5F2] p-1 rounded-full border border-[#E2ECE6] text-xs font-bold">
              {languages.map((l) => (
                <button
                  key={l.key}
                  onClick={() => setLang(l.key)}
                  className={`px-2 py-1 rounded-full transition-all ${
                    lang === l.key
                      ? 'bg-[#22C55E] text-white shadow-sm'
                      : 'text-[#5A6E62] hover:text-[#1A2E23]'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            {/* CTA Primary */}
            <button
              onClick={() => openLeadModal('10 kW', 'Hybrid SES', tr('lead_source_header'))}
              className="ds-btn-primary !px-5 !py-3 !text-xs"
            >
              <PhoneCall className="w-7 h-7 fill-[#07140F]" />
              <span>{tr('btn_call_me')}</span>
            </button>

            {/* Admin Demo Button */}
            <button
              onClick={() => setView('admin')}
              className={`p-2 rounded-full border text-xs font-semibold transition-all ${
                view === 'admin'
                  ? 'bg-[rgba(34,197,94,.15)] border-[#22C55E] text-[#22C55E]'
                  : 'bg-[#F0F5F2] border-[#E2ECE6] text-[#5A6E62] hover:text-[#1A2E23]'
              }`}
              title="Payload CMS Admin Simulator"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex xl:hidden items-center gap-2">
            <div className="flex md:hidden items-center bg-[#F0F5F2] p-0.5 rounded-full border border-[#E2ECE6] text-[10px] font-bold">
              {languages.map((l) => (
                <button
                  key={l.key}
                  onClick={() => setLang(l.key)}
                  className={`px-2.5 py-2 min-w-[36px] min-h-[36px] rounded-full ${lang === l.key ? 'bg-[#22C55E] text-white' : 'text-[#5A6E62]'}`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-full bg-[#F0F5F2] border border-[#E2ECE6] text-[#1A2E23] hover:text-[#22C55E] focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-[#E2ECE6] px-4 pt-4 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top-4 duration-200">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.view}
                  onClick={() => handleNavClick(link.view)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-colors ${
                    view === link.view
                      ? 'bg-[rgba(34,197,94,.12)] text-[#22C55E] border border-[rgba(34,197,94,.25)]'
                      : 'text-[#1A2E23] hover:bg-[#F0F5F2]'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="px-2 py-0.5 text-[10px] bg-[#FBBF24] text-[#07140F] rounded-full font-bold">
                      {link.badge}
                    </span>
                  )}
                </button>
              ))}
              <button
                onClick={() => handleNavClick('admin')}
                className="w-full flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-semibold text-[#5A6E62] hover:text-[#22C55E] hover:bg-[#F0F5F2]"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{tr('lead_admin_nav')}</span>
              </button>
            </div>

            <div className="pt-3 border-t border-[#E2ECE6] flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openLeadModal('10 kW', 'Hybrid SES', tr('lead_source_mobile'));
                }}
                className="ds-btn-primary w-full !text-sm"
              >
                <PhoneCall className="w-5 h-5 fill-[#07140F]" />
                <span>{tr('btn_call_me')}</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
