import React from 'react';
import { useApp } from '../../context/AppContext';
import { ADVANTAGES } from '../../data/mockData';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export const AdvantagesSection: React.FC = () => {
  const { lang, tr } = useApp();

  return (
    <section className="py-20 md:py-28 bg-slate-950 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-green-500/10 text-green-400 border border-green-500/20">
            {tr('b4_badge')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            {tr('b4_title')}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-medium">
            {tr('b4_sub')}
          </p>
        </div>

        {/* 8 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {ADVANTAGES.map((adv, idx) => {
            const titleCopy = adv.title[lang] || adv.title.uk;
            const descCopy = adv.desc[lang] || adv.desc.uk;

            return (
              <div
                key={idx}
                className="bg-slate-900/60 rounded-3xl p-6 sm:p-7 border border-slate-800 hover:border-green-500/40 transition-all shadow-md hover:shadow-xl space-y-4 relative overflow-hidden group"
              >
                {/* Big number watermark */}
                <div className="absolute -bottom-4 -right-4 font-black text-6xl font-mono text-slate-800/40 select-none group-hover:text-green-500/10 transition-colors pointer-events-none">
                  {adv.num}
                </div>

                <div className="w-12 h-12 rounded-2xl bg-green-500/15 text-[#22C55E] flex items-center justify-center font-mono font-black text-lg border border-green-500/20 group-hover:scale-110 transition-transform">
                  {adv.num}
                </div>

                <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight pt-1">
                  {titleCopy}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed pr-2">
                  {descCopy}
                </p>
              </div>
            );
          })}
        </div>

        {/* Trust Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-black font-mono text-white">450+</div>
            <div className="text-xs text-slate-400 font-semibold pt-1">{tr('b4_stat1_label')}</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black font-mono text-green-400">100%</div>
            <div className="text-xs text-slate-400 font-semibold pt-1">{tr('b4_stat2_label')}</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black font-mono text-amber-400">$3.5M+</div>
            <div className="text-xs text-slate-400 font-semibold pt-1">{tr('b4_stat3_label')}</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black font-mono text-white">25 років</div>
            <div className="text-xs text-slate-400 font-semibold pt-1">{tr('b4_stat4_label')}</div>
          </div>
        </div>

      </div>
    </section>
  );
};
