import React, { useState, useRef, useEffect } from "react";

const getBroilerRoadmap = (count) => {
  const feed = Math.round(count * 3.5);
  const investment = Math.round(count * 120);
  const revenue = Math.round(count * 220);
  const profit = revenue - investment;
  const space = Math.round(count * 0.75);

  return `
    <div class="space-y-4 text-sm">
      <div class="flex items-center gap-2 mb-2">
        <span class="text-2xl">🐔</span>
        <div>
          <p class="font-black text-yellow-400 text-lg uppercase leading-none">Broiler Roadmap</p>
          <p class="text-yellow-400/60 text-[10px] font-bold">${count.toLocaleString()} Birds · Full Cycle Plan</p>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-2">
        <div class="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3 text-center">
          <p class="text-[9px] text-yellow-400 font-bold uppercase mb-1">Space Required</p>
          <p class="text-white font-black text-lg">${space.toLocaleString()}</p>
          <p class="text-[9px] text-gray-400">Sq. Feet</p>
        </div>
        <div class="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-center">
          <p class="text-[9px] text-emerald-400 font-bold uppercase mb-1">Total Feed</p>
          <p class="text-white font-black text-lg">${feed.toLocaleString()}</p>
          <p class="text-[9px] text-gray-400">Kg / Cycle</p>
        </div>
        <div class="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-center">
          <p class="text-[9px] text-red-400 font-bold uppercase mb-1">Investment</p>
          <p class="text-white font-black text-lg">₹${investment.toLocaleString()}</p>
          <p class="text-[9px] text-gray-400">Per Cycle</p>
        </div>
        <div class="bg-green-500/10 border border-green-500/20 rounded-xl p-3 text-center">
          <p class="text-[9px] text-green-400 font-bold uppercase mb-1">Est. Profit</p>
          <p class="text-green-400 font-black text-lg">₹${profit.toLocaleString()}</p>
          <p class="text-[9px] text-gray-400">Per Cycle (42 Days)</p>
        </div>
      </div>

      <div class="bg-white/5 border border-white/10 rounded-xl p-3">
        <p class="text-yellow-400 font-black text-xs uppercase mb-3">📅 Week-by-Week Roadmap</p>
        <div class="space-y-2">
          ${[
            { week: "Week 1", task: "Chick arrival, brooding (32–35°C), starter feed, vaccinations" },
            { week: "Week 2–3", task: "Temperature reduction, grower feed, water regularity" },
            { week: "Week 4–5", task: "Finisher feed, weight checks, market preparation" },
            { week: "Week 6", task: "Harvest at 2–2.5 kg, sale to market or processor" },
            { week: "Post-Cycle", task: "Farm cleaning, disinfection, 2-week rest before next flush" },
          ].map(s => `
            <div class="flex gap-2">
              <span class="text-[9px] font-black text-yellow-400 w-16 shrink-0 mt-0.5">${s.week}</span>
              <span class="text-[10px] text-gray-300">${s.task}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="bg-white/5 border border-white/10 rounded-xl p-3">
        <p class="text-yellow-400 font-black text-xs uppercase mb-2">💡 Key Tips</p>
        <ul class="space-y-1 text-[10px] text-gray-300 list-disc list-inside">
          <li>Maintain proper ventilation to avoid ammonia buildup</li>
          <li>Vaccination schedule: Marek's, Newcastle, IBD</li>
          <li>Water:feed ratio must be maintained 2:1</li>
          <li>Monitor mortality rate daily (target &lt;3%)</li>
        </ul>
      </div>
    </div>
  `;
};

const getLayerRoadmap = (count) => {
  const eggsPerDay = Math.round(count * 0.92);
  const eggsPerYear = Math.round(eggsPerDay * 300);
  const investment = Math.round(count * 600);
  const annualRevenue = Math.round(eggsPerYear * 5);
  const annualProfit = annualRevenue - Math.round(count * 350);
  const space = Math.round(count * 1.5);

  return `
    <div class="space-y-4 text-sm">
      <div class="flex items-center gap-2 mb-2">
        <span class="text-2xl">🥚</span>
        <div>
          <p class="font-black text-cyan-400 text-lg uppercase leading-none">Layer Roadmap</p>
          <p class="text-cyan-400/60 text-[10px] font-bold">${count.toLocaleString()} Birds · Annual Plan</p>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-2">
        <div class="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-3 text-center">
          <p class="text-[9px] text-cyan-400 font-bold uppercase mb-1">Eggs / Day</p>
          <p class="text-white font-black text-lg">${eggsPerDay.toLocaleString()}</p>
          <p class="text-[9px] text-gray-400">@ 92% Production</p>
        </div>
        <div class="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 text-center">
          <p class="text-[9px] text-blue-400 font-bold uppercase mb-1">Space Required</p>
          <p class="text-white font-black text-lg">${space.toLocaleString()}</p>
          <p class="text-[9px] text-gray-400">Sq. Feet</p>
        </div>
        <div class="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-center">
          <p class="text-[9px] text-red-400 font-bold uppercase mb-1">Investment</p>
          <p class="text-white font-black text-lg">₹${investment.toLocaleString()}</p>
          <p class="text-[9px] text-gray-400">Setup + Year 1</p>
        </div>
        <div class="bg-green-500/10 border border-green-500/20 rounded-xl p-3 text-center">
          <p class="text-[9px] text-green-400 font-bold uppercase mb-1">Annual Profit</p>
          <p class="text-green-400 font-black text-lg">₹${annualProfit.toLocaleString()}</p>
          <p class="text-[9px] text-gray-400">Est. Per Year</p>
        </div>
      </div>

      <div class="bg-white/5 border border-white/10 rounded-xl p-3">
        <p class="text-cyan-400 font-black text-xs uppercase mb-3">📅 Phase-by-Phase Roadmap</p>
        <div class="space-y-2">
          ${[
            { phase: "Weeks 1–8", task: "Chick brooding, starter feed, temperature management (32→28°C)" },
            { phase: "Weeks 9–16", task: "Grower feed, lighting management (8–10 hrs), growth monitoring" },
            { phase: "Weeks 17–18", task: "Pre-layer feed, increase light stimulation to 14–16 hrs" },
            { phase: "Weeks 18+", task: "Peak production begins, layer feed (calcium-enriched)" },
            { phase: "Month 14–16", task: "Culling, farm cleaning, prepare for next flock" },
          ].map(s => `
            <div class="flex gap-2">
              <span class="text-[9px] font-black text-cyan-400 w-20 shrink-0 mt-0.5">${s.phase}</span>
              <span class="text-[10px] text-gray-300">${s.task}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="bg-white/5 border border-white/10 rounded-xl p-3">
        <p class="text-cyan-400 font-black text-xs uppercase mb-2">💡 Key Tips</p>
        <ul class="space-y-1 text-[10px] text-gray-300 list-disc list-inside">
          <li>Lighting: 16 hrs/day maximizes egg production</li>
          <li>Feed layer diet with 4% calcium for shell quality</li>
          <li>Collect eggs 3x/day to reduce breakage</li>
          <li>Target &lt;2% daily mortality rate</li>
        </ul>
      </div>
    </div>
  `;
};

const PoultryArchitectChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState("input"); // input | type-select | result
  const [birdCount, setBirdCount] = useState("");
  const [birdType, setBirdType] = useState(null);
  const [messages, setMessages] = useState([
    { role: "ai", content: "Welcome to <strong>AI Business Architect</strong>! I will create a complete poultry farming roadmap for your business. Enter your bird count to begin." }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, step]);

  const handleCountSubmit = () => {
    const count = parseInt(birdCount);
    if (!count || count <= 0) return;
    setMessages(prev => [...prev,
      { role: "user", content: `Bird Count: ${count.toLocaleString()}` },
    ]);
    setStep("type-select");
  };

  const handleTypeSelect = (type) => {
    setBirdType(type);
    setIsTyping(true);
    setMessages(prev => [...prev,
      { role: "user", content: `Bird Type: ${type}` }
    ]);
    setTimeout(() => {
      const count = parseInt(birdCount);
      const roadmap = type === "Broiler" ? getBroilerRoadmap(count) : getLayerRoadmap(count);
      setMessages(prev => [...prev, { role: "ai", content: roadmap }]);
      setIsTyping(false);
      setStep("result");
    }, 800);
  };

  const handleReset = () => {
    setBirdCount("");
    setBirdType(null);
    setStep("input");
    setMessages([{ role: "ai", content: "Welcome to <strong>AI Business Architect</strong>! Enter your bird count to generate a full roadmap." }]);
  };

  return (
    <div className="fixed bottom-6 right-56 z-[1000] font-sans">
      {/* FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform border-2 relative ${
          isOpen ? "bg-red-500 border-red-400 rotate-45" : "bg-amber-500 border-amber-400 hover:scale-110 shadow-amber-500/30"
        }`}
      >
        {isOpen ? (
          <span className="text-white text-3xl font-light">×</span>
        ) : (
          <div className="text-white flex flex-col items-center">
            <span className="text-xs font-black leading-none">BIZ</span>
            <span className="text-xl">🏗️</span>
          </div>
        )}
        {!isOpen && (
          <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] px-2 py-0.5 rounded-full animate-bounce">
            AI
          </span>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[350px] sm:w-[420px] h-[580px] bg-gray-950/95 backdrop-blur-xl border border-amber-400/20 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-fade-in">
          
          {/* Header */}
          <div className="p-5 bg-gradient-to-r from-amber-600/30 to-orange-600/30 border-b border-amber-400/20 flex justify-between items-center">
            <div>
              <h3 className="text-white font-black text-xl tracking-tight leading-tight">AI Business <br/>Architect</h3>
              <p className="text-amber-400 text-[10px] font-bold tracking-widest uppercase mt-1">Poultry Farm Roadmap Generator</p>
            </div>
            <div className="bg-amber-500/20 px-3 py-1.5 rounded-xl border border-amber-500/30 text-center">
              <p className="text-amber-400 text-[9px] font-black uppercase">AI</p>
              <p className="text-amber-400 text-[9px] font-black uppercase">POWERED</p>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[90%] px-4 py-3 rounded-2xl text-sm ${
                    msg.role === "user"
                      ? "bg-amber-500 text-white rounded-tr-none shadow-lg shadow-amber-500/20"
                      : "bg-white/5 text-gray-100 border border-white/10 rounded-tl-none w-full"
                  }`}
                  dangerouslySetInnerHTML={{ __html: msg.content }}
                />
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/10 px-4 py-2 rounded-2xl rounded-tl-none flex gap-1">
                  <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          {/* Input Zone */}
          <div className="p-4 bg-gray-950 border-t border-amber-400/20">
            {step === "input" && (
              <div className="space-y-3">
                <p className="text-gray-400 text-xs font-bold uppercase">Enter Total Bird Count:</p>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="e.g. 5000"
                    value={birdCount}
                    onChange={(e) => setBirdCount(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleCountSubmit()}
                    className="flex-1 bg-white/5 border border-amber-400/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-400 transition-all placeholder-gray-600"
                    min="1"
                  />
                  <button
                    onClick={handleCountSubmit}
                    className="bg-amber-500 px-5 py-3 rounded-xl text-white font-black text-sm hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/30 active:scale-95"
                  >
                    →
                  </button>
                </div>
              </div>
            )}

            {step === "type-select" && (
              <div className="space-y-3">
                <p className="text-gray-400 text-xs font-bold uppercase text-center">Select Bird Type:</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleTypeSelect("Broiler")}
                    className="bg-yellow-500/10 border-2 border-yellow-500/40 hover:border-yellow-400 rounded-2xl p-4 text-center transition-all hover:bg-yellow-500/20 active:scale-95"
                  >
                    <div className="text-3xl mb-1">🐔</div>
                    <p className="text-yellow-400 font-black text-sm">BROILER</p>
                    <p className="text-yellow-400/50 text-[9px] mt-0.5">Meat Production</p>
                  </button>
                  <button
                    onClick={() => handleTypeSelect("Layer")}
                    className="bg-cyan-500/10 border-2 border-cyan-500/40 hover:border-cyan-400 rounded-2xl p-4 text-center transition-all hover:bg-cyan-500/20 active:scale-95"
                  >
                    <div className="text-3xl mb-1">🥚</div>
                    <p className="text-cyan-400 font-black text-sm">LAYER</p>
                    <p className="text-cyan-400/50 text-[9px] mt-0.5">Egg Production</p>
                  </button>
                </div>
              </div>
            )}

            {step === "result" && (
              <button
                onClick={handleReset}
                className="w-full bg-amber-500/10 border border-amber-500/30 text-amber-400 py-3 rounded-xl font-black text-sm hover:bg-amber-500/20 transition-all active:scale-95"
              >
                🔄 Generate New Roadmap
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PoultryArchitectChatbot;
