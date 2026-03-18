import React, { useState, useEffect, useRef } from "react";

const translations = {
  en: {
    welcome: "Welcome to Dethe Patil Medicine **AI Live Rate**. Ask for any chicken medicine for rates, or search **'overall'** to see the full price list.",
    findNearby: "📍 NEARBY STORES (100KM)",
    searchPlaceholder: "Search medicine (eg: Ranikhet)...",
    askPlaceholder: "Ask for rates or overall list...",
    send: "SEND",
    live: "LIVE",
    medicalReport: "Medical Report Generated",
    medicineReport: "AI Live Price Report",
    diseaseIdentified: "📢 Disease Identified",
    symptoms: "SYMPTOMS",
    advice: "ADVICE",
    suggestedMeds: "Suggested Medicines",
    usage: "USAGE",
    pack: "PACK",
    shop: "SOURCE",
    nearbyShops: "Found **{count}** IndiaMart stores within **100km**",
    noShops: "No nearby IndiaMart hub stores. Search the official link for bulk orders.",
    locDenied: "Location permission denied.",
    notFound: "Not found. Try searching for **'Ranikhet'**, **'Gumboro'**, or **'Fowl Pox'**.",
    selectLang: "Select Language / भाषा निवडा / भाषा चुनें",
    headerTitle: "Medicine AI",
    headerSub: "IndiaMart Live Rates",
    startNew: "🔄 Start New Consulting"
  },
  hi: {
    welcome: "देठे पाटिल **AI लाइव रेट** में आपका स्वागत है। किसी भी दवा का रेट पूछें, या पूरी लिस्ट देखने के लिए **'overall'** सर्च करें।",
    findNearby: "📍 पास की दुकानें खोजें (100KM)",
    searchPlaceholder: "दवा का नाम (उदा: Ranikhet)...",
    askPlaceholder: "रेट या पूरी लिस्ट के बारे में पूछें...",
    send: "भेजें",
    live: "लाइव",
    medicalReport: "मेडिकल रिपोर्ट",
    medicineReport: "दवा और मूल्य विवरण",
    diseaseIdentified: "📢 बीमारी की पहचान",
    symptoms: "लक्षण",
    advice: "डॉक्टर की सलाह",
    suggestedMeds: "सुझाई गई दवाएं",
    usage: "उपयोग",
    pack: "पैकिंग",
    shop: "दुकान",
    nearbyShops: "**100km** के भीतर **{count}** दुकानें मिलीं",
    noShops: "आपके स्थान के 100 किमी के भीतर कोई दुकान नहीं मिली।",
    locDenied: "स्थान की अनुमति नहीं मिली。",
    notFound: "मुझे कोई दवा या बीमारी नहीं मिली। 'रानीखेत', 'गंभोरो' या 'चुना' जैसे शब्द खोजें।",
    selectLang: "Select Language / भाषा निवडा / भाषा चुनें",
    headerTitle: "देठे पाटिल मेडिसिन",
    headerSub: "AI लाइव रेट और निदान",
    startNew: "🔄 नया परामर्श शुरू करें"
  },
  mr: {
    welcome: "देठे पाटील **AI लाईव्ह रेट** मध्ये आपले स्वागत आहे. कोणत्याही औषधाचा दर विचारण्यासाठी नाव टाका, किंवा सर्व दर पाहण्यासाठी **'overall'** सर्च करा.",
    findNearby: "📍 जवळची दुकाने शोधा (100KM)",
    searchPlaceholder: "औषधाचे नाव (उदा: Ranikhet)...",
    askPlaceholder: "दर किंवा सर्व यादी पहा...",
    send: "पाठवा",
    live: "लाईव्ह",
    overallTitle: "कोंबडी औषध संपूर्ण दर पत्रक (Live Report)",
    overallSub: "इंडियामार्ट होलसेल दरांवर आधारित",
    medicalReport: "वैद्यकीय अहवाल",
    medicineReport: "AI लाईव्ह रेट रिपोर्ट",
    diseaseIdentified: "📢 आजाराचे निदान",
    symptoms: "लक्षणे",
    advice: "डॉक्टरांचा सल्ला",
    suggestedMeds: "सुचविलेली औषधे",
    usage: "वापर",
    pack: "पॅकिंग",
    shop: "दुकान",
    nearbyShops: "**100km** च्या आत **{count}** दुकाने आढळली",
    noShops: "तुमच्या ठिकाणापासून 100 किमीच्या आत काहीही सापडले नाही.",
    locDenied: "लोकेशन परवानगी नाही.",
    notFound: "कोणतेही औषध किंवा आजार सापडला नाही. 'रानीखेत', 'गंभोरो' किंवा 'जुलाब' शोधून पहा.",
    selectLang: "Select Language / भाषा निवडा / भाषा चुनें",
    headerTitle: "देठे पाटील मेडिसिन",
    headerSub: "AI लाईव्ह रेट आणि निदान",
    startNew: "🔄 नवीन सल्ला घ्या"
  }
};

const medicineData = [
  // VACCINES
  { 
    name: "Ranikhet Disease Vaccine (Lasota)", 
    price: "₹85", unit: "1000 Doses", category: "Vaccines",
    usage: "Live vaccine for Newcastle disease prevention.",
    usageMr: "राणीखेत (न्यूकॅसल) आजाराच्या उपचारासाठी आणि प्रतिबंधासाठी उपयुक्त लस.",
    supplier: "IndiaMart Hub", diseases: ["Ranikhet", "Newcastle", "मान फिरवणे", "chicken", "hen"],
    lat: 18.5204, lng: 73.8567,
    link: "https://dir.indiamart.com/impcat/chicken-vaccines.html"
  },
  { 
    name: "Gumboro (IBD) Vaccine - Live", 
    price: "₹110", unit: "500 Doses", category: "Vaccines",
    usage: "Prevention of Infectious Bursal Disease.",
    usageMr: "गुंबोरो (IBD) आजारावर नियंत्रण मिळवण्यासाठी आणि प्रतिकारशक्ती वाढवण्यासाठी.",
    supplier: "IndiaMart Hub", diseases: ["Gumboro", "IBD", "पांढरे जुलाब", "chicken", "hen"],
    lat: 19.0760, lng: 72.8777,
    link: "https://dir.indiamart.com/impcat/chicken-vaccines.html"
  },
  { 
    name: "Fowl Pox Live Vaccine", 
    price: "₹50", unit: "1 Unit", category: "Vaccines",
    usage: "Immunization against Fowl Pox.",
    usageMr: "कोंबड्यांना देवी (Fowl Pox) आजारापासून वाचवण्यासाठी प्रभावी लस.",
    supplier: "IndiaMart Hub", diseases: ["Fowl Pox", "देवी", "गाठी", "chicken", "hen"],
    lat: 28.6139, lng: 77.2090,
    link: "https://dir.indiamart.com/impcat/chicken-vaccines.html"
  },
  { 
    name: "Marek's Disease Vaccine", 
    price: "₹750", unit: "2000 Doses", category: "Vaccines",
    usage: "Prevention of Marek's disease.",
    usageMr: "मेरेक्स आजारावर नियंत्रण मिळवण्यासाठी एक दिवसाच्या पिल्लांना दिली जाणारी लस.",
    supplier: "IndiaMart Hub", diseases: ["Marek", "Paralysis", "chicken", "hen"],
    lat: 18.5204, lng: 73.8567,
    link: "https://dir.indiamart.com/impcat/chicken-vaccines.html"
  },
  { 
    name: "Infectious Bronchitis Vaccine", 
    price: "₹320", unit: "1000 Doses", category: "Vaccines",
    usage: "Respiratory protection (IBV).",
    usageMr: "श्वसनाच्या आजारांपासून (IBV) संरक्षण करण्यासाठी वापरली जाणारी लस.",
    supplier: "IndiaMart Hub", diseases: ["Bronchitis", "IBV", "सर्दी", "chicken", "hen"],
    lat: 19.0760, lng: 72.8777,
    link: "https://dir.indiamart.com/impcat/chicken-vaccines.html"
  },
  // ANTIBIOTICS
  { 
    name: "Enrofloxacin 10% Oral Solution", 
    price: "₹595", unit: "1 Litre", category: "Antibiotics",
    usage: "Broad spectrum antibiotic for CRD/Coli.",
    usageMr: "सर्दी (CRD), ई-कोलाय आणि इतर जिवाणू संसर्गावर गुणकारी औषध.",
    supplier: "IndiaMart Hub", diseases: ["CRD", "E.Coli", "Coryza", "chicken", "hen"],
    lat: 19.0760, lng: 72.8777,
    link: "https://www.indiamart.com/proddetail/enrofloxacin-oral-solution-10-22129377430.html"
  },
  { 
    name: "Ciprofloxacin Hcl Oral Solution", 
    price: "₹420", unit: "1L Bottle", category: "Antibiotics",
    usage: "Effective against bacterial infections.",
    usageMr: "विविध प्रकारच्या जिवाणू संसर्गावर उपचार करण्यासाठी वापरले जाणारे अँटीबायोटिक.",
    supplier: "IndiaMart Hub", diseases: ["Bacterial", "Infection", "chicken", "hen"],
    lat: 28.6139, lng: 77.2090,
    link: "https://www.indiamart.com/proddetail/ciprofloxacin-hcl-oral-solution-poultry-antibiotic-23867770773.html"
  },
  { 
    name: "Amoxicillin Antibiotics Powder", 
    price: "₹780", unit: "500g", category: "Antibiotics",
    usage: "General purpose antibiotic.",
    usageMr: "सर्वसाधारण जिवाणू संसर्ग आणि आजारांवरील प्रभावी औषध.",
    supplier: "IndiaMart Hub", diseases: ["Bacterial", "Infection", "chicken", "hen"],
    lat: 18.5204, lng: 73.8567,
    link: "https://dir.indiamart.com/impcat/poultry-medicines.html"
  },
  { 
    name: "Lincomycin HCl Powder", 
    price: "₹340", unit: "Kg", category: "Antibiotics",
    usage: "Treatment of severe respiratory issues.",
    usageMr: "श्वसनाचे तीव्र आजार आणि सांधेदुखीवर अत्यंत प्रभावी औषध.",
    supplier: "IndiaMart Hub", diseases: ["Mycoplasma", "CRD", "chicken", "hen"],
    lat: 18.5204, lng: 73.8567,
    link: "https://dir.indiamart.com/impcat/poultry-medicines.html"
  },
  { 
    name: "Coccidoline - Sulpha Diver", 
    price: "₹315", unit: "Pouch", category: "Antibiotics",
    usage: "Treatment of Coccidiosis.",
    usageMr: "रक्ताचे जुलाब (Coccidiosis) रोखण्यासाठी आणि त्यावर उपचार करण्यासाठी.",
    supplier: "IndiaMart Hub", diseases: ["Coccidiosis", "Blood Stool", "रक्ताचे जुलाब", "chicken", "hen"],
    lat: 18.5204, lng: 73.8567,
    link: "https://www.indiamart.com/proddetail/coccidoline-sulpha-diver-2985429412.html"
  },
  { 
    name: "SONIA LEVO-BH Solution", 
    price: "₹700", unit: "1 Litre", category: "Antibiotics",
    usage: "Combined respiratory and bacterial support.",
    usageMr: "जिवाणू संसर्ग आणि श्वसनाच्या त्रासावर एकत्रित उपाय.",
    supplier: "IndiaMart Hub", diseases: ["Bacterial", "Respiratory", "chicken", "hen"],
    lat: 28.6139, lng: 77.2090,
    link: "https://dir.indiamart.com/impcat/poultry-medicines.html"
  },
  // TONICS & SUPPLEMENTS
  { 
    name: "Livohem Liver & Blood Booster", 
    price: "₹310", unit: "500ml", category: "Liver Tonic",
    usage: "Liver health and appetite stimulant.",
    usageMr: "यकृताचे आरोग्य सुधारण्यासाठी आणि कोंबड्यांची भूक वाढवण्यासाठी टॉनिक.",
    supplier: "IndiaMart Hub", diseases: ["Liver", "Toxins", "Growth", "chicken", "hen"],
    lat: 18.5204, lng: 73.8567,
    link: "https://www.indiamart.com/proddetail/livohem-liver-and-blood-health-booster-2852174543791.html"
  },
  { 
    name: "Arliv Veterinary Liver Tonic", 
    price: "₹280", unit: "1 Litre", category: "Liver Tonic",
    usage: "Hepatic support and liver detox.",
    usageMr: "लिव्हर डिटॉक्स आणि यकृत कार्यक्षमतेसाठी उपयुक्त.",
    supplier: "IndiaMart Hub", diseases: ["Liver", "appetite", "chicken", "hen"],
    lat: 19.0760, lng: 72.8777,
    link: "https://www.indiamart.com/proddetail/1l-arliv-veterinary-liver-tonic-19456486830.html"
  },
  { 
    name: "Nephronova Renal Solution", 
    price: "₹510", unit: "500ml", category: "Kidney Tonic",
    usage: "Kidney detox and Gout prevention.",
    usageMr: "किडनी स्वच्छ करण्यासाठी आणि गाऊट (Gout) आजार रोखण्यासाठी उपयुक्त औषध.",
    supplier: "IndiaMart Hub", diseases: ["Gout", "Kidney", "गाऊट", "chicken", "hen"],
    lat: 18.5204, lng: 73.8567,
    link: "https://www.indiamart.com/proddetail/nephronova-for-preventing-renal-dysfunction-and-gout-28521745430.html"
  },
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
    name: "Aimivit Gold Poultry Liquid", 
    price: "₹820", unit: "1 Litre", category: "Supplements",
    usage: "Multi-vitamin for egg and weight growth.",
    usageMr: "अंड्यांचे प्रमाण वाढवण्यासाठी आणि कोंबड्यांचे वजन वेगाने वाढवण्यासाठी मल्टी-विटामिन.",
    supplier: "IndiaMart Hub", diseases: ["Vitamin", "Egg Growth", "chicken", "hen"],
    lat: 19.0760, lng: 72.8777,
    link: "https://dir.indiamart.com/impcat/poultry-medicines.html"
  },
  { 
    name: "Vitamin B Complex Liquid Hub", 
    price: "₹75", unit: "Kg Equivalent", category: "Supplements",
    usage: "Essential for nerve health.",
    usageMr: "मज्जासंस्थेचे आरोग्य सुधारण्यासाठी आणि अर्धांगवायू (लकवा) टाळण्यासाठी विटामिन बी.",
    supplier: "IndiaMart Hub", diseases: ["B-Complex", "Paralysis", "chicken", "hen"],
    lat: 19.0760, lng: 72.8777,
    link: "https://dir.indiamart.com/impcat/poultry-medicines.html"
  },
  { 
    name: "MEX GUARD Anti-Viral Solution", 
    price: "₹1,015", unit: "Bottle", category: "Clinical",
    usage: "Viral immunity booster.",
    usageMr: "संसर्गजन्य विषाणूंपासून संरक्षण करण्यासाठी आणि रोगप्रतिकारशक्ती वाढवण्यासाठी.",
    supplier: "IndiaMart Hub", diseases: ["Viral", "Immunity", "chicken", "hen"],
    lat: 18.5204, lng: 73.8567,
    link: "https://www.indiamart.com/proddetail/anti-viral-mex-guard-25961499691.html"
  },
  { 
    name: "Immunoboost Multivitamin AD3E", 
    price: "₹475", unit: "500ml", category: "Multivitamin",
    usage: "Vitamins for stress and peak productivity.",
    usageMr: "कोंबड्यांचा ताण (Stress) कमी करण्यासाठी आणि उत्पादन क्षमता टिकवण्यासाठी जीवनसत्त्वे.",
    supplier: "IndiaMart Hub", diseases: ["Stress", "Summer Care", "chicken", "hen"],
    lat: 28.6139, lng: 77.2090,
    link: "https://www.indiamart.com/proddetail/immunoboost-multivitamin-immunity-booster-and-stress-control-24301335762.html"
  },
  { 
    name: "Calcium & Vitamin D3 Liquid", 
    price: "₹185", unit: "1 Litre", category: "Supplements",
    usage: "Bone health and shell quality.",
    usageMr: "हाडांच्या मजबुतीसाठी आणि अंड्यांचे कवच सुधारण्यासाठी कॅल्शियम.",
    supplier: "IndiaMart Hub", diseases: ["Calcium", "Bones", "Shell", "chicken", "hen"],
    lat: 18.5204, lng: 73.8567,
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
  // SANITIZATION
  { 
    name: "Aquanic Water Sanitizer", 
    price: "₹385", unit: "1 Litre", category: "Sanitization",
    usage: "Water pipe and drinking water cleaning.",
    usageMr: "पिण्याचे पाणी शुद्ध करण्यासाठी आणि पाण्याचे पाईप्स स्वच्छ ठेवण्यासाठी सॅनिटायझर.",
    supplier: "IndiaMart Hub", diseases: ["Sanitizer", "Water Safety", "chicken", "hen"],
    lat: 28.6139, lng: 77.2090,
    link: "https://www.indiamart.com/proddetail/water-sanitizers-for-poultry-aquanic-2850944473230.html"
  },
  { 
    name: "Proguard Virus Control Powder", 
    price: "₹875", unit: "1 Kg", category: "Sanitization",
    usage: "Disinfectant for farm equipment.",
    usageMr: "शेडमधील बॅक्टेरिया आणि व्हायरस नष्ट करण्यासाठी सॅनिटायझर पावडर.",
    supplier: "IndiaMart Hub", diseases: ["Virus Control", "Bio Security", "chicken", "hen"],
    lat: 18.5204, lng: 73.8567,
    link: "https://www.indiamart.com/proddetail/proguard-gss-virus-control-disinfection-of-poultry-and-livestock-equipment-22890271230.html"
  },
  { 
    name: "Olklin-SW Disinfectant", 
    price: "₹1,200", unit: "1 Litre", category: "Sanitization",
    usage: "High-grade water and farm sanitizer.",
    usageMr: "पाणी आणि फार्म निर्जंतुकीकरण करण्यासाठी उत्तम सॅनिटायझर.",
    supplier: "IndiaMart Hub", diseases: ["Sanitizer", "Bio Security", "chicken", "hen"],
    lat: 19.0760, lng: 72.8777,
    link: "https://dir.indiamart.com/impcat/poultry-medicines.html"
  }
];

const diseaseInfo = [
  {
    name: "Ranikhet (Newcastle Disease)",
    symptoms: "Twisting neck, gasping, greenish diarrhea, sudden death, मान फिरवणे, हिरवे जुलाब, मरतूक",
    treatment: "No cure for virus. Prevention via Lasota/R2B vaccine. Give immunity boosters like Vitamin E+Selenium.",
    medicines: ["Vitamin E+Se", "Immunity Boosters", "B-Complex"]
  },
  {
    name: "Gumboro (IBD)",
    symptoms: "Swelling of bursa, white diarrhea, birds sitting on hocks, पांढरे जुलाब, मरतूक",
    treatment: "Provide Kidney support (Nefrotec) and Electrolytes. Clean litter immediately.",
    medicines: ["Nefrotec Vet Liquid", "Uro Safe", "Electrolytes"]
  },
  {
    name: "CRD (Respiratory)",
    symptoms: "Wheezing, coughing, swollen eyes, reduced feed intake, फुप्फुसाचे आजार, सर्दी, खोकला",
    treatment: "Use Tylosin or Lincomycin. Improve ventilation and reduce ammonia.",
    medicines: ["Lincomycin HCl", "Poultryfine CRD", "Tylosin Tartrate"]
  },
  {
    name: "Coccidiosis",
    symptoms: "Bloody diarrhea, ruffled feathers, pale combs, खूनी दस्त, रक्ताचे जुलाब",
    treatment: "Use Crozine-K or Amprolium. Keep litter dry.",
    medicines: ["Crozine-K", "Amprolium", "Sulpha drugs"]
  },
  {
    name: "Infectious Coryza",
    symptoms: "Swollen face/sinuses, foul-smelling nasal discharge, eyelids stuck shut, चेहरा सुजणे, नाकातून स्त्राव",
    treatment: "Prompt treatment with Enrofloxacin or Sulpha drugs. Separate infected birds.",
    medicines: ["Enrocin 10%", "Oxy-TC", "Sulpha drugs"]
  },
  {
    name: "Heat Stress",
    symptoms: "Panting, spreading wings, high water intake, sudden drop in egg production, उष्णतेचा त्रास, धाप लागणे",
    treatment: "Provide cooling (foggers/fans), add electrolytes and Vitamin C to water.",
    medicines: ["Electrolytes", "Vitamin C", "Vimeral"]
  },
  {
    name: "Leg Paralysis (B-Complex Def.)",
    symptoms: "Curled toe paralysis, unable to walk, weight loss, पाय लंगडणे, अर्धांगवायू, कमजोरी",
    treatment: "Check feed quality, provide high-dose Vitamin B-Complex immediately.",
    medicines: ["Ambiplex", "Vitamin B12", "Liver Tonic"]
  }
];

const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
};

const MedicineChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState(null);
  const [messages, setMessages] = useState([
    { role: "ai", content: null, card: "language" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const scrollRef = useRef(null);

  const t = lang ? translations[lang] : translations['en'];

  const handleLangSelect = (l) => {
    setLang(l);
    setMessages([
      { role: "ai", content: translations[l].welcome }
    ]);
  };

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

  const fetchNearbyShops = () => {
    if (!navigator.geolocation) {
       addMessage(t.noShops, "ai");
       return;
    }
    
    setIsTyping(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        const nearby = medicineData.map(m => ({
          ...m,
          distance: getDistance(latitude, longitude, m.lat, m.lng)
        })).filter(m => m.distance <= 100)
           .sort((a, b) => a.distance - b.distance);

        let response;
        if (nearby.length > 0) {
          response = t.nearbyShops.replace("{count}", nearby.length) + ": <br/>" + 
          nearby.map(m => `
            <div class="mt-4 p-5 bg-[#1a1c1e] border-b-4 border-r-4 border-blue-500 rounded-2xl shadow-2xl transform hover:-translate-y-1 transition-all">
              <div class="flex justify-between items-start mb-4">
                <p class="font-black text-blue-300 text-lg leading-tight uppercase tracking-tight">${m.name}</p>
                <div class="px-3 py-2 bg-emerald-500/20 border-b-2 border-r-2 border-emerald-500 rounded-xl text-center min-w-[80px]">
                  <p class="text-[8px] text-emerald-400 font-bold uppercase mb-0.5">${t.live}</p>
                  <p class="text-emerald-400 font-black text-sm">${m.price}/${m.unit}</p>
                </div>
              </div>
              <div class="space-y-2.5 border-t border-white/5 pt-4">
                 <p class="text-[11px] text-gray-300"><span class="text-blue-400 font-bold uppercase text-[9px] mr-2">${t.usage}:</span> ${m.usage}</p>
                 <p class="text-[11px] text-gray-300"><span class="text-blue-400 font-bold uppercase text-[9px] mr-2">${t.pack}:</span> ${m.packaging || 'N/A'}</p>
                 <p class="text-[11px] text-gray-300"><span class="text-blue-400 font-bold uppercase text-[9px] mr-2">${t.shop}:</span> ${m.supplier}</p>
              </div>
              <p class="text-[9px] text-gray-600 mt-4 text-right italic font-medium">📍 ${m.distance}km away from you</p>
            </div>
          `).join('');
        } else {
          response = t.noShops;
        }
        setMessages(prev => [...prev, { role: "ai", content: response }]);
        setIsTyping(false);
      },
      () => {
        setIsTyping(false);
        addMessage(t.locDenied, "ai");
      }
    );
  };

  const processQuery = (query) => {
    const q = query.toLowerCase();
    
    if (q.includes("nearby") || q.includes("100km") || q.includes("area")) {
       fetchNearbyShops();
       return;
    }

    setIsTyping(true);
    setTimeout(() => {
      // 1. Keywords handling - remove filler words
      const words = q.replace(/[?,.!/]/g, "").split(" ").filter(w => w.length > 2);
      
      // Special check for "Overall" or search terms meaning "all medicines"
      if (q.includes("overall") || q.includes("sagle") || q.includes("sagli") || q.includes("total") || q.includes("all medicine") || q.includes("price list") || q.includes("सगळे दर") || q.includes("सर्व औषधे") || q.includes("सगळी औषधे") || q.includes("कोंबडी औषध yadi") || q.includes("live rate") || q.includes("yadi") || q.includes("यादी")) {
        const categories = [...new Set(medicineData.map(m => m.category || "General"))];
        let overallResponse = `
          <div class="mb-5 p-6 bg-gradient-to-br from-indigo-700 via-sky-600 to-cyan-500 rounded-[2.5rem] shadow-2xl relative overflow-hidden border border-white/20">
            <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            <div class="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full -ml-20 -mb-20 blur-3xl"></div>
            <div class="relative z-10 flex flex-col gap-3">
              <div>
                <p class="font-black text-white text-3xl uppercase tracking-tighter leading-none mb-1 drop-shadow-md">
                  ${lang === 'mr' ? 'कोंबडी औषध' : 'Poultry Meds'}
                </p>
                <p class="font-bold text-sky-200 text-lg uppercase tracking-tight leading-none mb-2">
                  ${lang === 'mr' ? 'संपूर्ण लाईव्ह दरपत्रक' : 'Complete Live Rate Price List'}
                </p>
              </div>
              <div class="flex items-center gap-2 mb-2">
                <span class="px-2.5 py-1 bg-red-500 rounded-md text-[10px] font-black text-white uppercase tracking-widest animate-pulse shadow-lg shadow-red-500/50 flex items-center gap-1.5 border border-red-400/50"><div class="w-1.5 h-1.5 bg-white rounded-full"></div>Live Update</span>
                <p class="text-[10px] text-sky-50 font-bold uppercase tracking-wider px-2 py-1 bg-white/10 rounded-md border border-white/10 backdrop-blur-sm">IndiaMart Verified</p>
              </div>
              <p class="text-[11px] text-white/90 leading-relaxed font-medium bg-black/20 p-3 rounded-2xl border border-black/10">
                ${lang === 'mr' ? 'खालील सर्व औषधांचे दर इंडियामार्ट होलसेल दरांवर आधारित आहेत. दुकानांनुसार थोडे दर बदलू शकतात.' : 'All rates below are based on recent IndiaMart wholesale prices. Prices may vary based on quantity and supplier location.'}
              </p>
            </div>
          </div>
        `;

        categories.forEach(cat => {
          const catMeds = medicineData.filter(m => (m.category || "General") === cat);
          overallResponse += `
            <div class="mt-8 mb-6 animate-fade-in group/cat">
              <div class="flex items-center gap-4 mb-5">
                <div class="h-[2px] flex-1 bg-gradient-to-r from-transparent via-sky-500/50 to-sky-500/80 rounded-full group-hover/cat:via-cyan-400 group-hover/cat:to-cyan-400 transition-colors"></div>
                <p class="text-[13px] font-black text-sky-400 uppercase tracking-[0.3em] whitespace-nowrap drop-shadow-[0_0_8px_rgba(34,211,238,0.4)] group-hover/cat:text-cyan-300 transition-colors px-4 py-1.5 bg-sky-950/50 rounded-full border border-sky-500/20">${cat} <span class="text-sky-500/50">(${catMeds.length})</span></p>
                <div class="h-[2px] flex-1 bg-gradient-to-l from-transparent via-sky-500/50 to-sky-500/80 rounded-full group-hover/cat:via-cyan-400 group-hover/cat:to-cyan-400 transition-colors"></div>
              </div>
              <div class="grid gap-4">
                ${catMeds.map(m => `
                  <div class="group bg-slate-900/60 backdrop-blur-xl p-5 rounded-[2rem] border border-slate-700/50 hover:border-sky-500/40 hover:bg-slate-800/80 transition-all duration-500 shadow-xl hover:shadow-sky-500/10">
                    <div class="flex justify-between items-start gap-4">
                      <div class="flex-1 pr-2">
                        <p class="text-[15px] text-white font-black group-hover:text-sky-400 transition-colors uppercase tracking-tight leading-tight line-clamp-2">${m.name}</p>
                        <p class="text-[10px] text-gray-400 font-bold mt-1.5 tracking-widest uppercase flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-sky-500 transition-colors"></span> ${m.unit || 'PACK'}</p>
                      </div>
                      <div class="bg-sky-950/40 px-4 py-3 rounded-2xl border border-sky-500/30 text-center min-w-[100px] flex flex-col justify-center group-hover:bg-gradient-to-br group-hover:from-sky-500 group-hover:to-cyan-600 group-hover:scale-105 transition-all duration-300 shadow-lg group-hover:shadow-sky-500/30">
                        <p class="text-[8px] text-sky-400 font-bold uppercase mb-0.5 group-hover:text-sky-50 tracking-widest">Rate</p>
                        <p class="text-[18px] text-sky-300 font-black leading-none group-hover:text-white drop-shadow-md whitespace-nowrap">${m.price}</p>
                      </div>
                    </div>
                    <div class="mt-4 flex flex-col gap-2 border-t border-slate-700/50 pt-4">
                      <div class="flex items-start gap-2">
                         <span class="text-[9px] font-bold text-emerald-400 uppercase tracking-widest mt-0.5 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">Use:</span>
                         <div>
                            <p class="text-[12px] text-gray-200 font-medium leading-relaxed">${m.usage}</p>
                            <p class="text-[11px] text-emerald-400/80 font-medium italic leading-relaxed mt-0.5">${m.usageMr || ""}</p>
                         </div>
                      </div>
                    </div>
                    ${m.link ? `
                      <a href="${m.link}" target="_blank" class="mt-4 flex items-center justify-center gap-2 w-full py-2.5 bg-sky-950/30 border border-sky-500/20 rounded-xl text-center text-sky-400 text-[9px] font-black uppercase tracking-[0.2em] hover:bg-sky-500 hover:text-white transition-all duration-300 active:scale-95 group/btn">
                        <span>Check Latest on IndiaMart</span>
                        <svg class="w-3 h-3 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                      </a>
                    ` : ""}
                  </div>
                `).join('')}
              </div>
            </div>
          `;
        });

        overallResponse += `
          <div class="mt-8 mb-4 p-5 bg-gradient-to-r from-blue-900/20 to-indigo-900/20 rounded-3xl border border-blue-500/20 text-center backdrop-blur-sm">
            <p class="text-[11px] text-blue-300 font-bold uppercase tracking-[0.1em] leading-relaxed">
              ${lang === 'mr' ? 'हे दर होलसेल असल्याने जास्त क्वांटिटी घेतल्यावर कमी होऊ शकतात.' : 'Rates shown are wholesale estimations. Bulk orders may receive additional discounts from suppliers.'}
            </p>
          </div>
        `;

        setMessages(prev => [...prev, { role: "ai", content: overallResponse }]);
        setIsTyping(false);
        return;
      }

      // 2. Check for Diseases first
      const matchedDisease = diseaseInfo.find(d => 
        q.includes(d.name.toLowerCase()) || 
        d.symptoms.toLowerCase().split(',').some(s => q.includes(s.trim().toLowerCase()))
      );

      // 3. Search for Medicines - Flexible Keyword Match
      const searchResult = medicineData.filter(m => {
        const nameMatch = m.name.toLowerCase().includes(q) || words.some(w => m.name.toLowerCase().includes(w));
        const catMatch = (m.category && m.category.toLowerCase().includes(q)) || (m.category && words.some(w => m.category.toLowerCase().includes(w)));
        const diseaseMatch = m.diseases && m.diseases.some(d => q.includes(d.toLowerCase()));
        return nameMatch || catMatch || diseaseMatch;
      });

      let response = "";

      if (matchedDisease) {
        response += `
          <div class="mb-5 p-5 bg-[#1a1c1e] border-b-4 border-r-4 border-red-500 rounded-2xl shadow-2xl">
            <p class="font-black text-red-500 text-lg uppercase mb-3 tracking-tight">${t.diseaseIdentified}: ${matchedDisease.name}</p>
            <p class="text-[11px] text-gray-300 mb-2"><span class="text-red-400 font-bold uppercase text-[9px] mr-2">${t.symptoms}:</span> ${matchedDisease.symptoms}</p>
            <p class="text-[11px] text-gray-300 mb-2"><span class="text-emerald-400 font-bold uppercase text-[9px] mr-2">${t.advice}:</span> ${matchedDisease.treatment}</p>
          </div>
        `;
      }

      if (searchResult.length > 0) {
        response += `<p class="text-emerald-400 font-black text-xs uppercase mb-1 tracking-widest px-1">Found ${searchResult.length} Price Results</p>` + 
        searchResult.map(m => `
          <div class="mt-4 p-5 bg-[#0f172a] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden relative group">
            <div class="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors"></div>
            <div class="flex justify-between items-start mb-4 relative z-10">
              <div class="flex-1">
                <p class="font-black text-white text-lg leading-tight uppercase tracking-tight group-hover:text-emerald-400 transition-colors">${m.name}</p>
                <p class="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-1">${m.category}</p>
              </div>
              <div class="px-3 py-2 bg-emerald-500 border border-emerald-400/50 rounded-2xl text-center min-w-[90px] shadow-lg shadow-emerald-500/20">
                <p class="text-[8px] text-emerald-950 font-black uppercase mb-0.5 tracking-tighter">Live Price</p>
                <p class="text-white font-black text-base leading-none">${m.price}</p>
                <p class="text-[7px] text-emerald-100 font-bold mt-1">${m.unit}</p>
              </div>
            </div>
             <div class="space-y-3 border-t border-white/5 pt-4 relative z-10">
               <div class="flex items-start gap-2.5">
                 <div class="mt-1 flex flex-col items-center">
                    <div class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                    <div class="w-0.5 h-full bg-emerald-500/20 my-1"></div>
                 </div>
                 <div class="flex-1">
                   <p class="text-[8px] text-emerald-500 font-black uppercase tracking-[0.2em] mb-1">Usage / वापर:</p>
                   <p class="text-[11px] text-gray-200 leading-relaxed font-medium mb-1.5">${m.usage}</p>
                   <p class="text-[11px] text-emerald-400/90 leading-relaxed font-medium italic">${m.usageMr || ""}</p>
                 </div>
               </div>
               <div class="flex flex-col gap-2 mt-4 border-t border-white/5 pt-3">
                 <div class="flex justify-between items-center">
                   <span class="text-[8px] bg-white/5 text-gray-500 px-2 py-1 rounded uppercase font-bold tracking-widest">${m.supplier}</span>
                 </div>
                 ${m.link ? `
                   <a href="${m.link}" target="_blank" class="w-full py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center text-emerald-400 text-[10px] font-black uppercase tracking-[0.1em] hover:bg-emerald-500 hover:text-white transition-all shadow-lg active:scale-95">
                     View Live Price Update
                   </a>
                 ` : ""}
               </div>
            </div>
          </div>
        `).join('');
      }

      if (!matchedDisease && searchResult.length === 0) {
        response = t.notFound;
      }

      setMessages(prev => [...prev, { role: "ai", content: response }]);
      setIsTyping(false);
    }, 400);
  };

  const handleReset = () => {
    setLang(null);
    setMessages([
      { role: "ai", content: null, card: "language" }
    ]);
  };

  return (
    <div id="medicine-ai" className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center font-sans relative z-30 mb-8 pt-20">
      {/* Centered Button Header */}
      <div className="flex flex-col items-center gap-4 group">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-20 h-20 rounded-[1.5rem] flex items-center justify-center transition-all duration-300 transform border-2 ${
            isOpen ? "bg-red-500 border-red-400 rotate-45 rounded-full" : "futuristic-card border-orange-500/30 bg-gray-900/60 backdrop-blur-xl shadow-[0_0_40px_rgba(234,88,12,0.1)] group-hover:scale-110 group-hover:shadow-[0_0_60px_rgba(234,88,12,0.3)] group-hover:border-orange-500/50 relative z-10"
          }`}
        >
          {isOpen ? (
            <span className="text-white text-4xl font-light">×</span>
          ) : (
            <div className="text-white flex flex-col items-center mt-1">
              <span className="text-sm font-bold leading-none uppercase tracking-widest text-orange-400">AI</span>
              <span className="text-3xl drop-shadow-[0_0_10px_rgba(234,88,12,0.8)]">🩺</span>
            </div>
          )}
          {!isOpen && (
            <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-600 to-rose-500 text-white text-[10px] px-2.5 py-1 rounded-md animate-pulse border border-red-400/50 shadow-lg shadow-red-500/50 font-black tracking-widest">
              LIVE
            </span>
          )}
        </button>
        <div className="text-center cursor-pointer" onClick={() => !isOpen && setIsOpen(true)}>
          <h3 className="text-white font-black text-3xl tracking-tighter uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">Medicine AI</h3>
          <p className="text-orange-400 font-black text-[11px] uppercase tracking-[0.3em] bg-orange-950/40 px-4 py-1.5 rounded-full border border-orange-500/30 mt-2 shadow-[0_0_15px_rgba(234,88,12,0.2)]">AI Live Rate</p>
        </div>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="mt-8 w-[calc(100vw-32px)] sm:w-[600px] h-[600px] bg-sky-950/90 backdrop-blur-2xl border border-sky-400/20 rounded-[2.5rem] shadow-[0_0_80px_rgba(14,165,233,0.15)] flex flex-col overflow-hidden animate-fade-in z-[1001] mx-auto">
          {/* Header */}
          <div className="p-5 bg-gradient-to-r from-blue-700/40 to-cyan-700/40 border-b border-blue-400/20">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div>
                  <h3 className="text-white font-black text-xl tracking-tight leading-tight uppercase">{t.headerTitle} <br />AI Live Rate</h3>
                  <p className="text-blue-400 text-[10px] font-bold tracking-widest uppercase mt-1">{t.headerSub}</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="bg-blue-500/20 px-2 py-1 rounded border border-blue-500/30">
                   <p className="text-[10px] text-blue-300 font-bold uppercase flex items-center gap-1">
                     <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div> LIVE
                   </p>
                </div>
                <p className="text-[9px] text-blue-300/60 font-medium mt-2">MAR 2026</p>
              </div>
            </div>

            {/* NEAR BY Quick Button */}
            <div className="mt-4">
               <button 
                  onClick={fetchNearbyShops}
                  className="w-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-black py-2 rounded-xl flex items-center justify-center gap-2 animate-pulse"
               >
                  {t.findNearby}
               </button>
            </div>
            
            {/* Search Bar in Header */}
            <div className="mt-4 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-blue-300/50">🔍</span>
              </div>
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                className="w-full bg-white/5 border border-blue-400/20 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-blue-300/30 focus:outline-none focus:border-blue-400 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && searchTerm.trim()) {
                    addMessage(searchTerm);
                    setSearchTerm("");
                  }
                }}
              />
            </div>
          </div>

          {/* Messages Area */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-sky-950/20"
          >
            {messages.map((msg, idx) => {
              if (msg.card === "language") return (
                <div key={idx} className="space-y-4">
                  <p className="text-white font-bold text-center text-sm">Select Language / भाषा निवडा / भाषा चुनें</p>
                  <div className="grid grid-cols-3 gap-2">
                    {['en', 'hi', 'mr'].map((l) => (
                      <button key={l} onClick={() => handleLangSelect(l)} className="bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 font-bold py-3 rounded-xl transition-all active:scale-95 text-xs">
                        {l === 'en' ? 'English' : l === 'hi' ? 'हिंदी' : 'मराठी'}
                      </button>
                    ))}
                  </div>
                </div>
              );

              return (
                <div
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white rounded-tr-none shadow-lg shadow-blue-500/20"
                        : "bg-white/10 text-gray-100 border border-blue-400/10 rounded-tl-none"
                    }`}
                    dangerouslySetInnerHTML={{ __html: msg.content ? msg.content.replace(/\n/g, '<br/>') : '' }}
                  />
                </div>
              );
            })}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/10 px-4 py-2 rounded-2xl rounded-tl-none flex gap-1">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-sky-950 border-t border-blue-400/20 flex gap-2">
            <input
              type="text"
              placeholder={t.askPlaceholder}
              className="flex-1 bg-white/5 border border-blue-400/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-all placeholder-blue-300/30"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  addMessage(e.target.value);
                  e.target.value = '';
                }
              }}
            />
            <button 
               onClick={(e) => {
                 const input = e.currentTarget.previousSibling;
                 if (input.value.trim()) {
                   addMessage(input.value);
                   input.value = '';
                 }
               }}
               className="bg-blue-600 px-4 py-2 rounded-xl text-white font-bold text-sm hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20"
            >
              {t.send}
            </button>
          </div>
          {lang && (
            <div className="px-4 pb-4 bg-sky-950">
               <button onClick={handleReset} className="w-full bg-white/5 border border-white/10 text-gray-400 text-[10px] font-bold py-2 rounded-lg hover:bg-white/10 transition-all">
                  {t.startNew}
               </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MedicineChatbot;
