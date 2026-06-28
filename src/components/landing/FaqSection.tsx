import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FAQS } from '../../data/mockData';
import { ChevronDown, HelpCircle, PhoneCall } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const { lang, tr, openLeadModal } = useApp();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-20 md:py-28 bg-slate-950 border-b border-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Heading */}
        <div className="text-center space-y-4">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-green-500/10 text-green-400 border border-green-500/20">
            ВІДПОВІДІ НА ЗАПИТАННЯ
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            {tr('b10_title')}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-medium">
            {tr('b10_sub')}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4" itemScope itemType="https://schema.org/FAQPage">
          {FAQS.map((fq, idx) => {
            const qCopy = fq.question[lang] || fq.question.uk;
            const aCopy = fq.answer[lang] || fq.answer.uk;
            const isOpen = openIdx === idx;

            return (
              <div
                key={idx}
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen ? 'bg-slate-900 border-green-500/40 shadow-xl' : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 text-sm sm:text-base font-extrabold text-white focus:outline-none"
                >
                  <span itemProp="name">{qCopy}</span>
                  <div className={`p-1.5 rounded-xl bg-slate-800 text-green-400 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 bg-green-500/20' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div 
                    itemScope 
                    itemProp="acceptedAnswer" 
                    itemType="https://schema.org/Answer"
                    className="px-6 pb-6 pt-2 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 space-y-4 animate-in fade-in duration-200"
                  >
                    <p itemProp="text">{aCopy}</p>
                    <div className="pt-2">
                      <button
                        onClick={() => openLeadModal('10 кВт', 'FAQ Питання', `FAQ Запитання #${idx+1}`)}
                        className="text-xs font-bold text-green-400 hover:underline inline-flex items-center gap-1"
                      >
                        <span>Задати додаткове запитання інженеру по телефону →</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions card */}
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-4">
          <HelpCircle className="w-8 h-8 text-green-400 mx-auto" />
          <h3 className="text-lg font-extrabold text-white">Не знайшли відповіді на своє питання?</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">Наші технічні консультанти готові пояснити будь-які інженерні та фінансові тонкощі підключення СЕС.</p>
          <button
            onClick={() => openLeadModal('10 кВт', 'Питання з FAQ', 'Кнопка під FAQ')}
            className="px-6 py-3 bg-[#22C55E] hover:bg-[#16A34A] text-slate-950 font-bold text-xs rounded-xl tracking-wider uppercase transition-transform hover:scale-105 inline-block"
          >
            {tr('btn_call_me')}
          </button>
        </div>

      </div>
    </section>
  );
};
