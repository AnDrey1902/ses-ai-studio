import React, { useRef, useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { REVIEWS } from '../../data/mockData';
import { Star, Quote } from 'lucide-react';
import { SchemaOrg } from '../common/SchemaOrg';

export const ReviewsSection: React.FC = () => {
  const { lang, tr } = useApp();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const cardW = el.children[0] ? (el.children[0] as HTMLElement).offsetWidth + 32 : 300;
      const idx = Math.round(el.scrollLeft / cardW);
      setActiveIdx(Math.min(idx, REVIEWS.length - 1));
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="reviews" className="ds-section bg-soft border-b border-line scroll-mt-20">
      <SchemaOrg type="reviews" data={{ reviews: REVIEWS.map(r => ({ author: r.name, rating: r.rating, text: r.text[lang] || r.text.uk })) }} />
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 space-y-[64px]">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="ds-badge px-3.5 py-1.5 text-xs bg-[rgba(24,165,88,.1)] text-emerald-deep border border-[rgba(24,165,88,.2)]">
            РЕПУТАЦІЯ В ЦИФРАХ
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-body">
            {tr('b8_title')}
          </h2>
          <p className="text-sm sm:text-base text-muted font-medium">
            {tr('b8_sub')}
          </p>
        </div>

        {/* 6 Reviews Grid */}
        <div
          ref={scrollRef}
          className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide"
          style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}
        >
          {REVIEWS.map((rev) => {
            const cityCopy = rev.city[lang] || rev.city.uk;
            const typeCopy = rev.sesType[lang] || rev.sesType.uk;
            const textCopy = rev.text[lang] || rev.text.uk;

            return (
              <div
                key={rev.id}
                className="snap-center shrink-0 w-[85vw] md:w-auto bg-white rounded-[28px] border border-line p-[28px] flex flex-col justify-between space-y-6 shadow-[0_4px_20px_rgba(26,46,35,.05)] hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(255,199,66,.08)] transition-all duration-300"
              >
                <div className="space-y-4">
                  {/* Stars & Power */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-sun text-sun" />
                      ))}
                    </div>
                    <span className="text-xs font-mono font-extrabold text-emerald bg-[rgba(24,165,88,.1)] px-2.5 py-1 rounded-xl border border-[rgba(24,165,88,.2)]">
                      {rev.power}
                    </span>
                  </div>

                  {/* Text */}
                  <p className="text-xs sm:text-sm text-body font-normal leading-relaxed pt-2">
                    «{textCopy}»
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-line">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    loading="lazy"
                    className="w-12 h-12 rounded-full object-cover border-2 border-[rgba(24,165,88,.4)]"
                  />
                  <div>
                    <h4 className="text-sm font-extrabold text-body leading-tight">{rev.name}</h4>
                    <p className="text-[11px] font-semibold text-muted">{cityCopy} · <span className="text-disabled">{typeCopy}</span></p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Dot indicators for mobile */}
        <div className="flex md:hidden justify-center gap-2 pt-2">
          {REVIEWS.map((_, i) => (
            <span
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${i === activeIdx ? 'bg-emerald w-6' : 'bg-line'}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
