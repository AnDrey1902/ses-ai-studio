/* =========================================================
   <energy-monitor> — self-contained live station-monitoring widget
   ---------------------------------------------------------
   Drop-in Web Component. No build step, no dependencies.
   Encapsulated with Shadow DOM, so multiple instances are fully
   isolated — they never share state or leak styles into/out of the host.

   USAGE
   -----
     <script src="energy-monitor.js" defer></script>
     <energy-monitor type="home" power="10"></energy-monitor>

   CONFIGURE (declarative — attributes)
     type           initial object type key ("home" | "biz")
     power          initial station power, kW
     autoplay       "false" to stop the looping day animation
     hour-ms        ms per simulated hour (default 650)
     end-pause-ms   pause at end of day before switching station (default 1200)
     start-hour     clock hour the profile starts at (for the live readout)
     monthly-per-kw comma list of 12 — kWh generated per 1 kW for each month (Jan…Dec)
     title / unit / currency / locale
     online-label / now-label / today-label / month-label / saved-label
     energy-unit / energy-unit-big
     label-home / label-biz          display names for the two types
     tariff-home / tariff-biz        price per kWh
     powers-home / powers-biz        comma list, e.g. "5,10,30"
     profile        comma list of normalized hourly generation (peak = 1)
     axis           comma list of x-axis labels

   CONFIGURE (programmatic — full control, highest priority)
     el.config = { profile:[...], types:{ home:{label,tariff,powers}, ... }, ... };

   THEME (CSS custom properties, set per instance — they pierce Shadow DOM)
     --em-accent, --em-green, --em-surface, --em-border, --em-text,
     --em-muted, --em-radius, --em-pad, --em-font-display, --em-font-body, …

   API
     el.setStation(type, power)   switch programmatically
     el.play() / el.pause()
   ========================================================= */
(function () {
  'use strict';
  if (typeof window === 'undefined' || window.customElements == null) return;
  if (customElements.get('energy-monitor')) return;

  var DEFAULTS = {
    title: 'Моніторинг станції',
    onlineLabel: 'online',
    offlineLabel: 'offline',
    nowLabel: 'поточна генерація',
    todayLabel: 'сьогодні',
    monthLabel: 'цей місяць',
    savedLabel: 'заощаджено',
    unit: 'кВт',
    energyUnit: 'кВт·год',
    energyUnitBig: 'МВт·год',
    currency: '₴',
    locale: 'uk-UA',
    startHour: 6,
    axis: ['6:00', '12:00', '18:00'],
    /* normalized solar curve, hourly. Peak = 1. Swap for a real 0:00–24:00 curve. */
    profile: [0.05, 0.12, 0.28, 0.48, 0.68, 0.85, 0.97, 1, 0.92, 0.76, 0.55, 0.32, 0.12],
    /* measured generation per 1 kW of installed capacity, kWh per calendar month (Jan…Dec).
       All monthly / yearly figures = monthlyPerKw[m] * station kW.
       (Defaults from a real 10 kW station ÷ 10; March = 1030/10.) */
    monthlyPerKw: [24.6, 45.8, 103.0, 137.2, 181.6, 190.2, 187.1, 161.0, 106.2, 63.4, 30.0, 18.5],
    monthLabels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    currentMonth: null, /* null = real current month */
    monthsTitle: 'Виробіток по місяцях',
    monthsHintBefore: ' (можна міняти у ',
    monthsHintWord: 'offline',
    monthsHintAfter: ' режимі)',
    yearNowLabel: 'вироблено на зараз',
    yearForecastLabel: 'прогноз за рік',
    yearSavedLabel: 'заощаджено за рік',
    autoLabel: 'Авто',
    hourMs: 650,
    endPauseMs: 1200,
    autoplay: true,
    type: 'home',
    power: 10,
    types: {
      home: { label: 'Дім', tariff: 4.32, powers: [5, 10, 30] },
      biz:  { label: 'Бізнес', tariff: 16, powers: [30, 50, 100] }
    },
    sequence: null /* derived from types if null */
  };

  var STYLE =
    ':host{' +
      '--em-radius:24px;--em-pad:clamp(.9rem,1vw + 1vh,1.4rem);' +
      '--em-gap:clamp(.5rem,1.1vh,.8rem);--em-value-fs:clamp(1.85rem,min(4.6vw,5vh),2.9rem);--em-chart-h:clamp(56px,11vh,86px);' +
      '--em-surface:rgba(255,255,255,.08);--em-border:rgba(255,255,255,.16);--em-blur:16px;' +
      '--em-shadow:0 30px 70px rgba(7,20,15,.16);' +
      '--em-text:#fff;--em-muted:#9fbcae;--em-muted-2:#cfe3da;' +
      '--em-accent:#ffc742;--em-accent-2:#f59e0b;--em-green:#22b865;--em-green-2:#0f7a40;--em-live:#34e07e;' +
      "--em-grad-green:linear-gradient(135deg,#22b865,#0f7a40);--em-grad-sun:linear-gradient(135deg,#ffd23f,#f59e0b);" +
      "--em-font-display:'Sora',system-ui,sans-serif;--em-font-body:'Manrope',system-ui,sans-serif;" +
      'display:block;box-sizing:border-box;font-family:var(--em-font-body);color:var(--em-text);-webkit-font-smoothing:antialiased;}' +
    ':host([hidden]){display:none;}' +
    '*,*::before,*::after{box-sizing:border-box;}' +
    '.card{display:grid;gap:var(--em-gap);padding:var(--em-pad);border-radius:var(--em-radius);' +
      '-webkit-user-select:none;user-select:none;' +
      'background:var(--em-surface);border:1px solid var(--em-border);' +
      '-webkit-backdrop-filter:blur(var(--em-blur));backdrop-filter:blur(var(--em-blur));box-shadow:var(--em-shadow);}' +
    '.head{display:flex;align-items:center;gap:.6rem;}' +
    '.title{font-family:var(--em-font-display);font-weight:700;font-size:1.05rem;margin:0;margin-right:auto;white-space:nowrap;color:var(--em-text);}' +
    '.switch{display:inline-flex;align-items:center;gap:.35rem;border:0;background:transparent;cursor:pointer;padding:0;color:var(--em-muted);font:inherit;}' +
    '.switch-track{position:relative;width:32px;height:18px;border-radius:999px;background:rgba(255,255,255,.16);transition:background .2s;}' +
    '.switch-knob{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;background:#fff;transition:transform .2s;}' +
    '.switch[aria-checked="true"] .switch-track{background:var(--em-green);}' +
    '.switch[aria-checked="true"] .switch-knob{transform:translateX(14px);}' +
    '.live{display:inline-flex;align-items:center;gap:.4rem;font-size:.78rem;font-weight:700;color:#5ee29a;text-transform:uppercase;letter-spacing:.05em;white-space:nowrap;}' +
    '.live i{width:8px;height:8px;border-radius:50%;background:var(--em-live);box-shadow:0 0 0 0 rgba(52,224,126,.6);animation:em-blip 1.8s infinite;}' +
    '@keyframes em-blip{0%{box-shadow:0 0 0 0 rgba(52,224,126,.55);}70%,100%{box-shadow:0 0 0 8px rgba(52,224,126,0);}}' +
    '.live.off{color:#ff5c5c;}' +
    '.live.off i{background:#ff5c5c;box-shadow:none;animation:none;}' +
    '.controls{display:flex;flex-wrap:wrap;align-items:center;gap:.5rem .7rem;}' +
    '.types{display:inline-flex;gap:3px;padding:3px;border-radius:999px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.14);}' +
    '.type{font-family:var(--em-font-body);font-weight:700;font-size:.78rem;color:var(--em-muted);padding:.32rem .8rem;border:0;border-radius:999px;background:transparent;cursor:pointer;transition:color .2s,background .2s;}' +
    '.type[aria-selected="true"]{color:#04130b;background:var(--em-grad-green);}' +
    '.powers{display:inline-flex;flex-wrap:wrap;gap:4px;}' +
    '.power{font-family:var(--em-font-display);font-weight:700;font-size:.76rem;color:var(--em-muted-2);padding:.3rem .55rem;border:1px solid rgba(255,255,255,.18);border-radius:12px;background:rgba(255,255,255,.05);cursor:pointer;transition:color .2s,background .2s,border-color .2s;}' +
    '.power:hover{border-color:rgba(255,255,255,.4);}' +
    '.power[aria-pressed="true"]{color:#1a0f00;background:var(--em-grad-sun);border-color:transparent;}' +
    '.now{display:flex;align-items:baseline;flex-wrap:wrap;gap:.1rem .6rem;}' +
    '.value{font-family:var(--em-font-display);font-weight:800;font-size:var(--em-value-fs);line-height:1;color:var(--em-accent);}' +
    '.value b{font-weight:800;font-variant-numeric:tabular-nums;}' +
    '.value small{font-size:.9rem;font-weight:700;color:var(--em-muted-2);}' +
    '.now-label{font-size:.9rem;color:var(--em-muted);}' +
    '.chart{display:flex;align-items:flex-end;gap:6px;height:var(--em-chart-h);padding-top:.75rem;overflow:visible;}' +
    /* .bar = full-height column (fixes the value label to the top so labels never overlap neighbours) */
    '.bar{position:relative;flex:1;height:100%;display:flex;align-items:flex-end;}' +
    '.bar-fill{width:100%;height:var(--h);min-height:3px;border-radius:6px 6px 2px 2px;' +
      'background:linear-gradient(180deg,rgba(34,184,101,.22),rgba(15,122,64,.1));transition:height .5s cubic-bezier(.2,.8,.2,1),background .35s ease,box-shadow .35s ease;}' +
    '.bar.on .bar-fill{background:linear-gradient(180deg,rgba(34,184,101,.95),rgba(15,122,64,.55));}' +
    '.bar.active .bar-fill{background:var(--em-grad-sun);box-shadow:0 0 16px rgba(255,178,0,.5);}' +
    '.bar-val{position:absolute;bottom:100%;left:50%;transform:translate(-50%,-3px);font-family:var(--em-font-display);font-weight:700;font-size:.7rem;line-height:1;color:var(--em-accent);white-space:nowrap;opacity:0;transition:opacity .25s ease;pointer-events:none;}' +
    '.bar.active .bar-val{opacity:1;}' +
    '.axis{display:flex;justify-content:space-between;font-size:.72rem;color:var(--em-muted);margin-top:.35rem;}' +
    '.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:.6rem;padding-top:clamp(.4rem,.9vh,.65rem);border-top:1px solid rgba(255,255,255,.12);}' +
    '.stats>div{display:flex;flex-direction:column;gap:.1rem;}' +
    '.stats strong{font-family:var(--em-font-display);font-size:.95rem;color:var(--em-text);}' +
    '.stats span{font-size:.72rem;color:var(--em-muted);}' +
    /* yearly row */
    '.year{display:grid;grid-template-columns:repeat(3,1fr);gap:.5rem;padding-top:clamp(.4rem,.9vh,.6rem);border-top:1px solid rgba(255,255,255,.12);}' +
    '.year>div{display:flex;flex-direction:column;gap:.1rem;min-width:0;}' +
    '.year strong{font-family:var(--em-font-display);font-size:.92rem;color:var(--em-accent);white-space:nowrap;}' +
    '.year span{font-size:.68rem;color:var(--em-muted);}' +
    '.year .year-forecast,.year .year-saved-v{color:var(--em-muted-2);}' +
    /* monthly breakdown */
    '.months{padding-top:clamp(.4rem,.9vh,.6rem);border-top:1px solid rgba(255,255,255,.12);}' +
    '.months-title{font-size:.72rem;font-weight:700;color:var(--em-muted-2);text-transform:uppercase;letter-spacing:.04em;}' +
    '.months-hint{text-transform:none;font-weight:600;font-size:.66rem;letter-spacing:0;color:var(--em-muted);}' +
    '.months-hint .off{color:#ff5c5c;}' +
    '.months-chart{display:flex;align-items:flex-end;gap:3px;height:30px;padding-top:.7rem;margin-top:.25rem;overflow:visible;}' +
    '.m-bar{position:relative;flex:1;height:100%;display:flex;align-items:flex-end;}' +
    '.m-bar-fill{width:100%;height:var(--h);min-height:2px;border-radius:3px 3px 1px 1px;background:linear-gradient(180deg,rgba(34,184,101,.5),rgba(15,122,64,.22));transition:background .3s,box-shadow .3s;}' +
    /* larger invisible hit area so short bars are easy to click/tap/hover */
    '.m-bar::before{content:"";position:absolute;left:-1px;right:-1px;bottom:0;top:-44px;}' +
    '.months.manual .m-bar{cursor:pointer;}' +
    '.m-bar.passed .m-bar-fill{background:var(--em-grad-sun);}' +
    '.m-bar.sel .m-bar-fill{box-shadow:0 0 10px rgba(255,178,0,.45);}' +
    '.m-bar-val{position:absolute;bottom:100%;left:50%;transform:translate(-50%,-2px);font-family:var(--em-font-display);font-weight:700;font-size:.6rem;line-height:1;color:var(--em-accent);white-space:nowrap;opacity:0;}' +
    '.m-bar.sel .m-bar-val{opacity:1;}' +
    '.months-axis{display:flex;gap:3px;margin-top:.3rem;}' +
    '.months-axis span{flex:1;text-align:center;font-size:.56rem;color:var(--em-muted);}' +
    '.months-axis span.sel{color:var(--em-accent);font-weight:700;}' +
    '@media (prefers-reduced-motion:reduce){.bar-fill,.bar-val,.m-bar-fill{transition:none;}.live i{animation:none;}}';

  /* ---- small helpers ---- */
  function isObj(v) { return v && typeof v === 'object' && !Array.isArray(v); }
  function clone(v) { return JSON.parse(JSON.stringify(v)); }
  function deepMerge(target, src) {
    Object.keys(src).forEach(function (k) {
      if (isObj(src[k]) && isObj(target[k])) deepMerge(target[k], src[k]);
      else target[k] = isObj(src[k]) ? clone(src[k]) : src[k];
    });
    return target;
  }
  function numList(str) {
    return String(str).split(',').map(function (s) { return parseFloat(s.trim()); })
      .filter(function (n) { return isFinite(n); });
  }
  function strList(str) {
    return String(str).split(',').map(function (s) { return s.trim(); }).filter(Boolean);
  }

  class EnergyMonitor extends HTMLElement {
    constructor() {
      super();
      this._userConfig = null;   /* set via .config = {...} */
      this._built = false;
      this._timer = null;
      this._running = false;
      this._io = null;
      this._online = true;
      this._hoverMonth = null;
      this._state = { type: 'home', kw: 10, hour: 0, seqIdx: 0 };
    }

    /* programmatic full config */
    set config(obj) {
      this._userConfig = obj && typeof obj === 'object' ? clone(obj) : null;
      if (this._built) this._init();
    }
    get config() { return this._userConfig; }

    connectedCallback() {
      if (!this._built) this._build();
      this._init();
    }
    disconnectedCallback() {
      this._clearTimer();
      if (this._io) { this._io.disconnect(); this._io = null; }
    }

    /* ---- public API ---- */
    play() { this._setPlaying(true); }
    pause() { this._setPlaying(false); }
    setStation(type, power) { this._select(type, power); }

    /* ---- build shadow DOM once ---- */
    _build() {
      var root = this.attachShadow({ mode: 'open' });
      root.innerHTML =
        '<style>' + STYLE + '</style>' +
        '<div class="card" part="card">' +
          '<div class="head"><h3 class="title"></h3>' +
            '<span class="live"><i></i><span class="live-label"></span></span>' +
            '<button type="button" class="switch" role="switch" aria-checked="true">' +
              '<span class="switch-track"><span class="switch-knob"></span></span>' +
            '</button></div>' +
          '<div class="controls"><div class="types" role="tablist"></div>' +
            '<div class="powers" role="group"></div></div>' +
          '<div class="now"><span class="value"><b class="now-val">0.0</b> <small class="unit"></small></span>' +
            '<span class="now-label"></span></div>' +
          '<div class="chart"></div><div class="axis"></div>' +
          '<div class="stats">' +
            '<div><strong class="today">0</strong><span class="today-label"></span></div>' +
            '<div><strong class="month">0</strong><span class="month-label"></span></div>' +
            '<div><strong class="saved">0</strong><span class="saved-label"></span></div>' +
          '</div>' +
          '<div class="year">' +
            '<div><strong class="year-now">0</strong><span class="year-now-label"></span></div>' +
            '<div><strong class="year-forecast">0</strong><span class="year-forecast-label"></span></div>' +
            '<div><strong class="year-saved year-saved-v">0</strong><span class="year-saved-label"></span></div>' +
          '</div>' +
          '<div class="months">' +
            '<span class="months-title"></span>' +
            '<div class="months-chart"></div><div class="months-axis"></div>' +
          '</div>' +
        '</div>';
      var $ = function (sel) { return root.querySelector(sel); };
      this._el = {
        title: $('.title'), live: $('.live'), liveLabel: $('.live-label'), unit: $('.unit'),
        sw: $('.switch'),
        types: $('.types'), powers: $('.powers'),
        now: $('.now-val'), nowLabel: $('.now-label'),
        chart: $('.chart'), axis: $('.axis'),
        today: $('.today'), todayLabel: $('.today-label'),
        month: $('.month'), monthLabel: $('.month-label'),
        saved: $('.saved'), savedLabel: $('.saved-label'),
        yearNow: $('.year-now'), yearNowLabel: $('.year-now-label'),
        yearForecast: $('.year-forecast'), yearForecastLabel: $('.year-forecast-label'),
        yearSaved: $('.year-saved'), yearSavedLabel: $('.year-saved-label'),
        months: $('.months'), monthsTitle: $('.months-title'), monthsChart: $('.months-chart'), monthsAxis: $('.months-axis')
      };
      this._el.card = root.querySelector('.card');
      var self = this;
      this._el.sw.addEventListener('click', function () { self._setOnline(self._online !== true); });
      /* Click anywhere in the block (except the switch) also drives ONLINE/OFFLINE:
         single click → OFFLINE (freezes → manual month/power inspection),
         double click → back ONLINE (live auto-run).
         Capture phase so it runs before inner handlers (month pick, power chips). */
      this._el.card.addEventListener('click', function (e) {
        if (e.target.closest('.switch')) return;
        if (self._online) self._setOnline(false);
      }, true);
      this._el.card.addEventListener('dblclick', function (e) {
        if (e.target.closest('.switch')) return;
        self._setOnline(true);
      }, true);
      /* leaving the months block drops the hover-preview back to the committed month */
      this._el.months.addEventListener('mouseleave', function () { self._clearPreview(); });
      this._built = true;
    }

    _reduceMotion() {
      return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    /* ---- merge DEFAULTS < attributes < user .config ---- */
    _resolveConfig() {
      var c = clone(DEFAULTS);
      var a = this;
      var attr = function (n) { return a.getAttribute(n); };
      var has = function (n) { return a.hasAttribute(n); };

      if (has('title')) c.title = attr('title');
      if (has('online-label')) c.onlineLabel = attr('online-label');
      if (has('offline-label')) c.offlineLabel = attr('offline-label');
      if (has('now-label')) c.nowLabel = attr('now-label');
      if (has('today-label')) c.todayLabel = attr('today-label');
      if (has('month-label')) c.monthLabel = attr('month-label');
      if (has('saved-label')) c.savedLabel = attr('saved-label');
      if (has('unit')) c.unit = attr('unit');
      if (has('energy-unit')) c.energyUnit = attr('energy-unit');
      if (has('energy-unit-big')) c.energyUnitBig = attr('energy-unit-big');
      if (has('currency')) c.currency = attr('currency');
      if (has('locale')) c.locale = attr('locale');
      if (has('start-hour')) c.startHour = parseFloat(attr('start-hour'));
      if (has('hour-ms')) c.hourMs = parseFloat(attr('hour-ms'));
      if (has('end-pause-ms')) c.endPauseMs = parseFloat(attr('end-pause-ms'));
      if (has('autoplay')) c.autoplay = attr('autoplay') !== 'false';
      if (has('profile')) c.profile = numList(attr('profile'));
      if (has('axis')) c.axis = strList(attr('axis'));
      if (has('type')) c.type = attr('type');
      if (has('power')) c.power = parseFloat(attr('power'));
      if (has('label-home')) c.types.home.label = attr('label-home');
      if (has('label-biz')) c.types.biz.label = attr('label-biz');
      if (has('tariff-home')) c.types.home.tariff = parseFloat(attr('tariff-home'));
      if (has('tariff-biz')) c.types.biz.tariff = parseFloat(attr('tariff-biz'));
      if (has('powers-home')) c.types.home.powers = numList(attr('powers-home'));
      if (has('powers-biz')) c.types.biz.powers = numList(attr('powers-biz'));
      if (has('months-title')) c.monthsTitle = attr('months-title');
      if (has('year-now-label')) c.yearNowLabel = attr('year-now-label');
      if (has('year-forecast-label')) c.yearForecastLabel = attr('year-forecast-label');
      if (has('year-saved-label')) c.yearSavedLabel = attr('year-saved-label');
      if (has('auto-label')) c.autoLabel = attr('auto-label');
      if (has('current-month')) c.currentMonth = parseFloat(attr('current-month'));
      if (has('monthly-per-kw')) c.monthlyPerKw = numList(attr('monthly-per-kw'));
      if (has('month-labels')) c.monthLabels = strList(attr('month-labels'));

      if (this._userConfig) deepMerge(c, this._userConfig);

      /* derive auto-advance sequence if not supplied */
      if (!Array.isArray(c.sequence) || !c.sequence.length) {
        c.sequence = [];
        Object.keys(c.types).forEach(function (t) {
          (c.types[t].powers || []).forEach(function (kw) { c.sequence.push({ type: t, kw: kw }); });
        });
      }
      this._sunHours = c.profile.reduce(function (s, n) { return s + n; }, 0);
      this._peak = Math.max.apply(null, c.profile) || 1;
      return c;
    }

    /* ---- (re)initialise with current config ---- */
    _init() {
      this._clearTimer();
      var c = this._cfg = this._resolveConfig();
      var el = this._el;

      el.title.textContent = c.title;
      el.unit.textContent = c.unit;
      el.nowLabel.textContent = c.nowLabel;
      el.todayLabel.textContent = c.todayLabel;
      el.monthLabel.textContent = c.monthLabel;
      el.savedLabel.textContent = c.savedLabel;
      el.yearNowLabel.textContent = c.yearNowLabel;
      el.yearForecastLabel.textContent = c.yearForecastLabel;
      el.yearSavedLabel.textContent = c.yearSavedLabel;
      el.monthsTitle.textContent = c.monthsTitle;
      var mHint = document.createElement('span');
      mHint.className = 'months-hint';
      mHint.appendChild(document.createTextNode(c.monthsHintBefore));
      var mOff = document.createElement('span'); mOff.className = 'off';
      mOff.textContent = c.monthsHintWord;
      mHint.appendChild(mOff);
      mHint.appendChild(document.createTextNode(c.monthsHintAfter));
      el.monthsTitle.appendChild(mHint);
      this._playing = c.autoplay !== false;
      this._online = this._playing;
      this._updateLive();

      /* monthly breakdown (bar heights from monthlyPerKw — fixed; values follow power).
         _month = "today" anchor; _selMonth = month driving the highlight + cumulative. */
      var self0 = this;
      this._month = (c.currentMonth == null ? new Date().getMonth() : c.currentMonth) % 12;
      this._selMonth = this._month;
      this._hoverMonth = null;
      var maxMonth = Math.max.apply(null, c.monthlyPerKw) || 1;
      el.monthsChart.innerHTML = '';
      el.monthsAxis.innerHTML = '';
      this._mbars = [];
      this._mlabs = [];
      c.monthlyPerKw.forEach(function (val, m) {
        var bar = document.createElement('span');
        bar.className = 'm-bar';
        var fill = document.createElement('i'); fill.className = 'm-bar-fill';
        fill.style.setProperty('--h', Math.max((val / maxMonth) * 100, 2) + '%');
        var v = document.createElement('b'); v.className = 'm-bar-val';
        bar.appendChild(v);
        bar.appendChild(fill);
        var commit = function () { self0._selectMonth(m); };   /* click / tap = final choice */
        var preview = function () { self0._previewMonth(m); }; /* hover = temporary scrub */
        bar.addEventListener('click', commit);
        bar.addEventListener('mouseenter', preview);
        el.monthsChart.appendChild(bar);
        self0._mbars.push(bar);
        var lab = document.createElement('span');
        lab.textContent = c.monthLabels[m] || (m + 1);
        lab.addEventListener('click', commit);
        lab.addEventListener('mouseenter', preview);
        el.monthsAxis.appendChild(lab);
        self0._mlabs.push(lab);
      });

      /* type tabs */
      el.types.innerHTML = '';
      var self = this;
      Object.keys(c.types).forEach(function (key) {
        var b = document.createElement('button');
        b.type = 'button'; b.className = 'type'; b.dataset.type = key;
        b.setAttribute('role', 'tab');
        b.textContent = c.types[key].label;
        b.addEventListener('click', function () { self._select(key, self._state.kw); });
        el.types.appendChild(b);
      });

      /* bars */
      el.chart.innerHTML = '';
      this._bars = c.profile.map(function (frac) {
        var bar = document.createElement('span');
        bar.className = 'bar';
        var fill = document.createElement('i'); fill.className = 'bar-fill';
        fill.style.setProperty('--h', Math.max((frac / self._peak) * 100, 3) + '%');
        var v = document.createElement('b'); v.className = 'bar-val';
        bar.appendChild(v);
        bar.appendChild(fill);
        el.chart.appendChild(bar);
        return bar;
      });

      /* axis */
      el.axis.innerHTML = '';
      c.axis.forEach(function (lab) {
        var s = document.createElement('span'); s.textContent = lab; el.axis.appendChild(s);
      });

      /* pick a valid starting station */
      var type = c.types[c.type] ? c.type : Object.keys(c.types)[0];
      var powers = c.types[type].powers;
      var kw = powers.indexOf(c.power) !== -1 ? c.power : powers[0];
      this._state.seqIdx = this._seqIndexOf(type, kw);

      this._setupVisibilityPause();
      this._apply(type, kw);
    }

    _seqIndexOf(type, kw) {
      var seq = this._cfg.sequence;
      for (var i = 0; i < seq.length; i++) if (seq[i].type === type && seq[i].kw === kw) return i;
      return 0;
    }

    /* ---- formatting ---- */
    _fmtKw(v) {
      return v >= 100 ? String(Math.round(v)) : (Math.round(v * 10) / 10).toFixed(1);
    }
    _fmtEnergy(kwh) {
      var c = this._cfg;
      if (kwh >= 1000) return (Math.round(kwh / 100) / 10).toLocaleString(c.locale) + ' ' + c.energyUnitBig;
      return Math.round(kwh).toLocaleString(c.locale) + ' ' + c.energyUnit;
    }
    _fmtMoney(uah) {
      var c = this._cfg;
      return Math.round(uah).toLocaleString(c.locale) + ' ' + c.currency;
    }

    /* kWh produced in calendar month m for the active station = perKw × kW */
    _monthKwh(m) {
      return (this._cfg.monthlyPerKw[m] || 0) * this._state.kw;
    }

    /* ---- per-station month / year totals (tariff-driven) ---- */
    _renderTotals() {
      var c = this._cfg, st = this._state, tariff = c.types[st.type].tariff, n = c.monthlyPerKw.length;
      var thisMonth = this._monthKwh(this._month);
      var sel = this._effMonth();
      var cumKwh = 0, yearKwh = 0;
      for (var m = 0; m < n; m++) {
        var v = this._monthKwh(m);
        yearKwh += v;
        if (m <= sel) cumKwh += v;   /* Jan → selected (or hovered) month (inclusive) */
      }
      /* top stats — current calendar month */
      this._el.month.textContent = this._fmtEnergy(thisMonth);
      this._el.saved.textContent = this._fmtMoney(thisMonth * tariff);
      /* year row */
      this._el.yearNow.textContent = this._fmtEnergy(cumKwh);          /* вироблено на зараз */
      this._el.yearForecast.textContent = this._fmtEnergy(yearKwh);    /* прогноз за рік */
      this._el.yearSaved.textContent = this._fmtMoney(yearKwh * tariff);
    }

    /* ---- paint the monthly chart for the current selection ---- */
    _renderMonths() {
      var sel = this._effMonth();
      this._el.months.classList.toggle('manual', !this._playing);
      for (var m = 0; m < this._mbars.length; m++) {
        this._mbars[m].classList.toggle('passed', m <= sel);
        this._mbars[m].classList.toggle('sel', m === sel);
        if (this._mlabs[m]) this._mlabs[m].classList.toggle('sel', m === sel);
        if (m === sel) this._mbars[m].querySelector('.m-bar-val').textContent = this._fmtEnergy(this._monthKwh(m));
      }
    }

    /* ---- effective month = hover preview if any, else the committed pick ---- */
    _effMonth() { return this._hoverMonth == null ? this._selMonth : this._hoverMonth; }

    /* ---- hover-scrub: preview a month without committing it (manual/OFFLINE only) ---- */
    _previewMonth(m) {
      if (this._playing) return;
      if (m === this._hoverMonth) return;
      this._hoverMonth = m;
      this._renderMonths();
      this._renderTotals();
    }

    /* ---- pointer left the months block → drop preview, snap back to the clicked month ---- */
    _clearPreview() {
      if (this._hoverMonth == null) return;
      this._hoverMonth = null;
      this._renderMonths();
      this._renderTotals();
    }

    /* ---- commit a month on click — the final choice (manual/OFFLINE only) ---- */
    _selectMonth(m) {
      if (this._playing) return;            /* auto mode follows today */
      this._hoverMonth = null;
      this._selMonth = m;
      this._renderMonths();
      this._renderTotals();
    }

    /* ---- paint chart for the current hour + running daily total ---- */
    _renderHour() {
      var c = this._cfg, st = this._state, bars = this._bars, today = 0;
      for (var i = 0; i < bars.length; i++) {
        var kw = c.profile[i] * st.kw;
        bars[i].classList.toggle('on', i < st.hour);
        bars[i].classList.toggle('active', i === st.hour);
        if (i === st.hour) bars[i].querySelector('.bar-val').textContent = this._fmtKw(kw);
        if (i <= st.hour) today += kw;
      }
      this._el.now.textContent = this._fmtKw(c.profile[st.hour] * st.kw);
      this._el.today.textContent = this._fmtEnergy(today);
    }

    /* ---- playback loop ---- */
    _clearTimer() { if (this._timer) { clearTimeout(this._timer); this._timer = null; } }
    _step() {
      this._renderHour();
      var self = this, c = this._cfg, st = this._state;
      if (st.hour >= c.profile.length - 1) {
        this._timer = setTimeout(function () { self._advance(); }, c.endPauseMs);
      } else {
        this._timer = setTimeout(function () { st.hour++; self._step(); }, c.hourMs);
      }
    }
    _advance() {
      var seq = this._cfg.sequence;
      this._state.seqIdx = (this._state.seqIdx + 1) % seq.length;
      var next = seq[this._state.seqIdx];
      this._apply(next.type, next.kw);
    }

    /* ---- apply a station, reset & (re)start its day ---- */
    _apply(type, kw) {
      var st = this._state, c = this._cfg;
      st.type = type; st.kw = kw; st.hour = 0;

      Array.prototype.forEach.call(this._el.types.children, function (b) {
        var on = b.dataset.type === type;
        b.setAttribute('aria-selected', String(on));
      });

      /* power chips for the active type */
      this._el.powers.innerHTML = '';
      var self = this;
      c.types[type].powers.forEach(function (p) {
        var b = document.createElement('button');
        b.type = 'button'; b.className = 'power';
        b.textContent = p + ' ' + c.unit;
        b.setAttribute('aria-pressed', String(p === kw));
        b.addEventListener('click', function () { self._select(type, p); });
        self._el.powers.appendChild(b);
      });

      this._renderTotals();
      this._renderMonths();
      this._clearTimer();

      /* paused (toggle off) or reduced motion → freeze on the full day's result */
      if (!this._playing || this._reduceMotion()) {
        st.hour = c.profile.length - 1;
        this._renderHour();
        this._running = false;
        return;
      }
      this._running = true;
      this._step();
    }

    /* ---- switch: station ONLINE (live/auto) ⇄ OFFLINE (frozen) ---- */
    _setOnline(on) {
      this._online = !!on;
      this._updateLive();
      this._setPlaying(this._online);   /* online → live auto-run, offline → frozen */
    }

    /* ---- reflect ONLINE / OFFLINE on the indicator + switch ---- */
    _updateLive() {
      var c = this._cfg, on = this._online;
      this._el.liveLabel.textContent = on ? c.onlineLabel : c.offlineLabel;
      this._el.live.classList.toggle('off', !on);
      this._el.sw.setAttribute('aria-checked', String(on));
      this._el.sw.setAttribute('aria-label', on ? c.onlineLabel : c.offlineLabel);
    }

    /* ---- auto-run toggle: on = loop + month = today, off = manual (ONLINE indicator stays) ---- */
    _setPlaying(on) {
      this._playing = !!on;
      this._hoverMonth = null;                          /* drop any hover-preview on mode change */
      this._clearTimer();
      if (this._playing) this._selMonth = this._month;  /* auto follows today */
      this._renderMonths();
      this._renderTotals();
      if (this._playing && !this._reduceMotion()) {
        this._state.hour = 0;
        this._running = true;
        this._step();
      } else {
        this._state.hour = this._cfg.profile.length - 1;
        this._running = false;
        this._renderHour();
      }
    }

    /* ---- manual selection: jump + keep auto-cycle in sync ---- */
    _select(type, kw) {
      var c = this._cfg;
      if (!c.types[type]) return;
      var powers = c.types[type].powers;
      if (powers.indexOf(kw) === -1) kw = powers[0];
      this._state.seqIdx = this._seqIndexOf(type, kw);
      this._apply(type, kw);
    }

    /* ---- pause the loop while scrolled out of view (saves CPU) ---- */
    _setupVisibilityPause() {
      if (this._io || !('IntersectionObserver' in window)) return;
      var self = this;
      this._io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            if (self._playing && !self._running && !self._reduceMotion()) {
              self._running = true; self._step();
            }
          } else { self._running = false; self._clearTimer(); }
        });
      }, { threshold: 0.15 });
      this._io.observe(this);
    }
  }

  customElements.define('energy-monitor', EnergyMonitor);
})();
