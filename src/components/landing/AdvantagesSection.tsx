import React from 'react';
import { useApp } from '../../context/AppContext';
import { ADVANTAGES } from '../../data/mockData';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export const AdvantagesSection: React.FC = () => {
  const { lang, tr } = useApp();

  return (
    <section id="advantages" className="ds-section bg-soft border-b border-line scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 space-y-[64px]">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="ds-badge px-3.5 py-1.5 text-xs bg-[rgba(24,165,88,.1)] text-emerald-deep border border-[rgba(24,165,88,.2)]">
            {tr('b4_badge')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-body">
            {tr('b4_title')}
          </h2>
          <p className="text-sm sm:text-base text-muted font-medium">
            {tr('b4_sub')}
          </p>
        </div>

        {/* 8 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ADVANTAGES.map((adv, idx) => {
            const titleCopy = adv.title[lang] || adv.title.uk;
            const descCopy = adv.desc[lang] || adv.desc.uk;

            return (
              <div
                key={idx}
                className="bg-white rounded-[28px] border border-line p-[28px] space-y-4 relative overflow-hidden group shadow-[0_4px_20px_rgba(26,46,35,.05)] hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(255,199,66,.08)] transition-all duration-300"
              >
                {/* Big number watermark */}
                <div className="absolute -bottom-4 -right-4 font-black text-6xl font-mono text-[rgba(26,46,35,.04)] select-none group-hover:text-[rgba(24,165,88,.1)] transition-colors pointer-events-none">
                  {adv.num}
                </div>

                <div className="w-12 h-12 rounded-2xl bg-[rgba(255,199,66,.12)] text-[#B8860B] flex items-center justify-center font-mono font-black text-lg border border-[rgba(255,199,66,.2)] group-hover:scale-110 transition-transform">
                  {adv.num}
                </div>

                <h3 className="text-base sm:text-lg font-extrabold text-body tracking-tight pt-1">
                  {titleCopy}
                </h3>

                <p className="text-xs text-muted leading-relaxed pr-2">
                  {descCopy}
                </p>
              </div>
            );
          })}
        </div>

        {/* Trust Stats Bar — Glass Panel */}
        <div className="glass-panel-light !rounded-[32px] p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-black font-mono text-body">450+</div>
            <div className="text-xs text-muted font-semibold pt-1">{tr('b4_stat1_label')}</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black font-mono text-emerald">100%</div>
            <div className="text-xs text-muted font-semibold pt-1">{tr('b4_stat2_label')}</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black font-mono text-[#B8860B]">$3.5M+</div>
            <div className="text-xs text-muted font-semibold pt-1">{tr('b4_stat3_label')}</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black font-mono text-body">25 років</div>
            <div className="text-xs text-muted font-semibold pt-1">{tr('b4_stat4_label')}</div>
          </div>
        </div>

      </div>
    </section>
  );
};
