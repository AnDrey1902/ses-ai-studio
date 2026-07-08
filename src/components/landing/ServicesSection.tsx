import React from 'react';
import { useApp } from '../../context/AppContext';
import { Zap, Sun, Leaf, BatteryCharging, Wrench, FileSearch, ArrowRight } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const { tr, openLeadModal } = useApp();

  return (
    <section id="services" className="ds-section bg-[#F8FAF9] border-b border-[#E2ECE6] scroll-mt-20">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 space-y-[48px]">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="ds-badge px-3.5 py-1.5 text-xs bg-[rgba(34,197,94,.1)] text-[#15803D] border border-[rgba(34,197,94,.2)]">
            {tr('svc_badge')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#1A2E23]">
            {tr('svc_heading')}
          </h2>
          <p className="text-sm sm:text-base text-[#5A6E62] font-medium leading-relaxed">
            {tr('b3_sub_full')}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

          {/* ===== РЕЗЕРВНЕ ЖИВЛЕННЯ — large left card spanning 2 rows ===== */}
          <div className="lg:col-span-2 lg:row-span-2 group bg-gradient-to-br from-[rgba(34,197,94,.03)] to-[rgba(251,191,36,.07)] rounded-[28px] border border-[#E2ECE6] p-[32px] flex flex-col justify-between shadow-[0_4px_20px_rgba(26,46,35,.05)] relative hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(34,197,94,.1)] transition-all duration-300">
            {/* Badge */}
            <div className="absolute top-5 right-6 px-3 py-1 rounded-full bg-[#FBBF24] text-[#07140F] font-black text-[10px] uppercase tracking-wider shadow-md">
              {tr('svc_popular_badge')}
            </div>

            <div className="space-y-5">
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-[#22C55E] flex items-center justify-center shadow-[0_4px_14px_rgba(34,197,94,.3)] group-hover:scale-110 group-hover:shadow-[0_6px_20px_rgba(34,197,94,.4)] transition-all duration-300">
                <Zap className="w-7 h-7 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1A2E23] tracking-tight leading-snug">
                {tr('svc_reserve_title')}
              </h3>

              {/* Description */}
              <p className="text-sm text-[#5A6E62] leading-relaxed">
                {tr('svc_reserve_desc')}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-[#E2ECE6]">
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-[#22C55E]">&lt; 10 мс</div>
                <div className="text-[11px] text-[#5A6E62] font-medium mt-0.5">{tr('svc_reserve_stat1')}</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-[#22C55E]">5–20 кВт</div>
                <div className="text-[11px] text-[#5A6E62] font-medium mt-0.5">{tr('svc_reserve_stat2')}</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-[#22C55E]">6+ год</div>
                <div className="text-[11px] text-[#5A6E62] font-medium mt-0.5">{tr('svc_reserve_stat3')}</div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8">
              <button
                onClick={() => openLeadModal('10 kW', tr('svc_reserve_title'), `${tr('nav_services')}: ${tr('svc_reserve_title')}`)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#22C55E] text-[#22C55E] font-extrabold text-sm hover:bg-[#22C55E] hover:text-white transition-all duration-300"
              >
                <span>{tr('svc_reserve_btn')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ===== СОНЯЧНІ ЕЛЕКТРОСТАНЦІЇ — top right ===== */}
          <div className="lg:col-span-3 group bg-gradient-to-bl from-[rgba(251,191,36,.08)] to-[rgba(34,197,94,.03)] rounded-[28px] border border-[#E2ECE6] p-[28px] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-[0_4px_20px_rgba(26,46,35,.05)] hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(251,191,36,.18)] transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FBBF24] flex items-center justify-center shrink-0 shadow-[0_4px_14px_rgba(251,191,36,.3)] group-hover:scale-110 group-hover:shadow-[0_6px_20px_rgba(251,191,36,.4)] transition-all duration-300">
                <Sun className="w-6 h-6 text-white" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-extrabold text-[#1A2E23] tracking-tight">
                  {tr('svc_ses_title')}
                </h3>
                <p className="text-sm text-[#5A6E62] leading-relaxed max-w-md">
                  {tr('svc_ses_desc')}
                </p>
              </div>
            </div>
            <button
              onClick={() => openLeadModal('10 kW', tr('svc_ses_title'), `${tr('nav_services')}: ${tr('svc_ses_title')}`)}
              className="shrink-0 inline-flex items-center gap-1.5 text-sm font-extrabold text-[#22C55E] hover:text-[#16A34A] transition-colors"
            >
              <span>{tr('svc_ses_cta')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* ===== ЗЕЛЕНИЙ ТАРИФ + ЗАРЯДНІ СТАНЦІЇ EV — middle right ===== */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-5">

            {/* Зелений тариф */}
            <div className="group bg-gradient-to-br from-[rgba(34,197,94,.03)] to-[rgba(251,191,36,.10)] rounded-[28px] border border-[#E2ECE6] p-[28px] flex flex-col justify-between shadow-[0_4px_20px_rgba(26,46,35,.05)] hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(34,197,94,.1)] transition-all duration-300">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#22C55E] flex items-center justify-center shadow-[0_4px_14px_rgba(34,197,94,.3)] group-hover:scale-110 group-hover:shadow-[0_6px_20px_rgba(34,197,94,.4)] transition-all duration-300">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-extrabold text-[#1A2E23] tracking-tight">
                  {tr('svc_green_title')}
                </h3>
                <p className="text-sm text-[#5A6E62] leading-relaxed">
                  {tr('svc_green_desc')}
                </p>
              </div>
              <button
                onClick={() => openLeadModal('10 kW', tr('svc_green_title'), `${tr('nav_services')}: ${tr('svc_green_title')}`)}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-extrabold text-[#22C55E] hover:text-[#16A34A] transition-colors"
              >
                <span>{tr('svc_green_cta')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Зарядні станції EV */}
            <div className="group bg-gradient-to-bl from-white to-[rgba(251,191,36,.13)] rounded-[28px] border border-[#E2ECE6] p-[28px] flex flex-col justify-between shadow-[0_4px_20px_rgba(26,46,35,.05)] hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(251,191,36,.18)] transition-all duration-300">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FBBF24] flex items-center justify-center shadow-[0_4px_14px_rgba(251,191,36,.3)] group-hover:scale-110 group-hover:shadow-[0_6px_20px_rgba(251,191,36,.4)] transition-all duration-300">
                  <BatteryCharging className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-extrabold text-[#1A2E23] tracking-tight">
                  {tr('svc_ev_title')}
                </h3>
                <p className="text-sm text-[#5A6E62] leading-relaxed">
                  {tr('svc_ev_desc')}
                </p>
              </div>
              <button
                onClick={() => openLeadModal('10 kW', tr('svc_ev_title'), `${tr('nav_services')}: ${tr('svc_ev_title')}`)}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-extrabold text-[#22C55E] hover:text-[#16A34A] transition-colors"
              >
                <span>{tr('svc_ev_cta')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* ===== СЕРВІС + АУДИТ — bottom row ===== */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-5">

            {/* Сервіс та обслуговування */}
            <div className="group bg-gradient-to-br from-white to-[rgba(251,191,36,.12)] rounded-[28px] border border-[#E2ECE6] p-[28px] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-[0_4px_20px_rgba(26,46,35,.05)] hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(251,191,36,.18)] transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FBBF24] flex items-center justify-center shrink-0 shadow-[0_4px_14px_rgba(251,191,36,.3)] group-hover:scale-110 group-hover:shadow-[0_6px_20px_rgba(251,191,36,.4)] transition-all duration-300">
                  <Wrench className="w-6 h-6 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-extrabold text-[#1A2E23] tracking-tight">
                    {tr('svc_service_title')}
                  </h3>
                  <p className="text-sm text-[#5A6E62] leading-relaxed">
                    {tr('svc_service_desc')}
                  </p>
                </div>
              </div>
              <button
                onClick={() => openLeadModal('10 kW', tr('svc_service_title'), `${tr('nav_services')}: ${tr('svc_service_title')}`)}
                className="shrink-0 inline-flex items-center gap-1.5 text-sm font-extrabold text-[#22C55E] hover:text-[#16A34A] transition-colors"
              >
                <span>{tr('svc_service_cta')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Проектування та аудит */}
            <div className="group bg-gradient-to-bl from-white to-[rgba(251,191,36,.12)] rounded-[28px] border border-[#E2ECE6] p-[28px] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-[0_4px_20px_rgba(26,46,35,.05)] hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(251,191,36,.18)] transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FBBF24] flex items-center justify-center shrink-0 shadow-[0_4px_14px_rgba(251,191,36,.3)] group-hover:scale-110 group-hover:shadow-[0_6px_20px_rgba(251,191,36,.4)] transition-all duration-300">
                  <FileSearch className="w-6 h-6 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-extrabold text-[#1A2E23] tracking-tight">
                    {tr('svc_audit_title')}
                  </h3>
                  <p className="text-sm text-[#5A6E62] leading-relaxed">
                    {tr('svc_audit_desc')}
                  </p>
                </div>
              </div>
              <button
                onClick={() => openLeadModal('10 kW', tr('svc_audit_title'), `${tr('nav_services')}: ${tr('svc_audit_title')}`)}
                className="shrink-0 inline-flex items-center gap-1.5 text-sm font-extrabold text-[#22C55E] hover:text-[#16A34A] transition-colors"
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
