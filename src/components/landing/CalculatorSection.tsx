import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calculator, Sun, TrendingUp, DollarSign, Clock, ArrowRight, Zap } from 'lucide-react';

export const CalculatorSection: React.FC = () => {
  const { tr, openLeadModal } = useApp();

  const [kw, setKw] = useState<number>(10);
  const [type, setType] = useState<'hybrid' | 'ongrid' | 'business'>('hybrid');
  const [region, setRegion] = useState<number>(1.02);

  const baseYield = Math.round(kw * 1100 * region);
  const approxCostUsd = type === 'hybrid' ? kw * 620 : type === 'business' ? kw * 380 : kw * 550;

  const annualIncomeEur = Math.round(baseYield * 0.132 * 0.805);
  const annualIncomeUsd = Math.round(annualIncomeEur * 1.08);
  const annualSavingsUah = Math.round(annualIncomeUsd * 42);

  const paybackYearsRaw = approxCostUsd / annualIncomeUsd;
  const paybackYears = Math.floor(paybackYearsRaw);
  const paybackMonths = Math.round((paybackYearsRaw - paybackYears) * 12);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKw(Number(e.target.value));
  };

  return (
    <section id="calculator-section" className="ds-section bg-[#F8FAF9] bg-grid-pattern border-b border-[#E2ECE6] scroll-mt-20">
      <div className="max-w-6xl mx-auto px-5 md:px-8 space-y-[64px]">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="ds-badge px-3.5 py-1.5 text-xs bg-[rgba(251,191,36,.12)] text-[#B8860B] border border-[rgba(251,191,36,.2)]">
            ОНЛАЙН РОЗРАХУНОК
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#1A2E23]">
            {tr('b11_title')}
          </h2>
          <p className="text-sm sm:text-base text-[#5A6E62] font-medium">
            {tr('b11_sub')}
          </p>
        </div>

        {/* Calculator Widget — Glass Panel */}
        <div className="glass-panel-light !rounded-[32px] p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Controls Col (7) */}
          <div className="lg:col-span-7 space-y-8 flex flex-col justify-center">

            {/* Slider Power */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#5A6E62] uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-[#22C55E]" />
                  <span>{tr('calc_label_power')}</span>
                </label>
                <span className="text-2xl font-black font-mono text-[#22C55E] bg-[rgba(34,197,94,.1)] px-3 py-1 rounded-xl border border-[rgba(34,197,94,.2)]">
                  {kw} кВт
                </span>
              </div>
              <input
                type="range"
                min="3"
                max="100"
                step="1"
                value={kw}
                onChange={handleSliderChange}
                className="w-full h-3 bg-[#E2ECE6] rounded-lg appearance-none cursor-pointer accent-[#22C55E]"
              />
              <div className="flex justify-between text-[11px] text-[#5A6E62] font-mono font-bold">
                <span>3 кВт</span>
                <span>10 кВт (Дім)</span>
                <span>30 кВт</span>
                <span>50 кВт</span>
                <span>100 кВт</span>
              </div>
            </div>

            {/* Select Type */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#5A6E62] uppercase tracking-wider">
                {tr('calc_label_type')}
              </label>
              <div className="grid grid-cols-1 gap-2.5">
                {[
                  { key: 'hybrid', label: tr('calc_type_hybrid') },
                  { key: 'ongrid', label: tr('calc_type_ongrid') },
                  { key: 'business', label: tr('calc_type_business') }
                ].map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setType(t.key as any)}
                    className={`p-3.5 rounded-2xl text-left text-xs font-bold transition-all border ${
                      type === t.key
                        ? 'bg-[rgba(34,197,94,.12)] text-[#1A2E23] border-[#22C55E]'
                        : 'bg-white text-[#5A6E62] border-[#E2ECE6] hover:text-[#1A2E23] hover:border-[#22C55E]/50'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Select Region */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#5A6E62] uppercase tracking-wider">
                {tr('calc_label_region')}
              </label>
              <select
                value={region}
                onChange={e => setRegion(Number(e.target.value))}
                className="w-full px-4 py-3 text-xs font-bold text-[#1A2E23] rounded-[18px] border border-[#E2ECE6] bg-white focus:outline-none focus:border-[#22C55E] transition-colors"
              >
                <option value={1.05}>{tr('calc_region_south')} (Інсоляція +5%)</option>
                <option value={1.02}>{tr('calc_region_kyiv')} (Стандарт)</option>
                <option value={1.0}>{tr('calc_region_west')}</option>
                <option value={1.03}>{tr('calc_region_east')}</option>
              </select>
            </div>

          </div>

          {/* Results Col (5) — Glass Panel */}
          <div className="lg:col-span-5 glass-panel-light !rounded-[32px] p-7 flex flex-col justify-between space-y-6 relative">
            <div className="space-y-6">
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#5A6E62] flex items-center gap-2 border-b border-[#E2ECE6] pb-3">
                <Calculator className="w-4 h-4 text-[#22C55E]" />
                <span>РЕЗУЛЬТАТИ РОЗРАХУНКУ</span>
              </h4>

              {/* KPI 1 Yield */}
              <div className="space-y-1">
                <div className="text-[11px] font-bold text-[#5A6E62]">{tr('calc_res_gen')}</div>
                <div className="text-2xl font-black font-mono text-[#1A2E23]">≈ {baseYield.toLocaleString()} <span className="text-sm font-normal text-[#5A6E62]">кВт·год/рік</span></div>
              </div>

              {/* KPI 2 Savings */}
              <div className="space-y-1">
                <div className="text-[11px] font-bold text-[#5A6E62]">{tr('calc_res_save_uah')}</div>
                <div className="text-2xl font-black font-mono text-[#22C55E]">≈ {annualSavingsUah.toLocaleString()} <span className="text-sm font-normal text-[#5A6E62]">грн/рік</span></div>
                <div className="text-[10px] text-[#5A6E62] font-mono">(≈ ${annualIncomeUsd.toLocaleString()} / ≈ €{annualIncomeEur.toLocaleString()})</div>
              </div>

              {/* KPI 3 Approx cost */}
              <div className="space-y-1 pt-2 border-t border-[#E2ECE6]">
                <div className="text-[11px] font-bold text-[#5A6E62]">{tr('calc_res_cost')}</div>
                <div className="text-2xl font-black font-mono text-[#1A2E23]">≈ ${approxCostUsd.toLocaleString()}</div>
              </div>

              {/* KPI 4 Payback — Yellow accent */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[rgba(34,197,94,.12)] to-[rgba(251,191,36,.11)] border border-[rgba(34,197,94,.25)] space-y-1 text-center">
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#22C55E]">{tr('calc_res_payback')}</div>
                <div className="text-3xl font-black font-mono text-[#1A2E23]">
                  {paybackYears} {tr('calc_years')} {paybackMonths > 0 ? `${paybackMonths} ${tr('calc_months')}` : ''}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div>
              <button
                onClick={() => openLeadModal(`${kw} кВт`, type === 'hybrid' ? 'Гібридна' : 'Мережева', `Калькулятор: ${kw} кВт`)}
                className="ds-btn-primary w-full !py-4 !text-xs uppercase"
              >
                <span>Замовити кошторис на {kw} кВт</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
