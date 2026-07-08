import React from 'react';
import { useApp } from '../../context/AppContext';
import { PAIN_SOLUTIONS } from '../../data/mockData';
import { AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';

export const PainSolutionSection: React.FC = () => {
  const { lang, tr, openLeadModal } = useApp();

  return (
    <section className="ds-section bg-[#07140F] border-b border-[rgba(255,255,255,.08)]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 space-y-[64px]">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            {tr('b2_title')}
          </h2>
          <p className="text-sm sm:text-base text-[#92A299] font-medium">
            {tr('b2_sub')}
          </p>
        </div>

        {/* Grid 6 Pairs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PAIN_SOLUTIONS.map((item, idx) => {
            const painCopy = item.pain[lang] || item.pain.uk;
            const solCopy = item.solution[lang] || item.solution.uk;

            return (
              <div
                key={idx}
                className="ds-card !p-[28px] flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  {/* Badge & Stat */}
                  <div className="flex items-center justify-between">
                    <span className="ds-badge px-3 py-1 text-[10px] bg-[rgba(251,191,36,.12)] text-[#FBBF24] border border-[rgba(251,191,36,.25)]">
                      {tr('b2_pain_label')}{idx + 1}
                    </span>
                    <span className="font-mono text-xs font-black text-[#22C55E] bg-[rgba(34,197,94,.1)] px-2.5 py-1 rounded-xl">
                      {item.stat}
                    </span>
                  </div>

                  {/* Pain Quote */}
                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#07140F]/60 border border-red-500/15">
                    <AlertTriangle className="w-5 h-5 text-[#FBBF24] shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm italic font-medium text-[#D5DDD8] leading-relaxed">
                      {painCopy}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#22C55E] uppercase tracking-wide">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{tr('b2_solution_label')}</span>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed pl-6">
                      {solCopy}
                    </p>
                  </div>
                </div>

                {/* Card CTA */}
                <div className="pt-4 border-t border-[rgba(255,255,255,.08)]">
                  <button
                    onClick={() => openLeadModal('10 кВт', item.badge, `Картка Болю: ${item.badge}`)}
                    className="ds-btn-primary w-full !py-3 !text-xs group-hover:!bg-[#16A34A]"
                  >
                    <span>{tr('b2_cta')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout Banner */}
        <div className="bg-gradient-to-r from-[rgba(34,197,94,.15)] via-[#10261C] to-[rgba(251,191,36,.15)] rounded-[32px] p-8 border border-[rgba(255,255,255,.08)] flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <h4 className="text-lg font-extrabold text-white">{tr('b2_callout_title')}</h4>
            <p className="text-xs text-[#92A299]">{tr('b2_callout_desc')}</p>
          </div>
          <button
            onClick={() => openLeadModal('10 кВт', 'Консультація інженера', 'Банер Болі Консультація')}
            className="ds-btn-primary shrink-0"
          >
            {tr('b2_callout_btn')}
          </button>
        </div>

      </div>
    </section>
  );
};
