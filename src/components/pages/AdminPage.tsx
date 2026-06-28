import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Users, Mail, BookOpen, Plus, Trash2, CheckCircle2, Phone, Calendar, RefreshCw, Layers } from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { leads, waitlist, setView, clearLeads } = useApp();
  const [tab, setTab] = useState<'leads' | 'waitlist' | 'cms'>('leads');
  const [secretAuth, setSecretAuth] = useState(false);
  const [password, setPassword] = useState('');
  const [loginErr, setLoginErr] = useState('');

  // Auto-login or password check ("admin" or "guru")
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin' || password === 'guru' || password === '2026') {
      setSecretAuth(true);
      setLoginErr('');
    } else {
      setLoginErr('Невірний пароль адміністратора (Підказка: admin)');
    }
  };

  if (!secretAuth) {
    return (
      <div className="pt-32 pb-32 bg-slate-950 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-green-500/15 text-green-400 flex items-center justify-center mx-auto border border-green-500/30">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-black text-white">Payload CMS Admin Portal</h2>
            <p className="text-xs text-slate-400">Система управління контентом та CRM заявок GURU ENERGY</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Пароль доступу (Введіть: admin)..."
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white text-center font-mono focus:outline-none focus:border-green-500 font-bold tracking-wider"
              />
            </div>
            {loginErr && <div className="text-[11px] text-red-400 font-medium">{loginErr}</div>}
            <button
              type="submit"
              className="w-full py-3.5 bg-[#22C55E] hover:bg-[#16A34A] text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-transform active:scale-95"
            >
              Авторизуватись у CRM
            </button>
            <button
              type="button"
              onClick={() => setView('home')}
              className="text-xs text-slate-500 hover:text-slate-300 block w-full pt-2"
            >
              ← На сайт
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-24 bg-slate-950 min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Navbar Admin */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#22C55E] text-slate-950 font-black flex items-center justify-center font-mono">CMS</div>
            <div>
              <h1 className="text-base font-extrabold text-white">Панель адміністратора GURU ENERGY</h1>
              <p className="text-[11px] text-slate-400 font-mono">Підключено до сховища Payload CMS · Статус: Активно</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setView('home')} className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors">
              Переглянути сайт
            </button>
            <button onClick={() => setSecretAuth(false)} className="px-4 py-2 rounded-xl bg-red-500/15 hover:bg-red-500/25 text-red-400 text-xs font-bold transition-colors">
              Вийти
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center sm:justify-start gap-2 border-b border-slate-800 pb-4">
          <button
            onClick={() => setTab('leads')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${
              tab === 'leads' ? 'bg-[#22C55E] text-slate-950 shadow-md shadow-green-500/20' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Вхідні ліди ({leads.length})</span>
          </button>

          <button
            onClick={() => setTab('waitlist')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${
              tab === 'waitlist' ? 'bg-[#22C55E] text-slate-950 shadow-md shadow-green-500/20' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Підписники Магазину ({waitlist.length})</span>
          </button>

          <button
            onClick={() => setTab('cms')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${
              tab === 'cms' ? 'bg-[#22C55E] text-slate-950 shadow-md shadow-green-500/20' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Налаштування CMS блогу</span>
          </button>
        </div>

        {/* Tab Content */}
        {tab === 'leads' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-300">База вхідних дзвінків та заявок з сайту:</h3>
              {leads.length > 0 && (
                <button
                  onClick={clearLeads}
                  className="text-xs text-red-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Очистити історію тестів
                </button>
              )}
            </div>

            {leads.length === 0 ? (
              <div className="p-16 rounded-3xl bg-slate-900/60 border border-slate-800 text-center space-y-2">
                <Users className="w-10 h-10 text-slate-600 mx-auto" />
                <div className="text-sm font-bold text-slate-400">Заявок ще немає</div>
                <p className="text-xs text-slate-500">Заповніть будь-яку форму на сайті, і заявка миттєво з’явиться тут у реальному часі.</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-extrabold border-b border-slate-800">
                    <tr>
                      <th className="p-4">Дата / Час</th>
                      <th className="p-4">Ім’я клієнта</th>
                      <th className="p-4">Телефон</th>
                      <th className="p-4">Потужність</th>
                      <th className="p-4">Джерело / Форма</th>
                      <th className="p-4 text-right">Дія</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-medium">
                    {leads.map((ld) => (
                      <tr key={ld.id} className="hover:bg-slate-800/50">
                        <td className="p-4 font-mono text-slate-400 text-[11px]">{new Date(ld.createdAt).toLocaleTimeString()} · {new Date(ld.createdAt).toLocaleDateString()}</td>
                        <td className="p-4 font-extrabold text-white text-sm">{ld.name}</td>
                        <td className="p-4 font-mono font-black text-green-400 text-sm">{ld.phone}</td>
                        <td className="p-4 font-mono font-bold">{ld.power}</td>
                        <td className="p-4 text-slate-400 max-w-xs truncate">{ld.source}</td>
                        <td className="p-4 text-right">
                          <a
                            href={`tel:${ld.phone}`}
                            className="px-3 py-1.5 rounded-lg bg-green-500/20 text-green-400 font-bold hover:bg-green-500 hover:text-slate-950 transition-colors inline-flex items-center gap-1"
                          >
                            <Phone className="w-3 h-3" /> Дзвінок
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {tab === 'waitlist' && (
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-slate-300">Список пошт, що чекають відкриття магазину B2B:</h3>
            
            {waitlist.length === 0 ? (
              <div className="p-16 rounded-3xl bg-slate-900/60 border border-slate-800 text-center space-y-2">
                <Mail className="w-10 h-10 text-slate-600 mx-auto" />
                <div className="text-sm font-bold text-slate-400">Підписників ще немає</div>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 uppercase font-extrabold border-b border-slate-800">
                    <tr>
                      <th className="p-4">Дата запису</th>
                      <th className="p-4">Електронна пошта</th>
                      <th className="p-4">Інтерес</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-medium">
                    {waitlist.map((wl) => (
                      <tr key={wl.id}>
                        <td className="p-4 font-mono text-slate-400">{new Date(wl.createdAt).toLocaleDateString()}</td>
                        <td className="p-4 font-mono font-bold text-amber-400 text-sm">{wl.email}</td>
                        <td className="p-4 text-slate-400">{wl.source}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {tab === 'cms' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 space-y-6">
            <div className="space-y-2">
              <h3 className="text-base font-extrabold text-white">Payload CMS Колекції (Конфігурація блогу та пакетів)</h3>
              <p className="text-xs text-slate-400">У демонстраційному режимі AI Studio контент підтягується з статичних збірок TypeScript `/src/data/mockData.ts`. В продакшені Cloud Run Payload CMS синхронізує MongoDB.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-extrabold text-white text-xs">Колекція "Posts" (Статті)</div>
                  <div className="text-[10px] text-slate-500">Записів у базі: 3</div>
                </div>
                <span className="text-[10px] bg-green-500/20 text-green-400 font-bold px-2 py-1 rounded">Read-Only Demo</span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-extrabold text-white text-xs">Колекція "Packages" (Кошторис)</div>
                  <div className="text-[10px] text-slate-500">Пакети 5 / 8 / 10 / 15 / 30 / 50 кВт</div>
                </div>
                <span className="text-[10px] bg-green-500/20 text-green-400 font-bold px-2 py-1 rounded">Active Sync</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
