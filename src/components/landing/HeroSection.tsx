import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Zap, ShieldCheck, Clock, Award, ArrowRight, CheckCircle2, FileText, Sun, Cloud, CloudRain, Moon } from 'lucide-react';
import heroBg from '../../assets/hero.webp';
import deyeSystem from '../../assets/deye-12kVt.webp';

type WeatherState = 'sunny' | 'cloudy' | 'rainy';
type TimeOfDay = 'morning' | 'day' | 'evening' | 'night';

interface SystemState {
  statusKey: string;
  generation: number;
  battery: number;
  barPercent: number;
  barColor: string;
  weather: WeatherState;
  time: TimeOfDay;
  icon: React.ReactNode;
}

function getTimeOfDay(): TimeOfDay {
  const h = new Date().getHours();
  if (h >= 6 && h < 12) return 'morning';
  if (h >= 12 && h < 18) return 'day';
  if (h >= 18 && h < 22) return 'evening';
  return 'night';
}

function getWeather(): WeatherState {
  const rand = Math.random();
  if (rand < 0.5) return 'sunny';
  if (rand < 0.8) return 'cloudy';
  return 'rainy';
}

function calcState(time: TimeOfDay, weather: WeatherState, prevBattery: number): SystemState {
  const isNight = time === 'night';
  const isEvening = time === 'evening';

  // Base generation by time
  let baseGen = isNight ? 0 : isEvening ? 4.2 : time === 'morning' ? 7.8 : 11.4;

  // Weather modifier
  const weatherMod = weather === 'sunny' ? 1 : weather === 'cloudy' ? 0.6 : 0.3;
  const generation = Math.round(baseGen * weatherMod * 10) / 10;

  // Battery
  let battery: number;
  if (isNight) {
    battery = Math.max(20, prevBattery - Math.round(Math.random() * 3));
  } else if (generation > 8) {
    battery = Math.min(100, prevBattery + Math.round(Math.random() * 2));
  } else if (generation > 4) {
    battery = Math.min(100, prevBattery + 1);
  } else {
    battery = Math.max(30, prevBattery - Math.round(Math.random() * 2));
  }

  // Status
  let statusKey: string;
  let barColor: string;
  let icon: React.ReactNode;

  if (isNight) {
    statusKey = 'hero_status_night';
    barColor = 'from-blue-500 to-indigo-500';
    icon = <Moon className="w-3 h-3" />;
  } else if (generation > 9) {
    statusKey = 'hero_status_peak';
    barColor = 'from-green-500 to-emerald-400';
    icon = <Sun className="w-3 h-3" />;
  } else if (generation > 5) {
    statusKey = 'hero_status_gen';
    barColor = 'from-green-500 to-amber-400';
    icon = <Sun className="w-3 h-3" />;
  } else if (generation > 0) {
    statusKey = 'hero_status_low';
    barColor = 'from-amber-500 to-orange-400';
    icon = weather === 'rainy' ? <CloudRain className="w-3 h-3" /> : <Cloud className="w-3 h-3" />;
  } else {
    statusKey = 'hero_status_reserve';
    barColor = 'from-blue-500 to-slate-500';
    icon = <Moon className="w-3 h-3" />;
  }

  return {
    statusKey,
    generation,
    battery,
    barPercent: battery,
    barColor,
    weather,
    time,
    icon,
  };
}

export const HeroSection: React.FC = () => {
  const { tr, openLeadModal, lang } = useApp();

  const [weather] = useState<WeatherState>(getWeather);
  const [time] = useState<TimeOfDay>(getTimeOfDay);
  const [battery, setBattery] = useState(87);
  const [state, setState] = useState<SystemState>(() => calcState(time, weather, 87));

  useEffect(() => {
    const interval = setInterval(() => {
      setBattery(prev => {
        const next = calcState(time, weather, prev);
        setState(next);
        return next.battery;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [time, weather]);

  const bullets = [
    { icon: FileTextIcon, text: tr('bullet_price') },
    { icon: BatteryIcon, text: tr('bullet_hybrid') },
    { icon: ClockIcon, text: tr('bullet_days') },
    { icon: PercentIcon, text: tr('bullet_loan') }
  ];

  const kwLabel = tr('prices_kw_h').replace('·год', '').replace('·ч', '');

  return (
    <section id="home" className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden border-b border-slate-900">
      
      {/* Background Image */}
      <div className="absolute inset-0 -z-20">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-slate-950/10" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-30" />

      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-green-500/15 to-amber-500/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            
            {/* Urgent Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 shadow-md">
              <span className="flex h-2 w-2 rounded-full bg-[#22C55E] animate-ping" />
              <span className="text-xs font-bold text-slate-200 tracking-wide">
                {tr('hero_urgent_tag')}
              </span>
            </div>

            {/* Main H1 */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              {tr('hero_h1')}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {tr('hero_sub')}
            </p>

            {/* 4 Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-left max-w-2xl mx-auto lg:mx-0">
              {bullets.map((b, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-sm">
                  <div className="w-8 h-8 rounded-xl bg-green-500/15 text-[#22C55E] flex items-center justify-center shrink-0">
                    <b.icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-200 leading-snug">{b.text}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => openLeadModal('10 kW', 'Hybrid SES', tr('lead_source_header'))}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#22C55E] hover:bg-[#16A34A] text-slate-950 font-extrabold text-sm tracking-wide shadow-xl shadow-green-500/30 transition-all hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center gap-2.5"
              >
                <span>{tr('btn_calc_ses')}</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>

              <button
                onClick={() => openLeadModal('8 kW', 'Credit 0%', tr('lead_source_header'))}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-100 border border-slate-700/80 font-bold text-xs tracking-wide transition-all flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-green-400" />
                <span>→ {tr('btn_loan_check')}</span>
              </button>
            </div>

            {/* Microcopy Guarantee */}
            <div className="flex items-center justify-center lg:justify-start gap-2 pt-2 text-xs font-semibold text-slate-400">
              <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
              <span>{tr('micro_trust')}</span>
            </div>

          </div>

          {/* Right Column: Visual Mockup */}
          <div className="lg:col-span-5 relative lg:pt-24">
            <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-slate-900 group">
              <img
                src={deyeSystem}
                alt="Deye 12kW Inverter"
                className="w-full h-[480px] sm:h-[580px] object-contain object-center p-6 transform transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />

              {/* Live Status Overlay Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-slate-700/80 shadow-2xl space-y-2">
                
                {/* Status Row */}
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-300">{tr('hero_live_status')}</span>
                  <span className="text-green-400 font-mono font-extrabold flex items-center gap-1">
                    <span className={`w-2 h-2 rounded-full ${state.time === 'night' ? 'bg-blue-400' : 'bg-green-400'} animate-pulse`} />
                    {state.icon}
                    {tr(state.statusKey)}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden p-0.5">
                  <div
                    className={`bg-gradient-to-r ${state.barColor} h-full rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${state.barPercent}%` }}
                  />
                </div>

                {/* Data Row */}
                <div className="flex justify-between text-[11px] text-slate-400 font-mono font-semibold pt-0.5">
                  <span className="transition-all duration-500">
                    {tr('hero_generation')}{' '}
                    <strong className="text-white">{state.generation} {kwLabel}</strong>
                  </span>
                  <span className="transition-all duration-500">
                    {tr('hero_battery')}{' '}
                    <strong className={state.battery > 50 ? 'text-green-400' : state.battery > 25 ? 'text-amber-400' : 'text-red-400'}>
                      {state.battery}%
                    </strong>
                  </span>
                </div>

                {/* Weather tag */}
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="text-[10px] text-slate-500 font-mono">
                    {state.weather === 'sunny' ? '☀️ Сонячно' : state.weather === 'cloudy' ? '☁️ Хмарно' : '🌧️ Дощ'}
                  </span>
                  <span className="text-[10px] text-slate-600">·</span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {state.time === 'morning' ? 'Ранок' : state.time === 'day' ? 'День' : state.time === 'evening' ? 'Вечір' : 'Ніч'}
                  </span>
                </div>
              </div>
            </div>

            {/* Decorative Floating ROI Tag */}
            <div className="hidden sm:block absolute -top-6 -left-6 bg-amber-500 text-slate-950 font-black p-4 rounded-2xl shadow-xl transform -rotate-3 border border-amber-300">
              <div className="text-[10px] uppercase tracking-widest leading-none">{tr('hero_payback_badge')}</div>
              <div className="text-2xl pt-1">{tr('hero_payback_val')}</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// Mini internal helper icons
const FileTextIcon: React.FC<{ className?: string }> = ({ className }) => <FileText className={className || "w-4 h-4"} />;
const BatteryIcon: React.FC<{ className?: string }> = ({ className }) => <Zap className={className || "w-4 h-4"} />;
const ClockIcon: React.FC<{ className?: string }> = ({ className }) => <Clock className={className || "w-4 h-4"} />;
const PercentIcon: React.FC<{ className?: string }> = ({ className }) => <Award className={className || "w-4 h-4"} />;
