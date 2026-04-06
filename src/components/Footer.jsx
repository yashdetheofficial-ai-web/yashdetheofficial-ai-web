
const Footer = () => {
    const locations = [
        "Mumbai", "Pune", "Nashik", "Ahilyanagar", "Shirdi",
        "Shrirampur", "Loni", "Rahata", "Sangamner", "Malegav", "Bhivandi", "Hyderabad"
    ];

    return (
        <footer className="py-12 border-t border-gray-800 text-center text-gray-500 bg-black">
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8 px-4 text-[11px] md:text-sm uppercase tracking-widest font-medium">
                {locations.map((loc, idx) => (
                    <a
                        key={idx}
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc + " Maharashtra")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 hover:text-emerald-400 transition-all duration-300 group cursor-pointer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-500 group-hover:scale-125 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {loc}
                    </a>
                ))}
            </div>

            <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-light text-gray-600">
                &copy; 2026 <span className="text-gray-400 font-semibold">Dethe Patil Poultry Industries</span>. All Rights Reserved.
            </p>

        </footer>
    );
};

export default Footer;
