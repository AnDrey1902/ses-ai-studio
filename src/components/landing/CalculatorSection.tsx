import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calculator, Sun, TrendingUp, DollarSign, Clock, ArrowRight, Zap } from 'lucide-react';

export const CalculatorSection: React.FC = () => {
  const { tr, openLeadModal } = useApp();

  const [kw, setKw] = useState<number>(10);
  const [type, setType] = useState<'hybrid' | 'ongrid' | 'business'>('hybrid');
  const [region, setRegion] = useState<number>(1.02); // Insolation multiplier

  // Formula as per spec section 7.5
  // Yield = kW * 1100 * insolation multiplier
  // Tariff Green / Savings average = 0.132 EUR or 5.75 UAH/kWh equivalent TCO
  // Net revenue Netto = yield * 0.132 EUR * 0.805 (taxes netto) or direct TCO savings
  // Payback = Cost / annual net income
  const baseYield = Math.round(kw * 1100 * region);
  const approxCostUsd = type === 'hybrid' ? kw * 620 : type === 'business' ? kw * 380 : kw * 550;
  
  const annualIncomeEur = Math.round(baseYield * 0.132 * 0.805);
  const annualIncomeUsd = Math.round(annualIncomeEur * 1.08); // EUR to USD rate
  const annualSavingsUah = Math.round(annualIncomeUsd * 42); // USD to UAH

  const paybackYearsRaw = approxCostUsd / annualIncomeUsd;
  const paybackYears = Math.floor(paybackYearsRaw);
  const paybackMonths = Math.round((paybackYearsRaw - paybackYears) * 12);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKw(Number(e.target.value));
  };

  return (
    <section id="calculator-section" className="py-20 md:py-28 bg-slate-950 bg-grid-pattern border-b border-slate-900 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            ОНЛАЙН РОЗРАХУНОК
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            {tr('b11_title')}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-medium">
            {tr('b11_sub')}
          </p>
        </div>

        {/* Calculator Widget */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Controls Col (7) */}
          <div className="lg:col-span-7 space-y-8 flex flex-col justify-center">
            
            {/* Slider Power */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-green-400" />
                  <span>{tr('calc_label_power')}</span>
                </label>
                <span className="text-2xl font-black font-mono text-[#22C55E] bg-green-500/10 px-3 py-1 rounded-xl border border-green-500/20">
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
                className="w-full h-3 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-[#22C55E]"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono font-bold">
                <span>3 кВт</span>
                <span>10 кВт (Дім)</span>
                <span>30 кВт</span>
                <span>50 кВт</span>
                <span>100 кВт</span>
              </div>
            </div>

            {/* Select Type */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
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
                        ? 'bg-green-500/15 text-white border-green-500'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Select Region */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                {tr('calc_label_region')}
              </label>
              <select
                value={region}
                onChange={e => setRegion(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs font-bold text-slate-200 focus:outline-none focus:border-green-500"
              >
                <option value={1.05}>{tr('calc_region_south')} (Інсоляція +5%)</option>
                <option value={1.02}>{tr('calc_region_kyiv')} (Стандарт)</option>
                <option value={1.0}>{tr('calc_region_west')}</option>
                <option value={1.03}>{tr('calc_region_east')}</option>
              </select>
            </div>

          </div>

          {/* Results Col (5) */}
          <div className="lg:col-span-5 bg-slate-950 rounded-3xl p-7 border border-slate-800 flex flex-col justify-between space-y-6 shadow-inner relative">
            <div className="space-y-6">
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 flex items-center gap-2 border-b border-slate-900 pb-3">
                <Calculator className="w-4 h-4 text-green-400" />
                <span>РЕЗУЛЬТАТИ РОЗРАХУНКУ</span>
              </h4>

              {/* KPI 1 Yield */}
              <div className="space-y-1">
                <div className="text-[11px] font-bold text-slate-400">{tr('calc_res_gen')}</div>
                <div className="text-2xl font-black font-mono text-white">≈ {baseYield.toLocaleString()} <span className="text-sm font-normal text-slate-500">кВт·год/рік</span></div>
              </div>

              {/* KPI 2 Savings */}
              <div className="space-y-1">
                <div className="text-[11px] font-bold text-slate-400">{tr('calc_res_save_uah')}</div>
                <div className="text-2xl font-black font-mono text-green-400">≈ {annualSavingsUah.toLocaleString()} <span className="text-sm font-normal text-slate-500">грн/рік</span></div>
                <div className="text-[10px] text-slate-500 font-mono">(≈ ${annualIncomeUsd.toLocaleString()} / ≈ €{annualIncomeEur.toLocaleString()})</div>
              </div>

              {/* KPI 3 Approx cost */}
              <div className="space-y-1 pt-2 border-t border-slate-900">
                <div className="text-[11px] font-bold text-slate-400">{tr('calc_res_cost')}</div>
                <div className="text-2xl font-black font-mono text-white">≈ ${approxCostUsd.toLocaleString()}</div>
              </div>

              {/* KPI 4 Payback */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-green-500/20 to-amber-500/10 border border-green-500/30 space-y-1 text-center">
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-green-300">{tr('calc_res_payback')}</div>
                <div className="text-3xl font-black font-mono text-white">
                  {paybackYears} {tr('calc_years')} {paybackMonths > 0 ? `${paybackMonths} ${tr('calc_months')}` : ''}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div>
              <button
                onClick={() => openLeadModal(`${kw} кВт`, type === 'hybrid' ? 'Гібридна' : 'Мережева', `Калькулятор: ${kw} кВт`)}
                className="w-full py-4 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-slate-950 font-black text-xs tracking-wider uppercase transition-transform hover:scale-105 shadow-xl shadow-green-500/20 flex items-center justify-center gap-2"
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
