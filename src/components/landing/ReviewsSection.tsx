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
    <section className="py-20 md:py-28 bg-slate-950 border-b border-slate-900">
      <SchemaOrg type="reviews" data={{ reviews: REVIEWS.map(r => ({ author: r.name, rating: r.rating, text: r.text[lang] || r.text.uk })) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-green-500/10 text-green-400 border border-green-500/20">
            РЕПУТАЦІЯ В ЦИФРАХ
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            {tr('b8_title')}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-medium">
            {tr('b8_sub')}
          </p>
        </div>

        {/* 6 Reviews Grid */}
        <div
          ref={scrollRef}
          className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide"
          style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}
        >
          {REVIEWS.map((rev) => {
            const cityCopy = rev.city[lang] || rev.city.uk;
            const typeCopy = rev.sesType[lang] || rev.sesType.uk;
            const textCopy = rev.text[lang] || rev.text.uk;

            return (
              <div
                key={rev.id}
                className="snap-center shrink-0 w-[85vw] md:w-auto bg-slate-900/70 rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col justify-between shadow-lg hover:border-slate-700 transition-all space-y-6"
              >
                <div className="space-y-4">
                  {/* Stars & Power */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs font-mono font-extrabold text-green-400 bg-green-500/10 px-2.5 py-1 rounded-lg">
                      {rev.power}
                    </span>
                  </div>

                  {/* Text */}
                  <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed pt-2">
                    «{textCopy}»
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    loading="lazy"
                    className="w-12 h-12 rounded-full object-cover border-2 border-green-500/40"
                  />
                  <div>
                    <h4 className="text-sm font-extrabold text-white leading-tight">{rev.name}</h4>
                    <p className="text-[11px] font-semibold text-slate-400">{cityCopy} · <span className="text-slate-500">{typeCopy}</span></p>
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
              className={`w-2 h-2 rounded-full transition-all ${i === activeIdx ? 'bg-green-400 w-6' : 'bg-slate-700'}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
