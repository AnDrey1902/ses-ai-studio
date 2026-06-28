import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BLOG_POSTS } from '../../data/mockData';
import { Calendar, Clock, ArrowRight, BookOpen, Search } from 'lucide-react';

export const BlogPage: React.FC = () => {
  const { lang, setView, setSelectedBlogSlug, tr } = useApp();
  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');

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
                onChange={e => setQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-11 pr-4 py-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-green-500 transition-colors"
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {tags.map(t => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTag(t.id)}
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

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => {
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

      </div>
    </div>
  );
};
