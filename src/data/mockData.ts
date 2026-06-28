import { BlogPost, CaseItem, FAQItem, Lead, ReviewItem, SESPackage, WaitlistEmail } from '../types';

export const PAIN_SOLUTIONS = [
  {
    pain: {
      uk: '«Блекаути вимикають опалення, холодильник тече, працювати з дому неможливо»',
      ru: '«Блэкауты отключают отопление, холодильник течет, работать из дома невозможно»',
      en: '«Blackouts shut down heating, fridge thaws, working from home is impossible»'
    },
    solution: {
      uk: 'Гібридна СЕС автоматично перемикає будинок на АКБ за 10 мс. Світло, інтернет і котел працюють безперебійно.',
      ru: 'Гибридная СЭС автоматически переключает дом на АКБ за 10 мс. Свет, интернет и котел работают бесперебойно.',
      en: 'Hybrid SES switches home to battery in 10ms. Lights, heating and Wi-Fi operate seamlessly.'
    },
    stat: '0 с блекаутів',
    badge: 'Блекаут'
  },
  {
    pain: {
      uk: '«Рахунки за електрику для магазину/складу сягають 40–80 тис. грн щомісяця»',
      ru: '«Счета за электричество для магазина/склада достигают 40–80 тыс. грн ежемесячно»',
      en: '«Electricity bills for warehouse/shop reach $1,000 - $2,000 every month»'
    },
    solution: {
      uk: 'Комерційна станція під власне споживання заміщує до 85% денного тарифу. Окупність підприємства — від 2.8 років.',
      ru: 'Коммерческая станция под собственное потребление замещает до 85% дневного тарифа. Окупаемость — от 2.8 лет.',
      en: 'Commercial self-consumption plant offsets up to 85% of daytime electricity usage. ROI from 2.8 yrs.'
    },
    stat: '-85% витрат',
    badge: 'Тарифи Бізнес'
  },
  {
    pain: {
      uk: '«Сонячні панелі коштують 350–400 тис. грн, одразу витягнути таку суму з бюджету важко»',
      ru: '«Солнечные панели стоят 350–400 тыс. грн, сразу вытащить такую сумму из бюджета тяжело»',
      en: '«High upfront capital needed ($8,000+), hard to pull out of pocket immediately»'
    },
    solution: {
      uk: 'Оформлюємо державний кредит під 0% на 5 років (єВідновлення) або 5-7-9% для МСБ. Перший внесок лише 10%.',
      ru: 'Оформляем государственный кредит под 0% на 5 лет или 5-7-9% для МСБ. Первый взнос всего 10%.',
      en: 'We assist with 0% state grants for 5 years or 5-7-9% business loans. Only 10% downpayment.'
    },
    stat: '0% річних',
    badge: 'Кредит 0%'
  },
  {
    pain: {
      uk: '«Куплю станцію, а фірма-одноденка зникне через півроку і не виконуватиме гарантію»',
      ru: '«Куплю станцию, а фирма-однодневка исчезнет через полгода и не выполнит гарантию»',
      en: '«Fear of fly-by-night installers disappearing when hardware needs servicing»'
    },
    solution: {
      uk: 'Ми є офіційним партнером Deye, Huawei та Longi. Надаємо юридичну гарантію 10 років на інвертор та 25 років на панелі.',
      ru: 'Мы являемся официальным партнером Deye, Huawei и Longi. Даем юридическую гарантию 10 лет.',
      en: 'Official Tier-1 partner. Legal 10-year inverter warranty & 25-year linear power warranty.'
    },
    stat: '10 років гарантії',
    badge: 'Надійність'
  },
  {
    pain: {
      uk: '«На сайтах конкурентів ховають ціну, а по телефону кошторис раптово виростає на $1500»',
      ru: '«На сайтах конкурентов прячут цену, а по телефону смета внезапно выростает на $1500»',
      en: '«Competitors hide exact prices online, then add surprise charges during contract signing»'
    },
    solution: {
      uk: 'Всі наші ціни зафіксовані у $ на сайті. Кошторис прописується в договорі до кожної клеми та кріплення.',
      ru: 'Все наши цены зафиксированы в $ на сайте. Смета прописывается в договоре до каждого крепления.',
      en: 'Fixed USD prices published upfront. Contract estimate lists every single cable and bolt.'
    },
    stat: 'Фіксація ціни',
    badge: 'Прозорість'
  },
  {
    pain: {
      uk: '«Обленерго вимагає купу бюрократичних паперів для підключення Зеленого тарифу»',
      ru: '«Облэнерго требует кучу бюрократических бумаг для подключения Зеленого тарифа»',
      en: '«Grid operator paperwork nightmare to legalize Green Tariff or net billing»'
    },
    solution: {
      uk: 'Наші юристи самостійно готують всі 9 офіційних документів та супроводжують пломбування двонаправленого лічильника.',
      ru: 'Наши юристы самостоятельно готовят все 9 официальных документов и сопровождают пломбирование.',
      en: 'Our legal brigade prepares all 9 permits and coordinates bi-directional meter installation.'
    },
    stat: 'Під ключ',
    badge: 'Документи'
  }
];

export const SES_SERVICES = [
  {
    id: 's-hybrid',
    typeKey: 'hybrid',
    title: { uk: 'Гібридна сонячна станція з АКБ', ru: 'Гибридная солнечная станция с АКБ', en: 'Hybrid Solar Plant with Battery' },
    target: { uk: 'Для приватного будинку (Хіт продажів)', ru: 'Для частного дома (Хит продаж)', en: 'For Residential Home (Bestseller)' },
    desc: {
      uk: 'Повна незалежність від графіків відключень + можливість продавати надлишки в мережу за Зеленим тарифом.',
      ru: 'Полная независимость от графиков отключений + возможность продавать излишки в сеть.',
      en: 'Total blackout independence + ability to sell excess generation to grid via Green Tariff.'
    },
    equip: 'Інвертор Deye 8–12 кВт + АКБ LiFePO4 10.2 кВт·год + Панелі Longi Hi-MO 6',
    price: '$4 800',
    payback: '4.5 роки'
  },
  {
    id: 's-business',
    typeKey: 'business',
    title: { uk: 'СЕС для Бізнесу під власне споживання', ru: 'СЭС для Бизнеса под собственное потребление', en: 'Commercial SES for Net Billing' },
    target: { uk: 'Магазини, склади, АЗС, заводи 30–100 кВт', ru: 'Магазины, склады, АЗС, заводы 30–100 кВт', en: 'Supermarkets, warehouses, factories 30-100 kW' },
    desc: {
      uk: 'Генерація вдень прямо перекриває роботу кондиціонерів, станків та освітлення. Захист бізнесу від збитків.',
      ru: 'Генерация днем напрямую перекрывает работу кондиционеров, станков и освещения.',
      en: 'Daytime generation powers refrigeration, machinery and lighting directly. TCO optimization.'
    },
    equip: 'Мережевий інвертор Huawei 30-100 кВт + Панелі Jinko N-Type 585W + Smart Logger',
    price: '$11 500',
    payback: '2.8 роки'
  },
  {
    id: 's-ongrid',
    typeKey: 'ongrid',
    title: { uk: 'Мережева станція під Зелений тариф', ru: 'Сетевая станция под Зеленый тариф', en: 'On-grid Station for Green Tariff' },
    target: { uk: 'Для пасивного доходу 10–30 кВт', ru: 'Для пассивного дохода 10–30 кВт', en: 'Passive income generation 10-30 kW' },
    desc: {
      uk: 'Класична інвестиційна модель: станція генерує енергію в мережу, держава виплачує гроші у євро за фіксованим тарифом.',
      ru: 'Классическая инвестиционная модель: станция генерирует энергию в сеть, государство выплачивает евро.',
      en: 'Classic investment: station exports power to grid, state guarantees fixed payments in EUR.'
    },
    equip: 'Інвертор Solis 30K + Панелі Longi 580W + Офіційний двонаправлений лічильник',
    price: '$8 200',
    payback: '4 роки'
  },
  {
    id: 's-offgrid',
    typeKey: 'offgrid',
    title: { uk: 'Автономна СЕС (Дачі та віддалені об’єкти)', ru: 'Автономная СЭС (Дачи и удаленные объекты)', en: 'Off-grid Remote SES' },
    target: { uk: 'Об’єкти без підключення до ліній ЛЕП', ru: 'Объекты без подключения к ЛЭП', en: 'Locations without existing grid connection' },
    desc: {
      uk: 'Система генерації з посиленим акумуляторним банком для життя в горах, лісі чи на фермі.',
      ru: 'Система генерации с усиленным аккумуляторным банком для жизни в горах или в лесу.',
      en: 'Off-grid setup with heavy battery bank for remote mountains, farms or forest cabins.'
    },
    equip: 'Автономний інвертор Must + АКБ Dyness 15 кВт·год + Панелі Risen',
    price: '$3 900',
    payback: 'Автономія'
  },
  {
    id: 's-investor',
    typeKey: 'ongrid',
    title: { uk: 'Інвесторська СЕС під Зелений тариф', ru: 'Инвестиционная СЭС под Зеленый тариф', en: 'Investment SES for Green Tariff' },
    target: { uk: 'Пасивний дохід у євро від держави', ru: 'Пассивный доход в евро от государства', en: 'Passive EUR income from state guarantees' },
    desc: {
      uk: 'Класична інвестиційна модель: держава купує вашу електроенергію за фіксованим тарифом 0.132 євро/кВт·год. Стабільний дохід без обслуговування.',
      ru: 'Классическая инвестиционная модель: государство покупает вашу электроэнергию по фиксированному тарифу 0.132 евро/кВт·ч. Стабильный доход без обслуживания.',
      en: 'Classic investment model: state buys your electricity at fixed 0.132 EUR/kWh tariff. Stable hands-off income.'
    },
    equip: 'Інвертор Solis 30K + Панелі Longi 580W + Двонаправлений лічильник',
    price: '$8 200',
    payback: '4 роки'
  }
];

export const ADVANTAGES = [
  { num: '01', title: { uk: 'Прозорі фіксовані ціни', ru: 'Прозрачные фиксированные цены', en: 'Fixed Upfront Pricing' }, desc: { uk: 'У договорі прописана фінальна сума у дол. США. Жодних прихованих доплат після монтажу.', ru: 'В договоре прописана финальная сумма в дол. США.', en: 'Contract specifies exact turnkey price in USD.' } },
  { num: '02', title: { uk: 'Монтаж за 48 годин', ru: 'Монтаж за 48 часов', en: '48-Hour Installation' }, desc: { uk: 'Власні інженерні бригади зі спецтранспортом виконують монтаж на даху чи наземній конструкції за 2 дні.', ru: 'Собственные инженерные бригады выполняют монтаж за 2 дня.', en: 'Our dedicated engineering brigades complete installation in 2 days.' } },
  { num: '03', title: { uk: 'ККД панелей Tier-1', ru: 'КПД панелей Tier-1', en: 'Tier-1 High Efficiency' }, desc: { uk: 'Використовуємо лише фотомодулі Bloomberg Tier-1 (Longi, Jinko) з деградацією не більше 0.4% на рік.', ru: 'Используем фотомодули Bloomberg Tier-1 с минимальной деградацией.', en: 'Bloomberg Tier-1 modules with max 0.4% annual degradation.' } },
  { num: '04', title: { uk: 'Допомога з 0% кредитом', ru: 'Помощь с 0% кредитом', en: '0% State Loan Support' }, desc: { uk: 'Персональний менеджер готує документи для Ощадбанку, ПриватБанку чи Сенс Банку під програму єВідновлення.', ru: 'Персональный менеджер готовит документы для государственных банков под 0%.', en: 'Full paperwork preparation for state 0% green credit programs.' } },
  { num: '05', title: { uk: 'Мобільний додаток 24/7', ru: 'Мобильное приложение 24/7', en: '24/7 Smart App Monitoring' }, desc: { uk: 'Відстежуйте виробіток, заряд батареї та економію в реальному часі зі свого смартфона на iOS чи Android.', ru: 'Отслеживайте выработку и заряд батареи со смартфона в реальном времени.', en: 'Track live solar output, battery status and savings from your iOS/Android smartphone.' } },
  { num: '06', title: { uk: 'Ліцензія СС1 та IEC', ru: 'Лицензия СС1 и IEC', en: 'CC1 & IEC Licensed' }, desc: { uk: 'Маємо будівельну ліцензію СС1, кваліфікаційні сертифікати інженерів та страхове κάвередж.', ru: 'Имеем строительную лицензию СС1 и сертификаты инженеров.', en: 'Official CC1 engineering license and internationally certified technicians.' } },
  { num: '07', title: { uk: 'Сервіс після гарантії', ru: 'Сервис после гарантии', en: 'Post-Warranty Care' }, desc: { uk: 'Проводимо щорічний тепловізійний контроль панелей та чистку контактів для збереження максимальної генерації.', ru: 'Проводим ежегодный тепловизионный контроль панелей.', en: 'Annual thermal inspection and contact maintenance to preserve peak yield.' } },
  { num: '08', title: { uk: '100% юридична чистота', ru: '100% юридическая чистота', en: '100% Legal Cleanliness' }, desc: { uk: 'Працюємо офіційно за безготівковим чи готівковим розрахунком з ПДВ для юридичних осіб та підприємців.', ru: 'Работаем официально по безналичному или наличному расчету с НДС.', en: 'Official VAT invoices available for corporate clients and agribusinesses.' } }
];

export const WORK_STEPS = [
  { step: 1, title: { uk: 'Заявка та консультація', ru: 'Заявка и консультация', en: 'Inquiry & Consultation' }, time: { uk: '15 хвилин', ru: '15 минут', en: '15 minutes' }, desc: { uk: 'Експертний розрахунок орієнтовної вартості та підбір потужності по телефону.', ru: 'Экспертный расчет ориентировочной стоимости по телефону.', en: 'Expert calculation of preliminary plant power and equipment.' } },
  { step: 2, title: { uk: 'Виїзд інженера на об’єкт', ru: 'Выезд инженера на объект', en: 'On-site Engineering Visit' }, time: { uk: '1–2 дні', ru: '1–2 дня', en: '1–2 days' }, desc: { uk: 'Замір крокв даху, орієнтації південь/захід, аналіз ввідного щита та заземлення.', ru: 'Замер стропил крыши, анализ вводного щита и заземления.', en: 'Roof structural check, azimuth analysis, electrical panel inspection.' } },
  { step: 3, title: { uk: '3D-Моделювання та проект', ru: '3D-Моделирование и проект', en: '3D Project Simulation' }, time: { uk: '1 день', ru: '1 день', en: '1 day' }, desc: { uk: 'Створення схеми розміщення панелей з урахуванням тіней від дерев та сусідніх будівель.', ru: 'Создание схемы размещения панелей с учетом теней.', en: 'Precision CAD shadow modeling and hardware layout.' } },
  { step: 4, title: { uk: 'Договір з фіксацією ціни', ru: 'Договор с фиксацией цены', en: 'Fixed-Price Contract' }, time: { uk: '30 хвилин', ru: '30 минут', en: '30 minutes' }, desc: { uk: 'Підписання угоди з чіткими строками монтажу та гарантійними зобов’язаннями.', ru: 'Подписание соглашения с четкими сроками монтажа.', en: 'Signing agreement with fixed timeline and binding hardware guarantee.' } },
  { step: 5, title: { uk: 'Поставка та монтаж СЕС', ru: 'Поставка и монтаж СЭС', en: 'Turnkey Installation' }, time: { uk: '48 годин', ru: '48 часов', en: '48 hours' }, desc: { uk: 'Акуратний монтаж кріплень K2/Алюміній, прокладка вогнетривкого кабелю Solar 6мм.', ru: 'Аккуратный монтаж креплений и прокладка кабеля.', en: 'Roof mounting execution and fire-safe DC wiring.' } },
  { step: 6, title: { uk: 'Пусконаладка та тести', ru: 'Пусконаладка и тесты', en: 'Commissioning & Tests' }, time: { uk: '4 години', ru: '4 часа', en: '4 hours' }, desc: { uk: 'Налаштування інвертора Deye/Huawei, підключення моніторингу Smart Logger.', ru: 'Настройка инвертора, подключение мониторинга.', en: 'Inverter grid configuration, battery BMS pairing, Wi-Fi link.' } },
  { step: 7, title: { uk: 'Зелений тариф / Net Billing', ru: 'Зеленый тариф / Net Billing', en: 'Green Tariff Legalization' }, time: { uk: '14–20 днів', ru: '14–20 дней', en: '14–20 days' }, desc: { uk: 'Оформлення документів в Обленерго, заміна лічильника на двонаправлений.', ru: 'Оформление документов в Облэнерго, замена счетчика.', en: 'Grid operator paperwork processing and bi-directional meter sealing.' } },
  { step: 8, title: { uk: 'Технічна підтримка 24/7', ru: 'Техническая поддержка 24/7', en: '24/7 Technical Support' }, time: { uk: 'Десятиліття', ru: 'Десятилетия', en: 'Decades' }, desc: { uk: 'Постійне онлайн-спостереження нашим сервісним центром за працездатністю системи.', ru: 'Постоянное онлайн-наблюдение нашим сервисным центром.', en: 'Continuous remote monitoring by our service control center.' } }
];

export const PACKAGES: SESPackage[] = [
  {
    id: 'pkg-5kw',
    kw: 5,
    typeKey: 'hybrid',
    name: { uk: 'Економ Гібрид 5 кВт', ru: 'Эконом Гибрид 5 кВт', en: 'Compact Hybrid 5 kW' },
    subtitle: { uk: 'Квартира або невелика дача', ru: 'Квартира или небольшая дача', en: 'Apartment or small cottage' },
    priceUsd: 3500,
    priceUah: 147000,
    payback: { uk: '4.8 роки', ru: '4.8 года', en: '4.8 years' },
    inverter: 'Deye SUN-5K-SG03LP1 (Однофазний)',
    panels: '10 шт × Longi Hi-MO 6 580W Black Frame',
    battery: 'LiFePO4 Dyness DL5.0C (5.12 кВт·год)',
    generationYear: 5800
  },
  {
    id: 'pkg-8kw',
    kw: 8,
    typeKey: 'hybrid',
    name: { uk: 'Стандарт Гібрид 8 кВт', ru: 'Стандарт Гибрид 8 кВт', en: 'Standard Hybrid 8 kW' },
    subtitle: { uk: 'Приватний будинок 120–180 м²', ru: 'Частный дом 120–180 м²', en: 'Residential House 120-180 m²' },
    priceUsd: 4900,
    priceUah: 205800,
    payback: { uk: '4.5 роки', ru: '4.5 года', en: '4.5 years' },
    inverter: 'Deye SUN-8K-SG04LP3 (Трифазний)',
    panels: '14 шт × Longi Hi-MO 6 580W N-Type',
    battery: 'LiFePO4 Deye RW-M6.1 (6.14 кВт·год)',
    generationYear: 9200,
    popular: true
  },
  {
    id: 'pkg-10kw',
    kw: 10,
    typeKey: 'hybrid',
    name: { uk: 'Преміум Гібрид 10 кВт', ru: 'Премиум Гибрид 10 кВт', en: 'Premium Hybrid 10 kW' },
    subtitle: { uk: 'Котедж з тепловим насосом та авто', ru: 'Коттедж с тепловым насосом и авто', en: 'Large Villa with EV charger' },
    priceUsd: 6200,
    priceUah: 260400,
    payback: { uk: '4.2 роки', ru: '4.2 года', en: '4.2 years' },
    inverter: 'Deye SUN-10K-SG04LP3-EU',
    panels: '18 шт × Jinko Solar Tiger Neo 585W',
    battery: 'LiFePO4 Deye SE-G10.4 (10.24 кВт·год)',
    generationYear: 11500,
    popular: true
  },
  {
    id: 'pkg-15kw',
    kw: 15,
    typeKey: 'hybrid',
    name: { uk: 'Максимум Гібрид 15 кВт', ru: 'Максимум Гибрид 15 кВт', en: 'Power Hybrid 15 kW' },
    subtitle: { uk: 'Маєток чи заміський міні-готель', ru: 'Поместье или загородный мини-отель', en: 'Large Country Estate' },
    priceUsd: 8400,
    priceUah: 352800,
    payback: { uk: '4 роки', ru: '4 года', en: '4 years' },
    inverter: 'Deye SUN-15K-SG01HP3-EU-AM2',
    panels: '26 шт × Longi Hi-MO 7 590W',
    battery: 'Високовольтний блок Deye BOS-G (15.3 кВт·год)',
    generationYear: 17200
  },
  {
    id: 'pkg-30kw',
    kw: 30,
    typeKey: 'business',
    name: { uk: 'Комерційна СЕС 30 кВт', ru: 'Коммерческая СЭС 30 кВт', en: 'Commercial SES 30 kW' },
    subtitle: { uk: 'Магазин, СТО, пекарня, офіс', ru: 'Магазин, СТО, пекарня, офис', en: 'Supermarket, workshop, bakery' },
    priceUsd: 11800,
    priceUah: 495600,
    payback: { uk: '3 роки', ru: '3 года', en: '3 years' },
    inverter: 'Huawei SUN2000-30KTL-M3',
    panels: '52 шт × Jinko Solar Tiger Neo 585W',
    battery: 'Опціонально (Підтримує Luna2000)',
    generationYear: 34500
  },
  {
    id: 'pkg-50kw',
    kw: 50,
    typeKey: 'business',
    name: { uk: 'Промислова СЕС 50 кВт', ru: 'Промышленная СЭС 50 кВт', en: 'Industrial SES 50 kW' },
    subtitle: { uk: 'Виробництво, складський комплекс', ru: 'Производство, складской комплекс', en: 'Factory, logistics warehouse' },
    priceUsd: 18500,
    priceUah: 777000,
    payback: { uk: '2.8 роки', ru: '2.8 года', en: '2.8 years' },
    inverter: 'Huawei SUN2000-50KTL-M3 + Smart Logger',
    panels: '86 шт × Longi Hi-MO 7 590W Double Glass',
    battery: 'Розраховується під профіль станків',
    generationYear: 58000
  }
];

export const CASES: CaseItem[] = [
  {
    id: 'case-1',
    title: { uk: 'Приватний будинок 12 кВт у передмісті Києва', ru: 'Частный дом 12 кВт в пригороде Киева', en: 'House 12 kW near Kyiv' },
    location: { uk: 'с. Крюківщина, Київська обл.', ru: 'с. Крюковщина, Киевская обл.', en: 'Kriukivshchyna, Kyiv region' },
    power: '12 кВт Гібридна',
    sesType: { uk: 'Резервне живлення + Зелений тариф', ru: 'Резервное питание + Зеленый тариф', en: 'Backup + Green Tariff' },
    equipment: 'Deye 12K + LiFePO4 15.3 kWh + 22 × Longi 580W',
    installDays: 2,
    investmentUsd: 6800,
    payback: { uk: '4.2 роки', ru: '4.2 года', en: '4.2 years' },
    quote: {
      uk: '«Забув де лежить ліхтарик. Взимку під час блекаутів котел працював добу на акумуляторі, а влітку Обленерго ще й доплачує близько 180 євро на місяць»',
      ru: '«Забыл где лежит фонарик. Зимой во время блэкаутов котел работал сутки на аккумуляторе»',
      en: '«Haven\'t touched a generator in a year. During winter blackouts heating ran 24 hrs on batteries.»'
    },
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'case-2',
    title: { uk: 'Дах супермаркету 45 кВт під власне споживання', ru: 'Крыша супермаркета 45 кВт под собственное потребление', en: 'Supermarket Roof 45 kW' },
    location: { uk: 'м. Львів, вул. Стрийська', ru: 'г. Львов, ул. Стрыйская', en: 'Lviv, Stryiska St.' },
    power: '45 кВт Комерційна',
    sesType: { uk: 'Заміщення денного тарифу бізнесу', ru: 'Замещение дневного тарифа бизнеса', en: 'Commercial Net Billing' },
    equipment: 'Huawei 40KTL + Smart Logger + 78 × Jinko 585W N-Type',
    installDays: 4,
    investmentUsd: 15400,
    payback: { uk: '2.6 роки', ru: '2.6 года', en: '2.6 years' },
    quote: {
      uk: '«Холодильні вітрини споживають величезні обсяги в спеку. Завдяки станції платіжка влітку впала з 85 тис. грн до 14 тис. грн. Інвестиція року!»',
      ru: '«Холодильные витрины потребляют колоссальные объемы в жару. СЭС срезала счет с 85 тыс до 14 тыс грн»',
      en: '«Refrigeration consumes huge loads in summer. Solar cut our bill from $2,100 to $350 monthly.»'
    },
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'case-3',
    title: { uk: 'Агроферма 80 кВт з наземною конструкцією', ru: 'Агроферма 80 кВт с наземной конструкцией', en: 'Agribusiness Farm 80 kW' },
    location: { uk: 'Полтавська обл., Миргородський р-н', ru: 'Полтавская обл., Миргородский р-н', en: 'Myrhorod district, Poltava region' },
    power: '80 кВт Мережева',
    sesType: { uk: 'Чистий експорт у мережу (Зелений тариф)', ru: 'Чистый экспорт в сеть (Зеленый тариф)', en: 'Pure Grid Export (Green Tariff)' },
    equipment: '2 × Huawei 40KTL + 140 × Longi 590W Double Glass',
    installDays: 6,
    investmentUsd: 26500,
    payback: { uk: '3.4 роки', ru: '3.4 года', en: '3.4 years' },
    quote: {
      uk: '«Бригада забила палі спецмашиною за 2 дні. Юристи GURU ENERGY взяли на себе весь діалог з Полтаваобленерго. Стабільний дохід підприємству»',
      ru: '«Бригада забила сваи спецмашиной за 2 дня. Юристы взяли на себя весь диалог с Полтаваоблэнерго»',
      en: '«The brigade piled the ground structure in 2 days. Legal handled all permits with the regional grid.»'
    },
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'case-4',
    title: { uk: 'Автономна СЕС 6 кВт для гірського котеджу', ru: 'Автономная СЭС 6 кВт для горного коттеджа', en: 'Off-grid Mountain Villa 6 kW' },
    location: { uk: 'с. Ворохта, Яремчанська міськрада', ru: 'с. Ворохта, Ивано-Франковская обл.', en: 'Vorokhta, Carpathian Mountains' },
    power: '6 кВт Автономна',
    sesType: { uk: 'Повна незалежність від центральної ЛЕП', ru: 'Полная независимость от ЛЭП', en: '100% Off-grid Living' },
    equipment: 'Must PV18 + Dyness DL5.0C × 2 (10.2 kWh) + 12 × Risen',
    installDays: 2,
    investmentUsd: 4100,
    payback: { uk: 'Автономія', ru: 'Автономия', en: 'Autonomy' },
    quote: {
      uk: '«Тут в горах лінії постійно обриває вітер. Тепер маю воду зі свердловини, гарячий душ та супутниковий Starlink 365 днів на рік»',
      ru: '«Тут в горах линии ЛЭП постоянно обрывает ветер. Теперь есть вода из скважины и интернет круглый год»',
      en: '«Mountain storms constantly snap power lines here. Now we have well water and Wi-Fi 365 days a year.»'
    },
    image: 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?auto=format&fit=crop&w=800&q=80'
  }
];

export const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Олександр Вакарчук',
    city: { uk: 'м. Буча', ru: 'г. Буча', en: 'Bucha' },
    power: '10 кВт Гібрид',
    sesType: { uk: 'Приватний будинок', ru: 'Частный дом', en: 'Private House' },
    rating: 5,
    text: {
      uk: 'Дуже задоволений підходом GURU ENERGY. Хлопці приїхали вчасно, проклали кабель у спеціальній гофрі, після себе залишили ідеальну чистоту. Інвертор Deye працює абсолютно безшумно у котельні.',
      ru: 'Очень доволен подходом GURU ENERGY. Ребята приехали вовремя, проложили кабель в гофре, оставили чистоту.',
      en: 'Extremely satisfied with Guru Energy. The technicians arrived on time, ran cables cleanly in conduits.'
    },
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'rev-2',
    name: 'Ірина Млинченко',
    city: { uk: 'м. Одеса', ru: 'г. Одесса', en: 'Odesa' },
    power: '8 кВт Гібрид',
    sesType: { uk: 'Котедж на Фонтані', ru: 'Коттедж на Фонтане', en: 'Seaside Villa' },
    rating: 5,
    text: {
      uk: 'Оформлювала кредит 0% через Ощадбанк. Менеджер Віталій допоміг зібрати всі довідки за 2 дні. Коли вимикають світло на вулиці, у нас навіть роутер не кліпає. Рекомендую!',
      ru: 'Оформляла кредит 0% через Ощадбанк. Менеджер Виталий помог собрать все справки за 2 дня. Рекомендую!',
      en: 'Got the 0% state green loan. Vitalii helped prepare all bank documents in 2 days. Seamless experience!'
    },
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'rev-3',
    name: 'Дмитро Романюк',
    city: { uk: 'м. Дніпро', ru: 'г. Днепр', en: 'Dnipro' },
    power: '30 кВт Бізнес',
    sesType: { uk: 'СТО та Склад запчастин', ru: 'СТО и Склад запчастей', en: 'Car Service Center' },
    rating: 5,
    text: {
      uk: 'Економія рахунків влітку перевищила всі розрахунки. Підіймачі та компресори тепер живляться від даху. Окрема подяка за додаток моніторингу — бачу кожну фазу.',
      ru: 'Экономия счетов летом превзошла все расчеты. Подъемники и компрессоры теперь питаются от крыши.',
      en: 'Summer electricity savings exceeded our projections. Our garage hoists and air compressors run on sunshine.'
    },
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'rev-4',
    name: 'Богдан Коваленко',
    city: { uk: 'м. Івано-Франківськ', ru: 'г. Ивано-Франковск', en: 'Ivano-Frankivsk' },
    power: '15 кВт Гібрид',
    sesType: { uk: 'Дім + Електромобіль', ru: 'Дом + Электромобиль', en: 'House + Tesla' },
    rating: 5,
    text: {
      uk: 'Заряджаю свою Tesla Model Y вдень безкоштовно від сонця. Виробіток Longi Hi-MO 6 просто феноменальний навіть у хмарну погоду в Карпатах. Професійна команда.',
      ru: 'Заряжаю свою Tesla Model Y днем бесплатно от солнца. Выработка Longi Hi-MO 6 просто феноменальная.',
      en: 'I charge my Tesla Model Y for free during the day. The Longi Hi-MO 6 yield is incredible even on cloudy days.'
    },
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'rev-5',
    name: 'Віктор Савчук',
    city: { uk: 'м. Вінниця', ru: 'г. Винница', en: 'Vinnytsia' },
    power: '10 кВт Мережева',
    sesType: { uk: 'Зелений тариф', ru: 'Зеленый тариф', en: 'Green Tariff' },
    rating: 5,
    text: {
      uk: 'Перші виплати від Гарантованого покупця вже надійшли на карту Привату в євро. Все прозоро, лічильник опломбували без нервів. Дякую юристам компанії.',
      ru: 'Первые выплаты от Гарантированного покупателя уже поступили на карту в евро. Все честно и прозрачно.',
      en: 'First Green Tariff payments in EUR landed in my bank account. Transparent metering and legal filing.'
    },
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'rev-6',
    name: 'Наталія Гончар',
    city: { uk: 'м. Черкаси', ru: 'г. Черкассы', en: 'Cherkasy' },
    power: '5 кВт Гібрид',
    sesType: { uk: 'Таунхаус', ru: 'Таунхаус', en: 'Townhouse' },
    rating: 5,
    text: {
      uk: 'Хвилювалась чи витримає дах таунхаусу. Інженер Олексій зробив тепловізор та розрахунок навантаження крокв. Змонтували за 1 день. Тепер сусіди заздрять!',
      ru: 'Волновалась выдержит ли крыша таунхауса. Инженер Алексей сделал расчет нагрузки. Смонтировали за день.',
      en: 'Was worried about our townhouse roof load. The engineer did thermal analysis and reinforced the rafters.'
    },
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80'
  }
];

export const GUARANTEES_DATA = [
  { title: { uk: 'Лінійний виробіток панелей', ru: 'Линейная выработка панелей', en: 'Panel Linear Output' }, years: '25 років', desc: { uk: 'Гарантуємо збереження не менше 89.4% номінальної потужності після 25 років експлуатації.', ru: 'Гарантируем сохранение не менее 89.4% номинальной мощности после 25 лет.', en: 'Guaranteed minimum 89.4% nominal power after 25 years.' } },
  { title: { uk: 'Гібридні інвертори Deye/Huawei', ru: 'Гибридные инверторы Deye/Huawei', en: 'Hybrid Inverters' }, years: '10 років', desc: { uk: 'Заміна чи офіційний сервісний ремонт інверторного блоку в Україні протягом 48 годин у разі збою.', ru: 'Замена или официальный ремонт инверторного блока в течение 48 часов.', en: 'Official 48-hour hardware replacement or servicing in Ukraine.' } },
  { title: { uk: 'Акумулятори LiFePO4', ru: 'Аккумуляторы LiFePO4', en: 'LiFePO4 Storage' }, years: '10 років / 6000 циклів', desc: { uk: 'Хімія літій-залізо-фосфат не горить і витримує понад 16 років щоденних розрядів до 90%.', ru: 'Химия литий-железо-фосфат не горит и выдерживает более 16 лет работы.', en: 'Lithium iron phosphate chemistry designed for 6,000 deep discharge cycles.' } },
  { title: { uk: 'Монтажні роботи та покрівля', ru: 'Монтажные работы и кровля', en: 'Roof & Work Guarantee' }, years: '5 років', desc: { uk: 'Повна гідроізоляція місць кріплення. Відповідаємо за відсутність протікань даху за договором.', ru: 'Полная гидроизоляция мест крепления. Отвечаем за отсутствие протечек.', en: '100% waterproof roof penetrations backed by binding agreement.' } }
];

export const FAQS: FAQItem[] = [
  {
    question: {
      uk: 'Чи буде працювати гібридна СЕС, коли взимку вимкнуть світло і не буде сонця?',
      ru: 'Будет ли работать гибридная СЭС, когда зимой отключат свет и не будет солнца?',
      en: 'Will a hybrid SES work during winter blackouts when there is no sunshine?'
    },
    answer: {
      uk: 'Так, звичайно! Гібридний інвертор вночі чи під час хмарної погоди живить будинок від накопиченого акумулятора LiFePO4. Коли Обленерго вмикає світло на 2–4 години за графіком, інвертор миттєво заряджає батарею від мережі з потужністю до 100А. Ви завжди зі світлом.',
      ru: 'Да, конечно! Гибридный инвертор питает дом от накопленного аккумулятора LiFePO4. Когда включают свет по графику, инвертор мгновенно заряжает батарею от сети.',
      en: 'Yes! The inverter powers your home from batteries. When grid power returns for 2 hours, the smart charger replenishes the battery pack rapidly.'
    }
  },
  {
    question: {
      uk: 'Яка реальна окупність станції 10 кВт у 2026 році?',
      ru: 'Какова реальная окупаемость станции 10 кВт в 2026 году?',
      en: 'What is the realistic ROI payback period for a 10 kW plant in 2026?'
    },
    answer: {
      uk: 'При поточному тарифі для населення (4.32 грн/кВт·год) тарифі комерції (8.80 грн/кВт·год) середня окупність гібридної СЕС складає 4–4.5 роки. Якщо ви підключаєте продаж надлишків за Зеленим тарифом (0.132 євро/кВт·год), строк окупності скорочується до 3.8 років.',
      ru: 'При текущих тарифах средняя окупаемость составляет 4–4.5 года. С подключением Зеленого тарифа срок сокращается до 3.8 лет.',
      en: 'With current Ukrainian electricity tariffs, average payback is 4 - 4.5 years. Exporting surplus power via Green Tariff drops this to 3.8 years.'
    }
  },
  {
    question: {
      uk: 'Як працює державний кредит під 0% (єВідновлення / Ощадбанк)?',
      ru: 'Как работает государственный кредит под 0%?',
      en: 'How does the state 0% green energy loan work?'
    },
    answer: {
      uk: 'Держава компенсує банківські відсотки за придбання сонячних станцій з акумуляторами для приватних домогосподарств. Сума кредиту — до 480 000 грн на строк до 5 років. Перший внесок — від 10%. Наш менеджер Віталій надає готовий пакет технічної документації для банку за 1 день.',
      ru: 'Государство компенсирует проценты банкам. Сумма кредита — до 480 000 грн на срок до 5 лет. Наш менеджер готовит пакет документов за 1 день.',
      en: 'The government subsidizes bank interest for homeowners installing solar + batteries. Loan amount up to $12,000 for 5 years. 10% downpayment.'
    }
  },
  {
    question: {
      uk: 'Яка площа даху потрібна для встановлення 10 кВт?',
      ru: 'Какая площадь крыши нужна для установки 10 кВт?',
      en: 'How much roof square footage is required for 10 kW?'
    },
    answer: {
      uk: 'Сучасні панелі Longi Hi-MO 6 мають потужність 580 Вт кожна. Для станції 10 кВт потрібно 18 фотомодулів. Розмір однієї панелі — 2.27м × 1.13м (близько 2.58 м²). Загальна необхідна площа чистого даху — орієнтовно 46–48 м².',
      ru: 'Для станции 10 кВт нужно 18 фотомодулей по 580 Вт. Общая необходимая площадь чистой крыши — ориентировочно 46–48 м².',
      en: 'Modern 580W panels require 18 modules for 10 kW. Each panel is ~2.58 m², requiring roughly 46 - 48 m² of clean roof area.'
    }
  },
  {
    question: {
      uk: 'Чи потрібно чистити панелі від снігу взимку?',
      ru: 'Нужно ли чистить панели от снега зимой?',
      en: 'Do solar panels need snow cleared off them during winter?'
    },
    answer: {
      uk: 'Панелі встановлюються під кутом 30–35 градусів. Завдяки гладкому гартованому склу та легкому нагріву фотомодуля під час генерації, сніг сповзає самостійно протягом кількох годин після снігопаду. Ручна механічна чистка зазвичай не потрібна.',
      ru: 'Панели ставятся под углом 30–35 градусов. Благодаря гладкому стеклу снег сползает самостоятельно.',
      en: 'Panels are mounted at a 30-35 degree tilt. Tempered glass and natural module warmth cause snow to slide off automatically.'
    }
  },
  {
    question: {
      uk: 'Яка різниця між мережевим та гібридним інвертором?',
      ru: 'В чем разница между сетевым и гибридным инвертором?',
      en: 'What is the difference between an on-grid and hybrid inverter?'
    },
    answer: {
      uk: 'Мережевий інвертор працює ТІЛЬКИ в парі з міською мережею Обленерго. Якщо на вулиці зникло світло, мережева станція вимикається задля безпеки електриків. Гібридний інвертор працює з акумуляторами: під час блекауту він за 10 мілісекунд відокремлює будинок від мережі і дає 220В/380В з батарей.',
      ru: 'Сетевой инвертор работает ТОЛЬКО при наличии городской сети. Гибридный инвертор работает с аккумуляторами и дает резервное питание.',
      en: 'On-grid inverters shut down during blackouts. Hybrid inverters disconnect from the grid in 10ms and supply backup power from storage batteries.'
    }
  },
  {
    question: {
      uk: 'Які документи потрібні для підключення Зеленого тарифу?',
      ru: 'Какие документы нужны для подключения Зеленого тарифа?',
      en: 'What documents are needed for Green Tariff connection?'
    },
    answer: {
      uk: 'Наші юристи готують повний пакет з 9 документів: заява до Обленерго, технічні умови, сертифікат відповідності інвертора, паспорт панелей, акт введення в експлуатацію, договір з постачальником послуг та інші. Вам не потрібно оббігати інстанції — ми супроводжуємо весь процес до пломбування лічильника.',
      ru: 'Наши юристы готовят полный пакет из 9 документов: заявление в Облэнерго, технические условия, сертификат соответствия инвертора, паспорт панелей, акт ввода в эксплуатацию и другие. Вам не нужно обходить инстанции — мы сопровождаем весь процесс.',
      en: 'Our legal team prepares all 9 required documents including grid operator application, technical specifications, inverter certificate, panel passport, commissioning act, and supply contract. We handle the entire process.'
    }
  },
  {
    question: {
      uk: 'Скільки часу займає монтаж СЕС під ключ?',
      ru: 'Сколько времени занимает монтаж СЭС под ключ?',
      en: 'How long does turnkey SES installation take?'
    },
    answer: {
      uk: 'Монтаж приватної гібридної станції 5–15 кВт триває 1–2 дні. Комерційні об\'єкти 30–100 кВт — 3–6 днів. Термін від моменту підписання договору до введення в експлуатацію — 5–10 робочих днів, включаючи доставку обладнання, монтаж та пусконаладку.',
      ru: 'Монтаж частной гибридной станции 5–15 кВт занимает 1–2 дня. Коммерческие объекты 30–100 кВт — 3–6 дней. Срок от подписания договора до ввода в эксплуатацию — 5–10 рабочих дней.',
      en: 'Residential hybrid plant installation (5-15 kW) takes 1-2 days. Commercial 30-100 kW sites take 3-6 days. Full turnaround from contract to commissioning is 5-10 business days.'
    }
  },
  {
    question: {
      uk: 'Що входить у кошторис під ключ? Чи будуть додаткові витрати?',
      ru: 'Что входит в смету под ключ? Будут ли дополнительные расходы?',
      en: 'What is included in the turnkey estimate? Are there hidden costs?'
    },
    answer: {
      uk: 'У кошторис входить: обладнання (панелі, інвертор, АКБ), система кріплень, кабельна продукція, доставка, монтаж, пусконаладка та оформлення документів для Зеленого тарифу. Єдині можливі додаткові витрати — це заміна лічильника (~3000 грн, робить Обленерго) та підвищення виділеної потужності на стовпі (теж Обленерго).',
      ru: 'В смету входит: оборудование (панели, инвертор, АКБ), система креплений, кабельная продукция, доставка, монтаж, пусконаладка и оформление документов для Зеленого тарифа. Единственные возможные дополнительные расходы — замена счетчика (~3000 грн) и повышение выделенной мощности.',
      en: 'The estimate includes: equipment (panels, inverter, battery), mounting system, cables, delivery, installation, commissioning, and Green Tariff documentation. Only potential extras are meter replacement (~$75) and power allocation upgrade by the grid operator.'
    }
  },
  {
    question: {
      uk: 'Чи потрібен дозвіл або узгодження на встановлення сонячних панелей?',
      ru: 'Нужно ли разрешение или согласование на установку солнечных панелей?',
      en: 'Is a permit or approval required for solar panel installation?'
    },
    answer: {
      uk: 'Для приватних будинків на власному даху дозвіл на будівництво не потрібен. Але обов\'язково потрібно узгодити підключення до мережі Обленерго та отримати технічні умови. Для комерційних об\'єктів може знадобитися проект та експертний висновок. Наші інженери беруть на себе весь процес узгодження.',
      ru: 'Для частных домов на собственной крыше разрешение на строительство не требуется. Но обязательно нужно согласовать подключение к сети Облэнерго и получить технические условия. Для коммерческих объектов может потребоваться проект и экспертное заключение.',
      en: 'For residential homes with own roof, no building permit is needed. Grid connection approval with the operator is mandatory. Commercial sites may require engineering project and expert assessment. Our engineers handle all coordination.'
    }
  },
  {
    question: {
      uk: 'Як працює моніторинг станції після монтажу?',
      ru: 'Как работает мониторинг станции после монтажа?',
      en: 'How does the monitoring system work after installation?'
    },
    answer: {
      uk: 'Кожен інвертор Deye або Huawei обладнаний Wi-Fi модулем. Через мобільний додаток ви бачите генерацію в реальному часі, заряд АКБ, накопичену економію та графік виробітку за місяць/рік. Наш сервісний центр також відстежує вашу станцію онлайн і повідомить про будь-які відхилення.',
      ru: 'Каждый инвертор Deye или Huawei оснащен Wi-Fi модулем. Через мобильное приложение вы видите генерацию в реальном времени, заряд АКБ, накопленную экономику и график выработки. Наш сервисный центр также отслеживает вашу станцию онлайн.',
      en: 'Every Deye or Huawei inverter has a Wi-Fi module. The mobile app shows real-time generation, battery charge, accumulated savings, and monthly/yearly production charts. Our service center also monitors your station remotely.'
    }
  },
  {
    question: {
      uk: 'Що буде, якщо інвертор зламається під час гарантійного терміну?',
      ru: 'Что будет, если инвертор сломается во время гарантийного срока?',
      en: 'What happens if the inverter fails during the warranty period?'
    },
    answer: {
      uk: 'Інвертори Deye та Huawei мають офіційну гарантію 10 років. У разі поломки ми організовуємо заміну або ремонт протягом 48 годин. На час ремонту, якщо у вас гібридна система з АКБ, будинок продовжує працювати від акумуляторів. Ми маємо запасні інвертори на складі для термінової заміни.',
      ru: 'Инверторы Deye и Huawei имеют официальную гарантию 10 лет. В случае поломки мы организуем замену или ремонт в течение 48 часов. На время ремонта дом продолжает работать от аккумуляторов.',
      en: 'Deye and Huawei inverters come with a 10-year official warranty. In case of failure, we arrange replacement or repair within 48 hours. During repair, hybrid systems keep running on battery power.'
    }
  },
  {
    question: {
      uk: 'Чи можна встановити СЕС на багатоповерхівці або в офісній будівлі?',
      ru: 'Можно ли установить СЭС на многоэтажке или в офисном здании?',
      en: 'Can SES be installed on an apartment building or office?'
    },
    answer: {
      uk: 'Для багатоповерхівок потрібен дозвіл від усіх власників квартир, які мають частку у даху, та від ОСБ. Для офісних та комерційних будівель — стандартна процедура з власником будівлі. Ми виконували проекти на дахах торгових центрів, складів та виробничих приміщень потужністю до 100 кВт.',
      ru: 'Для многоэтажек нужно разрешение от всех владельцев квартир, имеющих долю в крыше, и от ОСБ. Для офисных и коммерческих зданий — стандартная процедура с владельцем.',
      en: 'For apartment buildings, consent from all flat owners with roof share and the HOA is needed. For offices and commercial buildings, standard procedure with the building owner applies.'
    }
  },
  {
    question: {
      uk: 'Як змінюються виплати за Зеленим тарифом протягом року?',
      ru: 'Как меняются выплаты по Зеленому тарифу в течение года?',
      en: 'How do Green Tariff payments change throughout the year?'
    },
    answer: {
      uk: 'Виплати залежать від сезонної генерації: влітку (червень–серпень) виробіток максимум, взимку — мінімум. Ставка 0.132 євро/кВт·год фіксована, але перераховується в гривню за курсом НБУ. Середньорічний дохід станції 10 кВт у Центральній Україні — близько 990 євро на рік.',
      ru: 'Выплаты зависят от сезонной генерации: летом выработка максимальна, зимой — минимальная. Ставка 0.132 евро/кВт·ч фиксирована, но пересчитывается в гривню по курсу НБУ.',
      en: 'Payments depend on seasonal generation: peak in summer (June-August), lowest in winter. The 0.132 EUR/kWh rate is fixed but converted to UAH at NBU exchange rates. Average annual income for 10 kW in Central Ukraine is about 990 EUR.'
    }
  },
  {
    question: {
      uk: 'Чи є знижки на великі обсяги або для постійних клієнтів?',
      ru: 'Есть ли скидки на большие объемы или для постоянных клиентов?',
      en: 'Are there volume discounts or repeat customer offers?'
    },
    answer: {
      uk: 'Для комерційних об\'єктів від 30 кВт діє прогресивна знижка до 8%. Для клієнтів, які рекомендують нас друзям — бонус 200$ на сервісне обслуговування. Також діє сезонна акція на підсилення кроквеної системи — безкоштовно при замовленні станції від 10 кВт.',
      ru: 'Для коммерческих объектов от 30 кВт действует прогрессивная скидка до 8%. Для клиентов, рекомендующих нас друзьям — бонус 200$ на сервисное обслуживание.',
      en: 'For commercial sites from 30 kW, progressive discounts up to 8% apply. Referral bonus of $200 for service maintenance. Seasonal promo: free rafter reinforcement with orders above 10 kW.'
    }
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'greentariff-2026-changes',
    title: {
      uk: 'Зелений тариф 2026 в Україні: ставка у євро, нові вимоги Обленерго та як зафіксувати ціну',
      ru: 'Зеленый тариф 2026 в Украине: ставка в евро, новые требования Облэнерго и фиксация',
      en: 'Ukraine Green Tariff 2026 Guide: EUR rates, grid requirements and net billing'
    },
    excerpt: {
      uk: 'Розбираємо детально фінансові умови виплат від Гарантованого покупця у 2026 році, різницю з Net Billing та список документів.',
      ru: 'Разбираем финансовые условия выплат от Гарантированного покупателя в 2026 году и разницу с Net Billing.',
      en: 'Detailed breakdown of guaranteed EUR feed-in tariffs, net billing legislation and legal checklist.'
    },
    content: {
      uk: `## Зелений тариф у 2026 році: що потрібно знати інвестору

Згідно з чинним законодавством України, ставка Зеленого тарифу для приватних сонячних електростанцій, введених в експлуатацію до кінця 2029 року, зафіксована на рівні **0.132 євро за кожну кіловат-годину** чистого експорту в мережу.

### Чому вигідно підключати Зелений тариф саме зараз?

1. **Прив'язка до курсу євро:** Всі виплати щомісяця перераховуються НКРЕКП у гривню за актуальним середнім курсом НБУ. Це 100% валютний хеджинг інвестицій.
2. **Гарантія викупу:** Держава зобов'язана викуповувати весь обсяг згенерованої енергії, яку будинок не спожив самостійно.

### Покроковий алгоритм легалізації від юристів GURU ENERGY

* **Крок 1:** Заміна стандартного лічильника на двонаправлений з GSM/PLC модемом (Gama або Landis+Gyr).
* **Крок 2:** Подача заяви до районного підрозділу Обленерго разом із сертифікатами відповідності інвертора Deye/Solis.
* **Крок 3:** Отримання акту вводу в експлуатацію та пломбування клемної кришки.
* **Крок 4:** Підписання договору з постачальником універсальних послуг та відкриття окремого рахунку IBAN.

> *Порада головного інженера:* Якщо ви встановлюєте станцію 10 кВт, річний надлишок у Центральній Україні складе близько 7 500 кВт·год, що принесе вам орієнтовно **990 євро чистого пасивного доходу щороку**.`,
      ru: `## Зеленый тариф в 2026 году: главные цифры для инвестора

Ставка Зеленого тарифа для частных СЭС зафиксирована на уровне **0.132 евро за кВт·ч** чистого экспорта. Все выплаты пересчитываются по курсу НБУ.`,
      en: `## Green Tariff 2026 Guide

The feed-in tariff rate is officially pegged at **0.132 EUR per exported kWh**. Payments are adjusted monthly according to National Bank currency exchange rates.`
    },
    tag: { uk: 'Зелений тариф', ru: 'Зеленый тариф', en: 'Green Tariff' },
    tagKey: 'greentariff',
    publishedAt: '24.06.2026',
    readTime: { uk: '5 хв читання', ru: '5 мин чтения', en: '5 min read' },
    author: 'Максим Терещенко (Головний юрисконсульт)',
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'post-2',
    slug: 'hybrid-vs-ongrid-which-to-choose',
    title: {
      uk: 'Гібридна чи Мережева СЕС: що краще для будинку в умовах відключень світла?',
      ru: 'Гибридная или Сетевая СЭС: что лучше для дома в условиях отключений света?',
      en: 'Hybrid vs On-grid Solar Station: Which is Better for Residential Backup?'
    },
    excerpt: {
      uk: 'Порівняння кошторисів, технічних можливостей інверторів Deye та Solis, а також підводні камені акумуляторів LiFePO4.',
      ru: 'Сравнение смет, технических возможностей инверторов Deye и Solis, а также аккумуляторов LiFePO4.',
      en: 'Comparing upfront hardware costs, Deye vs Solis inverter engineering and LiFePO4 storage behavior.'
    },
    content: {
      uk: `## Головна дилема 2026 року: економія чи безперебійність?

Коли перед замовником постає питання вибору конфігурації, ми завжди аналізуємо ввідний щит об'єкту та цілі власника.

### Мережева СЕС (On-grid)

* **Плюси:** Найнижча вартість за 1 кВт встановленої потужності. Швидкий монтаж.
* **Мінуси:** При вимкненні міської ЛЕП інвертор вимикає генерацію. Ви сидите без світла навіть у ясний сонячний день.

### Гібридна СЕС з АКБ (Hybrid)

Гібридний інвертор (наприклад, **Deye SUN-10K-SG04LP3**) має окремий вихід *Load/Critical*. Всі життєво важливі прилади підключаються на цю лінію.

1. Час перемикання під час обриву ЛЕП — **менше 4 мілісекунд**. Комп'ютери не перезавантажуються.
2. Розумна пріоритезація: Сонце -> Будинок -> Заряд АКБ -> Продаж в мережу.`,
      ru: `## Сетевая или Гибридная СЭС: детальное сравнение

Гибридные инверторы Deye SUN-10K обеспечивают автоматическое резервирование дома за 4 мс при отключениях.`,
      en: `## Hybrid vs On-grid Solar

Hybrid Deye SUN-10K inverters provide sub-4ms critical backup switching during grid blackouts.`
    },
    tag: { uk: 'Для дому', ru: 'Для дома', en: 'For Home' },
    tagKey: 'home',
    publishedAt: '20.06.2026',
    readTime: { uk: '4 хв читання', ru: '4 мин чтения', en: '4 min read' },
    author: 'Віталій Бондаренко (Головний інженер проектувач)',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'post-3',
    slug: 'state-0-loan-guide-evidnovlennya',
    title: {
      uk: 'Як отримати державний кредит 0% на сонячні панелі та акумулятори через Ощадбанк і ПриватБанк',
      ru: 'Как получить государственный кредит 0% на солнечные панели и АКБ через государственные банки',
      en: 'How to Qualify for Ukraine\'s 0% State Green Energy Grant Loans'
    },
    excerpt: {
      uk: 'Повний список документів, розрахунок щомісячного платежу для пакета 8 кВт та вимоги до позичальника.',
      ru: 'Полный список документов, расчет ежемесячного платежа для пакета 8 кВт и требования.',
      en: 'Complete banking documentation checklist, monthly installment calculator and qualifying criteria.'
    },
    content: {
      uk: `## Державна програма компенсації 0% для населення

Кабінет Міністрів України запустив безпрецедентну кредитну підтримку для забезпечення енергетичної стійкості громадян.

### Основні параметри позики:

* **Максимальна сума:** до 480 000 грн.
* **Термін кредитування:** до 60 місяців (5 років).
* **Процентна ставка для клієнта:** **0% річних** (відсотки банку сплачує Фонд енергоефективності).
* **Авансовий внесок:** від 10% вартості кошторису.

### Чому банк може відмовити і як GURU ENERGY гарантує погодження?

Банки вимагають чіткої відповідності обладнання технічним регламентам. Компанія GURU ENERGY надає офіційний комерційний рахунок-фактуру з IEC-сертифікатами на кожен інвертор Deye та фотомодуль Longi.`,
      ru: `## Программа 0% кредитования в Ощадбанке и ПриватБанке

Сумма кредита до 480 000 грн на 5 лет под 0%. Первый взнос от 10%. Полный супровід документов от компании.`,
      en: `## 0% Green Energy Loans

State grants cover 100% of interest for residential battery + solar installations up to $12,000.`
    },
    tag: { uk: 'Кредит 0%', ru: 'Кредит 0%', en: '0% Loan' },
    tagKey: 'loan',
    publishedAt: '15.06.2026',
    readTime: { uk: '6 хв читання', ru: '6 мин чтения', en: '6 min read' },
    author: 'Олена Корицька (Керівник фінансового відділу)',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'post-4',
    slug: 'business-ses-payback-case-study',
    title: {
      uk: 'СЕС для Бізнесу 50 кВт: як зрізати рахунки за електроенергію супермаркету на 80 тис. грн щомісяця',
      ru: 'СЭС для Бизнеса 50 кВт: как срезать счета за электроэнергию супермаркета на 80 тыс. грн',
      en: 'Commercial SES 50 kW TCO Analysis: Slicing Enterprise Monthly Power Bills'
    },
    excerpt: {
      uk: 'Реальна фінмодель торгового центру в Полтаві: споживання кондиціонерів, графіка виробітку Huawei та економія.',
      ru: 'Реальная финмодель торгового центра в Полтаве: потребление кондиционеров и экономия.',
      en: 'Real commercial financial model for shopping mall HVAC loads and Huawei smart net billing.'
    },
    content: {
      uk: `## Фінмодель комерційної сонячної станції 50 кВт

Для юридичних осіб тариф на електроенергію з урахуванням доставки та ПДВ становить понад **8.80 грн за 1 кВт·год**.

### Графік генерації ідеально збігається з піком споживання

Торгові центри, склади з холодильниками та СТО споживають найбільше саме з 09:00 до 17:00. В цей час станція на панелях **Jinko N-Type 585W** видає пікову генерацію.

* Виробіток за червень–серпень: близько 8 200 кВт·год на місяць.
* Чиста пряма економія за місяць: **72 160 грн**.
* Строк повної окупності обладнання: **2.7 роки**.`,
      ru: `## Финмодель коммерческой СЭС 50 кВт для бизнеса

Прямая экономия для супермаркета или склада достигает 72 000 грн ежемесячно в летний период.`,
      en: `## Commercial 50 kW Plant ROI

Direct enterprise TCO savings exceed $1,800 monthly during peak air conditioning periods.`
    },
    tag: { uk: 'Для бізнесу', ru: 'Для бизнеса', en: 'For Business' },
    tagKey: 'business',
    publishedAt: '10.06.2026',
    readTime: { uk: '5 хв читання', ru: '5 мин чтения', en: '5 min read' },
    author: 'Дмитро Кравченко (Керівник B2B напрямку)',
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'post-5',
    slug: 'lifepo4-battery-deye-dyness-secrets',
    title: {
      uk: 'Чому акумулятори LiFePO4 витіснили гелеві (GEL) батареї в гібридних СЕС: 6000 циклів проти 400',
      ru: 'Почему аккумуляторы LiFePO4 вытеснили гелевые (GEL) батареи в гибридных СЭС: 6000 циклов',
      en: 'Why LiFePO4 Batteries Dominate Solar Storage: 6,000 Deep Cycles vs Lead-Acid GEL'
    },
    excerpt: {
      uk: 'Пожежна безпека літій-залізо-фосфату, струми заряду в 100А та чому гелеві АКБ здихають за 1 зиму блекаутів.',
      ru: 'Пожарная безопасность литий-железо-фосфата, токи заряда 100А и почему гелевые АКБ здыхают.',
      en: 'Fire safety of lithium iron phosphate, 100A fast charging currents and battery BMS diagnostics.'
    },
    content: {
      uk: `## Хімія АКБ визначає строк служби всієї сонячної системи

Коли на ринку з'явились дешеві гелеві та свинцево-кислотні батареї, багато хто намагався зекономити. Результат — роздуті корпуси через 8 місяців.

### Переваги LiFePO4 (на прикладі Deye RW-M6.1):

1. **Швидкість заряду:** Допустимий струм заряду 100А. Коли Обленерго дає світло на 2 години, батарея встигає заправитись на 95%. Гелевій потрібно 12 годин.
2. **Кількість циклів:** Гарантовані **6000 циклів** при глибині розряду 90% (DoD). Це понад 16 років щоденної експлуатації.`,
      ru: `## Сравнение химии аккумуляторов для дома

LiFePO4 выдерживают токи заряда в 100А и полностью заряжаются за 2 часа наличия сети в блэкаут.`,
      en: `## LiFePO4 Battery Engineering

Dyness and Deye LiFePO4 battery storage supports 100A fast charge rates and 6,000 deep cycles.`
    },
    tag: { uk: 'Технічно', ru: 'Технически', en: 'Technical' },
    tagKey: 'tech',
    publishedAt: '02.06.2026',
    readTime: { uk: '7 хв читання', ru: '7 мин чтения', en: '7 min read' },
    author: 'Віталій Бондаренко (Головний інженер)',
    image: 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?auto=format&fit=crop&w=800&q=80'
  }
];

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-mock-1',
    name: 'Валерій Степаненко',
    phone: '+38 (067) 442-81-90',
    power: '10 кВт',
    sesType: 'Гібридна з АКБ',
    source: 'Калькулятор Головної',
    status: 'new',
    createdAt: '26.06.2026 14:20',
    lang: 'uk'
  },
  {
    id: 'lead-mock-2',
    name: 'Сергій Миколайович (ТОВ «Агро Постач»)',
    phone: '+38 (050) 911-33-40',
    power: '50 кВт',
    sesType: 'Для Бізнесу',
    source: 'Форма підвалу',
    status: 'in-progress',
    createdAt: '25.06.2026 18:45',
    lang: 'uk'
  },
  {
    id: 'lead-mock-3',
    name: 'Ксенія Григорович',
    phone: '+38 (063) 112-99-05',
    power: '8 кВт',
    sesType: 'Кредит 0% єВідновлення',
    source: 'Хед-банер',
    status: 'closed',
    createdAt: '24.06.2026 11:15',
    lang: 'uk'
  }
];

export const INITIAL_WAITLIST: WaitlistEmail[] = [
  { id: 'w-1', email: 'v.tkachenko.tech@gmail.com', createdAt: '26.06.2026 12:10' },
  { id: 'w-2', email: 'director.solar.invest@ukr.net', createdAt: '25.06.2026 09:30' },
  { id: 'w-3', email: 'alex.smart.home@gmail.com', createdAt: '23.06.2026 21:05' }
];
