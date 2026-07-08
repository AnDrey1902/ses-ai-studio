import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Phone, MessageCircle, Send, CheckCircle2, ShieldCheck, Clock, MapPin, Zap } from 'lucide-react';
import { handlePhoneInput } from '../../utils/phone';

export const ContactFormSection: React.FC = () => {
  const { addLead, tr, openLeadModal } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [power, setPower] = useState('10 кВт');
  const [type, setType] = useState('Гібридна СЕС');
  const [honeypot, setHoneypot] = useState('');

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;

    if (name.trim().length < 2 || phone.trim().length < 9) {
      setStatus('error');
      return;
    }

    setStatus('submitting');
    try {
      await addLead({
        name: name.trim(),
        phone: phone.trim(),
        power,
        sesType: type,
        source: 'Головна форма підвалу (Блок 12)'
      });
      setStatus('success');
    } catch (e) {
      setStatus('error');
    }
  };

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-[#07140F] via-[#10261C] to-[#07140F] border-b border-[rgba(255,255,255,.08)] relative">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left info col (6) */}
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-black uppercase">
              <Zap className="w-4 h-4 fill-red-400" />
              <span>{tr('form_urgent_badge')}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-[1.15]">
              {tr('b12_title')}
            </h2>

            <p className="text-sm sm:text-base text-[#D5DDD8] font-medium leading-relaxed">
              {tr('b12_sub')}
            </p>

            {/* Direct Contacts List */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-xl mx-auto lg:mx-0">
              <div className="p-4 rounded-2xl bg-[#07140F] border border-[rgba(255,255,255,.08)] space-y-1">
                <div className="text-[10px] text-[#647268] uppercase font-bold flex items-center gap-1">
                  <Phone className="w-3 h-3 text-[#22C55E]" /> {tr('form_hotline')}
                </div>
                <a href="tel:0800330444" className="text-lg font-black text-white hover:text-[#22C55E] transition-colors block">0 800 330 444</a>
              </div>

              <div className="p-4 rounded-2xl bg-[#07140F] border border-[rgba(255,255,255,.08)] space-y-1">
                <div className="text-[10px] text-[#647268] uppercase font-bold flex items-center gap-1">
                  <MessageCircle className="w-3 h-3 text-[#22C55E]" /> Viber / Telegram
                </div>
                <a href="https://t.me/guru_energy_solar" target="_blank" rel="noreferrer" className="text-lg font-black text-[#22C55E] hover:underline block">@guru_energy_solar</a>
              </div>
            </div>

          </div>

          {/* Right Form Col (6) */}
          <div className="lg:col-span-6">
            <div className="glass-panel !rounded-[32px] p-8 sm:p-10 relative overflow-hidden">

              {status === 'success' ? (
                <div className="py-12 text-center space-y-4 animate-in zoom-in-95 duration-300">
                  <CheckCircle2 className="w-16 h-16 text-[#22C55E] mx-auto animate-bounce" />
                  <h3 className="text-2xl font-black text-white">{tr('form_success_title')}</h3>
                  <p className="text-sm text-[#D5DDD8] max-w-sm mx-auto leading-relaxed">
                    {tr('form_success_desc')}
                  </p>
                  <button
                    onClick={() => { setStatus('idle'); setName(''); setPhone(''); }}
                    className="mt-6 px-8 py-3.5 bg-[rgba(255,255,255,.08)] hover:bg-[rgba(255,255,255,.12)] text-white font-bold text-xs rounded-full uppercase tracking-wider transition-all"
                  >
                    {tr('form_retry')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-xl font-extrabold text-white pb-1">
                    {tr('form_heading')}
                  </h3>

                  <input
                    type="text"
                    name="url_hp_b12"
                    value={honeypot}
                    onChange={e => setHoneypot(e.target.value)}
                    className="hidden"
                    tabIndex={-1}
                  />

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#D5DDD8] uppercase tracking-wider">{tr('form_name')} *</label>
                    <input
                      type="text"
                      required
                      placeholder="Олександр"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="ds-input w-full px-4 py-3.5 text-sm font-medium"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#D5DDD8] uppercase tracking-wider">{tr('form_phone')} *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+380 (XX) XXX-XX-XX"
                      value={phone}
                      onChange={e => handlePhoneInput(e, setPhone)}
                      className="ds-input w-full px-4 py-3.5 text-sm font-mono font-bold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-[#92A299] mb-1">{tr('form_power_label')}</label>
                      <select value={power} onChange={e => setPower(e.target.value)} className="ds-input w-full p-3 text-xs font-semibold text-[#D5DDD8]">
                        <option value="5 кВт">5 кВт</option>
                        <option value="10 кВт">10 кВт (Хіт)</option>
                        <option value="15 кВт">15 кВт</option>
                        <option value="30 кВт">30 кВт Бізнес</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-[#92A299] mb-1">{tr('form_object_label')}</label>
                      <select value={type} onChange={e => setType(e.target.value)} className="ds-input w-full p-3 text-xs font-semibold text-[#D5DDD8]">
                        <option value="Приватний будинок">Приватний будинок</option>
                        <option value="Комерція">Бізнес / Комерція</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="ds-btn-primary w-full !text-sm disabled:opacity-50"
                  >
                    <span>{status === 'submitting' ? tr('form_submitting') : tr('form_submit')}</span>
                    <Send className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[10px] text-[#647268] pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
                    <span>{tr('form_consent')}</span>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
