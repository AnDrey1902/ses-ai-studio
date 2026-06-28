import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, CheckCircle2, AlertCircle, Loader2, Zap, Phone, User, ShieldAlert } from 'lucide-react';
import { handlePhoneInput } from '../../utils/phone';

export const LeadModal: React.FC = () => {
  const { leadModal, closeLeadModal, addLead, tr, lang } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [power, setPower] = useState(leadModal.power || '10 kW');
  const [sesType, setSesType] = useState(leadModal.sesType || 'Hybrid');
  const [honeypot, setHoneypot] = useState('');

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  if (!leadModal.isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) {
      // Bot detected - silently close
      closeLeadModal();
      return;
    }

    if (name.trim().length < 2) {
      setErrorMsg(tr('lead_error_name'));
      setStatus('error');
      return;
    }

    if (phone.trim().length < 9) {
      setErrorMsg(tr('lead_error_phone'));
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    try {
      await addLead({
        name: name.trim(),
        phone: phone.trim(),
        power,
        sesType,
        source: leadModal.source || tr('nav_home')
      });

      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(tr('lead_error_conn'));
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handlePhoneInput(e, setPhone);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={closeLeadModal}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>

        {status === 'success' ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-extrabold text-white">{tr('form_success_title')}</h3>
            <p className="text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
              {tr('lead_success_desc')}
            </p>
            <button
              onClick={() => {
                setStatus('idle');
                setName('');
                setPhone('');
                closeLeadModal();
              }}
              className="mt-4 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl tracking-wider uppercase transition-all"
            >
              {tr('lead_close_btn')}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Header */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold bg-green-500/15 text-green-400 border border-green-500/30">
                <Zap className="w-3.5 h-3.5 fill-green-400" />
                <span>{tr('lead_modal_urgent')}</span>
              </div>
              <h3 className="text-xl font-extrabold tracking-tight text-white pr-6">
                {tr('lead_modal_title')}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {tr('lead_modal_desc')}
              </p>
            </div>

            {/* Honeypot hidden input */}
            <input
              type="text"
              name="website_url_hp"
              value={honeypot}
              onChange={e => setHoneypot(e.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            {/* Input Name */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                {tr('form_name')} <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  required
                  placeholder={lang === 'en' ? 'John Doe' : 'Олександр'}
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-green-500 transition-colors font-medium"
                />
              </div>
            </div>

            {/* Input Phone */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                {tr('form_phone')} <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="tel"
                  required
                  placeholder="+380 (99) 000-00-00"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-green-500 transition-colors font-mono tracking-wide font-bold"
                />
              </div>
            </div>

            {/* Select Power & Type */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">{tr('lead_modal_power')}</label>
                <select
                  value={power}
                  onChange={e => setPower(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-200 focus:outline-none focus:border-green-500"
                >
                  <option value="5 kW">5 kW ({lang === 'en' ? 'House' : (lang === 'uk' ? 'Дім' : 'Дом')})</option>
                  <option value="8 kW">8 kW ({lang === 'en' ? 'Standard' : (lang === 'uk' ? 'Стандарт' : 'Стандарт')})</option>
                  <option value="10 kW">10 kW ({lang === 'en' ? 'Premium' : (lang === 'uk' ? 'Преміум' : 'Премиум')})</option>
                  <option value="15 kW">15 kW ({lang === 'en' ? 'Maximum' : (lang === 'uk' ? 'Максимум' : 'Максимум')})</option>
                  <option value="30 kW">30 kW ({lang === 'en' ? 'Commerce' : (lang === 'uk' ? 'Комерція' : 'Коммерция')})</option>
                  <option value="50 kW+">50-100 kW ({lang === 'en' ? 'Factory' : (lang === 'uk' ? 'Завод' : 'Завод')})</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">{tr('lead_modal_type')}</label>
                <select
                  value={sesType}
                  onChange={e => setSesType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-200 focus:outline-none focus:border-green-500"
                >
                  <option value="Hybrid">{tr('calc_type_hybrid')}</option>
                  <option value="Business">{tr('calc_type_business')}</option>
                  <option value="On-Grid">{tr('calc_type_ongrid')}</option>
                  <option value="Credit">{tr('tab_credits')}</option>
                </select>
              </div>
            </div>

            {/* Error Message */}
            {status === 'error' && (
              <div role="alert" aria-live="assertive" className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium animate-shake">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full py-4 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] disabled:opacity-50 text-slate-950 font-extrabold text-sm tracking-wide shadow-xl shadow-green-500/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{tr('form_submitting')}</span>
                </>
              ) : (
                <span>{tr('form_submit')}</span>
              )}
            </button>

            {/* Microcopy Security Guarantee */}
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 text-center">
              <ShieldAlert className="w-3.5 h-3.5 text-green-400 shrink-0" />
              <span>{tr('lead_modal_security')}</span>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
