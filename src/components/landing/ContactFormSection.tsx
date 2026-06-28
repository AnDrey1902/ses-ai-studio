import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Phone, MessageCircle, Send, CheckCircle2, ShieldCheck, Clock, MapPin, Zap } from 'lucide-react';

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
    <section className="py-20 md:py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-b border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left info col (6) */}
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-black uppercase">
              <Zap className="w-4 h-4 fill-red-400" />
              <span>Увага! Тарифи зростають</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-[1.15]">
              {tr('b12_title')}
            </h2>

            <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
              {tr('b12_sub')}
            </p>

            {/* Direct Contacts List */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-xl mx-auto lg:mx-0">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-500 uppercase font-bold flex items-center gap-1">
                  <Phone className="w-3 h-3 text-green-400" /> Гаряча лінія 24/7
                </div>
                <a href="tel:0800330444" className="text-lg font-black text-white hover:text-green-400 transition-colors block">0 800 330 444</a>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-500 uppercase font-bold flex items-center gap-1">
                  <MessageCircle className="w-3 h-3 text-green-400" /> Viber / Telegram
                </div>
                <a href="https://t.me/guru_energy_solar" target="_blank" rel="noreferrer" className="text-lg font-black text-green-400 hover:underline block">@guru_energy_solar</a>
              </div>
            </div>

          </div>

          {/* Right Form Col (6) */}
          <div className="lg:col-span-6">
            <div className="bg-slate-900/90 rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
              
              {status === 'success' ? (
                <div className="py-12 text-center space-y-4 animate-in zoom-in-95 duration-300">
                  <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto animate-bounce" />
                  <h3 className="text-2xl font-black text-white">{tr('form_success_title')}</h3>
                  <p className="text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
                    {tr('form_success_desc')}
                  </p>
                  <button
                    onClick={() => { setStatus('idle'); setName(''); setPhone(''); }}
                    className="mt-6 px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl uppercase tracking-wider transition-all"
                  >
                    Відправити ще одну заявку
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-xl font-extrabold text-white pb-1">
                    Отримати розрахунок та кошторис у $
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
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">{tr('form_name')} *</label>
                    <input
                      type="text"
                      required
                      placeholder="Олександр"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-green-500 font-medium"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">{tr('form_phone')} *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+380 (99) 000-00-00"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-green-500 font-mono font-bold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">Потужність СЕС</label>
                      <select value={power} onChange={e => setPower(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-semibold text-slate-200">
                        <option value="5 кВт">5 кВт</option>
                        <option value="10 кВт">10 кВт (Хіт)</option>
                        <option value="15 кВт">15 кВт</option>
                        <option value="30 кВт">30 кВт Бізнес</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">Об'єкт</label>
                      <select value={type} onChange={e => setType(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-semibold text-slate-200">
                        <option value="Приватний будинок">Приватний будинок</option>
                        <option value="Комерція">Бізнес / Комерція</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-4 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-slate-950 font-black text-sm tracking-wide uppercase transition-all shadow-xl shadow-green-500/25 flex items-center justify-center gap-2 hover:scale-[1.02]"
                  >
                    <span>{status === 'submitting' ? tr('form_submitting') : tr('form_submit')}</span>
                    <Send className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
                    <span>Натискаючи кнопку, ви погоджуєтесь з політикою конфіденційності</span>
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
