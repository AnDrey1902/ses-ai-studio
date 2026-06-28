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
    <div className="pt-28 pb-24 bg-slate-950 min-h-screen text-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-center">
        
        {/* Hero Announcement */}
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-amber-500/15 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/30 animate-bounce">
            <ShoppingCart className="w-8 h-8" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-widest">
            Реліз 3 квартал 2026
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Офіційний інтернет-магазин комплектуючих Tier-1
          </h1>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl mx-auto">
            Ми готуємо прямий B2B/B2C портал для інсталяторів та власників СЕС з оптовими цінами імпортера без націнок роздрібних мереж.
          </p>

          {/* Waitlist Form */}
          <div className="pt-4 max-w-md mx-auto">
            {status === 'success' ? (
              <div className="p-4 rounded-2xl bg-green-500/15 border border-green-500/30 text-green-400 text-xs font-bold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
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
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg shrink-0 transition-transform hover:scale-105"
                >
                  Отримати ранній доступ
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Sneak Peek Catalog */}
        <div className="pt-10 space-y-6 text-left">
          <h3 className="text-base font-extrabold text-slate-300 flex items-center gap-2 justify-center">
            <Package className="w-4 h-4 text-green-400" />
            <span>Анонс складських позицій (Ціни зі знижкою 15%):</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {previewEquipment.map((eq, idx) => (
              <div key={idx} className="bg-slate-900/60 p-6 rounded-3xl border border-slate-800 flex items-center justify-between gap-4 opacity-80 hover:opacity-100 transition-opacity">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded">{eq.badge}</span>
                  <h4 className="text-xs sm:text-sm font-extrabold text-white leading-snug">{eq.name}</h4>
                </div>
                <div className="text-right shrink-0 font-mono">
                  <div className="text-base font-black text-amber-400">{eq.price}</div>
                  <div className="text-[9px] text-slate-500 uppercase font-bold">Опт від 5 шт</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
