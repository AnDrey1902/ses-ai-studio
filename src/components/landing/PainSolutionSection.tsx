import React from 'react';
import { useApp } from '../../context/AppContext';
import { PAIN_SOLUTIONS } from '../../data/mockData';
import { AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';

export const PainSolutionSection: React.FC = () => {
  const { lang, tr, openLeadModal } = useApp();

  return (
    <section className="py-20 md:py-28 bg-slate-950 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            {tr('b2_title')}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-medium">
            {tr('b2_sub')}
          </p>
        </div>

        {/* Grid 6 Pairs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PAIN_SOLUTIONS.map((item, idx) => {
            const painCopy = item.pain[lang] || item.pain.uk;
            const solCopy = item.solution[lang] || item.solution.uk;

            return (
              <div 
                key={idx}
                className="bg-slate-900/80 rounded-3xl p-6 sm:p-7 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between shadow-lg hover:shadow-2xl space-y-6 group"
              >
                <div className="space-y-4">
                  {/* Badge & Stat */}
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-red-500/10 text-red-400 border border-red-500/20">
                      {tr('b2_pain_label')}{idx + 1}
                    </span>
                    <span className="font-mono text-xs font-black text-[#22C55E] bg-green-500/10 px-2.5 py-1 rounded-lg">
                      {item.stat}
                    </span>
                  </div>

                  {/* Pain Quote */}
                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-950/60 border border-red-500/15">
                    <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm italic font-medium text-slate-300 leading-relaxed">
                      {painCopy}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-green-400 uppercase tracking-wide">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{tr('b2_solution_label')}</span>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-slate-100 leading-relaxed pl-6">
                      {solCopy}
                    </p>
                  </div>
                </div>

                {/* Card CTA */}
                <div className="pt-4 border-t border-slate-800/80">
                  <button
                    onClick={() => openLeadModal('10 кВт', item.badge, `Картка Болю: ${item.badge}`)}
                    className="w-full py-3 rounded-xl bg-slate-800 group-hover:bg-[#22C55E] text-slate-200 group-hover:text-slate-950 font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2"
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
        <div className="bg-gradient-to-r from-green-500/15 via-slate-900 to-amber-500/15 rounded-3xl p-8 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <h4 className="text-lg font-extrabold text-white">{tr('b2_callout_title')}</h4>
            <p className="text-xs text-slate-400">{tr('b2_callout_desc')}</p>
          </div>
          <button
            onClick={() => openLeadModal('10 кВт', 'Консультація інженера', 'Банер Болі Консультація')}
            className="px-6 py-3.5 bg-[#22C55E] hover:bg-[#16A34A] text-slate-950 font-extrabold text-xs rounded-xl tracking-wider shadow-lg shrink-0 transition-transform hover:scale-105"
          >
            {tr('b2_callout_btn')}
          </button>
        </div>

      </div>
    </section>
  );
};
