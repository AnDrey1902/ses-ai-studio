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
    <div className="pt-28 pb-24 bg-slate-950 min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 text-xs font-bold uppercase">
            <BookOpen className="w-4 h-4" />
            <span>{tr('blog_badge')}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            {tr('blog_title')}
          </h1>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            {tr('blog_desc')}
          </p>

          {/* Search & Tags */}
          <div className="pt-6 space-y-4 max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder={tr('blog_search_placeholder')}
                value={query}
                onChange={e => { setQuery(e.target.value); setPage(1); }}
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-11 pr-4 py-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-green-500 transition-colors"
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {tags.map(t => (
                <button
                  key={t.id}
                  onClick={() => { setSelectedTag(t.id); setPage(1); }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    selectedTag === t.id
                      ? 'bg-[#22C55E] text-slate-950 border-green-500 shadow-md shadow-green-500/20'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedPosts.map(post => {
                const titleCopy = post.title[lang] || post.title.uk;
                const excCopy = post.excerpt[lang] || post.excerpt.uk;
                const tagCopy = post.tag[lang] || post.tag.uk;
                const readTimeCopy = post.readTime[lang] || post.readTime.uk;

                return (
                  <article
                    key={post.id}
                    className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-xl hover:border-green-500/40 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="relative h-52 overflow-hidden bg-slate-950">
                        <img
                          src={post.image}
                          alt={titleCopy}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-lg text-[11px] font-bold text-green-400 border border-slate-800 font-mono">
                          {tagCopy}
                        </div>
                      </div>

                      <div className="p-6 space-y-3">
                        <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.publishedAt}</span>
                          <span>·</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{readTimeCopy}</span>
                        </div>

                        <h3 className="text-lg font-extrabold text-white group-hover:text-green-400 transition-colors leading-snug">
                          {titleCopy}
                        </h3>

                        <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                          {excCopy}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 pt-0">
                      <button
                        onClick={() => handleOpenPost(post.slug)}
                        className="w-full py-3 bg-slate-950 hover:bg-[#22C55E] text-slate-300 hover:text-slate-950 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
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
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-9 h-9 rounded-xl text-xs font-bold transition-all border ${
                      p === page
                        ? 'bg-[#22C55E] text-slate-950 border-green-500'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Sidebar CTA */}
          <div className="lg:col-span-1 space-y-6">
            <div className="sticky top-32 bg-gradient-to-b from-green-500/10 to-slate-900 rounded-3xl p-6 border border-green-500/20 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-base font-extrabold text-white leading-snug">{tr('blog_sidebar_title')}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{tr('blog_sidebar_desc')}</p>
              <button
                onClick={() => openLeadModal('10 kW', 'Blog Sidebar CTA', tr('nav_blog'))}
                className="w-full py-3 bg-[#22C55E] hover:bg-[#16A34A] text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-green-500/25 transition-transform hover:scale-105"
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
