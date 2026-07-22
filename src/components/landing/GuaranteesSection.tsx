import React from 'react';
import { useApp } from '../../context/AppContext';
import { GUARANTEES_DATA } from '../../data/mockData';
import { ShieldCheck, Lock, FileCheck, Wrench, HeartHandshake } from 'lucide-react';

export const GuaranteesSection: React.FC = () => {
  const { lang, tr } = useApp();

  return (
    <section id="guarantees" className="ds-section bg-soft border-b border-line scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 space-y-[64px]">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="ds-badge px-3.5 py-1.5 text-xs bg-[rgba(24,165,88,.1)] text-emerald-deep border border-[rgba(24,165,88,.2)]">
            {tr('b9_badge')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-body">
            {tr('b9_title')}
          </h2>
          <p className="text-sm sm:text-base text-muted font-medium">
            {tr('b9_sub')}
          </p>
        </div>

        {/* 4 Table Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {GUARANTEES_DATA.map((gd, idx) => {
            const titleCopy = gd.title[lang] || gd.title.uk;
            const descCopy = gd.desc[lang] || gd.desc.uk;

            return (
              <div
                key={idx}
                className="bg-gradient-to-br from-white to-[rgba(255,199,66,.13)] rounded-[28px] border border-line p-[28px] space-y-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(26,46,35,.05)] hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(255,199,66,.15)] transition-all duration-300"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-[rgba(24,165,88,.12)] text-emerald flex items-center justify-center font-mono font-black text-lg border border-[rgba(24,165,88,.2)]">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-extrabold text-body">{titleCopy}</h3>
                  <div className="text-xl font-black font-mono text-[#B8860B] bg-[rgba(255,199,66,.12)] px-3 py-1 rounded-xl inline-block">
                    {gd.years}
                  </div>
                </div>
                <p className="text-xs text-muted leading-relaxed pt-2">
                  {descCopy}
                </p>
              </div>
            );
          })}
        </div>

        {/* Insurance & Legal Cleanliness Box — Glass Panel */}
        <div className="glass-panel-light !rounded-[32px] p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 text-body font-extrabold text-base">
              <Lock className="w-5 h-5 text-emerald" />
              <span>{tr('b9_insurance_title')}</span>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              {tr('b9_insurance_desc')}
            </p>
          </div>

          <div className="space-y-3 border-t lg:border-t-0 lg:border-l border-line pt-6 lg:pt-0 lg:pl-8">
            <div className="flex items-center gap-2.5 text-body font-extrabold text-base">
              <FileCheck className="w-5 h-5 text-emerald" />
              <span>{tr('b9_legal_title')}</span>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              {tr('b9_legal_desc')}
            </p>
          </div>

          <div className="space-y-3 border-t lg:border-t-0 lg:border-l border-line pt-6 lg:pt-0 lg:pl-8">
            <div className="flex items-center gap-2.5 text-body font-extrabold text-base">
              <Wrench className="w-5 h-5 text-emerald" />
              <span>{tr('b9_service_title')}</span>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              {tr('b9_service_desc')}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
