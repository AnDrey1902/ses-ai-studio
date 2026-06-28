import React from 'react';
import { useApp } from '../../context/AppContext';
import { Phone, Mail, MapPin, Clock, ShieldCheck, Zap } from 'lucide-react';

export const ContactsPage: React.FC = () => {
  const { openLeadModal, tr } = useApp();

  return (
    <div className="pt-28 pb-24 bg-slate-950 min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-green-500/10 text-green-400 border border-green-500/20">
            {tr('contacts_badge')}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
            {tr('contacts_title')}
          </h1>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            {tr('contacts_desc')}
          </p>
        </div>

        {/* Grid Info + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Info Cards (5) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-slate-900 p-7 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center gap-3 text-green-400 font-extrabold text-sm">
                <div className="p-2.5 rounded-xl bg-green-500/15"><Phone className="w-5 h-5" /></div>
                <span>{tr('contacts_phone_label')}</span>
              </div>
              <div className="space-y-1 pl-11">
                <a href="tel:0800330444" className="text-2xl font-black text-white font-mono hover:text-green-400 transition-colors block">0 800 330 444</a>
                <p className="text-xs text-slate-400">{tr('contacts_phone_sub')}</p>
              </div>
            </div>

            <div className="bg-slate-900 p-7 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center gap-3 text-amber-400 font-extrabold text-sm">
                <div className="p-2.5 rounded-xl bg-amber-500/15"><MapPin className="w-5 h-5" /></div>
                <span>{tr('contacts_office_label')}</span>
              </div>
              <div className="space-y-1 pl-11">
                <div className="text-base font-extrabold text-white">{tr('contacts_office_addr')}</div>
                <p className="text-xs text-slate-400">{tr('contacts_office_sub')}</p>
              </div>
            </div>

            <div className="bg-slate-900 p-7 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center gap-3 text-blue-400 font-extrabold text-sm">
                <div className="p-2.5 rounded-xl bg-blue-500/15"><Mail className="w-5 h-5" /></div>
                <span>{tr('contacts_mail_label')}</span>
              </div>
              <div className="space-y-1 pl-11">
                <a href="mailto:info@guru-energy.com.ua" className="text-base font-extrabold text-white hover:text-green-400 transition-colors block font-mono">info@guru-energy.com.ua</a>
                <p className="text-xs text-slate-400">{tr('contacts_mail_sub')}</p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-gradient-to-r from-green-500/15 to-slate-900 border border-green-500/30 flex items-center justify-between">
              <div className="text-xs space-y-1">
                <div className="font-extrabold text-white">{tr('contacts_urgent_title')}</div>
                <div className="text-slate-400">{tr('contacts_urgent_sub')}</div>
              </div>
              <button
                onClick={() => openLeadModal('10 kW', 'Engineer Visit', 'Contacts Page')}
                className="px-5 py-3 bg-[#22C55E] text-slate-950 font-black text-xs rounded-xl uppercase tracking-wider shrink-0"
              >
                {tr('contacts_urgent_btn')}
              </button>
            </div>

          </div>

          {/* Interactive Google Map iframe simulation (7) */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl h-[480px] sm:h-[560px] bg-slate-900 relative">
            <iframe
              title={tr('contacts_map_title')}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2540.540866874836!2d30.523400000000003!3d50.4501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTDCsDI3JzAwLjQiTiAzMMKwMzEnMjQuMiJF!5e0!3m2!1suk!2sua!4v1620000000000!5m2!1suk!2sua"
              className="w-full h-full border-0 filter grayscale invert contrast-125 opacity-80"
              allowFullScreen={false}
              loading="lazy"
            />
            <div className="absolute bottom-6 left-6 bg-slate-950/90 backdrop-blur-md p-4 rounded-2xl border border-slate-800 shadow-xl max-w-sm">
              <div className="text-xs font-extrabold text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                <span>{tr('contacts_stock_title')}</span>
              </div>
              <p 
                className="text-[11px] text-slate-400 pt-1 leading-normal font-mono"
                dangerouslySetInnerHTML={{ __html: tr('contacts_stock_desc') }}
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
