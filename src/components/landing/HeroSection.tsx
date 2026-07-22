import React, { useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Zap, ShieldCheck, Clock, Award, ArrowRight, CheckCircle2, FileText } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { tr, openLeadModal } = useApp();
  const monitorRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Import energy-monitor web component
    import('../../widgets/energy-monitor/energy-monitor.js');
  }, []);

  const bullets = [
    { icon: FileTextIcon, text: tr('bullet_price') },
    { icon: BatteryIcon, text: tr('bullet_hybrid') },
    { icon: ClockIcon, text: tr('bullet_days') },
    { icon: PercentIcon, text: tr('bullet_loan') }
  ];

  const heroStats = [
    { num: tr('hero_stat1_num'), label: tr('hero_stat1_label') },
    { num: tr('hero_stat2_num'), label: tr('hero_stat2_label') },
    { num: tr('hero_stat3_num'), label: tr('hero_stat3_label') }
  ];

  return (
    <section id="home" className="ds-fit relative isolate overflow-hidden">

      {/* Darkening over the solar-panel backdrop (owned by App, Hero only) */}
      <div className="absolute inset-0 z-[-1] bg-ink/65" />

      {/* Glow Orbs — scale with viewport */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(700px,90vw)] h-[min(400px,50vh)] bg-gradient-to-tr from-[rgba(24,165,88,.08)] to-[rgba(255,199,66,.05)] blur-[140px] rounded-full pointer-events-none z-[-1]" />

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-5 md:px-8 lg:px-12 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-8 items-center lg:items-stretch">

          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-2 lg:space-y-0 lg:flex lg:flex-col lg:justify-between text-center lg:text-left min-w-0">

            {/* Urgent Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ink-2 border border-[rgba(255,255,255,.08)] shadow-md self-center lg:self-start">
              <span className="flex h-1.5 w-1.5 rounded-full bg-emerald animate-ping" />
              <span className="text-[10px] sm:text-[11px] font-bold text-cloud tracking-wide">
                {tr('hero_urgent_tag')}
              </span>
            </div>

            {/* Main H1 — 3 lines */}
            <h1 className="font-display font-extrabold tracking-tight text-white leading-[1.08]
              text-[clamp(1.5rem,2.2vw+0.5vh,2.6rem)]">
              <span className="block">Сонячна електростанція</span>
              <span className="block">під ключ — <span className="text-sun">світло</span></span>
              <span className="block text-sun">навіть у блекаут</span>
            </h1>

            {/* Subtitle */}
            <p className="text-[11px] sm:text-xs md:text-sm text-cloud font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {tr('hero_sub')}
            </p>

            {/* 4 Bullets — compact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-0.5 sm:gap-x-4 text-left sm:px-2">
              {bullets.map((b, i) => (
                <div key={i} className="flex items-center gap-2 px-1 py-1 w-full min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-[rgba(13,53,39,.92)] border border-[rgba(255,255,255,.08)] text-emerald flex items-center justify-center shrink-0">
                    <b.icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-cloud leading-snug min-w-0">{b.text}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 sm:gap-x-4 sm:px-2">
              <button
                onClick={() => openLeadModal('10 kW', 'Hybrid SES', tr('lead_source_header'))}
                className="ds-btn-primary !py-2.5 sm:!py-3 !px-5 sm:!px-6 !text-xs"
              >
                <span>{tr('btn_calc_ses')}</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
              </button>

              <button
                onClick={() => openLeadModal('8 kW', 'Credit 0%', tr('lead_source_header'))}
                className="ds-btn-secondary !py-2.5 sm:!py-3 !px-5 sm:!px-6 !text-xs !text-white !border-white"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald" />
                <span>→ {tr('btn_loan_check')}</span>
              </button>
            </div>

            {/* Microcopy + Stats — one row */}
            <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-5 flex-wrap text-center lg:text-left">
              <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-muted-dark">
                <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald shrink-0" />
                <span>{tr('micro_trust')}</span>
              </div>
              <div className="flex items-start gap-4 sm:gap-5 lg:gap-6">
                {heroStats.map((s, i) => (
                  <div key={i} className="text-left min-w-0">
                    <div className="font-display text-base sm:text-lg lg:text-xl font-extrabold text-sun leading-none whitespace-nowrap">{s.num}</div>
                    <div className="mt-0.5 text-[9px] sm:text-[10px] text-cloud/70 leading-snug">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Energy Monitor Widget */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end w-full min-w-0">
            <div className="w-full max-w-[320px] sm:max-w-[360px] lg:max-w-none flex items-center justify-center lg:justify-end">
              <energy-monitor
                ref={monitorRef}
                className="w-full max-w-[300px] sm:max-w-[340px] lg:max-w-[380px]"
                type="home"
                power="10"
                tariff-home="4.32"
                tariff-biz="16"
                powers-home="5,10,30"
                powers-biz="30,50,100"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const FileTextIcon: React.FC<{ className?: string }> = ({ className }) => <FileText className={className || "w-4 h-4"} />;
const BatteryIcon: React.FC<{ className?: string }> = ({ className }) => <Zap className={className || "w-4 h-4"} />;
const ClockIcon: React.FC<{ className?: string }> = ({ className }) => <Clock className={className || "w-4 h-4"} />;
const PercentIcon: React.FC<{ className?: string }> = ({ className }) => <Award className={className || "w-4 h-4"} />;
