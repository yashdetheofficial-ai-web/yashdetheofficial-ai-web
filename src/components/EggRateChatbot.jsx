import React, { useState, useEffect, useRef } from "react";

const eggData = [
  // Retail Rates (Per Piece)
  { city: "Kolkata", state: "WB", piece: "₹4.80", tray: "₹144.00", retail: "₹5.10", supermarket: "₹5.00", type: "Retail" },
  { city: "Lucknow", state: "UP", piece: "₹4.76", tray: "₹142.80", retail: "₹5.00", supermarket: "₹4.90", type: "Retail" },
  { city: "Chennai", state: "TN", piece: "₹4.75", tray: "₹142.50", retail: "₹4.95", supermarket: "₹4.85", type: "Retail" },
  { city: "Bengaluru", state: "KA", piece: "₹4.70", tray: "₹141.00", retail: "₹5.00", supermarket: "₹4.90", type: "Retail" },
  { city: "Mumbai", state: "MH", piece: "₹4.70", tray: "₹141.00", retail: "₹4.95", supermarket: "₹4.85", type: "Retail" },
  { city: "Mysuru", state: "KA", piece: "₹4.70", tray: "₹141.00", retail: "₹4.90", supermarket: "₹4.80", type: "Retail" },
  { city: "Chittoor", state: "AP", piece: "₹4.68", tray: "₹140.40", retail: "₹4.85", supermarket: "₹4.75", type: "Retail" },
  { city: "Pune", state: "MH", piece: "₹4.65", tray: "₹139.50", retail: "₹4.90", supermarket: "₹4.80", type: "Retail" },
  { city: "Allahabad", state: "UP", piece: "₹4.57", tray: "₹137.10", retail: "₹4.80", supermarket: "₹4.70", type: "Retail" },
  { city: "Kanpur", state: "UP", piece: "₹4.52", tray: "₹135.60", retail: "₹4.75", supermarket: "₹4.65", type: "Retail" },
  { city: "Ranchi", state: "JH", piece: "₹4.52", tray: "₹135.60", retail: "₹4.75", supermarket: "₹4.65", type: "Retail" },
  { city: "Varanasi", state: "UP", piece: "₹4.52", tray: "₹135.60", retail: "₹4.75", supermarket: "₹4.65", type: "Retail" },
  // Wholesale Rates (Per Piece)
  { city: "Surat", state: "Gujarat", piece: "₹4.40", tray: "₹132.00", retail: "₹4.60", supermarket: "₹4.50", type: "Wholesale" },
  { city: "Ahmedabad", state: "Gujarat", piece: "₹4.35", tray: "₹130.50", retail: "₹4.55", supermarket: "₹4.45", type: "Wholesale" },
  { city: "Namakkal", state: "TN", piece: "₹4.35", tray: "₹130.50", retail: "₹4.55", supermarket: "₹4.45", type: "Wholesale" },
  { city: "Delhi", state: "CC", piece: "₹4.30", tray: "₹129.00", retail: "₹4.55", supermarket: "₹4.45", type: "Wholesale" },
  { city: "Nagpur", state: "MH", piece: "₹4.25", tray: "₹127.50", retail: "₹4.50", supermarket: "₹4.40", type: "Wholesale" },
  { city: "Warangal", state: "Telangana", piece: "₹4.22", tray: "₹126.60", retail: "₹4.45", supermarket: "₹4.35", type: "Wholesale" },
  { city: "Barwala", state: "Haryana", piece: "₹3.92", tray: "₹117.60", retail: "₹4.15", supermarket: "₹4.05", type: "Wholesale" },
  // Previously added cities
  { city: "Brahmapur", state: "Odisha", piece: "₹4.37", tray: "₹131.10", retail: "₹4.60", supermarket: "₹4.50", type: "Retail" },
  { city: "Hyderabad", state: "TS", piece: "₹4.55", tray: "₹136.50", retail: "₹4.80", supermarket: "₹4.70", type: "Retail" },
  { city: "Hospet", state: "KA", piece: "₹4.27", tray: "₹128.10", retail: "₹4.50", supermarket: "₹4.40", type: "Wholesale" },
  { city: "Ahilyanagar", state: "MH", piece: "₹4.60", tray: "₹138.00", retail: "₹4.85", supermarket: "₹4.75", type: "Retail" },
  { city: "Sangamner", state: "MH", piece: "₹4.58", tray: "₹137.40", retail: "₹4.80", supermarket: "₹4.70", type: "Wholesale" },
];

const EggRateChatbot = () => {
  const highestRate = eggData.reduce((prev, current) =>
    (parseFloat(prev.piece.replace('₹', '')) > parseFloat(current.piece.replace('₹', ''))) ? prev : current
  );

  const sortedRates = [...eggData].sort((a, b) =>
    parseFloat(b.piece.replace('₹', '')) - parseFloat(a.piece.replace('₹', ''))
  );

  const avgPieceRate = (eggData.reduce((sum, item) => 
    sum + parseFloat(item.piece.replace('₹', '')), 0) / eggData.length).toFixed(2);

  const priorityCities = ["Mumbai", "Pune", "Nagpur", "Delhi", "Kolkata", "Lucknow", "Hyderabad", "Ahmedabad"];
  const filteredRates = sortedRates.filter(r => priorityCities.includes(r.city));

  const liveBoard = `
    <div class="space-y-1">
      <p class="text-emerald-400 font-black text-xs tracking-widest uppercase mb-3">🗓️ Today's Eggs Live Rates (Mar 2026)</p>
      <div class="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-2 mb-3">
        <p class="text-yellow-400 font-black text-[10px] uppercase">🏆 Market Top Rate</p>
        <p class="text-white font-bold text-xs">${highestRate.city} — ${highestRate.piece}/egg</p>
      </div>
      <div class="grid grid-cols-2 gap-1.5">
        ${filteredRates.map(r => `
          <div class="flex justify-between items-center bg-white/5 rounded-lg px-2 py-1.5 border border-white/5">
            <div>
              <p class="text-[10px] text-gray-200 font-bold leading-none">${r.city}</p>
              <p class="text-[8px] text-gray-500 mt-0.5">${r.type || 'Market'}</p>
            </div>
            <p class="text-emerald-400 font-black text-xs ml-2 whitespace-nowrap">${r.piece}</p>
          </div>
        `).join('')}
      </div>
      <p class="text-[9px] text-gray-600 mt-3 text-center">Showing priority cities. Search for others below 👇</p>
    </div>
  `;

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "ai", content: liveBoard }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const addMessage = (content, role = "user") => {
    setMessages(prev => [...prev, { role, content }]);
    if (role === "user") {
      processQuery(content);
    }
  };

  const processQuery = (query) => {
    setIsTyping(true);
    setTimeout(() => {
      const q = query.toLowerCase();
      const cityMatch = eggData.find(item =>
        q.includes(item.city.toLowerCase())
      );

      let response;
      if (cityMatch) {
        response = `
          <div class="mt-2 p-4 bg-[#1a1c1e] border-b-4 border-r-4 border-emerald-500 rounded-2xl shadow-2xl transform hover:-translate-y-1 transition-all">
            <div class="flex items-center gap-2 mb-3">
              <span class="text-2xl">🥚</span>
              <div>
                <p class="text-white font-black text-lg leading-tight uppercase">${cityMatch.city}</p>
                <p class="text-emerald-400 text-[10px] font-bold tracking-widest uppercase">${cityMatch.state} • ${cityMatch.type || 'MARKET'}</p>
              </div>
            </div>
            
            <div class="grid grid-cols-2 gap-3 mb-3">
              <div class="p-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                <p class="text-[8px] text-gray-400 font-bold uppercase">Per Piece</p>
                <p class="text-emerald-400 font-black text-base">${cityMatch.piece}</p>
              </div>
              <div class="p-2 bg-white/5 border border-white/10 rounded-xl">
                <p class="text-[8px] text-gray-400 font-bold uppercase">Tray (30)</p>
                <p class="text-white font-black text-base">${cityMatch.tray}</p>
              </div>
            </div>

            <div class="space-y-2 pt-2 border-t border-white/5">
              <div class="flex justify-between items-center text-[11px]">
                <span class="text-gray-400">Retail Market:</span>
                <span class="text-white font-bold">${cityMatch.retail}</span>
              </div>
              <div class="flex justify-between items-center text-[11px]">
                <span class="text-gray-400">Supermarket:</span>
                <span class="text-white font-bold">${cityMatch.supermarket}</span>
              </div>
            </div>
            
            <p class="text-[8px] text-emerald-500/50 mt-4 text-center font-bold uppercase">Live Market Update • MAR 2026</p>
          </div>
        `;
      } else if (q.includes("highest") || q.includes("jast")) {
        response = `
          <div class="mt-2 p-5 bg-gradient-to-br from-yellow-500/20 to-transparent border-b-4 border-r-4 border-yellow-500 rounded-3xl shadow-xl">
            <p class="text-yellow-500 font-black text-xs uppercase mb-2">🏆 Today's Highest Rate</p>
            <p class="text-white font-black text-2xl mb-1">${highestRate.city}</p>
            <p class="text-yellow-400 text-3xl font-black">${highestRate.piece}<span class="text-xs ml-1">/egg</span></p>
            <p class="text-gray-400 text-[10px] mt-2 italic">Calculated across all major Indian markets.</p>
          </div>
        `;
      } else if (q.includes("overall") || q.includes("india") || q.includes("average") || q.length > 3) {
        response = `
          <div class="mt-2 p-4 bg-[#1a1c1e] border-b-4 border-r-4 border-blue-500 rounded-2xl shadow-xl transition-all">
            <div class="flex items-center gap-2 mb-3">
              <span class="text-xl">🇮🇳</span>
              <p class="text-blue-400 font-black text-sm uppercase">India Overall Average</p>
            </div>
            
            <div class="flex items-center justify-between p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl mb-3">
              <p class="text-gray-300 text-xs font-bold">National Price:</p>
              <p class="text-white font-black text-2xl">₹${avgPieceRate}</p>
            </div>
            
            <p class="text-[10px] text-gray-400 leading-relaxed bg-white/5 p-2 rounded-lg border border-white/10">
              <b>Important:</b> Specific village rates vary by 10-20 paise based on logistcs. Use <b>₹${avgPieceRate}</b> as your trading reference.
            </p>
          </div>
        `;
      } else {
        response = "I can show you the egg rates for all major Indian cities. Please select a city or ask about the highest rate today.";
      }

      setMessages(prev => [...prev, { role: "ai", content: response }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[1000] font-sans">
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform border-2 ${isOpen ? "bg-red-500 border-red-400 rotate-45" : "bg-emerald-500 border-emerald-400 hover:scale-110"
          }`}
      >
        {isOpen ? (
          <span className="text-white text-3xl font-light">×</span>
        ) : (
          <div className="text-white flex flex-col items-center">
            <span className="text-xs font-bold leading-none uppercase">EGGS</span>
            <span className="text-xl">🥚</span>
          </div>
        )}
        {!isOpen && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full animate-bounce">
            LIVE
          </span>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed sm:absolute bottom-24 sm:bottom-20 right-4 sm:right-0 w-[calc(100vw-32px)] sm:w-[380px] md:w-[400px] max-h-[80vh] h-[550px] bg-gray-900/90 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-fade-in z-[1001]">
          {/* Header */}
          <div className="p-5 bg-gradient-to-r from-emerald-600/40 to-cyan-600/40 border-b border-white/10">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-white font-black text-xl tracking-tight"> DETHE PATIL EGGS <br />AI Chatbot</h3>
                <p className="text-emerald-400 text-[10px] font-bold tracking-widest uppercase">Daily Egg Rate Intelligence</p>
              </div>
              <div className="bg-emerald-500/20 px-2 py-1 rounded border border-emerald-500/30">
                <p className="text-[10px] text-emerald-400 font-bold">MODE: REAL-TIME</p>
              </div>
            </div>

            {/* Daily High Banner */}
            <div className="mt-4 bg-white/5 rounded-xl p-3 border border-white/10 flex items-center justify-between">
              <span className="text-gray-400 text-[11px] font-medium">TODAY'S HIGHEST:</span>
              <span className="text-emerald-400 font-black text-sm">{highestRate.city} ({highestRate.piece})</span>
            </div>
          </div>

          {/* Messages Area */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-black/20"
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm ${msg.role === "user"
                      ? "bg-emerald-500 text-white rounded-tr-none shadow-lg shadow-emerald-500/20"
                      : "bg-white/10 text-gray-100 border border-white/10 rounded-tl-none"
                    }`}
                  dangerouslySetInnerHTML={{ __html: msg.content.replace(/\n/g, '<br/>') }}
                />
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/10 px-4 py-2 rounded-2xl rounded-tl-none flex gap-1">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          {/* Location Chips */}
          <div className="p-3 border-t border-white/10 bg-black/10">
            <p className="text-[10px] text-gray-500 font-bold mb-2 uppercase px-1">Selected Primary Cities:</p>
            <div className="flex flex-wrap gap-2">
              {eggData.filter(item => priorityCities.includes(item.city)).map((item) => (
                <button
                  key={item.city}
                  onClick={() => addMessage(`What is the rate for ${item.city}?`)}
                  className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 hover:bg-emerald-500/20 hover:border-emerald-500/50 hover:text-white transition-all whitespace-nowrap"
                >
                  {item.city}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 bg-gray-900 border-t border-white/10 flex gap-2">
            <input
              type="text"
              placeholder="Ask about city or highest rate..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition-all"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  addMessage(e.target.value);
                  e.target.value = '';
                }
              }}
            />
            <button
              onClick={(e) => {
                const input = e.target.previousSibling;
                if (input.value.trim()) {
                  addMessage(input.value);
                  input.value = '';
                }
              }}
              className="bg-emerald-500 px-4 py-2 rounded-xl text-white font-bold text-sm hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
            >
              🚀
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EggRateChatbot;
