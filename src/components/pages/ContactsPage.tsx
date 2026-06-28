import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Phone, Mail, MapPin, Clock, ShieldCheck, Zap, Send, CheckCircle2 } from 'lucide-react';
import { formatPhone } from '../../utils/phone';

export const ContactsPage: React.FC = () => {
  const { openLeadModal, tr } = useApp();
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formMsg, setFormMsg] = useState('');
  const [formSent, setFormSent] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormPhone(formatPhone(e.target.value.replace(/\D/g, '').slice(0, 12)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formPhone.trim()) return;
    setFormSent(true);
    setTimeout(() => setFormSent(false), 4000);
    setFormName('');
    setFormPhone('');
    setFormMsg('');
  };

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
          
          {/* Info Cards */}
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

          {/* OpenStreetMap */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl h-[480px] sm:h-[560px] bg-slate-900 relative">
            <iframe
              title={tr('contacts_map_title')}
              src="https://www.openstreetmap.org/export/embed.html?bbox=30.518%2C50.447%2C30.529%2C50.454&layer=mapnik&marker=50.4501%2C30.5234"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ filter: 'grayscale(0.8) invert(0.92) contrast(1.1) hue-rotate(180deg)' }}
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

        {/* Feedback Form */}
        <div className="max-w-2xl mx-auto space-y-8 pt-8 border-t border-slate-800">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{tr('contacts_form_title')}</h2>
            <p className="text-sm text-slate-400">{tr('contacts_form_desc')}</p>
          </div>

          {formSent ? (
            <div className="flex flex-col items-center gap-4 py-12 text-center">
              <CheckCircle2 className="w-16 h-16 text-green-400" />
              <p className="text-lg font-extrabold text-white">{tr('contacts_form_success')}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-xl space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">{tr('form_name')}</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={e => setFormName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-green-500 transition-colors"
                    placeholder={tr('form_name')}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">{tr('form_phone')}</label>
                  <input
                    type="tel"
                    required
                    value={formPhone}
                    onChange={handlePhoneChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-green-500 transition-colors font-mono"
                    placeholder="+380 (XX) XXX-XX-XX"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">{tr('contacts_form_msg_label')}</label>
                <textarea
                  value={formMsg}
                  onChange={e => setFormMsg(e.target.value)}
                  rows={4}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-green-500 transition-colors resize-none"
                  placeholder={tr('contacts_form_msg_placeholder')}
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-[#22C55E] hover:bg-[#16A34A] text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-green-500/25 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{tr('contacts_form_btn')}</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
