import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  const { setView, tr } = useApp();

  return (
    <div className="pt-28 pb-24 bg-slate-950 min-h-screen text-slate-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-xs sm:text-sm leading-relaxed">
        
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {tr('privacy_title')}
          </h1>
          <p className="text-xs text-slate-500 pt-2">{tr('privacy_last_update')}</p>
        </div>

        <div className="space-y-6">
          <section className="space-y-2">
            <h3 className="text-base font-bold text-white">{tr('privacy_sec1_title')}</h3>
            <p>{tr('privacy_sec1_text')}</p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-white">{tr('privacy_sec2_title')}</h3>
            <p>{tr('privacy_sec2_text')}</p>
            <ul className="list-disc pl-6 space-y-1 text-slate-400">
              <li>{tr('privacy_sec2_item1')}</li>
              <li>{tr('privacy_sec2_item2')}</li>
              <li>{tr('privacy_sec2_item3')}</li>
              <li>{tr('privacy_sec2_item4')}</li>
              <li>{tr('privacy_sec2_item5')}</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-white">{tr('privacy_sec3_title')}</h3>
            <p>{tr('privacy_sec3_text')}</p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-white">{tr('privacy_sec4_title')}</h3>
            <p>{tr('privacy_sec4_text')}</p>
          </section>
        </div>

        <div className="pt-8">
          <button
            onClick={() => setView('home')}
            className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl uppercase tracking-wider transition-colors"
          >
            {tr('privacy_back_btn')}
          </button>
        </div>

      </div>
    </div>
  );
};
