import React from 'react';
import { useApp } from '../../context/AppContext';
import { WORK_STEPS } from '../../data/mockData';
import { CheckCircle2, Clock } from 'lucide-react';

export const WorkStepsSection: React.FC = () => {
  const { lang, tr, openLeadModal } = useApp();

  return (
    <section className="ds-section bg-[#F8FAF9] border-b border-[#E2ECE6]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 space-y-[64px]">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="ds-badge px-3.5 py-1.5 text-xs bg-[rgba(34,197,94,.1)] text-[#15803D] border border-[rgba(34,197,94,.2)]">
            {tr('b5_badge')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#1A2E23]">
            {tr('b5_title')}
          </h2>
          <p className="text-sm sm:text-base text-[#5A6E62] font-medium">
            {tr('b5_sub')}
          </p>
        </div>

        {/* Timeline 8 steps */}
        <div className="relative">
          {/* Connector Line Desktop */}
          <div className="hidden md:block absolute top-1/2 left-4 right-4 h-1 bg-[#E2ECE6] -translate-y-1/2 -z-10" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {WORK_STEPS.map((step) => {
              const titleCopy = step.title[lang] || step.title.uk;
              const timeCopy = step.time[lang] || step.time.uk;
              const descCopy = step.desc[lang] || step.desc.uk;

              return (
                <div
                  key={step.step}
                  className="bg-gradient-to-br from-white to-[rgba(251,191,36,.13)] rounded-[28px] border border-[#E2ECE6] p-[28px] flex flex-col justify-between space-y-4 relative shadow-[0_4px_20px_rgba(26,46,35,.05)] hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(251,191,36,.14)] transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#22C55E] text-white font-black font-mono text-base flex items-center justify-center shadow-md shadow-[rgba(34,197,94,.2)]">
                      #{step.step}
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#B8860B] bg-[rgba(251,191,36,.12)] px-2.5 py-1 rounded-xl border border-[rgba(251,191,36,.2)]">
                      <Clock className="w-3 h-3" />
                      {timeCopy}
                    </span>
                  </div>

                  <div className="space-y-2 pt-1">
                    <h3 className="text-base font-extrabold text-[#1A2E23] leading-tight">
                      {titleCopy}
                    </h3>
                    <p className="text-xs text-[#5A6E62] leading-relaxed">
                      {descCopy}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center gap-1.5 text-[10px] font-bold text-[#22C55E] uppercase tracking-wide">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{tr('b5_engineer_label')}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center pt-4">
          <button
            onClick={() => openLeadModal('10 кВт', 'Почати крок #1 Заявка', 'Таймлайн Крок 1')}
            className="ds-btn-primary"
          >
            {tr('b5_cta')}
          </button>
        </div>

      </div>
    </section>
  );
};
