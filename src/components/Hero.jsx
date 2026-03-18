import React from "react";
import heroBg from "../assets/hero-bg.png";
import overview3D from "../assets/overview_3d.webp";

const Hero = () => {
    return (
        <header className="relative h-[80vh] flex flex-col items-center justify-center overflow-hidden rounded-3xl mt-6 bg-gray-900 border border-emerald-500/20">

            {/* 3D-Style Cinematic Overview Video */}
            <div className="absolute top-0 left-0 w-full h-full z-0 perspective-2000">
                {/* <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={heroBg}
                    className="w-full h-full object-cover transform-gpu scale-105 hover:scale-110 transition-transform duration-[2000ms] ease-out"
                >
                    <source src={overview3D} type="video/webp" />
                    Your browser does not support the video tag.
                </video> */}
            </div>

            {/* Premium Cinematic Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/50 via-black/20 to-black/60 z-5"></div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 sm:px-6">
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-4 md:mb-6 leading-none uppercase">
                    POULTRY <br />
                    <span className="futuristic-accent text-emerald-400">SOLUTIONS.</span>
                </h1>
                <p className="text-gray-200 text-sm sm:text-base md:text-xl max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed drop-shadow-lg px-2 text-center">
                    Empowering modern farmers with AI-driven intelligence, automated tracking, and direct supply access for maximum poultry growth.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 px-4 sm:px-0">
                    <a
                        href="#medicine-ai"
                        className="flex flex-col items-center justify-center px-6 sm:px-8 py-2 md:py-3 rounded-[1.25rem] border border-sky-500/30 bg-sky-950/60 backdrop-blur-xl shadow-[0_0_25px_rgba(14,165,233,0.3)] group relative overflow-hidden transition-all hover:border-sky-400/50 hover:scale-105 cursor-pointer"
                    >
                        <div className="absolute top-0 right-0 w-12 h-12 bg-sky-400/10 rounded-full blur-xl"></div>
                        <span className="text-sm xl:text-lg font-black uppercase tracking-[0.15em] text-white drop-shadow-md group-hover:text-sky-300 transition-colors z-10">Medicine AI</span>
                        <span className="text-xs xl:text-sm font-bold text-sky-400 uppercase tracking-[0.2em] flex items-center gap-2 mt-1 z-10"><div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)] border border-red-400/50"></div> AI Live Rate</span>
                    </a>
                    <a
                        href="#optimizer"
                        className="flex items-center justify-center px-8 sm:px-10 py-3 md:py-4 rounded-[1.25rem] border border-emerald-500/30 bg-emerald-950/40 backdrop-blur-xl shadow-[0_0_25px_rgba(16,185,129,0.15)] group relative overflow-hidden transition-all hover:border-emerald-400/60 hover:shadow-[0_0_35px_rgba(16,185,129,0.3)] hover:scale-105 cursor-pointer text-center"
                    >
                        <div className="absolute top-0 left-0 w-16 h-16 bg-emerald-400/10 rounded-full blur-2xl uppercase"></div>
                        <span className="font-black text-base md:text-lg tracking-widest text-emerald-100 group-hover:text-white transition-colors z-10 drop-shadow-md uppercase">AI Business Plan</span>
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Hero;