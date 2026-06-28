import React from 'react';
import { useApp } from '../../context/AppContext';

export const SeoTextSection: React.FC = () => {
  const { lang } = useApp();

  // Spec Block 13: H2 + 3 paragraphs ~380 words with keywords
  return (
    <section className="py-16 md:py-24 bg-slate-950 border-b border-slate-900 text-slate-400">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-200 tracking-tight">
          {lang === 'en'
            ? 'Turnkey Solar Power Stations in Ukraine: Blackout Protection and Green Tariff Investment'
            : lang === 'ru'
            ? 'Солнечные электростанции под ключ в Украине: защита от блэкаутов и Зеленый тариф'
            : 'Сонячні електростанції під ключ в Україні: автономія під час блекаутів та інвестиції в Зелений тариф'}
        </h2>

        <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-400 font-normal text-justify">
          <p>
            {lang === 'en' ? (
              <>
                Installing a <strong>turnkey solar power station (SES)</strong> in Ukraine has become the primary standard for energy independence for homeowners and enterprise directors in 2026. Frequent blackouts, damaged transmission lines, and systematically increasing utility tariffs necessitate reliable alternative power sources. Modern <strong>hybrid solar power plants with LiFePO4 energy storage</strong> automatically disconnect your facility from the municipal grid in 10 milliseconds during power outages, ensuring seamless operation of heating boilers, Wi-Fi routers, refrigeration, and security alarm systems without noisy diesel generators.
              </>
            ) : lang === 'ru' ? (
              <>
                Установка <strong>солнечной электростанции (СЭС) под ключ</strong> в Украине стала ключевым стандартом энергонезависимости для владельцев частных домов и предприятий в 2026 году. Постоянные блэкауты, поврежденная инфраструктура ЛЭП и систематический рост тарифов делают гибридные солнечные системы жизненной необходимостью. Современная <strong>гибридная солнечная станция с аккумуляторами LiFePO4</strong> автоматически переключает дом на автономное питание за 10 миллисекунд.
              </>
            ) : (
              <>
                Встановлення <strong>сонячної електростанції (СЕС) під ключ</strong> в Україні стало головним стандартом енергетичної незалежності для власників приватних будинків, котеджів та керівників підприємств у 2026 році. Постійні блекаути, пошкодження магістральних ліній ЛЕП та систематичне зростання тарифів на електроенергію роблять надійне резервне живлення критичною необхідністю. Сучасна <strong>гібридна сонячна електростанція з акумуляторами LiFePO4</strong> автоматично відокремлює ваш об'єкт від зовнішньої мережі за 10 мілісекунд під час аварійного знеструмлення, гарантуючи безперебійну роботу котлів опалення, холодильників, систем безпеки та інтернету без використання гучних бензинових генераторів.
              </>
            )}
          </p>

          <p>
            {lang === 'en' ? (
              <>
                Company <strong>GURU ENERGY</strong> specializes in comprehensive engineering projects, supplying Bloomberg Tier-1 photovoltaic modules (Longi Solar, Jinko Tiger Neo) and certified Deye and Huawei hybrid inverters. For corporate businesses, supermarkets, warehouses, and agricultural farms, we implement <strong>commercial solar stations for self-consumption (Net Billing)</strong>, which offset up to 85% of daytime electricity costs, achieving full ROI payback within 2.8 to 3.5 years.
              </>
            ) : lang === 'ru' ? (
              <>
                Компания <strong>GURU ENERGY</strong> специализируется на комплексном инженерном проектировании, поставляя солнечные панели Bloomberg Tier-1 (Longi Solar, Jinko) и гибридные инверторы Deye / Huawei. Для коммерческого бизнеса мы строим <strong>сетевые станции под собственное потребление</strong> с замещением до 85% дневного тарифа.
              </>
            ) : (
              <>
                Компанія <strong>GURU ENERGY (ЕНЕРГОЖИВЛЕННЯ)</strong> здійснює повний цикл інженерного проектування, постачання оригінального обладнання Bloomberg Tier-1 (сонячні панелі Longi Hi-MO 6, Jinko Solar Tiger Neo N-Type) та монтаж під ключ по всій території України. Для комерційного сектору — торгових центрів, складів, АЗС та виробництв — ми будуємо <strong>комерційні сонячні електростанції під власне споживання</strong>, які дозволяють замістити до 85% споживання електрики за денним тарифом та окупити вкладені кошти в рекордні терміни від 2.8 років. Крім того, наші юристи здійснюють повний супровід оформлення пільгових державних кредитів під 0% річних за програмою «єВідновлення» через Ощадбанк та ПриватБанк.
              </>
            )}
          </p>

          <p>
            {lang === 'en' ? (
              <>
                Legal compliance and honesty are our core values. Every contract signed with GURU ENERGY explicitly locks in turnkey USD hardware prices with zero hidden charges. Our legal department independently executes all 9 required bureaucratic permits with regional grid operators (Oblenergo) to legalize the <strong>Green Tariff</strong> and coordinate bi-directional smart meter sealing. Choose decades of clean solar yield with 25-year official warranties!
              </>
            ) : lang === 'ru' ? (
              <>
                Честность и прозрачность сметы — наш главный принцип. В каждом договоре прописывается окончательная цена в долларах США. Наши юристы готовят все 9 официальных документов для Облэнерго и Зеленого тарифа под ключ.
              </>
            ) : (
              <>
                Прозорість кошторису та юридична надійність є нашими безкомпромісними принципами. У кожному договорі GURU ENERGY чітко зафіксована фінальна вартість обладнання у доларах США без жодних прихованих платежів після завершення монтажу. Наш юридичний відділ бере на себе оформлення всіх 9 офіційних дозвільних документів в Обленерго, погодження ТУ та підключення <strong>Зеленого тарифу</strong> з встановленням двонаправленого лічильника під ключ. Обирайте справжню енергонезалежність зі світлом навіть під час найдовших блекаутів!
              </>
            )}
          </p>
        </div>

      </div>
    </section>
  );
};
