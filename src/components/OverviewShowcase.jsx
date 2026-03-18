import React, { useEffect, useState } from "react";
import topic1 from "../assets/topic1.png";
import topic2 from "../assets/topic2.png";
import topic3 from "../assets/topic3.png";

const topics = [
    {
        title: "SMART POULTRY TECH",
        description: "AI-driven health monitoring and farm management.",
        image: topic1,
        color: "from-emerald-500/20 to-cyan-500/20"
    },
    {
        title: "AI BUSINESS PLAN",
        description: "Intelligent architecture for scalable poultry success.",
        image: topic2,
        color: "from-amber-500/20 to-orange-500/20"
    },
    {
        title: "PREMIUM SOURCING",
        description: "Direct supply of birds, feed, and daily market rates.",
        image: topic3,
        color: "from-blue-500/20 to-indigo-500/20"
    },
    {
        title: "QUICK ORDERS",
        description: "Instant WhatsApp connectivity for your supply chain.",
        image: topic2, // Reusing topic2 as topic4 failed generation
        color: "from-green-500/20 to-emerald-500/20"
    }
];

const OverviewShowcase = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % topics.length);
        }, 5000); // 5 seconds per topic = 20 seconds total
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 z-[9999] bg-gray-900 flex items-center justify-center overflow-hidden font-sans">
            {/* Background Base */}
            <div className="absolute inset-0 bg-[#0d1117]"></div>
            
            {/* Animated Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${topics[current].color} opacity-40 transition-all duration-1000`}></div>

            <div className="relative z-10 w-full max-w-6xl px-12 transition-all duration-1000 transform scale-100">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    {/* Content Section */}
                    <div className="flex-1 text-left">
                        <span className="text-emerald-400 font-bold tracking-widest text-sm mb-4 block animate-fade-in">
                            ARJUN AI ECOSYSTEM
                        </span>
                        <h2 className="text-6xl md:text-8xl font-black text-white mb-6 leading-tight transition-all duration-700">
                            {topics[current].title}
                        </h2>
                        <p className="text-gray-300 text-xl md:text-2xl leading-relaxed max-w-xl transition-all duration-700">
                            {topics[current].description}
                        </p>
                    </div>

                    {/* Image Section with 3D Effect */}
                    <div className="flex-1 perspective-2000">
                        <div className="relative transform-gpu rotate-y-12 rotate-x-6 hover:rotate-0 transition-all duration-1000">
                            <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full"></div>
                            <img
                                src={topics[current].image}
                                alt={topics[current].title}
                                className="w-full h-[500px] object-cover rounded-3xl border border-white/10 shadow-2xl relative z-10"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress Indicators */}
            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex gap-4">
                {topics.map((_, idx) => (
                    <div
                        key={idx}
                        className={`h-2 rounded-full transition-all duration-500 ${
                            idx === current ? "w-12 bg-emerald-400" : "w-4 bg-white/20"
                        }`}
                    ></div>
                ))}
            </div>
            
            <div className="absolute top-12 left-12">
                <h1 className="text-2xl font-black text-white tracking-tighter">
                    ARJUN <span className="text-emerald-400">AI</span>
                </h1>
            </div>
        </div>
    );
};

export default OverviewShowcase;
