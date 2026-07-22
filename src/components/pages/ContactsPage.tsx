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
    <div className="pt-[104px] pb-24 md:pb-32">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 space-y-12">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="ds-badge px-3.5 py-1.5 text-xs bg-[rgba(34,197,94,.1)] text-[#15803D] border border-[rgba(34,197,94,.2)]">
            {tr('contacts_badge')}
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#1A2E23]">
            {tr('contacts_title')}
          </h1>
          <p className="text-sm sm:text-base text-[#5A6E62] font-medium max-w-xl mx-auto">
            {tr('contacts_desc')}
          </p>
        </div>

        {/* Grid Info + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Info Cards */}
          <div className="lg:col-span-5 space-y-5">

            <div className="bg-white rounded-[28px] border border-[#E2ECE6] p-7 space-y-4 shadow-[0_4px_20px_rgba(26,46,35,.05)]">
              <div className="flex items-center gap-3 text-[#22C55E] font-extrabold text-sm">
                <div className="p-2.5 rounded-xl bg-[rgba(34,197,94,.1)]"><Phone className="w-5 h-5" /></div>
                <span>{tr('contacts_phone_label')}</span>
              </div>
              <div className="space-y-1 pl-11">
                <a href="tel:0800330444" className="text-2xl font-black text-[#1A2E23] font-mono hover:text-[#22C55E] transition-colors block">0 800 330 444</a>
                <p className="text-xs text-[#5A6E62]">{tr('contacts_phone_sub')}</p>
              </div>
            </div>

            <div className="bg-white rounded-[28px] border border-[#E2ECE6] p-7 space-y-4 shadow-[0_4px_20px_rgba(26,46,35,.05)]">
              <div className="flex items-center gap-3 text-[#FBBF24] font-extrabold text-sm">
                <div className="p-2.5 rounded-xl bg-[rgba(251,191,36,.12)]"><MapPin className="w-5 h-5" /></div>
                <span>{tr('contacts_office_label')}</span>
              </div>
              <div className="space-y-1 pl-11">
                <div className="text-base font-extrabold text-[#1A2E23]">{tr('contacts_office_addr')}</div>
                <p className="text-xs text-[#5A6E62]">{tr('contacts_office_sub')}</p>
              </div>
            </div>

            <div className="bg-white rounded-[28px] border border-[#E2ECE6] p-7 space-y-4 shadow-[0_4px_20px_rgba(26,46,35,.05)]">
              <div className="flex items-center gap-3 text-[#3B82F6] font-extrabold text-sm">
                <div className="p-2.5 rounded-xl bg-[rgba(59,130,246,.1)]"><Mail className="w-5 h-5" /></div>
                <span>{tr('contacts_mail_label')}</span>
              </div>
              <div className="space-y-1 pl-11">
                <a href="mailto:info@guru-energy.com.ua" className="text-base font-extrabold text-[#1A2E23] hover:text-[#22C55E] transition-colors block font-mono">info@guru-energy.com.ua</a>
                <p className="text-xs text-[#5A6E62]">{tr('contacts_mail_sub')}</p>
              </div>
            </div>

            <div className="p-6 rounded-[28px] bg-gradient-to-r from-[rgba(34,197,94,.08)] to-white border border-[#E2ECE6] flex items-center justify-between shadow-[0_4px_20px_rgba(26,46,35,.05)]">
              <div className="text-xs space-y-1">
                <div className="font-extrabold text-[#1A2E23]">{tr('contacts_urgent_title')}</div>
                <div className="text-[#5A6E62]">{tr('contacts_urgent_sub')}</div>
              </div>
              <button
                onClick={() => openLeadModal('10 kW', 'Engineer Visit', 'Contacts Page')}
                className="px-5 py-3 bg-[#22C55E] hover:bg-[#16A34A] text-white font-black text-xs rounded-[14px] uppercase tracking-wider shrink-0 shadow-[0_8px_20px_rgba(34,197,94,.25)] transition-all hover:scale-105"
              >
                {tr('contacts_urgent_btn')}
              </button>
            </div>

          </div>

          {/* OpenStreetMap */}
          <div className="lg:col-span-7 rounded-[28px] overflow-hidden border border-[#E2ECE6] shadow-[0_4px_20px_rgba(26,46,35,.05)] h-[480px] sm:h-[560px] bg-[#F8FAF9] relative">
            <iframe
              title={tr('contacts_map_title')}
              src="https://www.openstreetmap.org/export/embed.html?bbox=30.518%2C50.447%2C30.529%2C50.454&layer=mapnik&marker=50.4501%2C30.5234"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ filter: 'grayscale(0.6) sepia(0.1) hue-rotate(80deg) saturate(0.7)' }}
            />
            <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#E2ECE6] shadow-xl max-w-sm">
              <div className="text-xs font-extrabold text-[#1A2E23] flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] animate-pulse" />
                <span>{tr('contacts_stock_title')}</span>
              </div>
              <p
                className="text-[11px] text-[#5A6E62] pt-1 leading-normal font-mono"
                dangerouslySetInnerHTML={{ __html: tr('contacts_stock_desc') }}
              />
            </div>
          </div>

        </div>

        {/* Feedback Form */}
        <div className="max-w-2xl mx-auto space-y-8 pt-8 border-t border-[#E2ECE6]">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A2E23]">{tr('contacts_form_title')}</h2>
            <p className="text-sm text-[#5A6E62]">{tr('contacts_form_desc')}</p>
          </div>

          {formSent ? (
            <div className="flex flex-col items-center gap-4 py-12 text-center">
              <CheckCircle2 className="w-16 h-16 text-[#22C55E]" />
              <p className="text-lg font-extrabold text-[#1A2E23]">{tr('contacts_form_success')}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-[28px] border border-[#E2ECE6] p-8 shadow-[0_4px_20px_rgba(26,46,35,.05)] space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#5A6E62] uppercase tracking-wider">{tr('form_name')}</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={e => setFormName(e.target.value)}
                    className="w-full bg-[#F8FAF9] border border-[#E2ECE6] rounded-[14px] px-4 py-3.5 text-sm text-[#1A2E23] placeholder-[#92A299] focus:outline-none focus:border-[#22C55E] transition-colors"
                    placeholder={tr('form_name')}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#5A6E62] uppercase tracking-wider">{tr('form_phone')}</label>
                  <input
                    type="tel"
                    required
                    value={formPhone}
                    onChange={handlePhoneChange}
                    className="w-full bg-[#F8FAF9] border border-[#E2ECE6] rounded-[14px] px-4 py-3.5 text-sm text-[#1A2E23] placeholder-[#92A299] focus:outline-none focus:border-[#22C55E] transition-colors font-mono"
                    placeholder="+380 (XX) XXX-XX-XX"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#5A6E62] uppercase tracking-wider">{tr('contacts_form_msg_label')}</label>
                <textarea
                  value={formMsg}
                  onChange={e => setFormMsg(e.target.value)}
                  rows={4}
                  className="w-full bg-[#F8FAF9] border border-[#E2ECE6] rounded-[14px] px-4 py-3.5 text-sm text-[#1A2E23] placeholder-[#92A299] focus:outline-none focus:border-[#22C55E] transition-colors resize-none"
                  placeholder={tr('contacts_form_msg_placeholder')}
                />
              </div>
              <button
                type="submit"
                className="ds-btn-primary w-full !rounded-[14px] !py-4"
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
