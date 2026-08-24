import React from 'react';
import { useApp } from '../../context/AppContext';
import { PAIN_SOLUTIONS } from '../../data/mockData';
import { CheckCircle2 } from 'lucide-react';

/* Shared card chrome: glass fill lifted off the #07140F base by a top light edge
   (inset 0 1px 0) + a deep drop shadow. The fill is translucent so the shared
   solar-panel backdrop still reads through the upper cards. */
const CARD_BASE =
  'group relative flex flex-col rounded-[26px] backdrop-blur-xl border ' +
  'transition-[transform,border-color,box-shadow] duration-[250ms] ease-out hover:-translate-y-1';

const CARD_REGULAR =
  'p-6 bg-[rgba(23,74,54,.68)] border-white/[.07] ' +
  'shadow-[0_24px_60px_rgba(0,0,0,.45),inset_0_1px_0_rgba(255,255,255,.07)] ' +
  'hover:border-[rgba(24,165,88,.40)] ' +
  'hover:shadow-[0_0_0_1px_rgba(24,165,88,.25),0_24px_60px_rgba(24,165,88,.12)]';

/* The anchor card is two cells WIDE but the same height as every other tile, so it
   stays readable without scrolling. The extra width buys a horizontal split at lg
   (copy left, payoff figure right) instead of extra height. */
const CARD_FEATURED =
  'lg:col-span-2 p-6 gap-6 lg:flex-row lg:gap-8 ' +
  'bg-gradient-to-br from-[rgba(30,110,70,.72)] to-[rgba(23,74,54,.66)] border-[rgba(24,165,88,.30)] ' +
  'shadow-[0_24px_60px_rgba(0,0,0,.45),inset_0_1px_0_rgba(255,255,255,.09)] ' +
  'hover:border-[rgba(24,165,88,.55)] ' +
  'hover:shadow-[0_0_0_1px_rgba(24,165,88,.28),0_28px_70px_rgba(24,165,88,.16)]';

/* Leading numeric token of a stat ("-85%" in "-85% витрат", "10" in "10 років гарантії"). */
const STAT_NUMERIC = /^([+\-−]?\d[\d\s.,]*%?)\s*(.*)$/;

/* The payoff figure. Gold per DS (sun = key numbers): the numeral carries the weight in
   mono, the trailing words stay quiet in the sans face. Purely verbal stats ("Під ключ")
   get the display face instead — mono would make them read as code, not as a result. */
const StatFigure: React.FC<{ value: string; featured?: boolean }> = ({ value, featured }) => {
  const parts = value.match(STAT_NUMERIC);

  if (!parts) {
    return (
      <p className={`font-display font-extrabold text-sun ${featured ? 'text-3xl md:text-4xl' : 'text-2xl'}`}>
        {value}
      </p>
    );
  }

  return (
    <p className={featured ? 'flex flex-col items-start gap-2' : 'flex items-baseline gap-2 flex-wrap'}>
      <span className={`font-mono font-black leading-none text-sun ${featured ? 'text-6xl' : 'text-[32px]'}`}>
        {parts[1]}
      </span>
      {parts[2] && (
        <span className={`font-semibold uppercase tracking-wide text-muted-dark ${featured ? 'text-base' : 'text-xs'}`}>
          {parts[2]}
        </span>
      )}
    </p>
  );
};

export const PainSolutionSection: React.FC = () => {
  const { lang, tr, openLeadModal } = useApp();

  // "<боль> vs <решение>" — разводим две половины заголовка типографикой.
  const [painHalf, solutionHalf] = tr('b2_title').split(/\s+vs\s+/i);

  return (
    <section
      id="pain-solution"
      aria-labelledby="pain-solution-title"
      className="ds-section relative isolate border-b border-[rgba(255,255,255,.08)] scroll-mt-20"
    >
      {/* Darkening over the shared solar-panel backdrop (owned by App): starts at
          the Hero's own overlay tone so the boundary is seamless, then dissolves
          into solid #060E0B by the time the lower cards begin. The base is a
          near-neutral dark, NOT a green wash — the cards are green, and a green
          backdrop makes them blend into it. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[rgba(7,16,14,.62)] from-0% via-[rgba(6,14,11,.84)] via-62% to-[#060E0B] to-96%" />

      <div className="max-w-[1280px] mx-auto px-5 md:px-8 space-y-12 md:space-y-16">

        {/* Section Heading */}
        <div id="pain-solution-heading" className="text-center max-w-3xl mx-auto space-y-4">
          <h2 id="pain-solution-title" className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white text-balance">
            {solutionHalf ? (
              <>
                <span className="text-muted-dark">{painHalf}</span>
                <span className="text-sun px-2">vs</span>
                <span>{solutionHalf}</span>
              </>
            ) : painHalf}
          </h2>
          <p className="text-sm sm:text-base text-muted-dark font-medium">
            {tr('b2_sub')}
          </p>
        </div>

        {/* Bento grid, uniform row height so every tile is readable without scrolling.
            lg: anchor(2) + 5 singles + callout(2) = 9 cells = 3 full rows, no holes.
            md: anchor drops to 1 cell → 6 singles + callout(2) = 8 = 4 full rows. */}
        <div id="pain-solution-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {PAIN_SOLUTIONS.map((item, idx) => {
            const painCopy = item.pain[lang] || item.pain.uk;
            const solCopy = item.solution[lang] || item.solution.uk;
            const featured = idx === 0;

            if (featured) {
              return (
                <article key={idx} className={`${CARD_BASE} ${CARD_FEATURED}`}>
                  {/* Text column — the extra width goes here, not into extra height */}
                  <div className="flex-1 flex flex-col justify-center space-y-5">
                    {/* Pain — quiet, unboxed (the copy already carries its own guillemets) */}
                    <p className="text-[15px] lg:text-base italic leading-relaxed text-muted-cool">
                      {painCopy}
                    </p>

                    <div aria-hidden className="h-px bg-[rgba(24,165,88,.22)]" />

                    {/* Solution — the dominant half. The brand label lives here only,
                        so it reads once per section instead of six times. */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-emerald">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{tr('b2_solution_label')}</span>
                      </div>
                      <p className="text-[15px] lg:text-base font-semibold leading-relaxed text-white">
                        {solCopy}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center lg:w-[30%] lg:shrink-0 lg:border-l lg:border-[rgba(24,165,88,.22)] lg:pl-8">
                    <StatFigure value={item.stat} featured />
                  </div>
                </article>
              );
            }

            return (
              <article key={idx} className={`${CARD_BASE} ${CARD_REGULAR}`}>
                <p className="text-[15px] italic leading-relaxed text-muted-cool">
                  {painCopy}
                </p>

                <div aria-hidden className="my-5 h-px bg-white/[.07]" />

                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald" />
                  <p className="text-[15px] font-semibold leading-relaxed text-white">
                    {solCopy}
                  </p>
                </div>

                <div className="mt-auto pt-6">
                  <StatFigure value={item.stat} />
                </div>
              </article>
            );
          })}

          {/* Callout tile — fills the grid's remaining two cells instead of adding
              another full-width band under it, which kept the section shorter. */}
          <div
            id="pain-solution-callout"
            className="relative isolate overflow-hidden rounded-[26px] border p-6 md:col-span-2 flex flex-col justify-center gap-5 sm:flex-row sm:items-center sm:justify-between backdrop-blur-xl bg-gradient-to-br from-[rgba(30,110,70,.72)] to-[rgba(23,74,54,.66)] border-[rgba(24,165,88,.30)] shadow-[0_24px_60px_rgba(0,0,0,.45),inset_0_1px_0_rgba(255,255,255,.09)]"
          >
            <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 -z-10 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(255,199,66,.20),transparent_70%)] blur-2xl" />
            <div className="space-y-1">
              <h4 className="text-lg font-extrabold text-white text-balance">{tr('b2_callout_title')}</h4>
              <p className="text-sm text-muted-dark">{tr('b2_callout_desc')}</p>
            </div>
            <button
              onClick={() => openLeadModal('10 кВт', 'Консультація інженера', 'Банер Болі Консультація')}
              className="ds-btn-sun shrink-0 self-start sm:self-auto"
            >
              {tr('b2_callout_btn')}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
