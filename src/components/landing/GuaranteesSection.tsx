import React from 'react';
import { useApp } from '../../context/AppContext';
import { GUARANTEES_DATA } from '../../data/mockData';
import { ShieldCheck, Lock, FileCheck, Wrench, HeartHandshake } from 'lucide-react';

export const GuaranteesSection: React.FC = () => {
  const { lang, tr } = useApp();

  return (
    <section className="py-20 md:py-28 bg-slate-950 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-green-500/10 text-green-400 border border-green-500/20">
            {tr('b9_badge')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            {tr('b9_title')}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-medium">
            {tr('b9_sub')}
          </p>
        </div>

        {/* 4 Table Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {GUARANTEES_DATA.map((gd, idx) => {
            const titleCopy = gd.title[lang] || gd.title.uk;
            const descCopy = gd.desc[lang] || gd.desc.uk;

            return (
              <div
                key={idx}
                className="bg-slate-900 rounded-3xl p-7 border border-slate-800 shadow-xl space-y-5 flex flex-col justify-between hover:border-green-500/40 transition-colors"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-green-500/15 text-green-400 flex items-center justify-center font-mono font-black text-lg border border-green-500/20">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-extrabold text-white">{titleCopy}</h3>
                  <div className="text-xl font-black font-mono text-amber-400 bg-amber-500/10 px-3 py-1 rounded-xl inline-block">
                    {gd.years}
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pt-2">
                  {descCopy}
                </p>
              </div>
            );
          })}
        </div>

        {/* Insurance & Legal Cleanliness Box */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 shadow-2xl">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 text-white font-extrabold text-base">
              <Lock className="w-5 h-5 text-green-400" />
              <span>{tr('b9_insurance_title')}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {tr('b9_insurance_desc')}
            </p>
          </div>

          <div className="space-y-3 border-t lg:border-t-0 lg:border-l border-slate-800 pt-6 lg:pt-0 lg:pl-8">
            <div className="flex items-center gap-2.5 text-white font-extrabold text-base">
              <FileCheck className="w-5 h-5 text-green-400" />
              <span>{tr('b9_legal_title')}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {tr('b9_legal_desc')}
            </p>
          </div>

          <div className="space-y-3 border-t lg:border-t-0 lg:border-l border-slate-800 pt-6 lg:pt-0 lg:pl-8">
            <div className="flex items-center gap-2.5 text-white font-extrabold text-base">
              <Wrench className="w-5 h-5 text-green-400" />
              <span>{tr('b9_service_title')}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {tr('b9_service_desc')}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
