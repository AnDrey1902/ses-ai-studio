import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FAQS } from '../../data/mockData';
import { ChevronDown, HelpCircle, PhoneCall } from 'lucide-react';
import { SchemaOrg } from '../common/SchemaOrg';

export const FaqSection: React.FC = () => {
  const { lang, tr, openLeadModal } = useApp();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="ds-section bg-[#07140F] border-b border-[rgba(255,255,255,.08)]">
      <SchemaOrg type="faq" data={{ faqs: FAQS.map(f => ({ question: f.question[lang] || f.question.uk, answer: f.answer[lang] || f.answer.uk })) }} />
      <div className="max-w-4xl mx-auto px-5 md:px-8 space-y-[64px]">

        {/* Section Heading */}
        <div className="text-center space-y-4">
          <span className="ds-badge px-3.5 py-1.5 text-xs bg-[rgba(34,197,94,.1)] text-[#22C55E] border border-[rgba(34,197,94,.2)]">
            ВІДПОВІДІ НА ЗАПИТАННЯ
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            {tr('b10_title')}
          </h2>
          <p className="text-sm sm:text-base text-[#92A299] font-medium">
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
                  isOpen ? 'bg-[#10261C] border-[rgba(34,197,94,.4)] shadow-xl' : 'bg-[rgba(24,44,33,.92)] border-[rgba(255,255,255,.08)] hover:border-[rgba(255,255,255,.15)]'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 text-sm sm:text-base font-extrabold text-white focus:outline-none"
                >
                  <span itemProp="name">{qCopy}</span>
                  <div className={`p-1.5 rounded-xl bg-[rgba(255,255,255,.08)] text-[#22C55E] transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 bg-[rgba(34,197,94,.2)]' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                    className="px-6 pb-6 pt-2 text-xs sm:text-sm text-[#D5DDD8] leading-relaxed border-t border-[rgba(255,255,255,.08)] space-y-4 animate-in fade-in duration-200"
                  >
                    <p itemProp="text">{aCopy}</p>
                    <div className="pt-2">
                      <button
                        onClick={() => openLeadModal('10 кВт', 'FAQ Питання', `FAQ Запитання #${idx+1}`)}
                        className="text-xs font-bold text-[#22C55E] hover:underline inline-flex items-center gap-1"
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
        <div className="ds-card text-center space-y-4">
          <HelpCircle className="w-8 h-8 text-[#22C55E] mx-auto" />
          <h3 className="text-lg font-extrabold text-white">Не знайшли відповіді на своє питання?</h3>
          <p className="text-xs text-[#92A299] max-w-md mx-auto">Наші технічні консультанти готові пояснити будь-які інженерні та фінансові тонкощі підключення СЕС.</p>
          <button
            onClick={() => openLeadModal('10 кВт', 'Питання з FAQ', 'Кнопка під FAQ')}
            className="ds-btn-primary !px-6 !py-3 !text-xs"
          >
            {tr('btn_call_me')}
          </button>
        </div>

      </div>
    </section>
  );
};
