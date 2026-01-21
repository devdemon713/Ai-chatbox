import React, { useState, useRef, useEffect } from "react";
import { X, Sparkles, ChevronRight } from "lucide-react";
import api from "../../services/api";

export const GeminiAssistant = ({ onClose }) => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi! I'm your Konark Temple Guide. Ask me anything 👋" },
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!query.trim() || loading) return;

    // Capture the text on the page to send as context
    const pageData = document.body.innerText; 
    const userMessage = query;
    
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setQuery("");
    setLoading(true);

    try {
      const res = await api.post("/ai/ask", {
        query: userMessage,
        pageContext: pageData,
      });
      setMessages((prev) => [...prev, { role: "ai", text: res.data.answer }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "ai", text: "❌ Connection error. Is your backend running?" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-10 right-10 w-80 md:w-96 h-[520px] bg-white border border-orange-200 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden animate-in fade-in zoom-in duration-300">
      
      {/* 1. Header */}
      <div className="p-4 border-b flex justify-between items-center bg-orange-600 text-white">
        <div className="flex items-center gap-2 font-bold">
          <Sparkles size={18} />
          <span>Temple Guide</span>
        </div>
        <button 
          onClick={onClose}
          className="hover:bg-orange-700 p-1 rounded-full transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* 2. Chat History Area */}
      <div 
        ref={scrollRef} 
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-orange-50/30"
      >
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`px-4 py-2 rounded-2xl text-sm max-w-[85%] shadow-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-orange-600 text-white rounded-tr-none"
                  : "bg-white text-slate-800 border border-orange-100 rounded-tl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-orange-100 px-4 py-2 rounded-2xl text-xs text-orange-600 animate-pulse font-medium">
              Reading page info...
            </div>
          </div>
        )}
      </div>

      {/* 3. Input Field Area */}
      <div className="p-3 border-t bg-white flex gap-2">
        <input
          className="flex-1 bg-slate-100 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-500 transition-all"
          placeholder="Ask about the temple history..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-orange-600 text-white p-2 rounded-xl hover:bg-orange-700 transition-colors disabled:opacity-50"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};