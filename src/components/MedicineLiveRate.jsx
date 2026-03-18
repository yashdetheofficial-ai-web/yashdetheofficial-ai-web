import React, { useState, useEffect } from 'react';

const medicineData = [
  // INDIAMART VACCINES
  { 
    name: "Ranikhet Disease Vaccine (Lasota Strain)", 
    mrp: "₹120", wholesale: "₹85", unit: "1000 Doses", status: "In Stock",
    category: "Vaccines", partner: "IndiaMart Hub",
    link: "https://dir.indiamart.com/impcat/chicken-vaccines.html"
  },
  { 
    name: "Gumboro (IBD) Vaccine - Live Lentogenic", 
    mrp: "₹150", wholesale: "₹110", unit: "500 Doses", status: "In Stock",
    category: "Vaccines", partner: "IndiaMart Hub",
    link: "https://dir.indiamart.com/impcat/chicken-vaccines.html"
  },
  { 
    name: "Fowl Pox Live Vaccine (Active)", 
    mrp: "₹80", wholesale: "₹50", unit: "1 Unit", status: "In Stock",
    category: "Vaccines", partner: "IndiaMart Hub",
    link: "https://dir.indiamart.com/impcat/chicken-vaccines.html"
  },
  { 
    name: "Marek's Disease Vaccine - Live", 
    mrp: "₹900", wholesale: "₹750", unit: "2000 Doses", status: "In Stock",
    category: "Vaccines", partner: "IndiaMart Hub",
    link: "https://dir.indiamart.com/impcat/chicken-vaccines.html"
  },
  { 
    name: "Avian Infectious Bronchitis Vaccine", 
    mrp: "₹450", wholesale: "₹320", unit: "1000 Doses", status: "In Stock",
    category: "Vaccines", partner: "IndiaMart Hub",
    link: "https://dir.indiamart.com/impcat/chicken-vaccines.html"
  },
  // ANTIBIOTICS & CLINICAL
  { 
    name: "Enrofloxacin 10% Oral Solution", 
    mrp: "₹850", wholesale: "₹595", unit: "1 Litre", status: "In Stock",
    category: "Antibiotics", partner: "IndiaMart Hub",
    link: "https://www.indiamart.com/proddetail/enrofloxacin-oral-solution-10-22129377430.html"
  },
  { 
    name: "Ciprofloxacin Hcl Oral Hub", 
    mrp: "₹600", wholesale: "₹420", unit: "1L Bottle", status: "In Stock",
    category: "Antibiotics", partner: "IndiaMart Hub",
    link: "https://www.indiamart.com/proddetail/ciprofloxacin-hcl-oral-solution-poultry-antibiotic-23867770773.html"
  },
  { 
    name: "Lincomycin HCl Powder", 
    mrp: "₹450", wholesale: "₹340", unit: "Kg", status: "In Stock",
    category: "Antibiotics", partner: "IndiaMart Hub",
    link: "https://dir.indiamart.com/impcat/poultry-medicines.html"
  },
  { 
    name: "Amoxicillin Antibiotics Powder", 
    mrp: "₹950", wholesale: "₹780", unit: "500g", status: "In Stock",
    category: "Antibiotics", partner: "IndiaMart Hub",
    link: "https://dir.indiamart.com/impcat/poultry-medicines.html"
  },
  { 
    name: "Coccidoline - Sulpha Diver Hub", 
    mrp: "₹450", wholesale: "₹315", unit: "Pouch", status: "In Stock",
    category: "Antibiotics", partner: "IndiaMart Hub",
    link: "https://www.indiamart.com/proddetail/coccidoline-sulpha-diver-2985429412.html"
  },
  // TONICS & SUPPLEMENTS
  { 
    name: "Livohem Liver & Blood Booster", 
    mrp: "₹450", wholesale: "₹310", unit: "500ml", status: "In Stock",
    category: "Liver Tonic", partner: "IndiaMart Hub",
    link: "https://www.indiamart.com/proddetail/livohem-liver-and-blood-health-booster-2852174543791.html"
  },
  { 
    name: "Arliv Veterinary Liver Tonic", 
    mrp: "₹400", wholesale: "₹280", unit: "1 Litre", status: "In Stock",
    category: "Liver Tonic", partner: "IndiaMart Hub",
    link: "https://www.indiamart.com/proddetail/1l-arliv-veterinary-liver-tonic-19456486830.html"
  },
  { 
    name: "Nephronova Renal & Gout Solution", 
    mrp: "₹720", wholesale: "₹510", unit: "500ml", status: "In Stock",
    category: "Kidney Tonic", partner: "IndiaMart Hub",
    link: "https://www.indiamart.com/proddetail/nephronova-for-preventing-renal-dysfunction-and-gout-28521745430.html"
  },
  { 
    name: "Aquanic Water Sanitizer Liquid", 
    mrp: "₹550", wholesale: "₹385", unit: "1 Litre", status: "In Stock",
    category: "Sanitization", partner: "IndiaMart Hub",
    link: "https://www.indiamart.com/proddetail/water-sanitizers-for-poultry-aquanic-2850944473230.html"
  },
  { 
    name: "Proguard Virus Control Powder", 
    mrp: "₹1,250", wholesale: "₹875", unit: "1 Kg", status: "In Stock",
    category: "Sanitization", partner: "IndiaMart Hub",
    link: "https://www.indiamart.com/proddetail/proguard-gss-virus-control-disinfection-of-poultry-and-livestock-equipment-22890271230.html"
  },
  { 
    name: "Aimivit Gold Poultry Liquid", 
    mrp: "₹1,100", wholesale: "₹820", unit: "1 Litre", status: "In Stock",
    category: "Supplements", partner: "IndiaMart Hub",
    link: "https://dir.indiamart.com/impcat/poultry-medicines.html"
  },
  { 
    name: "Vitamin B Complex Liquid Hub", 
    mrp: "₹150", wholesale: "₹75", unit: "Kg Equivalent", status: "In Stock",
    category: "Supplements", partner: "IndiaMart Hub",
    link: "https://dir.indiamart.com/impcat/poultry-medicines.html"
  },
  { 
    name: "Chick Care Gold Amino Acid", 
    mrp: "₹950", wholesale: "₹700", unit: "Bottle", status: "In Stock",
    category: "Supplements", partner: "IndiaMart Hub",
    link: "https://dir.indiamart.com/impcat/poultry-medicines.html"
  },
  { 
    name: "Respiratory CRD Gold Solution", 
    mrp: "₹350", wholesale: "₹245", unit: "1 Litre", status: "In Stock",
    category: "Respiratory", partner: "IndiaMart Hub",
    link: "https://www.indiamart.com/proddetail/respiratory-tonic-2855186561891.html"
  },
  { 
    name: "MEX GUARD Anti-Viral Solution", 
    mrp: "₹1,450", wholesale: "₹1,015", unit: "Bottle", status: "In Stock",
    category: "Clinical", partner: "IndiaMart Hub",
    link: "https://www.indiamart.com/proddetail/anti-viral-mex-guard-25961499691.html"
  },
  { 
    name: "Immunoboost Multivitamin AD3E", 
    mrp: "₹680", wholesale: "₹475", unit: "500ml", status: "In Stock",
    category: "Multivitamin", partner: "IndiaMart Hub",
    link: "https://www.indiamart.com/proddetail/immunoboost-multivitamin-immunity-booster-and-stress-control-24301335762.html"
  }
];

const MedicineLiveRate = () => {
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
    const [filter, setFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const categories = ['All', ...new Set(medicineData.map(item => item.category))];

    const filteredData = medicineData.filter(item => {
        const matchesFilter = filter === 'All' || item.category === filter;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             item.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const handleDirectOrder = (link) => {
        if (link) window.open(link, '_blank');
    };

    return (
        <section id="live-rates" className="py-24 px-4 sm:px-6 bg-[#030712] relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px] -z-10 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[120px] -z-10"></div>

            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
                    <div className="max-w-2xl">
                        <p className="text-gray-400 text-lg font-medium max-w-xl">
                            Search and order chicken medicines directly from official IndiaMart wholesalers.
                        </p>
                    </div>

                    <div className="flex flex-col gap-6 w-full lg:w-auto items-end">
                        <div className="bg-white/5 border border-white/10 backdrop-blur-xl px-6 py-4 rounded-3xl group hover:border-sky-500/30 transition-colors">
                            <p className="text-gray-500 text-[9px] font-black uppercase tracking-[0.3em] mb-1">Live Price Sync</p>
                            <p className="text-2xl font-mono text-sky-400 font-black tracking-tighter leading-none">
                                {currentTime}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                            <div className="relative group">
                                <input 
                                    type="text" 
                                    placeholder="Search medicine name..." 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="bg-white/5 border border-white/10 text-white px-6 py-3 rounded-2xl outline-none focus:border-emerald-500/50 w-full sm:w-64 transition-all"
                                />
                                <svg className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-emerald-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>

                            <div className="flex flex-wrap gap-2 justify-end">
                                {categories.map(cat => (
                                    <button 
                                        key={cat}
                                        onClick={() => setFilter(cat)}
                                        className={`px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
                                            filter === cat 
                                            ? 'bg-sky-500 text-white shadow-[0_0_20px_rgba(14,165,233,0.3)]' 
                                            : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Medicine Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredData.map((item, idx) => (
                        <div key={idx} className="group relative bg-[#0f172a] border border-white/5 hover:border-emerald-500/40 rounded-[2.5rem] p-8 transition-all duration-700 hover:-translate-y-2">
                            {/* Decorative Elements */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            
                            <div className="flex justify-between items-center mb-8">
                                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-500/5 px-3 py-1 rounded-lg border border-emerald-500/10">
                                    {item.unit}
                                </span>
                                <span className="text-[10px] font-bold text-emerald-400 uppercase bg-emerald-400/10 border border-emerald-400/20 px-3 py-1 rounded-lg">
                                    {item.status}
                                </span>
                            </div>

                            <div className="h-16 mb-6">
                                <h3 className="text-xl font-bold text-white line-clamp-2 leading-tight uppercase group-hover:text-emerald-400 transition-colors">
                                    {item.name}
                                </h3>
                                <div className="flex items-center gap-2 mt-2">
                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{item.category}</p>
                                    <span className="text-[8px] px-1.5 py-0.5 rounded bg-white/5 text-gray-600 border border-white/5">{item.partner}</span>
                                </div>
                            </div>

                            {/* Pricing Section */}
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between items-end border-b border-white/5 pb-4">
                                    <div>
                                        <p className="text-[9px] text-gray-500 font-black uppercase mb-1">Market MRP</p>
                                        <p className="text-xl text-gray-400 font-bold line-through">
                                            {item.mrp}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[9px] text-emerald-500 font-black uppercase mb-1">Wholesale</p>
                                        <p className="text-4xl text-white font-black tracking-tighter">
                                            {item.wholesale}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Savings</p>
                                    <p className="text-xs font-black text-emerald-400">
                                        SAVE {Math.round((1 - parseInt(item.wholesale.replace('₹', '').replace(',', '')) / parseInt(item.mrp.replace('₹', '').replace(',', '')) || 0) * 100)}%
                                    </p>
                                </div>
                            </div>

                             <div className="flex flex-col gap-3">
                                <button 
                                    onClick={() => handleDirectOrder(item.link)}
                                    className="w-full py-5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-blue-900/20 transform transition-all active:scale-95 flex items-center justify-center gap-3 overflow-hidden relative group/btn"
                                >
                                    <span className="relative z-10">Direct Order Link</span>
                                    <svg className="w-5 h-5 relative z-10 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                    <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover/btn:animate-shine"></div>
                                </button>
                             </div>
                        </div>
                    ))}
                </div>

                {/* Footer Notice */}
                <div className="mt-20 p-10 bg-white/5 border border-white/10 rounded-[3rem] text-center relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-sky-500 to-emerald-500 animate-gradient-x"></div>
                    <p className="text-gray-400 text-sm font-medium mb-8 max-w-3xl mx-auto leading-relaxed">
                        Welcome to the official <span className="text-white font-bold">Dethe Patil Hub</span>. Orders are processed directly through the official IndiaMart wholesale links for 100% security and transparency.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <a 
                            href="https://dir.indiamart.com/impcat/chicken-vaccines.html" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-white text-black px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-sky-400 hover:text-white transition-all transform hover:-translate-y-1"
                        >
                            Browse All Vaccines
                        </a>
                        <a 
                            href="https://dir.indiamart.com/impcat/poultry-medicines.html?biz=30" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white border-b border-white/10 hover:border-white transition-all font-black text-[10px] uppercase tracking-widest pb-1"
                        >
                            Browse All Medicines
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MedicineLiveRate;
