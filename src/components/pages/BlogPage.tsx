import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BLOG_POSTS } from '../../data/mockData';
import { Calendar, Clock, ArrowRight, BookOpen, Search, Zap, ChevronLeft, ChevronRight } from 'lucide-react';

const POSTS_PER_PAGE = 3;

export const BlogPage: React.FC = () => {
  const { lang, setView, setSelectedBlogSlug, openLeadModal, tr } = useApp();
  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [page, setPage] = useState(1);

  const tags = [
    { id: 'all', label: tr('blog_tag_all') },
    { id: 'greentariff', label: tr('blog_tag_green') },
    { id: 'home', label: tr('blog_tag_home') },
    { id: 'loan', label: tr('blog_tag_loan') },
    { id: 'business', label: tr('blog_tag_biz') },
    { id: 'tech', label: tr('blog_tag_tech') }
  ];

  const filteredPosts = BLOG_POSTS.filter(post => {
    const titleCopy = post.title[lang] || post.title.uk;
    const matchQuery = titleCopy.toLowerCase().includes(query.toLowerCase());
    const matchTag = selectedTag === 'all' || post.tagKey === selectedTag;
    return matchQuery && matchTag;
  });

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  const handleOpenPost = (slug: string) => {
    setSelectedBlogSlug(slug);
    setView('blog_detail');
  };

  return (
    <div className="pt-[104px] pb-24 md:pb-32">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 space-y-12">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="ds-badge px-3.5 py-1.5 text-xs bg-[rgba(34,197,94,.1)] text-[#15803D] border border-[rgba(34,197,94,.2)]">
            <BookOpen className="w-4 h-4 inline mr-1.5 -mt-0.5" />
            {tr('blog_badge')}
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#1A2E23]">
            {tr('blog_title')}
          </h1>
          <p className="text-sm sm:text-base text-[#5A6E62] font-medium max-w-xl mx-auto">
            {tr('blog_desc')}
          </p>

          {/* Search & Tags */}
          <div className="pt-6 space-y-4 max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5A6E62]" />
              <input
                type="text"
                placeholder={tr('blog_search_placeholder')}
                value={query}
                onChange={e => { setQuery(e.target.value); setPage(1); }}
                className="w-full bg-white border border-[#E2ECE6] rounded-[18px] pl-11 pr-4 py-3.5 text-sm text-[#1A2E23] placeholder-[#92A299] focus:outline-none focus:border-[#22C55E] transition-colors shadow-[0_2px_10px_rgba(26,46,35,.04)]"
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {tags.map(t => (
                <button
                  key={t.id}
                  onClick={() => { setSelectedTag(t.id); setPage(1); }}
                  className={`px-3.5 py-1.5 rounded-[14px] text-xs font-bold transition-all border ${
                    selectedTag === t.id
                      ? 'bg-[#22C55E] text-white border-[#22C55E] shadow-[0_4px_12px_rgba(34,197,94,.25)]'
                      : 'bg-white text-[#5A6E62] border-[#E2ECE6] hover:text-[#1A2E23] hover:border-[#22C55E] shadow-[0_2px_8px_rgba(26,46,35,.04)]'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main content + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

          {/* Posts Grid (3 cols) */}
          <div className="lg:col-span-3 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedPosts.map(post => {
                const titleCopy = post.title[lang] || post.title.uk;
                const excCopy = post.excerpt[lang] || post.excerpt.uk;
                const tagCopy = post.tag[lang] || post.tag.uk;
                const readTimeCopy = post.readTime[lang] || post.readTime.uk;

                return (
                  <article
                    key={post.id}
                    className="bg-white rounded-[28px] overflow-hidden border border-[#E2ECE6] shadow-[0_4px_20px_rgba(26,46,35,.05)] hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(26,46,35,.1)] transition-all duration-300 flex flex-col group"
                  >
                    <div>
                      <div className="relative h-52 overflow-hidden bg-[#F8FAF9]">
                        <img
                          src={post.image}
                          alt={titleCopy}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-4 left-4 px-3 py-1 rounded-[12px] text-[11px] font-bold text-[#15803D] bg-[rgba(34,197,94,.1)] border border-[rgba(34,197,94,.2)] font-mono">
                          {tagCopy}
                        </div>
                      </div>

                      <div className="p-6 space-y-3">
                        <div className="flex items-center gap-3 text-[11px] text-[#92A299] font-mono">
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.publishedAt}</span>
                          <span>·</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{readTimeCopy}</span>
                        </div>

                        <h3 className="text-lg font-extrabold text-[#1A2E23] group-hover:text-[#22C55E] transition-colors leading-snug">
                          {titleCopy}
                        </h3>

                        <p className="text-xs text-[#5A6E62] leading-relaxed line-clamp-3">
                          {excCopy}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 pt-0">
                      <button
                        onClick={() => handleOpenPost(post.slug)}
                        className="w-full py-3 bg-[#F0F5F2] hover:bg-[#22C55E] text-[#1A2E23] hover:text-white border border-[#E2ECE6] hover:border-[#22C55E] rounded-[14px] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                      >
                        <span>{tr('blog_read_btn')}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 pt-4">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-2 rounded-[14px] bg-white border border-[#E2ECE6] text-[#5A6E62] hover:text-[#1A2E23] disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-[0_2px_8px_rgba(26,46,35,.04)]"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-9 h-9 rounded-[14px] text-xs font-bold transition-all border ${
                      p === page
                        ? 'bg-[#22C55E] text-white border-[#22C55E] shadow-[0_4px_12px_rgba(34,197,94,.25)]'
                        : 'bg-white text-[#5A6E62] border-[#E2ECE6] hover:text-[#1A2E23] shadow-[0_2px_8px_rgba(26,46,35,.04)]'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="p-2 rounded-[14px] bg-white border border-[#E2ECE6] text-[#5A6E62] hover:text-[#1A2E23] disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-[0_2px_8px_rgba(26,46,35,.04)]"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Sidebar CTA */}
          <div className="lg:col-span-1 space-y-6">
            <div className="sticky top-32 bg-gradient-to-b from-[rgba(34,197,94,.06)] to-white rounded-[28px] p-6 border border-[#E2ECE6] space-y-4 shadow-[0_4px_20px_rgba(26,46,35,.05)]">
              <div className="w-12 h-12 rounded-2xl bg-[rgba(34,197,94,.1)] flex items-center justify-center">
                <Zap className="w-6 h-6 text-[#22C55E]" />
              </div>
              <h3 className="text-base font-extrabold text-[#1A2E23] leading-snug">{tr('blog_sidebar_title')}</h3>
              <p className="text-xs text-[#5A6E62] leading-relaxed">{tr('blog_sidebar_desc')}</p>
              <button
                onClick={() => openLeadModal('10 kW', 'Blog Sidebar CTA', tr('nav_blog'))}
                className="ds-btn-primary !text-xs !py-3 !px-5 w-full"
              >
                {tr('blog_sidebar_btn')}
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
