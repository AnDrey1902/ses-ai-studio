import React from 'react';
import { useApp } from '../../context/AppContext';
import { ADVANTAGES } from '../../data/mockData';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export const AdvantagesSection: React.FC = () => {
  const { lang, tr } = useApp();

  return (
    <section id="advantages" className="ds-section bg-ink border-b border-[rgba(255,255,255,.08)] scroll-mt-20">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 space-y-[64px]">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="ds-badge px-3.5 py-1.5 text-xs bg-[rgba(24,165,88,.1)] text-emerald border border-[rgba(24,165,88,.2)]">
            {tr('b4_badge')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            {tr('b4_title')}
          </h2>
          <p className="text-sm sm:text-base text-muted-dark font-medium">
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
                className="ds-card !p-[28px] space-y-4 relative overflow-hidden group"
              >
                {/* Big number watermark */}
                <div className="absolute -bottom-4 -right-4 font-black text-6xl font-mono text-[rgba(255,255,255,.04)] select-none group-hover:text-[rgba(24,165,88,.1)] transition-colors pointer-events-none">
                  {adv.num}
                </div>

                <div className="w-12 h-12 rounded-2xl bg-[rgba(255,199,66,.12)] text-sun flex items-center justify-center font-mono font-black text-lg border border-[rgba(255,199,66,.2)] group-hover:scale-110 transition-transform">
                  {adv.num}
                </div>

                <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight pt-1">
                  {titleCopy}
                </h3>

                <p className="text-xs text-cloud leading-relaxed pr-2">
                  {descCopy}
                </p>
              </div>
            );
          })}
        </div>

        {/* Trust Stats Bar — Glass Panel */}
        <div className="glass-panel !rounded-[32px] p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-black font-mono text-white">450+</div>
            <div className="text-xs text-muted-dark font-semibold pt-1">{tr('b4_stat1_label')}</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black font-mono text-emerald">100%</div>
            <div className="text-xs text-muted-dark font-semibold pt-1">{tr('b4_stat2_label')}</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black font-mono text-sun">$3.5M+</div>
            <div className="text-xs text-muted-dark font-semibold pt-1">{tr('b4_stat3_label')}</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black font-mono text-white">25 років</div>
            <div className="text-xs text-muted-dark font-semibold pt-1">{tr('b4_stat4_label')}</div>
          </div>
        </div>

      </div>
    </section>
  );
};
