import React from 'react';
import { useApp } from '../../context/AppContext';
import { BLOG_POSTS } from '../../data/mockData';
import { ArrowLeft, Calendar, Clock, Share2, Tag, CheckCircle2, Zap, User } from 'lucide-react';
import { SchemaOrg } from '../common/SchemaOrg';

export const BlogDetailPage: React.FC = () => {
  const { selectedBlogSlug, setView, lang, openLeadModal, setSelectedBlogSlug, tr } = useApp();

  const post = BLOG_POSTS.find(p => p.slug === selectedBlogSlug) || BLOG_POSTS[0];

  const titleCopy = post.title[lang] || post.title.uk;
  const contentCopy = post.content[lang] || post.content.uk;
  const tagCopy = post.tag[lang] || post.tag.uk;
  const readTimeCopy = post.readTime[lang] || post.readTime.uk;

  // Related articles: same tag, exclude current
  const related = BLOG_POSTS.filter(p => p.id !== post.id && p.tagKey === post.tagKey).slice(0, 3);
  // If not enough same-tag, fill with other posts
  const relatedFinal = related.length >= 2 ? related : BLOG_POSTS.filter(p => p.id !== post.id).slice(0, 3);

  return (
    <div className="pt-28 pb-24 bg-slate-950 min-h-screen text-slate-100">
      <SchemaOrg type="article" data={{
        title: post.title[lang] || post.title.uk,
        description: post.excerpt[lang] || post.excerpt.uk,
        image: post.image,
        datePublished: post.publishedAt,
        author: post.author
      }} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back Button */}
        <button
          onClick={() => setView('blog')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white hover:border-slate-700 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{tr('blog_back_btn')}</span>
        </button>

        {/* Article Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs text-green-400 font-mono font-bold">
            <span className="bg-green-500/10 px-3 py-1 rounded-lg border border-green-500/20">{tagCopy}</span>
            <span className="text-slate-500">·</span>
            <span className="flex items-center gap-1 text-slate-400"><Calendar className="w-3.5 h-3.5" /> {post.publishedAt}</span>
            <span className="text-slate-500">·</span>
            <span className="flex items-center gap-1 text-slate-400"><Clock className="w-3.5 h-3.5" /> {readTimeCopy}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
            {titleCopy}
          </h1>
        </div>

        {/* Featured Banner Image */}
        <div className="rounded-3xl overflow-hidden border border-slate-800 shadow-2xl h-72 sm:h-96 relative">
          <img
            src={post.image}
            alt={titleCopy}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Author Info */}
        <div className="flex items-center gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
            <User className="w-6 h-6 text-green-400" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">{post.author}</p>
            <p className="text-xs text-slate-400">GURU ENERGY · {post.publishedAt}</p>
          </div>
        </div>

        {/* Markdown/HTML Render Box */}
        <div className="bg-slate-900/60 p-8 sm:p-12 rounded-3xl border border-slate-800 text-sm sm:text-base leading-relaxed text-slate-300 space-y-6">
          <div 
            className="prose prose-invert max-w-none space-y-4"
            dangerouslySetInnerHTML={{ __html: contentCopy }}
          />
        </div>

        {/* Article CTA Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-green-500/20 via-slate-900 to-amber-500/20 border border-green-500/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-green-400 uppercase tracking-wider">
              <Zap className="w-4 h-4 fill-green-400" />
              <span>{tr('blog_cta_tag')}</span>
            </div>
            <h3 className="text-xl font-extrabold text-white">{tr('blog_cta_title')}</h3>
            <p className="text-xs text-slate-300">{tr('blog_cta_desc')}</p>
          </div>

          <button
            onClick={() => openLeadModal('10 kW', `Blog: ${post.title.uk}`, tr('nav_blog'))}
            className="px-8 py-4 bg-[#22C55E] hover:bg-[#16A34A] text-slate-950 font-black text-xs uppercase tracking-wider rounded-2xl shadow-xl shadow-green-500/25 shrink-0 transition-transform hover:scale-105"
          >
            {tr('blog_cta_btn')}
          </button>
        </div>

        {/* Related Articles */}
        {relatedFinal.length > 0 && (
          <div className="space-y-6 pt-8 border-t border-slate-800">
            <h3 className="text-xl font-extrabold text-white">{tr('blog_related_title')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedFinal.map(rp => {
                const rpTitle = rp.title[lang] || rp.title.uk;
                const rpTag = rp.tag[lang] || rp.tag.uk;
                return (
                  <button
                    key={rp.id}
                    onClick={() => { setSelectedBlogSlug(rp.slug); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="text-left bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-green-500/40 transition-all group"
                  >
                    <div className="h-36 overflow-hidden bg-slate-950">
                      <img src={rp.image} alt={rpTitle} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4 space-y-2">
                      <span className="text-[10px] font-bold text-green-400 font-mono">{rpTag}</span>
                      <h4 className="text-sm font-extrabold text-white group-hover:text-green-400 transition-colors leading-snug line-clamp-2">{rpTitle}</h4>
                      <p className="text-[11px] text-slate-500">{rp.publishedAt}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
