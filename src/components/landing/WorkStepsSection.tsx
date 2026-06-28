import React from 'react';
import { useApp } from '../../context/AppContext';
import { WORK_STEPS } from '../../data/mockData';
import { CheckCircle2, Clock } from 'lucide-react';

export const WorkStepsSection: React.FC = () => {
  const { lang, tr, openLeadModal } = useApp();

  return (
    <section className="py-20 md:py-28 bg-slate-950 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-green-500/10 text-green-400 border border-green-500/20">
            ПРОЗОРИЙ ТАЙМЛАЙН
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            {tr('b5_title')}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-medium">
            {tr('b5_sub')}
          </p>
        </div>

        {/* Timeline 8 steps */}
        <div className="relative">
          {/* Connector Line Desktop */}
          <div className="hidden md:block absolute top-1/2 left-4 right-4 h-1 bg-slate-800 -translate-y-1/2 -z-10" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {WORK_STEPS.map((step) => {
              const titleCopy = step.title[lang] || step.title.uk;
              const timeCopy = step.time[lang] || step.time.uk;
              const descCopy = step.desc[lang] || step.desc.uk;

              return (
                <div
                  key={step.step}
                  className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl flex flex-col justify-between space-y-4 relative hover:border-green-500/40 transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#22C55E] text-slate-950 font-black font-mono text-base flex items-center justify-center shadow-md shadow-green-500/20">
                      #{step.step}
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                      <Clock className="w-3 h-3" />
                      {timeCopy}
                    </span>
                  </div>

                  <div className="space-y-2 pt-1">
                    <h3 className="text-base font-extrabold text-white leading-tight">
                      {titleCopy}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {descCopy}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center gap-1.5 text-[10px] font-bold text-green-400 uppercase tracking-wide">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Етап супроводжує інженер</span>
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
            className="px-8 py-4 bg-[#22C55E] hover:bg-[#16A34A] text-slate-950 font-extrabold text-sm rounded-2xl shadow-xl shadow-green-500/25 tracking-wide transition-all hover:scale-105"
          >
            Зробити Крок #1: Отримати розрахунок за 15 хв
          </button>
        </div>

      </div>
    </section>
  );
};
