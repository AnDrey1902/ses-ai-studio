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

      {/* Darkening over the shared solar-panel backdrop (owned by App, spans Hero+Pain) */}
      <div className="absolute inset-0 z-[-1] bg-ink/65" />

      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-[rgba(24,165,88,.08)] to-[rgba(255,199,66,.05)] blur-[140px] rounded-full pointer-events-none z-[-1]" />

      <div className="w-full px-5 md:px-8 lg:px-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center lg:items-stretch">

          {/* Left Column: Copy & CTAs — on desktop it stretches to the monitor's height
              and distributes its rows evenly (justify-between) to use the full vertical space. */}
          <div className="lg:col-span-7 space-y-[clamp(0.5rem,1.4vh,1rem)] lg:space-y-0 lg:flex lg:flex-col lg:justify-between lg:py-1 text-center lg:text-left">

            {/* Urgent Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ink-2 border border-[rgba(255,255,255,.08)] shadow-md self-center lg:self-start">
              <span className="flex h-2 w-2 rounded-full bg-emerald animate-ping" />
              <span className="text-xs font-bold text-cloud tracking-wide">
                {tr('hero_urgent_tag')}
              </span>
            </div>

            {/* Main H1 — viewport-aware so it never blows the fold on short laptops.
                Line 1 (pre) + line 2 (sun span) — span goes block at ≥lg for a clean two-liner. */}
            <h1 className="font-display text-[clamp(2.2rem,0.9rem+0.84vw+1.44vh,3rem)] font-extrabold tracking-tight text-white leading-[1.05]">
              {tr('hero_h1_pre')}{' '}
              <span className="text-sun lg:block">{tr('hero_h1_span')}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-cloud font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {tr('hero_sub')}
            </p>

            {/* 4 Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 sm:gap-x-6 text-left sm:px-6">
              {bullets.map((b, i) => (
                <div key={i} className="flex items-center gap-3 px-1 py-2 w-full">
                  <div className="w-10 h-10 rounded-xl bg-[rgba(13,53,39,.92)] border border-[rgba(255,255,255,.08)] text-emerald flex items-center justify-center shrink-0">
                    <b.icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold text-cloud leading-snug">{b.text}</span>
                </div>
              ))}
            </div>

            {/* CTAs — each button = 1 mini-block width */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 sm:gap-x-6 sm:px-6">
              <button
                onClick={() => openLeadModal('10 kW', 'Hybrid SES', tr('lead_source_header'))}
                className="ds-btn-primary !py-3.5 !px-7 !text-[13px]"
              >
                <span>{tr('btn_calc_ses')}</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>

              <button
                onClick={() => openLeadModal('8 kW', 'Credit 0%', tr('lead_source_header'))}
                className="ds-btn-secondary !py-3.5 !px-7 !text-[13px] !text-white !border-white"
              >
                <ShieldCheck className="w-4 h-4 text-emerald" />
                <span>→ {tr('btn_loan_check')}</span>
              </button>
            </div>

            {/* Microcopy Guarantee */}
            <div className="flex items-center justify-center lg:justify-start gap-2 pt-0.5 text-xs font-semibold text-muted-dark">
              <CheckCircle2 className="w-4 h-4 text-emerald shrink-0" />
              <span>{tr('micro_trust')}</span>
            </div>

            {/* Trust stats — bottom strip, aligned with the monitor baseline */}
            <div className="flex items-start justify-center lg:justify-start gap-8 lg:gap-12">
              {heroStats.map((s, i) => (
                <div key={i} className="text-left">
                  <div className="font-display text-2xl sm:text-[28px] font-extrabold text-sun leading-none">{s.num}</div>
                  <div className="mt-1.5 text-xs text-cloud/70 leading-snug">{s.label}</div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Energy Monitor Widget */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end w-full">
            <div className="w-full max-w-[420px] flex items-center justify-center lg:justify-end">
              <energy-monitor
                ref={monitorRef}
                style={{ width: '384px', maxWidth: '100%' }}
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
