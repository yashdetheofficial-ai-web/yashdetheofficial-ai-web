const fs = require('fs');

const filePath = 'c:\\Users\\YASHUUU\\Desktop\\Dethe patil\\src\\components\\MedicineChatbot.jsx';
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(
  'if (q.includes("overall") || q.includes("sagle") || q.includes("sagli") || q.includes("total") || q.includes("all medicine") || q.includes("price list") || q.includes("सगळे दर") || q.includes("सर्व औषधे") || q.includes("सगळी औषधे") || q.includes("कोंबडी औषध yadi")) {',
  'if (q.includes("overall") || q.includes("sagle") || q.includes("sagli") || q.includes("total") || q.includes("all medicine") || q.includes("price list") || q.includes("सगळे दर") || q.includes("सर्व औषधे") || q.includes("सगळी औषधे") || q.includes("कोंबडी औषध yadi") || q.includes("live rate") || q.includes("yadi") || q.includes("यादी")) {'
);

const oldOverallStart = 'let overallResponse = `<div class="p-4 bg-emerald-500/10 border-l-4 border-emerald-500 rounded-lg mb-4">';
const oldOverallEnd = 'setIsTyping(false);\n        return;\n      }';

const newOverall = `let overallResponse = \`
          <div class="mb-5 p-6 bg-gradient-to-br from-emerald-600 to-teal-800 rounded-[2.5rem] shadow-2xl shadow-emerald-900/40 relative overflow-hidden border border-emerald-400/30">
            <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            <div class="relative z-10">
              <p class="font-black text-white text-xl uppercase tracking-tighter leading-none mb-1">
                \${lang === 'mr' ? 'कोंबडी औषध संपूर्ण लाईव्ह दरपत्रक' : 'Complete Live Rate Price List'}
              </p>
              <div class="flex items-center gap-2 mb-4">
                <span class="px-2 py-0.5 bg-red-500 rounded text-[9px] font-black text-white uppercase tracking-widest animate-pulse shadow-lg shadow-red-500/30">🔴 Live Update</span>
                <p class="text-[10px] text-emerald-100 font-bold uppercase tracking-wider">IndiaMart Verified</p>
              </div>
              <p class="text-[11px] text-emerald-50/90 leading-relaxed font-medium">
                \${lang === 'mr' ? 'खालील सर्व औषधांचे दर इंडियामार्ट होलसेल दरांवर आधारित आहेत. हे दर क्वांटिटी नुसार बदलू शकतात.' : 'All rates below are based on IndiaMart wholesale prices. Prices vary based on quantity.'}
              </p>
            </div>
          </div>
        \`;

        categories.forEach(cat => {
          const catMeds = medicineData.filter(m => (m.category || "General") === cat);
          overallResponse += \`
            <div class="mt-8 mb-4 animate-fade-in">
              <div class="flex items-center gap-4 mb-4">
                <div class="h-[2px] flex-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-cyan-500/80 rounded-full"></div>
                <p class="text-[12px] font-black text-cyan-400 uppercase tracking-[0.3em] whitespace-nowrap drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">\${cat}</p>
                <div class="h-[2px] flex-1 bg-gradient-to-l from-transparent via-cyan-500/50 to-cyan-500/80 rounded-full"></div>
              </div>
              <div class="grid gap-4">
                \${catMeds.map(m => \`
                  <div class="group bg-slate-900/60 backdrop-blur-xl p-5 rounded-[2rem] border border-slate-700/50 hover:border-emerald-500/40 hover:bg-slate-800/80 transition-all duration-500 shadow-xl hover:shadow-emerald-500/10">
                    <div class="flex justify-between items-start gap-4">
                      <div class="flex-1 pr-2">
                        <p class="text-[14px] text-white font-black group-hover:text-emerald-400 transition-colors uppercase tracking-tight leading-loose line-clamp-2">\${m.name}</p>
                        <p class="text-[10px] text-gray-400 font-bold mt-1 tracking-widest uppercase flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-emerald-500 transition-colors"></span> \${m.unit || 'PACK'}</p>
                      </div>
                      <div class="bg-emerald-950/40 px-4 py-3 rounded-2xl border border-emerald-500/30 text-center min-w-[95px] flex flex-col justify-center group-hover:bg-gradient-to-br group-hover:from-emerald-500 group-hover:to-teal-600 group-hover:scale-105 transition-all duration-300 shadow-lg group-hover:shadow-emerald-500/30">
                        <p class="text-[8px] text-emerald-400 font-bold uppercase mb-0.5 group-hover:text-emerald-50 tracking-widest">Rate</p>
                        <p class="text-[16px] text-emerald-300 font-black leading-none group-hover:text-white drop-shadow-md whitespace-nowrap">\${m.price}</p>
                      </div>
                    </div>
                    <div class="mt-4 flex flex-col gap-2 border-t border-slate-700/50 pt-4">
                      <div class="flex items-start gap-2">
                         <span class="text-[9px] font-bold text-sky-400 uppercase tracking-widest mt-0.5">Note:</span>
                         <div>
                            <p class="text-[11px] text-gray-300 font-medium leading-relaxed">\${m.usage}</p>
                            <p class="text-[11px] text-emerald-400/80 font-medium italic leading-relaxed mt-0.5">\${m.usageMr || ""}</p>
                         </div>
                      </div>
                    </div>
                    \${m.link ? \`
                      <a href="\${m.link}" target="_blank" class="mt-4 flex items-center justify-center gap-2 w-full py-2.5 bg-sky-950/30 border border-sky-500/20 rounded-xl text-center text-sky-400 text-[9px] font-black uppercase tracking-[0.2em] hover:bg-sky-500 hover:text-white transition-all duration-300 active:scale-95 group/btn">
                        <span>Official Rate Link</span>
                        <svg class="w-3 h-3 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                      </a>
                    \` : ""}
                  </div>
                \`).join('')}
              </div>
            </div>
          \`;
        });

        overallResponse += \`
          <div class="mt-8 mb-4 p-5 bg-gradient-to-r from-blue-900/20 to-indigo-900/20 rounded-3xl border border-blue-500/20 text-center backdrop-blur-sm">
            <p class="text-[10px] text-blue-300 font-bold uppercase tracking-[0.15em] leading-relaxed">
              \${lang === 'mr' ? 'हे दर होलसेल असल्याने जास्त क्वांटिटी घेतल्यावर कमी होऊ शकतात.' : 'Rates shown are wholesale estimations. Bulk orders may receive discounts.'}
            </p>
          </div>
        \`;

        setMessages(prev => [...prev, { role: "ai", content: overallResponse }]);
        setIsTyping(false);
        return;
      }`;

const startIndex = content.indexOf(oldOverallStart);
const endIndex = content.indexOf(oldOverallEnd);

if (startIndex !== -1 && endIndex !== -1) {
    content = content.slice(0, startIndex) + newOverall + content.slice(endIndex + oldOverallEnd.length);
    console.log('UI Replaced!');
} else {
    console.log('Cannot find UI bounds.');
}

const newMeds = `
  { 
    name: "LIV Tox Liver Tonic", 
    price: "₹200", unit: "1 Litre", category: "Liver Tonic",
    usage: "Hepatic support and appetite boost.",
    usageMr: "यकृताचे आरोग्य आणि भूक वाढवण्यासाठी टॉनिक.",
    supplier: "IndiaMart Hub", diseases: ["Liver", "appetite", "chicken", "hen"],
    lat: 19.0760, lng: 72.8777,
    link: "https://dir.indiamart.com/impcat/poultry-medicines.html"
  },
  { 
    name: "Liquid Calcium (Poultry)", 
    price: "₹500", unit: "5 Litre", category: "Supplements",
    usage: "Bone health and shell quality.",
    usageMr: "हाडांच्या मजबुतीसाठी आणि अंड्यांचे कवच सुधारण्यासाठी कॅल्शियम.",
    supplier: "IndiaMart Hub", diseases: ["Calcium", "Bones", "Shell", "chicken", "hen"],
    lat: 18.5204, lng: 73.8567,
    link: "https://dir.indiamart.com/impcat/poultry-medicines.html"
  },
  { 
    name: "Multivit Gold Supplement", 
    price: "₹570", unit: "1 Kg Pack", category: "Supplements",
    usage: "Multi-vitamin for rapid growth.",
    usageMr: "कोंबड्यांची जलद वाढ होण्यासाठी मल्टी-व्हिटॅमिन पावडर.",
    supplier: "IndiaMart Hub", diseases: ["Vitamin", "Growth", "chicken", "hen"],
    lat: 19.0760, lng: 72.8777,
    link: "https://dir.indiamart.com/impcat/poultry-medicines.html"
  },
  { 
    name: "Respiratory Tonic (Growel)", 
    price: "₹850", unit: "1 Litre", category: "Clinical",
    usage: "Relief from wheezing and coughing.",
    usageMr: "खोकला आणि धाप लागण्याच्या त्रासापासून आराम मिळवण्यासाठी.",
    supplier: "IndiaMart Hub", diseases: ["Cough", "Wheezing", "chicken", "hen"],
    lat: 18.5204, lng: 73.8567,
    link: "https://dir.indiamart.com/impcat/poultry-medicines.html"
  },
  { 
    name: "Herba Oral (Coccidiosis)", 
    price: "₹2,710", unit: "1 Litre", category: "Clinical",
    usage: "Advanced treatment for bloody diarrhea.",
    usageMr: "रक्ताच्या जुलाबावर (Coccidiosis) प्रगत आयुर्वेदिक उपचार.",
    supplier: "IndiaMart Hub", diseases: ["Coccidiosis", "Blood Stool", "chicken", "hen"],
    lat: 28.6139, lng: 77.2090,
    link: "https://dir.indiamart.com/impcat/poultry-medicines.html"
  },
  { 
    name: "Olklin-SW Disinfectant", 
    price: "₹1,200", unit: "1 Litre", category: "Sanitization",
    usage: "High-grade water and farm sanitizer.",
    usageMr: "पाणी आणि फार्म निर्जंतुकीकरण करण्यासाठी उत्तम सॅनिटायझर.",
    supplier: "IndiaMart Hub", diseases: ["Sanitizer", "Bio Security", "chicken", "hen"],
    lat: 19.0760, lng: 72.8777,
    link: "https://dir.indiamart.com/impcat/poultry-medicines.html"
  },
  { 
    name: "SONIA LEVO-BH Solution", 
    price: "₹700", unit: "1 Litre", category: "Antibiotics",
    usage: "Combined respiratory and bacterial support.",
    usageMr: "जिवाणू संसर्ग आणि श्वसनाच्या त्रासावर एकत्रित उपाय.",
    supplier: "IndiaMart Hub", diseases: ["Bacterial", "Respiratory", "chicken", "hen"],
    lat: 28.6139, lng: 77.2090,
    link: "https://dir.indiamart.com/impcat/poultry-medicines.html"
  }
];`;

content = content.replace(/  \}\r?\n\];/g, '  },\n' + newMeds);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Saved.');
