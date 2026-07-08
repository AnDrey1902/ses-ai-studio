import React, { useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Zap, ShieldCheck, Clock, Award, ArrowRight, CheckCircle2, FileText } from 'lucide-react';
import heroBg from '../../assets/hero.webp';

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

  return (
    <section id="home" className="relative isolate pt-[104px] pb-16 md:pt-[136px] md:pb-24 overflow-hidden border-b border-[rgba(255,255,255,.08)]">

      {/* Background Image */}
      <div className="absolute inset-0 z-[-1]">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#07140F]/65" />
      </div>

      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-[rgba(34,197,94,.08)] to-[rgba(251,191,36,.05)] blur-[140px] rounded-full pointer-events-none z-[-1]" />

      <div className="max-w-[1280px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-center lg:text-left">

            {/* Urgent Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#10261C] border border-[rgba(255,255,255,.08)] shadow-md">
              <span className="flex h-2 w-2 rounded-full bg-[#22C55E] animate-ping" />
              <span className="text-xs font-bold text-[#D5DDD8] tracking-wide">
                {tr('hero_urgent_tag')}
              </span>
            </div>

            {/* Main H1 */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              {tr('hero_h1_pre')}<span className="text-[#FBBF24]">{tr('hero_h1_span')}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#D5DDD8] font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {tr('hero_sub')}
            </p>

            {/* 4 Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-left max-w-2xl mx-auto lg:mx-0">
              {bullets.map((b, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-[rgba(24,44,33,.92)] border border-[rgba(255,255,255,.08)] backdrop-blur-sm w-full">
                  <div className="w-8 h-8 rounded-xl bg-[rgba(34,197,94,.15)] text-[#22C55E] flex items-center justify-center shrink-0">
                    <b.icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-[#D5DDD8] leading-snug">{b.text}</span>
                </div>
              ))}
            </div>

            {/* CTAs — each button = 1 mini-block width */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto lg:mx-0">
              <button
                onClick={() => openLeadModal('10 kW', 'Hybrid SES', tr('lead_source_header'))}
                className="ds-btn-primary !py-3 !px-7 !text-[13px]"
              >
                <span>{tr('btn_calc_ses')}</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>

              <button
                onClick={() => openLeadModal('8 kW', 'Credit 0%', tr('lead_source_header'))}
                className="ds-btn-secondary !py-3 !px-7 !text-[13px]"
              >
                <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
                <span>→ {tr('btn_loan_check')}</span>
              </button>
            </div>

            {/* Microcopy Guarantee */}
            <div className="flex items-center justify-center lg:justify-start gap-2 pt-1 text-xs font-semibold text-[#92A299]">
              <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
              <span>{tr('micro_trust')}</span>
            </div>

          </div>

          {/* Right Column: Energy Monitor Widget */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end w-full">
            <div className="w-full max-w-[420px] h-full max-h-[640px] flex items-center justify-center lg:justify-center">
              <energy-monitor
                ref={monitorRef}
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
