import React from 'react';
import { useApp } from '../../context/AppContext';
import { Zap, Sun, Leaf, BatteryCharging, Wrench, FileSearch, ArrowRight } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const { tr, openLeadModal } = useApp();

  return (
    <section id="services" className="ds-section bg-soft border-b border-line scroll-mt-20">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 space-y-8">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="ds-badge px-3.5 py-1.5 text-xs bg-[rgba(24,165,88,.1)] text-emerald-deep border border-[rgba(24,165,88,.2)]">
            {tr('svc_badge')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-body">
            {tr('svc_heading')}
          </h2>
          <p className="text-sm sm:text-base text-muted font-medium leading-relaxed">
            {tr('b3_sub_full')}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

          {/* ===== РЕЗЕРВНЕ ЖИВЛЕННЯ — large left card spanning 2 rows ===== */}
          <div className="lg:col-span-2 lg:row-span-2 group bg-gradient-to-br from-[rgba(24,165,88,.10)] to-white rounded-[28px] border border-[rgba(24,165,88,.3)] p-[32px] flex flex-col justify-between shadow-[0_4px_20px_rgba(7,20,15,.05)] relative hover:-translate-y-1 hover:border-[rgba(24,165,88,.55)] hover:shadow-[0_20px_60px_rgba(24,165,88,.14)] transition-all duration-300">
            {/* Badge */}
            <div className="absolute top-5 right-6 px-3 py-1 rounded-full bg-sun text-ink font-black text-[10px] uppercase tracking-wider shadow-md">
              {tr('svc_popular_badge')}
            </div>

            <div className="space-y-5">
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-emerald flex items-center justify-center shadow-[0_4px_14px_rgba(24,165,88,.3)] group-hover:scale-110 group-hover:shadow-[0_6px_20px_rgba(24,165,88,.4)] transition-all duration-300">
                <Zap className="w-7 h-7 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-body tracking-tight leading-snug">
                {tr('svc_reserve_title')}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted leading-relaxed">
                {tr('svc_reserve_desc')}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-line">
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-emerald">&lt; 10 мс</div>
                <div className="text-[11px] text-muted font-medium mt-0.5">{tr('svc_reserve_stat1')}</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-emerald">5–20 кВт</div>
                <div className="text-[11px] text-muted font-medium mt-0.5">{tr('svc_reserve_stat2')}</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-emerald">6+ год</div>
                <div className="text-[11px] text-muted font-medium mt-0.5">{tr('svc_reserve_stat3')}</div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8">
              <button
                onClick={() => openLeadModal('10 kW', tr('svc_reserve_title'), `${tr('nav_services')}: ${tr('svc_reserve_title')}`)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-emerald text-emerald font-extrabold text-sm hover:bg-emerald hover:text-white transition-all duration-300"
              >
                <span>{tr('svc_reserve_btn')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ===== СОНЯЧНІ ЕЛЕКТРОСТАНЦІЇ — top right ===== */}
          <div className="lg:col-span-3 group bg-gradient-to-bl from-[rgba(255,178,0,.13)] to-white rounded-[28px] border border-[rgba(245,158,11,.28)] p-[28px] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-[0_4px_20px_rgba(7,20,15,.05)] hover:-translate-y-1 hover:border-[rgba(24,165,88,.55)] hover:shadow-[0_20px_60px_rgba(255,199,66,.18)] transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-sun flex items-center justify-center shrink-0 shadow-[0_4px_14px_rgba(255,199,66,.3)] group-hover:scale-110 group-hover:shadow-[0_6px_20px_rgba(255,199,66,.4)] transition-all duration-300">
                <Sun className="w-6 h-6 text-white" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-extrabold text-body tracking-tight">
                  {tr('svc_ses_title')}
                </h3>
                <p className="text-sm text-muted leading-relaxed max-w-md">
                  {tr('svc_ses_desc')}
                </p>
              </div>
            </div>
            <button
              onClick={() => openLeadModal('10 kW', tr('svc_ses_title'), `${tr('nav_services')}: ${tr('svc_ses_title')}`)}
              className="shrink-0 inline-flex items-center gap-1.5 text-sm font-extrabold text-emerald hover:text-emerald-deep transition-colors"
            >
              <span>{tr('svc_ses_cta')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* ===== ЗЕЛЕНИЙ ТАРИФ + ЗАРЯДНІ СТАНЦІЇ EV — middle right ===== */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-5">

            {/* Зелений тариф */}
            <div className="group bg-white rounded-[28px] border border-line p-[28px] flex flex-col justify-between shadow-[0_4px_20px_rgba(7,20,15,.05)] hover:-translate-y-1 hover:border-[rgba(24,165,88,.55)] hover:shadow-[0_20px_60px_rgba(24,165,88,.14)] transition-all duration-300">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald flex items-center justify-center shadow-[0_4px_14px_rgba(24,165,88,.3)] group-hover:scale-110 group-hover:shadow-[0_6px_20px_rgba(24,165,88,.4)] transition-all duration-300">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-extrabold text-body tracking-tight">
                  {tr('svc_green_title')}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {tr('svc_green_desc')}
                </p>
              </div>
              <button
                onClick={() => openLeadModal('10 kW', tr('svc_green_title'), `${tr('nav_services')}: ${tr('svc_green_title')}`)}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-extrabold text-emerald hover:text-emerald-deep transition-colors"
              >
                <span>{tr('svc_green_cta')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Зарядні станції EV */}
            <div className="group bg-white rounded-[28px] border border-line p-[28px] flex flex-col justify-between shadow-[0_4px_20px_rgba(7,20,15,.05)] hover:-translate-y-1 hover:border-[rgba(24,165,88,.55)] hover:shadow-[0_20px_60px_rgba(24,165,88,.14)] transition-all duration-300">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-sun flex items-center justify-center shadow-[0_4px_14px_rgba(255,199,66,.3)] group-hover:scale-110 group-hover:shadow-[0_6px_20px_rgba(255,199,66,.4)] transition-all duration-300">
                  <BatteryCharging className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-extrabold text-body tracking-tight">
                  {tr('svc_ev_title')}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {tr('svc_ev_desc')}
                </p>
              </div>
              <button
                onClick={() => openLeadModal('10 kW', tr('svc_ev_title'), `${tr('nav_services')}: ${tr('svc_ev_title')}`)}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-extrabold text-emerald hover:text-emerald-deep transition-colors"
              >
                <span>{tr('svc_ev_cta')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* ===== СЕРВІС + АУДИТ — bottom row ===== */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-5">

            {/* Сервіс та обслуговування */}
            <div className="group bg-white rounded-[28px] border border-line p-[28px] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-[0_4px_20px_rgba(7,20,15,.05)] hover:-translate-y-1 hover:border-[rgba(24,165,88,.55)] hover:shadow-[0_20px_60px_rgba(24,165,88,.14)] transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-sun flex items-center justify-center shrink-0 shadow-[0_4px_14px_rgba(255,199,66,.3)] group-hover:scale-110 group-hover:shadow-[0_6px_20px_rgba(255,199,66,.4)] transition-all duration-300">
                  <Wrench className="w-6 h-6 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-extrabold text-body tracking-tight">
                    {tr('svc_service_title')}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {tr('svc_service_desc')}
                  </p>
                </div>
              </div>
              <button
                onClick={() => openLeadModal('10 kW', tr('svc_service_title'), `${tr('nav_services')}: ${tr('svc_service_title')}`)}
                className="shrink-0 inline-flex items-center gap-1.5 text-sm font-extrabold text-emerald hover:text-emerald-deep transition-colors"
              >
                <span>{tr('svc_service_cta')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Проектування та аудит */}
            <div className="group bg-white rounded-[28px] border border-line p-[28px] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-[0_4px_20px_rgba(7,20,15,.05)] hover:-translate-y-1 hover:border-[rgba(24,165,88,.55)] hover:shadow-[0_20px_60px_rgba(24,165,88,.14)] transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-sun flex items-center justify-center shrink-0 shadow-[0_4px_14px_rgba(255,199,66,.3)] group-hover:scale-110 group-hover:shadow-[0_6px_20px_rgba(255,199,66,.4)] transition-all duration-300">
                  <FileSearch className="w-6 h-6 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-extrabold text-body tracking-tight">
                    {tr('svc_audit_title')}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {tr('svc_audit_desc')}
                  </p>
                </div>
              </div>
              <button
                onClick={() => openLeadModal('10 kW', tr('svc_audit_title'), `${tr('nav_services')}: ${tr('svc_audit_title')}`)}
                className="shrink-0 inline-flex items-center gap-1.5 text-sm font-extrabold text-emerald hover:text-emerald-deep transition-colors"
              >
                <span>{tr('svc_audit_cta')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
