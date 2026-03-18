import { useState, useRef, useEffect } from 'react';

const medData = {
    med: "Recommended: Antibiotics (Enrofloxacin), Vitamins (Vimeral), and Liver Tonics for growth.",
    doc: "Available Specialists: Dr. Satish Patil (Pune) +91 98XXX-XXXXX or Dr. Rahul Deshmukh (Nashik).",
    vac: "Standard Schedule: Day 7 (Lasota), Day 14 (IBD/Gumboro), Day 21 (Lasota Booster).",
    sick: "If birds look dull, check for CRD or Coccidiosis. Isolate sick birds and contact our vet immediately.",
    default: "I can help with 'medicines', 'doctor contacts', 'vaccination', or 'disease' queries."
};

const HealthChatbot = () => {
    const [messages, setMessages] = useState([{ role: 'AI', text: "Ask about Poultry Medicine or finding a Doctor." }]);
    const [input, setInput] = useState('');
    const chatBottomRef = useRef(null);

    useEffect(() => {
        chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = () => {
        const val = input.trim().toLowerCase();
        if (!val) return;

        setMessages(prev => [...prev, { role: 'YOU', text: val }]);
        setInput('');

        setTimeout(() => {
            let reply = medData.default;
            if (val.includes("med") || val.includes("medicine") || val.includes("tonic")) reply = medData.med;
            else if (val.includes("doc") || val.includes("doctor") || val.includes("vet")) reply = medData.doc;
            else if (val.includes("vac") || val.includes("lumpy") || val.includes("dose")) reply = medData.vac;
            else if (val.includes("sick") || val.includes("dead") || val.includes("disease") || val.includes("ill")) reply = medData.sick;

            setMessages(prev => [...prev, { role: 'AI', text: reply }]);
        }, 400);
    };

    return (
        <div className="mt-auto border-t border-gray-800 pt-4">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block mb-3">Health & Doctor AI</span>
            <div className="h-44 overflow-y-auto bg-black/40 rounded-xl p-4 text-[11px] text-gray-300 space-y-3 mb-4 custom-scrollbar border border-white/5 backdrop-blur-sm">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'AI' ? 'justify-start' : 'justify-end'}`}>
                        <div className={`max-w-[85%] p-2 rounded-lg ${msg.role === 'AI' ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-200' : 'bg-gray-800/80 border border-gray-700 text-white'}`}>
                            <span className="block text-[9px] font-black uppercase opacity-50 mb-1">{msg.role}</span>
                            <p className="leading-relaxed">{msg.text}</p>
                        </div>
                    </div>
                ))}
                <div ref={chatBottomRef} />
            </div>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Medicines..."
                    className="flex-1 bg-gray-900/50 border border-gray-700/50 rounded-xl px-4 py-2.5 text-xs focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/30 outline-none text-white transition-all placeholder:text-gray-600"
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button onClick={handleSend} className="bg-emerald-500 hover:bg-emerald-400 text-black px-4 py-2.5 rounded-xl text-[10px] font-bold transition-all shadow-lg shadow-emerald-500/10 active:scale-95">ASK</button>
            </div>
        </div>
    );
};

const FeedChatbot = () => {
    const [messages, setMessages] = useState([{ role: 'AI', text: "Ask about feed rates, bird consumption, or starter types." }]);
    const [input, setInput] = useState('');
    const chatBottomRef = useRef(null);

    useEffect(() => {
        chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = () => {
        const val = input.trim().toLowerCase();
        if (!val) return;

        setMessages(prev => [...prev, { role: 'YOU', text: val }]);
        setInput('');

        setTimeout(() => {
            let reply = "I can provide info on 'feed rates', 'total requirement', or 'feeding phases'.";
            const birdMatch = val.match(/\d+/);

            if (val.includes("rate") || val.includes("price") || val.includes("cost")) {
                reply = "Current 2026 Rates: Pre-Starter: ₹42.5/kg | Starter: ₹40.0/kg | Finisher: ₹38.0/kg.";
            } else if (birdMatch && (val.includes("requirement") || val.includes("how much") || val.includes("total"))) {
                const count = parseInt(birdMatch[0]);
                const totalFeed = (count * 4.2).toFixed(1);
                const bags = Math.ceil(totalFeed / 50);
                reply = `For ${count} birds, you need approx ${totalFeed} kg of feed (${bags} bags of 50kg) for a 40-day cycle.`;
            } else if (val.includes("type") || val.includes("phase") || val.includes("starter")) {
                reply = "Feeding Phases: 1. Pre-starter (Day 1-10), 2. Starter (Day 11-25), 3. Finisher (Day 26-40).";
            } else if (val.includes("fcr")) {
                reply = "Target FCR (Feed Conversion Ratio) should be between 1.5 and 1.7 for maximum profit.";
            }

            setMessages(prev => [...prev, { role: 'AI', text: reply }]);
        }, 400);
    };

    return (
        <div className="mt-auto border-t border-gray-800 pt-4">
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block mb-3">Feed AI Chatbot (KR)</span>
            <div className="h-44 overflow-y-auto bg-black/40 rounded-xl p-4 text-[11px] text-gray-300 space-y-3 mb-4 custom-scrollbar border border-white/5 backdrop-blur-sm">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'AI' ? 'justify-start' : 'justify-end'}`}>
                        <div className={`max-w-[85%] p-2 rounded-lg ${msg.role === 'AI' ? 'bg-blue-500/10 border border-blue-500/20 text-blue-200' : 'bg-gray-800/80 border border-gray-700 text-white'}`}>
                            <span className="block text-[9px] font-black uppercase opacity-50 mb-1">{msg.role}</span>
                            <p className="leading-relaxed">{msg.text}</p>
                        </div>
                    </div>
                ))}
                <div ref={chatBottomRef} />
            </div>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Feed Query..."
                    className="flex-1 bg-gray-900/50 border border-gray-700/50 rounded-xl px-4 py-2.5 text-xs focus:border-blue-400 focus:ring-1 focus:ring-blue-400/30 outline-none text-white transition-all placeholder:text-gray-600"
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button onClick={handleSend} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl text-[10px] font-bold transition-all shadow-lg shadow-blue-500/10 active:scale-95">INFO</button>
            </div>
        </div>
    );
};

const EggChatbot = () => {
    const [messages, setMessages] = useState([{ role: 'AI', text: "Ask about egg rates, tray price, wholesale, or market trend." }]);
    const [input, setInput] = useState('');
    const chatBottomRef = useRef(null);

    useEffect(() => {
        chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = () => {
        const val = input.trim().toLowerCase();
        if (!val) return;

        setMessages(prev => [...prev, { role: 'YOU', text: val }]);
        setInput('');

        setTimeout(() => {
            let reply = "You can ask about 'rate', 'tray price', 'wholesale', or 'market trend'.";

            if (val.includes("rate") || val.includes("today")) {
                reply = "Today's Average Egg Rate (Maharashtra 2026): ₹5.20 per egg.";
            } else if (val.includes("tray")) {
                reply = "1 Tray (30 eggs) price: ₹156 approx.";
            } else if (val.includes("wholesale")) {
                reply = "Wholesale Rate: ₹4.80 - ₹5.00 per egg depending on quantity.";
            } else if (val.includes("market") || val.includes("trend")) {
                reply = "Market Trend: Rates slightly increasing due to feed cost rise.";
            }

            setMessages(prev => [...prev, { role: 'AI', text: reply }]);
        }, 400);
    };

    return (
        <div className="mt-auto border-t border-gray-800 pt-4">
            <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-widest block mb-3">Egg Rate AI Chatbot</span>
            <div className="h-44 overflow-y-auto bg-black/40 rounded-xl p-4 text-[11px] text-gray-300 space-y-3 mb-4 custom-scrollbar border border-white/5 backdrop-blur-sm">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'AI' ? 'justify-start' : 'justify-end'}`}>
                        <div className={`max-w-[85%] p-2 rounded-lg ${msg.role === 'AI' ? 'bg-yellow-500/10 border border-yellow-500/20 text-yellow-200' : 'bg-gray-800/80 border border-gray-700 text-white'}`}>
                            <span className="block text-[9px] font-black uppercase opacity-50 mb-1">{msg.role}</span>
                            <p className="leading-relaxed">{msg.text}</p>
                        </div>
                    </div>
                ))}
                <div ref={chatBottomRef} />
            </div>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Egg Query..."
                    className="flex-1 bg-gray-900/50 border border-gray-700/50 rounded-xl px-4 py-2.5 text-xs focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/30 outline-none text-white transition-all placeholder:text-gray-600"
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button onClick={handleSend} className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2.5 rounded-xl text-[10px] font-bold transition-all shadow-lg shadow-yellow-500/10 active:scale-95">RATE</button>
            </div>
        </div>
    );
};

const PremiumInventory = () => {
    return (
        <section id="products" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 uppercase tracking-[0.2em]">Premium Inventory</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">

                <div className="futuristic-card p-6 rounded-2xl flex flex-col h-full">
                    <div className="image-container mb-6">
                        <img src="/health_doctor_ai.png" alt="Birds Health & Doctor AI" />
                    </div>
                    <h3 className="text-xl font-bold futuristic-accent mb-2">Birds Health & Meds</h3>
                    <p className="text-gray-500 text-sm mb-6">Advanced supplements and vaccines to ensure 0% mortality.</p>
                    <HealthChatbot />
                </div>

                <div className="futuristic-card p-6 rounded-2xl flex flex-col h-full">
                    <div className="image-container mb-6">
                        <img src="/hens_feed_chatbot.png" alt="Hens Feed Rate AI Chatbot" />
                    </div>
                    <h3 className="text-xl font-bold futuristic-accent mb-2">Day-Old Chicks & Feed</h3>

                    <div className="bg-black/40 rounded-lg p-3 mb-4 border border-gray-800">
                        <div className="flex justify-between text-[10px] mb-1"><span className="text-gray-400">Current Feed Rate</span><span className="text-white font-bold">₹42.5/kg</span></div>
                        <div className="flex justify-between text-[10px]"><span className="text-gray-400">Feed/Bird (Full Cycle)</span><span className="text-white font-bold">4.2 kg</span></div>
                    </div>

                    <FeedChatbot />
                </div>

                <div className="futuristic-card p-6 rounded-2xl flex flex-col h-full">
                    <div className="image-container mb-6">
                        <img src="/eggs_rate_ai.png" alt="Eggs Daily Rate AI Chatbot" />
                    </div>
                    <h3 className="text-xl font-bold futuristic-accent mb-2">Eggs Daily Rate</h3>
                    <div className="bg-black/40 rounded-lg p-3 mb-4 border border-gray-800">
                        <div className="flex justify-between text-[10px] mb-1">
                            <span className="text-gray-400">Today's Avg Rate</span>
                            <span className="text-white font-bold">₹5.20 / piece</span>
                        </div>
                        <div className="flex justify-between text-[10px]">
                            <span className="text-gray-400">Tray (30 eggs)</span>
                            <span className="text-white font-bold">₹156</span>
                        </div>
                    </div>
                    <EggChatbot />
                </div>

            </div>
        </section>
    );
};

export default PremiumInventory;
