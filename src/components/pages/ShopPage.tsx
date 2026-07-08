import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShoppingCart, Bell, CheckCircle2, ShieldAlert, Zap, ArrowRight, Package } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const { addWaitlistEmail } = useApp();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setStatus('error');
      return;
    }
    await addWaitlistEmail(email.trim(), 'Магазин обладнання (Скоро)');
    setStatus('success');
    setEmail('');
  };

  const previewEquipment = [
    { name: 'Гібридний інвертор Deye SUN-12K-SG04LP3-EU (3 фази, 48V)', price: '$1,850', badge: 'У наявності на складі' },
    { name: 'Сонячна панель Longi Solar LR5-72HTH-585M Hi-MO 6', price: '$98 / шт', badge: 'Tier-1 Grade A' },
    { name: 'Акумулятор Deye SE-G5.1 Pro LiFePO4 5.12 kWh 51.2V', price: '$1,320', badge: '10 років гарантія BMS' },
    { name: 'Гібридний інвертор Huawei SUN2000-10KTL-M1', price: '$1,740', badge: 'Офіційний імпорт' }
  ];

  return (
    <div className="pt-[104px] pb-24 md:pb-32">
      <div className="max-w-5xl mx-auto px-5 md:px-8 space-y-12 text-center">

        {/* Hero Announcement */}
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="w-16 h-16 rounded-[24px] bg-[rgba(251,191,36,.12)] text-[#FBBF24] flex items-center justify-center mx-auto border border-[rgba(251,191,36,.2)] animate-bounce">
            <ShoppingCart className="w-8 h-8" />
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBBF24] text-[#07140F] font-black text-xs uppercase tracking-widest">
            Реліз 3 квартал 2026
          </span>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1A2E23] tracking-tight">
            Офіційний інтернет-магазин комплектуючих Tier-1
          </h1>

          <p className="text-sm sm:text-base text-[#5A6E62] font-medium leading-relaxed max-w-xl mx-auto">
            Ми готуємо прямий B2B/B2C портал для інсталяторів та власників СЕС з оптовими цінами імпортера без націнок роздрібних мереж.
          </p>

          {/* Waitlist Form */}
          <div className="pt-4 max-w-md mx-auto">
            {status === 'success' ? (
              <div className="p-4 rounded-2xl bg-[rgba(34,197,94,.1)] border border-[rgba(34,197,94,.2)] text-[#15803D] text-xs font-bold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#22C55E]" />
                <span>Вашу пошту занесено до VIP-листа закритих розпродажів!</span>
              </div>
            ) : (
              <form onSubmit={handleWaitlist} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Введіть ваш email (наприклад: name@gmail.com)"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="flex-1 bg-white border border-[#E2ECE6] rounded-[18px] px-4 py-3.5 text-sm text-[#1A2E23] placeholder-[#92A299] focus:outline-none focus:border-[#FBBF24] transition-colors shadow-[0_2px_10px_rgba(26,46,35,.04)]"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-[#FBBF24] hover:bg-[#F59E0B] text-[#07140F] font-black text-xs uppercase tracking-wider rounded-[18px] shadow-[0_8px_20px_rgba(251,191,36,.25)] shrink-0 transition-all hover:scale-105"
                >
                  Отримати ранній доступ
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Sneak Peek Catalog */}
        <div className="pt-10 space-y-6 text-left">
          <h3 className="text-base font-extrabold text-[#1A2E23] flex items-center gap-2 justify-center">
            <Package className="w-4 h-4 text-[#22C55E]" />
            <span>Анонс складських позицій (Ціни зі знижкою 15%):</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {previewEquipment.map((eq, idx) => (
              <div key={idx} className="bg-white rounded-[28px] border border-[#E2ECE6] p-6 flex items-center justify-between gap-4 shadow-[0_4px_20px_rgba(26,46,35,.05)] hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(26,46,35,.1)] transition-all duration-300">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-[#15803D] bg-[rgba(34,197,94,.1)] px-2 py-0.5 rounded-[8px]">{eq.badge}</span>
                  <h4 className="text-xs sm:text-sm font-extrabold text-[#1A2E23] leading-snug">{eq.name}</h4>
                </div>
                <div className="text-right shrink-0 font-mono">
                  <div className="text-base font-black text-[#FBBF24]">{eq.price}</div>
                  <div className="text-[9px] text-[#92A299] uppercase font-bold">Опт від 5 шт</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
