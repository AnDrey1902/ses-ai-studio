import React from 'react';
import { useApp } from '../../context/AppContext';
import { SES_SERVICES } from '../../data/mockData';
import { Shield, Zap, TrendingUp, Sun, ArrowRight, CheckCircle } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const { lang, tr, openLeadModal } = useApp();

  return (
    <section id="services" className="py-20 md:py-28 bg-slate-950 border-b border-slate-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-green-500/10 text-green-400 border border-green-500/20">
            {tr('services_badge')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            {tr('b3_title')}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-medium">
            {tr('b3_sub')}
          </p>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SES_SERVICES.map((srv) => {
            const titleCopy = srv.title[lang] || srv.title.uk;
            const targetCopy = srv.target[lang] || srv.target.uk;
            const descCopy = srv.desc[lang] || srv.desc.uk;

            const isHybrid = srv.typeKey === 'hybrid';
            const isBiz = srv.typeKey === 'business';

            return (
              <div
                key={srv.id}
                className={`rounded-3xl p-7 flex flex-col justify-between border transition-all duration-300 relative shadow-xl hover:-translate-y-1 group ${
                  isHybrid
                    ? 'bg-slate-900/90 border-green-500/50 shadow-green-500/10'
                    : isBiz
                    ? 'bg-slate-900/90 border-amber-500/50 shadow-amber-500/10'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Popular Badge */}
                {isHybrid && (
                  <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-[#22C55E] text-slate-950 font-black text-[10px] uppercase tracking-wider shadow-md">
                    {tr('services_popular')}
                  </div>
                )}
                {isBiz && (
                  <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow-md">
                    {tr('services_payback_badge')}
                  </div>
                )}

                <div className="space-y-5">
                  {/* Target Audience Badge */}
                  <div className="text-[11px] font-bold text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl inline-block border border-slate-800">
                    {targetCopy}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-extrabold text-white tracking-tight leading-snug">
                    {titleCopy}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {descCopy}
                  </p>

                  {/* Equipment summary box */}
                  <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 text-[11px] space-y-1.5 font-mono">
                    <div className="text-slate-500 font-bold uppercase text-[9px] tracking-wider">{tr('services_equip_label')}</div>
                    <div className="text-slate-200 font-semibold leading-normal">{srv.equip}</div>
                  </div>

                  {/* Financial KPIs */}
                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase font-bold">{tr('services_price_label')}</div>
                      <div className="text-lg font-extrabold text-white">{srv.price}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase font-bold">{tr('services_payback_label')}</div>
                      <div className="text-lg font-extrabold text-green-400">{srv.payback}</div>
                    </div>
                  </div>
                </div>

                {/* Action CTA */}
                <div className="pt-6">
                  <button
                    onClick={() => openLeadModal(isBiz ? '30 kW' : '10 kW', titleCopy, `${tr('nav_services')}: ${titleCopy}`)}
                    className={`w-full py-3.5 rounded-xl font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 ${
                      isHybrid
                        ? 'bg-[#22C55E] hover:bg-[#16A34A] text-slate-950 shadow-lg shadow-green-500/20'
                        : isBiz
                        ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-lg shadow-amber-500/20'
                        : 'bg-slate-800 hover:bg-slate-700 text-white'
                    }`}
                  >
                    <span>{tr('services_btn')}</span>
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
