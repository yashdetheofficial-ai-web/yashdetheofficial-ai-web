import { useState } from 'react';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="futuristic-card shadow-2xl sticky top-0 z-50 backdrop-blur-md bg-opacity-80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex justify-between items-center">
                {/* Logo */}
                <div>
                    <span className="text-lg md:text-2xl font-black tracking-tighter futuristic-accent uppercase">
                        Dethe Patil Poultry
                    </span>
                    <span className="block text-[8px] md:text-[10px] text-gray-500 tracking-[0.3em] uppercase">
                        Intelligence in Farming
                    </span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-6 items-center font-medium text-sm uppercase tracking-widest">
                    <a href="#optimizer" className="hover:text-emerald-400 transition-colors">AI Plan</a>
                    <a href="#products" className="hover:text-emerald-400 transition-colors">Sourcing</a>
                    <a href="#expense-tracker" className="hover:text-orange-400 transition-colors font-bold text-orange-500/90 whitespace-nowrap">Daily Expenses</a>

                </div>

                {/* Hamburger Button - Mobile Only */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg border border-gray-700 hover:border-emerald-400 transition-all gap-1.5"
                    aria-label="Toggle Menu"
                >
                    <span className={`block w-5 h-0.5 bg-gray-300 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`block w-5 h-0.5 bg-gray-300 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block w-5 h-0.5 bg-gray-300 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <div className="md:hidden border-t border-gray-800 bg-[#161b22] px-4 py-4 flex flex-col gap-4 text-sm font-medium uppercase tracking-widest">
                    <a
                        href="#optimizer"
                        onClick={() => setMenuOpen(false)}
                        className="hover:text-emerald-400 transition-colors py-2 border-b border-gray-800"
                    >
                        AI Plan
                    </a>
                    <a
                        href="#products"
                        onClick={() => setMenuOpen(false)}
                        className="hover:text-emerald-400 transition-colors py-2 border-b border-gray-800"
                    >
                        Sourcing
                    </a>
                    <a
                        href="#expense-tracker"
                        onClick={() => setMenuOpen(false)}
                        className="hover:text-orange-400 text-orange-500/90 transition-colors py-2 border-b border-gray-800"
                    >
                        Daily Expenses
                    </a>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
