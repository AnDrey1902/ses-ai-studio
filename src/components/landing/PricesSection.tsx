import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PACKAGES } from '../../data/mockData';
import { Check, X, ShieldCheck, CreditCard, ArrowRight, Zap, HelpCircle } from 'lucide-react';

export const PricesSection: React.FC = () => {
  const { lang, tr, openLeadModal } = useApp();
  const [activeTab, setActiveTab] = useState<'packages' | 'credits'>('packages');

  const includedItems = [
    tr('prices_inc_1'),
    tr('prices_inc_2'),
    tr('prices_inc_3'),
    tr('prices_inc_4'),
    tr('prices_inc_5'),
    tr('prices_inc_6'),
    tr('prices_inc_7'),
    tr('prices_inc_8'),
    tr('prices_inc_9')
  ];

  const excludedItems = [
    tr('prices_exc_1'),
    tr('prices_exc_2'),
    tr('prices_exc_3')
  ];

  const creditPrograms = [
    { bank: tr('prices_credit_1_bank'), rate: '0% ' + (lang === 'en' ? 'APR' : (lang === 'uk' ? 'річних' : 'годовых')), term: tr('prices_credit_term_val'), downpay: tr('prices_credit_downpay_val'), maxSum: lang === 'en' ? '$12,000' : '480 000 грн', target: tr('prices_credit_1_target') },
    { bank: tr('prices_credit_2_bank'), rate: '0% ' + (lang === 'en' ? 'APR' : (lang === 'uk' ? 'річних' : 'годовых')), term: tr('prices_credit_term_val_short'), downpay: tr('prices_credit_downpay_val_mid'), maxSum: lang === 'en' ? '$8,000' : '300 000 грн', target: tr('prices_credit_2_target') },
    { bank: tr('prices_credit_3_bank'), rate: '0% ' + (lang === 'en' ? 'APR' : (lang === 'uk' ? 'річних' : 'годовых')), term: tr('prices_credit_term_val'), downpay: tr('prices_credit_downpay_val'), maxSum: lang === 'en' ? '$12,500' : '500 000 грн', target: tr('prices_credit_3_target') },
    { bank: tr('prices_credit_4_bank'), rate: (lang === 'en' ? 'from 5% UAH' : (lang === 'uk' ? 'від 5% у гривні' : 'от 5% в гривне')), term: tr('prices_credit_term_val_long'), downpay: tr('prices_credit_downpay_val_high'), maxSum: lang === 'en' ? '$250,000' : '10 000 000 грн', target: tr('prices_credit_4_target') }
  ];

  return (
    <section id="prices" className="ds-section bg-[#07140F] border-b border-[rgba(255,255,255,.08)] scroll-mt-20">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 space-y-[64px]">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="ds-badge px-3.5 py-1.5 text-xs bg-[rgba(34,197,94,.1)] text-[#22C55E] border border-[rgba(34,197,94,.2)]">
            {tr('prices_badge')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            {tr('b6_title')}
          </h2>
          <p className="text-sm sm:text-base text-[#92A299] font-medium">
            {tr('b6_sub')}
          </p>

          {/* Tabs switch */}
          <div className="pt-4 flex justify-center">
            <div className="inline-flex p-1.5 rounded-full bg-[#10261C] border border-[rgba(255,255,255,.08)] shadow-inner">
              <button
                onClick={() => setActiveTab('packages')}
                className={`px-6 py-3 rounded-full text-xs font-extrabold tracking-wide uppercase transition-all ${
                  activeTab === 'packages'
                    ? 'bg-[#22C55E] text-[#07140F] shadow-md shadow-[rgba(34,197,94,.2)]'
                    : 'text-[#92A299] hover:text-white'
                }`}
              >
                {tr('tab_packages')}
              </button>
              <button
                onClick={() => setActiveTab('credits')}
                className={`px-6 py-3 rounded-full text-xs font-extrabold tracking-wide uppercase transition-all flex items-center gap-1.5 ${
                  activeTab === 'credits'
                    ? 'bg-[#22C55E] text-[#07140F] shadow-md shadow-[rgba(34,197,94,.2)]'
                    : 'text-[#92A299] hover:text-white'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{tr('tab_credits')}</span>
              </button>
            </div>
          </div>
        </div>

        {activeTab === 'packages' ? (
          <div className="space-y-[64px] animate-in fade-in duration-300">
            {/* Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PACKAGES.map((pkg) => {
                const nameCopy = pkg.name[lang] || pkg.name.uk;
                const subCopy = pkg.subtitle[lang] || pkg.subtitle.uk;
                const paybackCopy = pkg.payback[lang] || pkg.payback.uk;

                return (
                  <div
                    key={pkg.id}
                    className={`ds-card !p-[28px] flex flex-col justify-between relative ${
                      pkg.badgeType === 'popular'
                        ? '!border-[rgba(34,197,94,.6)] shadow-[0_20px_60px_rgba(34,197,94,.15)] scale-[1.02]'
                        : pkg.badgeType === 'bestseller'
                        ? '!border-[rgba(251,191,36,.6)] shadow-[0_20px_60px_rgba(251,191,36,.15)] scale-[1.02]'
                        : ''
                    }`}
                  >
                    {pkg.badgeType === 'popular' && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#22C55E] text-[#07140F] font-black text-[10px] uppercase tracking-wider shadow-lg">
                        {tr('prices_popular_badge')}
                      </div>
                    )}
                    {pkg.badgeType === 'bestseller' && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#FBBF24] text-[#07140F] font-black text-[10px] uppercase tracking-wider shadow-lg">
                        {tr('prices_bestseller_badge')}
                      </div>
                    )}

                    <div className="space-y-5">
                      <div className="space-y-1">
                        <span className="text-xs font-mono font-bold text-[#22C55E]">{pkg.kw} {tr('prices_kw_h').replace('·год', '').replace('·ч', '').replace('kWh', 'kW')} {tr('form_submit').includes('Розрахунок') || tr('form_submit').includes('смету') ? (lang === 'en' ? 'Turnkey' : 'Під ключ') : 'Turnkey'}</span>
                        <h3 className="text-2xl font-extrabold text-white">{nameCopy}</h3>
                        <p className="text-xs text-[#92A299] font-medium">{subCopy}</p>
                      </div>

                      {/* Price box */}
                      <div className="p-4 rounded-2xl bg-[#07140F] border border-[rgba(255,255,255,.08)] flex items-baseline justify-between">
                        <div>
                          <div className="text-[10px] text-[#647268] font-bold uppercase">{tr('prices_contract_price')}</div>
                          <div className="text-3xl font-black text-white font-mono">${pkg.priceUsd.toLocaleString()}</div>
                          <div className="text-[10px] text-[#92A299] font-mono">≈ {pkg.priceUah.toLocaleString()} {lang === 'en' ? 'UAH' : 'грн'}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] text-[#647268] font-bold uppercase">{tr('prices_payback_label')}</div>
                          <div className="text-xl font-extrabold text-[#22C55E] font-mono">{paybackCopy}</div>
                        </div>
                      </div>

                      {/* Specs */}
                      <ul className="space-y-2.5 text-xs text-[#D5DDD8] font-medium">
                        <li className="flex items-start gap-2">
                          <Zap className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                          <span><strong>{tr('prices_inverter')}</strong> {pkg.inverter}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Zap className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                          <span><strong>{tr('prices_panels')}</strong> {pkg.panels}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Zap className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                          <span><strong>{tr('prices_battery')}</strong> {pkg.battery}</span>
                        </li>
                        <li className="flex items-start gap-2 text-[#FBBF24] font-bold font-mono pt-1">
                          <span>{tr('prices_generation_year')} {pkg.generationYear.toLocaleString()} {tr('prices_kw_h')}</span>
                        </li>
                      </ul>
                    </div>

                    <div className="pt-8">
                      <button
                        onClick={() => openLeadModal(`${pkg.kw} kW`, nameCopy, `Price Table: ${nameCopy}`)}
                        className={`ds-btn-primary w-full !py-4 !text-xs uppercase ${
                          pkg.badgeType === 'popular'
                            ? ''
                            : pkg.badgeType === 'bestseller'
                            ? '!bg-[#FBBF24] hover:!bg-[#F59E0B] !shadow-[0_12px_30px_rgba(251,191,36,.35)]'
                            : '!bg-[rgba(255,255,255,.08)] hover:!bg-[rgba(255,255,255,.12)] !text-white !shadow-none'
                        }`}
                      >
                        {tr('prices_btn')}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* What is Included / Excluded & Payment Terms */}
            <div className="ds-card !p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Included */}
              <div className="lg:col-span-7 space-y-4">
                <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
                  <span>{tr('prices_included_title')}</span>
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#D5DDD8]">
                  {includedItems.map((inc, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                      <span className="leading-snug">{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Excluded & Payment terms */}
              <div className="lg:col-span-5 space-y-6 border-t lg:border-t-0 lg:border-l border-[rgba(255,255,255,.08)] pt-6 lg:pt-0 lg:pl-8 flex flex-col justify-between">
                <div className="space-y-3">
                  <h4 className="text-base font-extrabold text-[#D5DDD8] flex items-center gap-2">
                    <X className="w-4 h-4 text-red-400" />
                    <span>{tr('prices_excluded_title')}</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-[#92A299]">
                    {excludedItems.map((exc, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-red-400 font-bold">·</span>
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-[#07140F] border border-[rgba(251,191,36,.2)] space-y-1.5">
                  <div className="text-xs font-extrabold text-[#FBBF24] flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4" />
                    <span>{tr('prices_payment_title')}</span>
                  </div>
                  <p className="text-xs text-[#D5DDD8] font-mono font-semibold">
                    <strong>50%</strong> — {lang === 'en' ? 'Deposit for equipment in stock' : (lang === 'uk' ? 'Передплата за обладнання на складі' : 'Предоплата за оборудование на складе')}<br/>
                    <strong>40%</strong> — {lang === 'en' ? 'After delivery to site' : (lang === 'uk' ? 'Після доставки на об\'єкт' : 'После доставки на объект')}<br/>
                    <strong>10%</strong> — {lang === 'en' ? 'After commissioning & tests' : (lang === 'uk' ? 'Після пусконаладки та тестів' : 'После пусконаладки и тестов')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-10 animate-in fade-in duration-300">
            {/* Credit Table */}
            <div className="overflow-x-auto rounded-[28px] border border-[rgba(255,255,255,.08)] bg-[#10261C] shadow-2xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#07140F] text-[#D5DDD8] uppercase tracking-wider font-extrabold border-b border-[rgba(255,255,255,.08)]">
                  <tr>
                    <th className="p-5">{tr('prices_credit_bank')}</th>
                    <th className="p-5">{tr('prices_credit_rate')}</th>
                    <th className="p-5">{tr('prices_credit_term')}</th>
                    <th className="p-5">{tr('prices_credit_downpay')}</th>
                    <th className="p-5">{tr('prices_credit_max')}</th>
                    <th className="p-5 text-right">{tr('prices_credit_action')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(255,255,255,.08)] font-medium text-[#D5DDD8]">
                  {creditPrograms.map((cp, idx) => (
                    <tr key={idx} className="hover:bg-[rgba(255,255,255,.03)] transition-colors">
                      <td className="p-5 font-bold text-white text-sm">{cp.bank}<div className="text-[10px] text-[#92A299] font-normal">{cp.target}</div></td>
                      <td className="p-5 font-mono font-black text-[#22C55E] text-sm">{cp.rate}</td>
                      <td className="p-5 font-mono">{cp.term}</td>
                      <td className="p-5 font-mono font-bold text-[#FBBF24]">{cp.downpay}</td>
                      <td className="p-5 font-mono font-bold">{cp.maxSum}</td>
                      <td className="p-5 text-right">
                        <button
                          onClick={() => openLeadModal('10 kW', `Credit: ${cp.bank}`, `Credit Table: ${cp.bank}`)}
                          className="ds-btn-primary !px-4 !py-2 !text-xs uppercase !bg-[rgba(255,255,255,.08)] hover:!bg-[#22C55E] !text-[#D5DDD8] hover:!text-[#07140F] !shadow-none"
                        >
                          {tr('prices_credit_btn')}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => openLeadModal('10 кВт', 'Розрахунок платежу по кредиту', 'Кнопка Платіж по кредиту')}
                className="ds-btn-primary"
              >
                {tr('btn_calc_month')}
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
