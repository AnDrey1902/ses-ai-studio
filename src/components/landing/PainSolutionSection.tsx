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
      className="ds-section relative isolate border-b border-[rgba(255,255,255,.08)] scroll-mt-20"
    >
      {/* Darkening over the shared solar-panel backdrop (owned by App): starts at
          the Hero's bg-ink/65 tone so the boundary is seamless, then dissolves
          into solid #07140F by the time the cards begin. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[rgba(10,42,30,.65)] from-0% via-[rgba(9,24,17,.74)] via-72% to-[#07140F] to-96%" />

      <div className="max-w-[1280px] mx-auto px-5 md:px-8 space-y-[64px]">

        {/* Section Heading */}
        <div id="pain-solution-heading" className="text-center max-w-3xl mx-auto space-y-4">
          <h2 id="pain-solution-title" className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            {tr('b2_title')}
          </h2>
          <p className="text-sm sm:text-base text-muted-dark font-medium">
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
                className="ds-card !p-[28px]"
              >
                <div className="space-y-4">
                  {/* Badge & Stat */}
                  <div className="flex items-center justify-between">
                    <span className="ds-badge px-3 py-1 text-[10px] bg-[rgba(255,199,66,.12)] text-sun border border-[rgba(255,199,66,.25)]">
                      {tr('b2_pain_label')}{idx + 1}
                    </span>
                    <span className="font-mono text-xs font-black text-emerald bg-[rgba(24,165,88,.1)] px-2.5 py-1 rounded-xl">
                      {item.stat}
                    </span>
                  </div>

                  {/* Pain Quote */}
                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#07140F]/60 border border-red-500/15">
                    <AlertTriangle className="w-5 h-5 text-sun shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm italic font-medium text-cloud leading-relaxed">
                      {painCopy}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald uppercase tracking-wide">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{tr('b2_solution_label')}</span>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed pl-6">
                      {solCopy}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout Banner */}
        <div id="pain-solution-callout" className="bg-gradient-to-r from-[rgba(24,165,88,.15)] via-[#10261C] to-[rgba(255,199,66,.15)] rounded-[32px] p-8 border border-[rgba(255,255,255,.08)] flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <h4 className="text-lg font-extrabold text-white">{tr('b2_callout_title')}</h4>
            <p className="text-xs text-muted-dark">{tr('b2_callout_desc')}</p>
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
