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
    <section id="prices" className="ds-section bg-soft border-b border-line scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 space-y-[64px]">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="ds-badge px-3.5 py-1.5 text-xs bg-[rgba(24,165,88,.1)] text-emerald-deep border border-[rgba(24,165,88,.2)]">
            {tr('prices_badge')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-body">
            {tr('b6_title')}
          </h2>
          <p className="text-sm sm:text-base text-muted font-medium">
            {tr('b6_sub')}
          </p>

          {/* Tabs switch */}
          <div className="pt-4 flex justify-center">
            <div className="inline-flex p-1.5 rounded-full bg-white border border-line shadow-inner">
              <button
                onClick={() => setActiveTab('packages')}
                className={`px-6 py-3 rounded-full text-xs font-extrabold tracking-wide uppercase transition-all ${
                  activeTab === 'packages'
                    ? 'bg-emerald text-white shadow-md shadow-[rgba(24,165,88,.2)]'
                    : 'text-muted hover:text-body'
                }`}
              >
                {tr('tab_packages')}
              </button>
              <button
                onClick={() => setActiveTab('credits')}
                className={`px-6 py-3 rounded-full text-xs font-extrabold tracking-wide uppercase transition-all flex items-center gap-1.5 ${
                  activeTab === 'credits'
                    ? 'bg-emerald text-white shadow-md shadow-[rgba(24,165,88,.2)]'
                    : 'text-muted hover:text-body'
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
                    className={`bg-white rounded-[28px] border border-line p-[28px] flex flex-col justify-between relative shadow-[0_4px_20px_rgba(26,46,35,.05)] hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(255,199,66,.08)] transition-all duration-300 ${
                      pkg.badgeType === 'popular'
                        ? '!border-[rgba(24,165,88,.6)] shadow-[0_20px_60px_rgba(24,165,88,.15)] scale-[1.02]'
                        : pkg.badgeType === 'bestseller'
                        ? '!border-[rgba(255,199,66,.6)] shadow-[0_20px_60px_rgba(255,199,66,.15)] scale-[1.02]'
                        : ''
                    }`}
                  >
                    {pkg.badgeType === 'popular' && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-emerald text-ink font-black text-[10px] uppercase tracking-wider shadow-lg">
                        {tr('prices_popular_badge')}
                      </div>
                    )}
                    {pkg.badgeType === 'bestseller' && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-sun text-ink font-black text-[10px] uppercase tracking-wider shadow-lg">
                        {tr('prices_bestseller_badge')}
                      </div>
                    )}

                    <div className="space-y-5">
                      <div className="space-y-1">
                        <span className="text-xs font-mono font-bold text-emerald">{pkg.kw} {tr('prices_kw_h').replace('·год', '').replace('·ч', '').replace('kWh', 'kW')} {tr('form_submit').includes('Розрахунок') || tr('form_submit').includes('смету') ? (lang === 'en' ? 'Turnkey' : 'Під ключ') : 'Turnkey'}</span>
                        <h3 className="text-2xl font-extrabold text-body">{nameCopy}</h3>
                        <p className="text-xs text-muted font-medium">{subCopy}</p>
                      </div>

                      {/* Price box */}
                      <div className="p-4 rounded-2xl bg-soft border border-line flex items-baseline justify-between">
                        <div>
                          <div className="text-[10px] text-muted font-bold uppercase">{tr('prices_contract_price')}</div>
                          <div className="text-3xl font-black text-body font-mono">${pkg.priceUsd.toLocaleString()}</div>
                          <div className="text-[10px] text-muted font-mono">≈ {pkg.priceUah.toLocaleString()} {lang === 'en' ? 'UAH' : 'грн'}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] text-muted font-bold uppercase">{tr('prices_payback_label')}</div>
                          <div className="text-xl font-extrabold text-emerald font-mono">{paybackCopy}</div>
                        </div>
                      </div>

                      {/* Specs */}
                      <ul className="space-y-2.5 text-xs text-body font-medium">
                        <li className="flex items-start gap-2">
                          <Zap className="w-4 h-4 text-emerald shrink-0 mt-0.5" />
                          <span><strong>{tr('prices_inverter')}</strong> {pkg.inverter}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Zap className="w-4 h-4 text-emerald shrink-0 mt-0.5" />
                          <span><strong>{tr('prices_panels')}</strong> {pkg.panels}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Zap className="w-4 h-4 text-emerald shrink-0 mt-0.5" />
                          <span><strong>{tr('prices_battery')}</strong> {pkg.battery}</span>
                        </li>
                        <li className="flex items-start gap-2 text-[#B8860B] font-bold font-mono pt-1">
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
                            ? 'ds-btn-sun !bg-[var(--grad-sun)] !shadow-[0_12px_30px_rgba(255,199,66,.35)]'
                            : '!bg-none !bg-soft hover:!bg-emerald !text-body hover:!text-white !shadow-none hover:!shadow-none !font-bold'
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
            <div className="bg-white rounded-[28px] border border-line p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 shadow-[0_4px_20px_rgba(26,46,35,.05)]">
              {/* Included */}
              <div className="lg:col-span-7 space-y-4">
                <h4 className="text-base font-extrabold text-body flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald" />
                  <span>{tr('prices_included_title')}</span>
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-body">
                  {includedItems.map((inc, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald shrink-0 mt-0.5" />
                      <span className="leading-snug">{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Excluded & Payment terms */}
              <div className="lg:col-span-5 space-y-6 border-t lg:border-t-0 lg:border-l border-line pt-6 lg:pt-0 lg:pl-8 flex flex-col justify-between">
                <div className="space-y-3">
                  <h4 className="text-base font-extrabold text-body flex items-center gap-2">
                    <X className="w-4 h-4 text-red-400" />
                    <span>{tr('prices_excluded_title')}</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-muted">
                    {excludedItems.map((exc, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-red-400 font-bold">·</span>
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-soft border border-[rgba(255,199,66,.2)] space-y-1.5">
                  <div className="text-xs font-extrabold text-[#B8860B] flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4" />
                    <span>{tr('prices_payment_title')}</span>
                  </div>
                  <p className="text-xs text-body font-mono font-semibold">
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
            <div className="overflow-x-auto rounded-[28px] border border-line bg-white shadow-[0_4px_20px_rgba(26,46,35,.05)]">
              <table className="w-full text-left text-xs">
                <thead className="bg-soft text-muted uppercase tracking-wider font-extrabold border-b border-line">
                  <tr>
                    <th className="p-5">{tr('prices_credit_bank')}</th>
                    <th className="p-5">{tr('prices_credit_rate')}</th>
                    <th className="p-5">{tr('prices_credit_term')}</th>
                    <th className="p-5">{tr('prices_credit_downpay')}</th>
                    <th className="p-5">{tr('prices_credit_max')}</th>
                    <th className="p-5 text-right">{tr('prices_credit_action')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line font-medium text-body">
                  {creditPrograms.map((cp, idx) => (
                    <tr key={idx} className="hover:bg-soft transition-colors">
                      <td className="p-5 font-bold text-body text-sm">{cp.bank}<div className="text-[10px] text-muted font-normal">{cp.target}</div></td>
                      <td className="p-5 font-mono font-black text-emerald text-sm">{cp.rate}</td>
                      <td className="p-5 font-mono">{cp.term}</td>
                      <td className="p-5 font-mono font-bold text-[#B8860B]">{cp.downpay}</td>
                      <td className="p-5 font-mono font-bold">{cp.maxSum}</td>
                      <td className="p-5 text-right">
                        <button
                          onClick={() => openLeadModal('10 kW', `Credit: ${cp.bank}`, `Credit Table: ${cp.bank}`)}
                          className="ds-btn-primary !px-4 !py-2 !text-xs uppercase"
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
