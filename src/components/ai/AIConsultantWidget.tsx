import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Send, X, Bot, User, Loader2, ArrowRight, Zap, Minimize2, MessageSquareText } from 'lucide-react';

interface ChatMessage {
  sender: 'ai' | 'user';
  text: string;
}

export const AIConsultantWidget: React.FC = () => {
  const { tr, openLeadModal } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: tr('ai_welcome')
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const query = customText || input.trim();
    if (!query || loading) return;

    if (!customText) setInput('');

    const newMsgs: ChatMessage[] = [...messages, { sender: 'user', text: query }];
    setMessages(newMsgs);
    setLoading(true);

    try {
      const res = await fetch('/api/ai-consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: query, history: newMsgs.slice(-6) })
      });

      if (res.ok) {
        const data = await res.json();
        setMessages(prev => [...prev, { sender: 'ai', text: data.answer }]);
      } else {
        throw new Error('API failure');
      }
    } catch (err) {
      // Offline fallback simulated smart responses
      setTimeout(() => {
        let fallbackReply = tr('ai_reply_fallback');
        const qLow = query.toLowerCase();

        if (qLow.includes('цін') || qLow.includes('вартість') || qLow.includes('кошторис') || qLow.includes('price') || qLow.includes('цен')) {
          fallbackReply = tr('ai_reply_price');
        } else if (qLow.includes('окупн') || qLow.includes('roi') || qLow.includes('payback')) {
          fallbackReply = tr('ai_reply_roi');
        } else if (qLow.includes('кредит') || qLow.includes('0%') || qLow.includes('loan')) {
          fallbackReply = tr('ai_reply_loan');
        }

        setMessages(prev => [...prev, { sender: 'ai', text: fallbackReply }]);
        setLoading(false);
      }, 700);
      return;
    }

    setLoading(false);
  };

  const quickPrompts = [
    tr('ai_suggest_1'),
    tr('ai_suggest_2'),
    tr('ai_suggest_3'),
    tr('ai_suggest_4')
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-none">
      
      {/* Expanded Dialog Box */}
      {isOpen && (
        <div className="pointer-events-auto mb-4 w-[92vw] sm:w-[400px] h-[520px] bg-slate-900 border border-slate-700/80 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-4 px-5 border-b border-slate-800 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-green-500 to-emerald-400 text-slate-950 flex items-center justify-center shadow-md shadow-green-500/20">
                <Bot className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold flex items-center gap-1.5">
                  <span>{tr('ai_header')}</span>
                  <span className="text-[9px] bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded font-mono">Gemini</span>
                </h4>
                <p className="text-[10px] text-slate-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  {tr('ai_sub')}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors focus:outline-none"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950/50 text-xs">
            {messages.map((m, idx) => {
              const isAi = m.sender === 'ai';
              return (
                <div
                  key={idx}
                  className={`flex items-start gap-2.5 max-w-[88%] ${isAi ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
                >
                  <div className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center mt-0.5 ${isAi ? 'bg-green-500/15 text-green-400 border border-green-500/20' : 'bg-slate-800 text-slate-300'}`}>
                    {isAi ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>
                  <div className={`p-3.5 rounded-2xl leading-relaxed font-medium shadow-md ${isAi ? 'bg-slate-900 text-slate-200 border border-slate-800' : 'bg-[#22C55E] text-slate-950 font-bold'}`}>
                    {m.text}
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex items-center gap-2 text-slate-400 text-xs font-mono p-2 animate-pulse">
                <Loader2 className="w-4 h-4 animate-spin text-green-400" />
                <span>{tr('ai_thinking')}</span>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Quick Prompts Pills */}
          <div className="p-2.5 px-4 bg-slate-950 border-t border-slate-900 flex gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                disabled={loading}
                onClick={() => handleSend(undefined, qp)}
                className="shrink-0 text-[11px] font-bold bg-slate-900 hover:bg-slate-800 text-slate-300 px-2.5 py-1 rounded-xl border border-slate-800 transition-colors"
              >
                {qp}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <form onSubmit={e => handleSend(e)} className="p-3 bg-slate-900 border-t border-slate-800 flex gap-2">
            <input
              type="text"
              placeholder={tr('ai_placeholder')}
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={loading}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-green-500 font-medium"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-2.5 bg-[#22C55E] hover:bg-[#16A34A] disabled:opacity-40 text-slate-950 rounded-xl transition-all shrink-0 font-bold"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Lead modal trigger from bot */}
          <div className="bg-slate-950 p-2 text-center text-[10px] text-slate-400 border-t border-slate-900">
            {tr('ai_cta')} <button onClick={() => openLeadModal('10 kW', 'AI Chat', 'AI Widget')} className="text-green-400 font-bold hover:underline">{tr('ai_cta_btn')}</button>
          </div>

        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto group relative flex items-center gap-3 px-5 py-4 rounded-full bg-gradient-to-r from-[#22C55E] to-emerald-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-[0_10px_35px_rgba(34,197,94,0.45)] hover:scale-105 active:scale-95 transition-all duration-300"
      >
        <div className="relative">
          <Sparkles className="w-5 h-5 fill-slate-950 animate-spin duration-[4000ms]" />
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
          </span>
        </div>
        <span className="hidden sm:inline">{tr('ai_floating_btn')}</span>
        <MessageSquareText className="w-5 h-5 sm:hidden" />
      </button>

    </div>
  );
};
