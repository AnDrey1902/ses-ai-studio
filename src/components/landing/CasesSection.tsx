import React from 'react';
import { useApp } from '../../context/AppContext';
import { CASES } from '../../data/mockData';
import { MapPin, Zap, Clock, Quote, ArrowRight } from 'lucide-react';

export const CasesSection: React.FC = () => {
  const { lang, tr, openLeadModal } = useApp();

  return (
    <section id="cases" className="py-20 md:py-28 bg-slate-950 border-b border-slate-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-green-500/10 text-green-400 border border-green-500/20">
            {tr('cases_badge')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            {tr('b7_title')}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-medium">
            {tr('b7_sub')}
          </p>
        </div>

        {/* 4 Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {CASES.map((cs) => {
            const titleCopy = cs.title[lang] || cs.title.uk;
            const locCopy = cs.location[lang] || cs.location.uk;
            const typeCopy = cs.sesType[lang] || cs.sesType.uk;
            const paybackCopy = cs.payback[lang] || cs.payback.uk;
            const quoteCopy = cs.quote[lang] || cs.quote.uk;

            return (
              <div
                key={cs.id}
                className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl hover:border-slate-700 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Photo Top */}
                  <div className="relative h-64 sm:h-72 overflow-hidden">
                    <img
                      src={cs.image}
                      alt={titleCopy}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90" />

                    {/* Badge Overlay */}
                    <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-extrabold text-green-400 font-mono">
                      {cs.power}
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                      <span className="text-xs font-bold text-slate-200 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        {locCopy}
                      </span>
                      <span className="text-xs font-mono font-extrabold bg-[#22C55E] text-slate-950 px-2.5 py-1 rounded-lg">
                        {tr('cases_install_days').replace('{days}', cs.installDays.toString())}
                      </span>
                    </div>
                  </div>

                  {/* Copy content */}
                  <div className="p-6 sm:p-8 space-y-6">
                    <div className="space-y-1">
                      <h3 className="text-xl font-extrabold text-white leading-snug">
                        {titleCopy}
                      </h3>
                      <p className="text-xs font-bold text-slate-400">{typeCopy}</p>
                    </div>

                    {/* Specs & Fin model */}
                    <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800/80 text-xs font-mono">
                      <div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase">{tr('cases_invest_label')}</div>
                        <div className="text-base font-extrabold text-white">${cs.investmentUsd.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase">{tr('cases_payback_label')}</div>
                        <div className="text-base font-extrabold text-green-400">{paybackCopy}</div>
                      </div>
                      <div className="col-span-2 pt-2 border-t border-slate-900 text-[11px] text-slate-300 leading-normal">
                        <strong className="text-slate-500">{tr('cases_equip_label')}</strong> {cs.equipment}
                      </div>
                    </div>

                    {/* Quote */}
                    <div className="flex items-start gap-3 pt-1">
                      <Quote className="w-5 h-5 text-green-400/40 shrink-0 mt-1" />
                      <p className="text-xs italic text-slate-300 leading-relaxed">
                        {quoteCopy}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 sm:p-8 pt-0">
                  <button
                    onClick={() => openLeadModal(cs.power, cs.title.uk, `Case: ${cs.title.uk}`)}
                    className="w-full py-3.5 rounded-xl bg-slate-800 hover:bg-[#22C55E] text-slate-200 hover:text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                  >
                    <span>{tr('cases_cta_btn')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
