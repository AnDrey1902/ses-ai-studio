import React from 'react';
import { useApp } from '../../context/AppContext';
import { CASES } from '../../data/mockData';
import { MapPin, Zap, Clock, Quote, ArrowRight } from 'lucide-react';

export const CasesSection: React.FC = () => {
  const { lang, tr, openLeadModal } = useApp();

  return (
    <section id="cases" className="ds-section bg-soft border-b border-line scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 space-y-[64px]">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="ds-badge px-3.5 py-1.5 text-xs bg-[rgba(24,165,88,.1)] text-emerald-deep border border-[rgba(24,165,88,.2)]">
            {tr('cases_badge')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-body">
            {tr('b7_title')}
          </h2>
          <p className="text-sm sm:text-base text-muted font-medium">
            {tr('b7_sub')}
          </p>
        </div>

        {/* 4 Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CASES.map((cs) => {
            const titleCopy = cs.title[lang] || cs.title.uk;
            const locCopy = cs.location[lang] || cs.location.uk;
            const typeCopy = cs.sesType[lang] || cs.sesType.uk;
            const paybackCopy = cs.payback[lang] || cs.payback.uk;
            const quoteCopy = cs.quote[lang] || cs.quote.uk;

            return (
              <div
                key={cs.id}
                className="bg-gradient-to-bl from-white to-[rgba(255,199,66,.04)] rounded-[28px] border border-line overflow-hidden group shadow-[0_4px_20px_rgba(26,46,35,.05)] hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(255,199,66,.08)] transition-all duration-300"
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
                    <div className="absolute inset-0 bg-gradient-to-t from-body via-transparent to-transparent opacity-90" />

                    {/* Badge Overlay */}
                    <div className="absolute top-4 left-4 glass-panel-light !rounded-2xl px-3 py-1.5 text-xs font-extrabold text-emerald font-mono">
                      {cs.power}
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                      <span className="text-xs font-bold text-white flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-sun shrink-0" />
                        {locCopy}
                      </span>
                      <span className="text-xs font-mono font-extrabold bg-emerald text-white px-2.5 py-1 rounded-xl">
                        {tr('cases_install_days').replace('{days}', cs.installDays.toString())}
                      </span>
                    </div>
                  </div>

                  {/* Copy content */}
                  <div className="p-6 sm:p-8 space-y-6">
                    <div className="space-y-1">
                      <h3 className="text-xl font-extrabold text-body leading-snug">
                        {titleCopy}
                      </h3>
                      <p className="text-xs font-bold text-muted">{typeCopy}</p>
                    </div>

                    {/* Specs & Fin model */}
                    <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-soft border border-line text-xs font-mono">
                      <div>
                        <div className="text-[10px] text-muted font-bold uppercase">{tr('cases_invest_label')}</div>
                        <div className="text-base font-extrabold text-body">${cs.investmentUsd.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-muted font-bold uppercase">{tr('cases_payback_label')}</div>
                        <div className="text-base font-extrabold text-emerald">{paybackCopy}</div>
                      </div>
                      <div className="col-span-2 pt-2 border-t border-line text-[11px] text-muted leading-normal">
                        <strong className="text-muted">{tr('cases_equip_label')}</strong> {cs.equipment}
                      </div>
                    </div>

                    {/* Quote */}
                    <div className="flex items-start gap-3 pt-1">
                      <Quote className="w-5 h-5 text-[rgba(24,165,88,.4)] shrink-0 mt-1" />
                      <p className="text-xs italic text-muted leading-relaxed">
                        {quoteCopy}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 sm:p-8 pt-0">
                  <button
                    onClick={() => openLeadModal(cs.power, cs.title.uk, `Case: ${cs.title.uk}`)}
                    className="w-full inline-flex items-center justify-center gap-2.5 bg-soft hover:bg-emerald text-body hover:text-white font-extrabold text-xs uppercase tracking-wide py-3.5 rounded-full border border-line hover:border-emerald transition-all"
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
