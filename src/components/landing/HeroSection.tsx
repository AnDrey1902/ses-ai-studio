import React from 'react';
import { useApp } from '../../context/AppContext';
import { Zap, ShieldCheck, Clock, Award, ArrowRight, CheckCircle2, FileText } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { tr, openLeadModal, lang } = useApp();

  const bullets = [
    { icon: FileTextIcon, text: tr('bullet_price') },
    { icon: BatteryIcon, text: tr('bullet_hybrid') },
    { icon: ClockIcon, text: tr('bullet_days') },
    { icon: PercentIcon, text: tr('bullet_loan') }
  ];

  return (
    <section id="home" className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden bg-slate-950 bg-grid-pattern border-b border-slate-900">
      
      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-green-500/15 to-amber-500/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            
            {/* Urgent Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 shadow-md">
              <span className="flex h-2 w-2 rounded-full bg-[#22C55E] animate-ping" />
              <span className="text-xs font-bold text-slate-200 tracking-wide">
                {tr('hero_urgent_tag')}
              </span>
            </div>

            {/* Main H1 */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              {tr('hero_h1')}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {tr('hero_sub')}
            </p>

            {/* 4 Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-left max-w-2xl mx-auto lg:mx-0">
              {bullets.map((b, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-sm">
                  <div className="w-8 h-8 rounded-xl bg-green-500/15 text-[#22C55E] flex items-center justify-center shrink-0">
                    <b.icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-200 leading-snug">{b.text}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => openLeadModal('10 kW', 'Hybrid SES', tr('lead_source_header'))}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#22C55E] hover:bg-[#16A34A] text-slate-950 font-extrabold text-sm tracking-wide shadow-xl shadow-green-500/30 transition-all hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center gap-2.5"
              >
                <span>{tr('btn_calc_ses')}</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>

              <button
                onClick={() => openLeadModal('8 kW', 'Credit 0%', tr('lead_source_header'))}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-100 border border-slate-700/80 font-bold text-xs tracking-wide transition-all flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-green-400" />
                <span>→ {tr('btn_loan_check')}</span>
              </button>
            </div>

            {/* Microcopy Guarantee */}
            <div className="flex items-center justify-center lg:justify-start gap-2 pt-2 text-xs font-semibold text-slate-400">
              <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
              <span>{tr('micro_trust')}</span>
            </div>

          </div>

          {/* Right Column: Visual Mockup */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-slate-900 group">
              <img
                src="https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1000&q=80"
                alt={tr('hero_img_alt')}
                className="w-full h-[380px] sm:h-[460px] object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

              {/* Live Status Overlay Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-slate-700/80 shadow-2xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-300">{tr('hero_live_status')}</span>
                  <span className="text-green-400 font-mono font-extrabold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    {tr('hero_reserve_power')}
                  </span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden p-0.5">
                  <div className="bg-gradient-to-r from-green-500 to-amber-400 h-full w-[94%] rounded-full animate-pulse" />
                </div>
                <div className="flex justify-between text-[11px] text-slate-400 font-mono font-semibold pt-0.5">
                  <span>{tr('hero_generation')} <strong className="text-white">11.4 {tr('prices_kw_h').replace('·год', '').replace('·ч', '')}</strong></span>
                  <span>{tr('hero_battery')} <strong className="text-green-400">100%</strong></span>
                </div>
              </div>
            </div>

            {/* Decorative Floating ROI Tag */}
            <div className="hidden sm:block absolute -top-6 -left-6 bg-amber-500 text-slate-950 font-black p-4 rounded-2xl shadow-xl transform -rotate-3 border border-amber-300">
              <div className="text-[10px] uppercase tracking-widest leading-none">{tr('hero_payback_badge')}</div>
              <div className="text-2xl pt-1">{tr('hero_payback_val')}</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// Mini internal helper icons
const FileTextIcon: React.FC<{ className?: string }> = ({ className }) => <FileText className={className || "w-4 h-4"} />;
const BatteryIcon: React.FC<{ className?: string }> = ({ className }) => <Zap className={className || "w-4 h-4"} />;
const ClockIcon: React.FC<{ className?: string }> = ({ className }) => <Clock className={className || "w-4 h-4"} />;
const PercentIcon: React.FC<{ className?: string }> = ({ className }) => <Award className={className || "w-4 h-4"} />;
