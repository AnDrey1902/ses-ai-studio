import React from 'react';
import { useApp } from '../../context/AppContext';
import { PAIN_SOLUTIONS } from '../../data/mockData';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

export const PainSolutionSection: React.FC = () => {
  const { lang, tr, openLeadModal } = useApp();

  return (
    <section
      id="pain-solution"
      aria-labelledby="pain-solution-title"
      className="ds-section bg-soft border-b border-line scroll-mt-20"
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 space-y-[64px]">

        {/* Section Heading */}
        <div id="pain-solution-heading" className="text-center max-w-3xl mx-auto space-y-4">
          <h2 id="pain-solution-title" className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-body">
            {tr('b2_title')}
          </h2>
          <p className="text-sm sm:text-base text-muted font-medium">
            {tr('b2_sub')}
          </p>
        </div>

        {/* Grid 6 Pairs */}
        <div id="pain-solution-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PAIN_SOLUTIONS.map((item, idx) => {
            const painCopy = item.pain[lang] || item.pain.uk;
            const solCopy = item.solution[lang] || item.solution.uk;

            return (
              <div
                key={idx}
                className="bg-white rounded-[28px] border border-line p-[28px] shadow-[0_4px_20px_rgba(26,46,35,.05)] hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(255,199,66,.08)] transition-all duration-300"
              >
                <div className="space-y-4">
                  {/* Badge & Stat */}
                  <div className="flex items-center justify-between">
                    <span className="ds-badge px-3 py-1 text-[10px] bg-[rgba(255,199,66,.12)] text-[#B8860B] border border-[rgba(255,199,66,.2)]">
                      {tr('b2_pain_label')}{idx + 1}
                    </span>
                    <span className="font-mono text-xs font-black text-emerald bg-[rgba(24,165,88,.1)] px-2.5 py-1 rounded-xl border border-[rgba(24,165,88,.2)]">
                      {item.stat}
                    </span>
                  </div>

                  {/* Pain Quote */}
                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-[rgba(239,68,68,.06)] border border-[rgba(239,68,68,.15)]">
                    <AlertTriangle className="w-5 h-5 text-sun shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm italic font-medium text-body leading-relaxed">
                      {painCopy}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald uppercase tracking-wide">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{tr('b2_solution_label')}</span>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-body leading-relaxed pl-6">
                      {solCopy}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout Banner */}
        <div id="pain-solution-callout" className="bg-gradient-to-r from-[rgba(24,165,88,.08)] via-white to-[rgba(255,199,66,.08)] rounded-[32px] p-8 border border-line flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left shadow-[0_4px_20px_rgba(26,46,35,.05)]">
          <div className="space-y-1">
            <h4 className="text-lg font-extrabold text-body">{tr('b2_callout_title')}</h4>
            <p className="text-xs text-muted">{tr('b2_callout_desc')}</p>
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
