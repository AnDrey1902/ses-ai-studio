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
    <footer className="bg-[#07140F] border-t border-[rgba(255,255,255,.08)] text-[#92A299] pt-16 pb-12 relative overflow-hidden">
      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[rgba(34,197,94,.05)] blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-[1440px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[rgba(255,255,255,.08)]">

          {/* Col 1: Brand & Info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo dark />
            <p className="text-xs text-[#92A299] max-w-sm leading-relaxed pt-2">
              {tr('footer_desc')}
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[rgba(34,197,94,.1)] text-[#22C55E] border border-[rgba(34,197,94,.2)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                {tr('footer_license')}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#10261C] text-[#D5DDD8] border border-[rgba(255,255,255,.08)]">
                {tr('footer_partner')}
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#D5DDD8]">{tr('footer_nav_title')}</h4>
            <ul className="space-y-2.5">
              <li><button onClick={() => handleNav('home')} className="block w-full text-left text-xs font-medium hover:text-[#22C55E] transition-colors">{tr('nav_home')}</button></li>
              <li><button onClick={() => handleNav('services')} className="block w-full text-left text-xs font-medium hover:text-[#22C55E] transition-colors">{tr('nav_services')}</button></li>
              <li><button onClick={() => handleNav('prices')} className="block w-full text-left text-xs font-medium hover:text-[#22C55E] transition-colors">{tr('nav_prices')}</button></li>
              <li><button onClick={() => handleNav('cases')} className="block w-full text-left text-xs font-medium hover:text-[#22C55E] transition-colors">{tr('nav_cases')}</button></li>
              <li><button onClick={() => handleNav('blog')} className="block w-full text-left text-xs font-medium hover:text-[#22C55E] transition-colors">{tr('nav_blog')}</button></li>
              <li><button onClick={() => handleNav('shop')} className="block w-full text-left text-xs font-medium hover:text-[#22C55E] transition-colors flex items-center gap-1"><span>{tr('nav_shop')}</span><span className="text-[9px] bg-[#FBBF24] text-[#07140F] px-1 rounded-full font-bold">{tr('coming_soon_badge')}</span></button></li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#D5DDD8]">{tr('footer_solutions_title')}</h4>
            <ul className="space-y-2.5">
              <li><button onClick={() => { handleNav('services'); }} className="block w-full text-left text-xs font-medium hover:text-[#22C55E] transition-colors">{tr('calc_type_hybrid')}</button></li>
              <li><button onClick={() => { handleNav('services'); }} className="block w-full text-left text-xs font-medium hover:text-[#22C55E] transition-colors">{tr('calc_type_ongrid')}</button></li>
              <li><button onClick={() => { handleNav('services'); }} className="block w-full text-left text-xs font-medium hover:text-[#22C55E] transition-colors">{tr('calc_type_offgrid')}</button></li>
              <li><button onClick={() => { handleNav('services'); }} className="block w-full text-left text-xs font-medium hover:text-[#22C55E] transition-colors">{tr('calc_type_business')}</button></li>
              <li className="pt-1 border-t border-[rgba(255,255,255,.08)]"><button onClick={() => { handleNav('prices'); }} className="block w-full text-left text-xs font-medium hover:text-[#22C55E] transition-colors">{tr('tab_credits')}</button></li>
            </ul>
          </div>

          {/* Col 4: Contacts */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#D5DDD8]">{tr('footer_contacts_title')}</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-[#22C55E] shrink-0 mt-0.5" />
                <a href="tel:0800330444" className="text-[#D5DDD8] font-bold hover:text-[#22C55E] transition-colors">{tr('footer_phone')}</a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-[#22C55E] shrink-0 mt-0.5" />
                <a href="mailto:info@guru-energy.com.ua" className="hover:text-[#22C55E] transition-colors">{tr('footer_email')}</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#22C55E] shrink-0 mt-0.5" />
                <span>{tr('footer_addr')}</span>
              </li>
              <li className="flex items-start gap-2 text-[11px] text-[#647268]">
                <Clock className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>{tr('hours_val')}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center justify-center gap-4 text-[#647268]">
            <span>{tr('footer_rights')}</span>
            <span>·</span>
            <span>ЄДРПОУ: 43892110</span>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setView('privacy')} className="hover:text-[#D5DDD8] transition-colors">
              {tr('footer_privacy')}
            </button>
            <button onClick={() => setView('admin')} className="text-[#22C55E] font-semibold hover:underline flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{tr('footer_admin_btn')}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
