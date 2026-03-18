import React, { useState, useRef, useEffect } from "react";

const CONTACTS = [
  {
    name: "श्री. सुरेश देठे",
    nameEn: "Suresh Dethe",
    mobile: "9588439091",
    role: "मालक / Owner",
    emoji: "👨‍🌾",
    color: "from-orange-500 to-amber-500",
    shadow: "shadow-orange-500/30",
    border: "border-orange-500/40",
    bg: "bg-orange-500/10",
    callColor: "bg-orange-500 hover:bg-orange-400",
    waColor: "bg-green-500 hover:bg-green-400",
  },
  {
    name: "चि. यश देठे",
    nameEn: "Yash Dethe",
    mobile: "8080294291",
    role: "मालक / Owner",
    emoji: "👦",
    color: "from-amber-400 to-yellow-500",
    shadow: "shadow-amber-500/30",
    border: "border-amber-400/40",
    bg: "bg-amber-500/10",
    callColor: "bg-amber-500 hover:bg-amber-400",
    waColor: "bg-green-600 hover:bg-green-500",
  },
];

const LOCATION = {
  link: "https://maps.app.goo.gl/DG54uj3WgvLfSpE87",
  label: "देठे पाटील पोल्ट्री फार्म",
};

const QA = [
  {
    keywords: ["kombdi", "kombadi", "andi", "अंडी", "कोंबडी", "खत", "chicken", "broiler", "poultry", "मिळेल", "milel", "available", "eggs", "manure"],
    answer: `🐔 <b>होय! आमच्याकडे योग्य दरात अंडी, कोंबडी खत मिळेल!</b><br/><br/>
    आम्ही ताजी, स्वच्छ आणि गुणवत्तापूर्ण उत्पादने पुरवतो.<br/><br/>
    🥚 ताजी <b>अंडी</b> उपलब्ध<br/>
    🌿 उच्च दर्जाचे <b>कोंबडी खत</b> उपलब्ध<br/>
    ✅ आमचे ठिकाण Google Maps वर बघा!<br/>
    ✅ “फार्ममधून थेट अंडी – घाऊक दरात विक्रीसाठी.” <br/>
    ✅ Home Delivery उपलब्ध`,
  },
  {
    keywords: ["yog dar", "yogya dar", "योग्य दर", "yogya", "business", "farm", "poultry farm", "what", "kaay", "काय", "माहिती"],
    answer: `🌟 <b>आमच्याबद्दल</b><br/><br/>
    आम्ही <b>देठे पाटील पोल्ट्री फार्म</b> आहोत.<br/><br/>
    🐔 <b>आमच्याकडे योग्य दरात अंडी, कोंबडी खत मिळेल</b><br/><br/>
    🥚 ताजी अंडी — घाऊक व किरकोळ<br/>
    🌾“शेतीसाठी उत्तम दर्जाचे कोंबडीखत उपलब्ध! पिकांची वाढ आणि उत्पादन वाढवण्यासाठी आजच संपर्क करा.” <br/>
    🌾🥚“शुद्ध आणि ताजे फार्म फ्रेश अंडी मिळतील. आजच ऑर्डर करा.” <br/><br/>
    📍 आमचे ठिकाण Google Maps वर बघा!`,
  },
  {
    keywords: ["price", "rate", "bhaav", "भाव", "किती", "kiti", "cost", "amount"],
    answer: `💰 <b>भावासाठी थेट संपर्क करा</b><br/><br/>
    कोंबडीचा भाव बाजारभावानुसार बदलतो.<br/>
    ताज्या भावासाठी आमच्याशी संपर्क करा:<br/><br/>
    📞 श्री. सुरेश देठे: <b>9588439091</b><br/>
    📞 चि. यश देठे: <b>8080294291</b><br/><br/>
    👇 खाली दिलेल्या <b>Call</b> बटणावर क्लिक करा!`,
  },
  {
    keywords: ["location", "address", "kuth", "कुठे", "where", "ठिकाण", "maps", "gps"],
    answer: `📍 <b>आमचे ठिकाण</b><br/><br/>
    आम्ही Google Maps वर उपलब्ध आहोत!<br/><br/>
    <b>देठे पाटील पोल्ट्री फार्म</b><br/>
    👇 खाली <b>📍 Location बघा</b> बटण दाबा किंवा येथे क्लिक करा:<br/><br/>
    <a href="${LOCATION.link}" target="_blank" style="color:#f97316; text-decoration:underline;">🗺️ Google Maps वर उघडा</a>`,
  },
  {
    keywords: ["time", "timing", "vel", "वेळ", "open", "close", "उघडे", "बंद"],
    answer: `⏰ <b>आमचे वेळापत्रक</b><br/><br/>
    🌅 सकाळी: <b>7:00 AM - 12:00 PM</b><br/>
    🌆 संध्याकाळी: <b>4:00 PM - 8:00 PM</b><br/><br/>
    📅 सोमवार ते रविवार उपलब्ध<br/><br/>
    📞 अधिक माहितीसाठी कॉल करा!`,
  },
  {
    keywords: ["delivery", "home", "deliver", "आणून", "घरी", "पोहोच", "home delivery"],
    answer: `🚚 <b>Home Delivery</b><br/><br/>
    हो! आम्ही Home Delivery करतो.<br/>
    📦 किमान ऑर्डर असणे आवश्यक आहे.<br/><br/>
    Delivery साठी संपर्क:<br/>
    📞 <b>9588439091</b> किंवा <b>8080294291</b>`,
  },
  {
    keywords: ["order", "ऑर्डर", "book", "booking", "बुक", "नोंदणी"],
    answer: `📋 <b>ऑर्डर कशी द्याल?</b><br/><br/>
    1️⃣ खाली दिलेल्या नंबरवर Call करा<br/>
    2️⃣ किंवा WhatsApp वर Message करा<br/>
    3️⃣ आपले नाव, पत्ता आणि किती कोंबडी खत / अंडी पाहिजे ते सांगा<br/>
    4️⃣ आम्ही लवकरच उत्तर देऊ!<br/><br/>
    📞 <b>9588439091 | 8080294291</b>`,
  },
  {
    keywords: ["hello", "hi", "helo", "नमस्कार", "namaskar", "hay", "hey", "हॅलो"],
    answer: `🙏 <b>नमस्कार!</b><br/><br/>
    <b>देठे पाटील पोल्ट्री फार्म</b> मध्ये आपले स्वागत आहे!<br/><br/>
    🐔 <b>आमच्याकडे योग्य दरात अंडी, कोंबडी खत मिळेल</b><br/><br/>
    आपल्याला काय विचारायचे आहे? मी मदत करतो! 😊`,
  },
];

const DEFAULT_REPLY = `🤔 मला समजले नाही. कृपया खालीलपैकी एक विचारा:<br/><br/>
🐔 कोंबडी खत उपलब्ध आहे का?<br/>
💰 भाव काय आहे?<br/>
📍 लोकेशन कुठे आहे?<br/>
⏰ वेळ काय आहे?<br/>
🚚 होम डिलिव्हरी मिळेल का?<br/>
📋 ऑर्डर कशी द्यायची?`;

const WELCOME_MSG = `🙏 <b>नमस्कार! देठे पाटील पोल्ट्री फार्ममध्ये आपले स्वागत!</b><br/><br/>
🐔 <b>आमच्याकडे योग्य दरात अंडी, कोंबडी खत मिळेल</b><br/><br/>
आपल्याला काय माहिती हवी आहे? खाली Quick Options दाबा किंवा टाइप करा 👇`;

const QUICK_QUESTIONS = [
  { label: "🐔 कोंबडी खत?", query: "कोंबडी खत मिळेल का?" },
  { label: "🥚 अंडी?", query: "अंडी मिळेल का?" },
  { label: "💰 भाव काय?", query: "काय भाव किंवा रेट आहे?" },
  { label: "📍 लोकेशन?", query: "लोकेशन कुठे आहे?" },
  { label: "⏰ वेळ?", query: "वेळ किंवा टाइमिंग काय आहे?" },
  { label: "🚚 होम डिलिव्हरी?", query: "होम डिलिव्हरी मिळेल का?" },
];

const processMessage = (text) => {
  const lower = text.toLowerCase();
  for (const item of QA) {
    if (item.keywords.some((kw) => lower.includes(kw.toLowerCase()))) {
      return item.answer;
    }
  }
  return DEFAULT_REPLY;
};

const ExpenseChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: "ai", content: WELCOME_MSG }]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showContacts, setShowContacts] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      const reply = processMessage(text);
      setMessages((prev) => [...prev, { role: "ai", content: reply }]);
      setIsTyping(false);
    }, 900);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && input.trim()) sendMessage(input);
  };

  return (
    <div className="fixed bottom-6 left-6 z-[1000] font-sans" style={{ fontFamily: "'Segoe UI', sans-serif" }}>

      {/* Floating Button */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          title="Chat with us"
          style={{
            width: 64, height: 64, borderRadius: "50%",
            background: isOpen
              ? "linear-gradient(135deg,#ef4444,#dc2626)"
              : "linear-gradient(135deg,#f97316,#ea580c)",
            border: "2px solid rgba(255,255,255,0.3)",
            boxShadow: "0 8px 32px rgba(249,115,22,0.5)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", transition: "all 0.3s", transform: isOpen ? "rotate(45deg)" : "scale(1)",
          }}
        >
          {isOpen ? (
            <span style={{ color: "#fff", fontSize: 28, fontWeight: 300, lineHeight: 1 }}>×</span>
          ) : (
            <span style={{ fontSize: 28 }}>🐔</span>
          )}
        </button>
        {!isOpen && (
          <>
            <span style={{
              position: "absolute", top: -6, right: -6,
              background: "#ef4444", color: "#fff",
              fontSize: 8, fontWeight: 700,
              padding: "2px 6px", borderRadius: 99,
              animation: "bounce 1s infinite",
              letterSpacing: 0.5,
            }}>LIVE</span>
            <div style={{
              position: "absolute", left: 70, top: "50%", transform: "translateY(-50%)",
              background: "linear-gradient(135deg,#1a1a2e,#16213e)",
              border: "1px solid rgba(249,115,22,0.4)",
              borderRadius: 12, padding: "6px 14px",
              whiteSpace: "nowrap", fontSize: 11, fontWeight: 700, color: "#f97316",
              boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
            }}>
              🐔 अंडी • कोंबडी • खत उपलब्ध!
            </div>
          </>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: "fixed",
          bottom: 90,
          left: 16,
          width: "min(420px, calc(100vw - 32px))",
          height: "min(600px, calc(100vh - 120px))",
          background: "linear-gradient(180deg,#0f172a 0%,#0a0f1e 100%)",
          border: "1px solid rgba(249,115,22,0.3)",
          borderRadius: 24,
          boxShadow: "0 24px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(249,115,22,0.1)",
          display: "flex", flexDirection: "column", overflow: "hidden",
          animation: "slideUp 0.3s ease",
          zIndex: 1001,
        }}>

          {/* Header */}
          <div style={{
            padding: "16px 20px 12px",
            background: "linear-gradient(135deg,rgba(249,115,22,0.25),rgba(234,88,12,0.15))",
            borderBottom: "1px solid rgba(249,115,22,0.2)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 22 }}>🐔</span>
                  <div>
                    <h3 style={{ margin: 0, color: "#fff", fontSize: 15, fontWeight: 800, letterSpacing: 0.3 }}>
                      देठे पाटील पोल्ट्री फार्म
                    </h3>
                    <p style={{ margin: 0, color: "#f97316", fontSize: 10, fontWeight: 700, letterSpacing: 1 }}>
                      आमच्याकडे योग्य दरात अंडी, कोंबडी खत मिळेल
                    </p>
                  </div>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{
                  background: "rgba(34,197,94,0.2)", border: "1px solid rgba(34,197,94,0.4)",
                  color: "#22c55e", fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 99,
                  letterSpacing: 1
                }}>● ONLINE</span>
              </div>
            </div>

            {/* Contact Buttons Row */}
            <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
              {CONTACTS.map((c) => (
                <div key={c.mobile} style={{
                  flex: 1, minWidth: 150,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(249,115,22,0.25)",
                  borderRadius: 12, padding: "8px 10px",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                    <span style={{ fontSize: 16 }}>{c.emoji}</span>
                    <div>
                      <p style={{ margin: 0, color: "#f5f5f5", fontSize: 11, fontWeight: 700 }}>{c.name}</p>
                      <p style={{ margin: 0, color: "#9ca3af", fontSize: 9 }}>{c.role}</p>
                    </div>
                  </div>
                  <p style={{ margin: "0 0 6px", color: "#f97316", fontSize: 12, fontWeight: 800 }}>
                    📱 {c.mobile}
                  </p>
                  <div style={{ display: "flex", gap: 5 }}>
                    <a
                      href={`tel:+91${c.mobile}`}
                      style={{
                        flex: 1, textDecoration: "none",
                        background: "linear-gradient(135deg,#f97316,#ea580c)",
                        color: "#fff", fontSize: 10, fontWeight: 700,
                        padding: "5px 6px", borderRadius: 8,
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 3,
                        boxShadow: "0 2px 10px rgba(249,115,22,0.4)",
                      }}
                    >
                      📞 Call
                    </a>
                    <a
                      href={`https://wa.me/91${c.mobile}?text=${encodeURIComponent("नमस्कार! मला कोंबडी बद्दल माहिती हवी आहे.")}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        flex: 1, textDecoration: "none",
                        background: "linear-gradient(135deg,#22c55e,#16a34a)",
                        color: "#fff", fontSize: 10, fontWeight: 700,
                        padding: "5px 6px", borderRadius: 8,
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 3,
                        boxShadow: "0 2px 10px rgba(34,197,94,0.4)",
                      }}
                    >
                      💬 WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Location Button */}
            <a
              href={LOCATION.link}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                marginTop: 8, padding: "8px 12px",
                background: "linear-gradient(135deg,rgba(59,130,246,0.25),rgba(37,99,235,0.15))",
                border: "1px solid rgba(59,130,246,0.35)",
                borderRadius: 10, textDecoration: "none",
                color: "#60a5fa", fontSize: 11, fontWeight: 700,
                transition: "all 0.2s",
              }}
            >
              📍 Google Maps वर Location बघा → {LOCATION.label}
            </a>
          </div>

          {/* Messages */}
          <div ref={scrollRef} style={{
            flex: 1, overflowY: "auto", padding: "16px 16px 8px",
            display: "flex", flexDirection: "column", gap: 10,
          }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{
                display: "flex",
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              }}>
                {msg.role === "ai" && (
                  <span style={{ fontSize: 18, marginRight: 6, alignSelf: "flex-end" }}>🐔</span>
                )}
                <div
                  style={{
                    maxWidth: "78%",
                    padding: "10px 14px",
                    borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                    background: msg.role === "user"
                      ? "linear-gradient(135deg,#f97316,#ea580c)"
                      : "rgba(255,255,255,0.07)",
                    border: msg.role === "user" ? "none" : "1px solid rgba(255,255,255,0.1)",
                    color: "#f5f5f5",
                    fontSize: 12.5,
                    lineHeight: 1.6,
                    boxShadow: msg.role === "user"
                      ? "0 4px 16px rgba(249,115,22,0.35)"
                      : "0 2px 8px rgba(0,0,0,0.3)",
                  }}
                  dangerouslySetInnerHTML={{ __html: msg.content }}
                />
              </div>
            ))}
            {isTyping && (
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 18 }}>🐔</span>
                <div style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "18px 18px 18px 4px",
                  padding: "10px 16px", display: "flex", gap: 4,
                }}>
                  {[0, 0.2, 0.4].map((delay, i) => (
                    <div key={i} style={{
                      width: 7, height: 7, background: "#f97316",
                      borderRadius: "50%",
                      animation: `bounce 1s ${delay}s infinite`,
                    }} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Questions */}
          <div style={{
            padding: "8px 12px",
            borderTop: "1px solid rgba(255,255,255,0.07)",
            display: "flex", flexWrap: "wrap", gap: 6,
          }}>
            {QUICK_QUESTIONS.map((q) => (
              <button
                key={q.label}
                onClick={() => sendMessage(q.query)}
                style={{
                  background: "rgba(249,115,22,0.12)",
                  border: "1px solid rgba(249,115,22,0.3)",
                  borderRadius: 99, padding: "4px 12px",
                  color: "#f97316", fontSize: 10.5, fontWeight: 600,
                  cursor: "pointer", whiteSpace: "nowrap",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => { e.target.style.background = "rgba(249,115,22,0.3)"; e.target.style.color = "#fff"; }}
                onMouseOut={(e) => { e.target.style.background = "rgba(249,115,22,0.12)"; e.target.style.color = "#f97316"; }}
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <div style={{
            padding: "10px 14px 14px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            display: "flex", gap: 8, background: "rgba(0,0,0,0.3)",
          }}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKey}
              placeholder="कोंबडी बद्दल विचारा..."
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(249,115,22,0.3)",
                borderRadius: 12,
                padding: "10px 14px",
                color: "#f5f5f5",
                fontSize: 13,
                outline: "none",
              }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
              style={{
                background: input.trim()
                  ? "linear-gradient(135deg,#f97316,#ea580c)"
                  : "rgba(255,255,255,0.05)",
                border: "none",
                borderRadius: 12,
                width: 44, height: 44,
                color: "#fff", fontSize: 18, cursor: input.trim() ? "pointer" : "default",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: input.trim() ? "0 4px 16px rgba(249,115,22,0.4)" : "none",
                transition: "all 0.2s",
                flexShrink: 0,
              }}
            >
              🚀
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
};

export default ExpenseChatbot;
