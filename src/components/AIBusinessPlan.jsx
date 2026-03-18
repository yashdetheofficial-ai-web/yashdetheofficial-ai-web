import { useState, useRef, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const translations = {
  en: {
    welcome: "👋 Welcome to AI Business Architect",
    welcomeDesc: "I will guide you step-by-step through everything you need to know to start a poultry farm — including construction costs, roadmap, and profit.",
    features: ['🏗️ Farm Construction Cost', '💰 Investment & Profit', '📅 Farming Roadmap', '💡 Expert Tips'],
    generateBtn: "🚀 Generate My Poultry Roadmap",
    askCount: "How many birds are you planning to raise?",
    countHint: "Enter total bird count — I'll calculate construction cost, investment, and profit.",
    selectType: "Select your farming type:",
    broiler: "BROILER",
    broilerDesc: "Meat · 42-Day Cycle",
    layer: "LAYER",
    layerDesc: "Eggs · Annual Plan",
    showCosts: "🏗️ Farm Construction Cost →",
    showRoadmap: "📅 Stage Roadmap →",
    costTitle: "🏗️ Farm Construction Cost Estimate",
    costSub: "Birds · Current Market Rates (Mar 2026)",
    totalInvestment: "Total Investment Required",
    totalSub: "Including setup + first operating cycle",
    marketWarning: "⚠️ Rates are based on current market prices (March 2026). Actual costs may vary by region, breed, and contractor.",
    newEstimate: "🔄 New Estimate",
    roadmapTitle: "Full Roadmap",
    expertTips: "💡 Expert Tips",
    startNew: "🔄 Start New Roadmap",
    downloadBtn: "Download Full Business Plan PDF",
    headerTitle: "AI Business Architect",
    headerDesc: "Step-by-step AI guide — roadmap, construction cost & profit calculator for your poultry farm.",
    architect: "Poultry AI Architect",
    liveStatus: "Construction Cost · Roadmap · Profit · Live",
    labels: {
      space: "Space Needed",
      feed: "Feed/Cycle",
      investment: "Investment",
      profit: "Est. Profit",
      eggsDay: "Eggs/Day",
      annualProfit: "Annual Profit",
      shed: "🏗️ Shed Construction",
      equipment: "🔧 Equipment (Feeders/Drinkers/Brooders)",
      cages: "🔧 Battery Cages & Equipment",
      chicks: "🐣 Day-Old Chick Cost",
      feedLabel: "🌾 Feed",
      medicine: "💊 Medicine & Vaccines",
      labor: "👷 Labor Cost",
      util: "⚡ Electricity & Water",
      misc: "📦 Misc & Working Capital"
    }
  },
  hi: {
    welcome: "👋 AI बिजनेस आर्किटेक्ट में आपका स्वागत है",
    welcomeDesc: "मैं आपको पोल्ट्री फार्म शुरू करने के लिए आवश्यक हर चीज — जिसमें निर्माण लागत, रोडमैप और लाभ शामिल है — के बारे में चरण-दर-चरण मार्गदर्शन करूँगा।",
    features: ['🏗️ फार्म निर्माण लागत', '💰 निवेश और लाभ', '📅 फार्मिंग रोडमैप', '💡 विशेषज्ञ सुझाव'],
    generateBtn: "🚀 मेरा पोल्ट्री रोडमैप तैयार करें",
    askCount: "आप कितने पक्षी पालने की योजना बना रहे हैं?",
    countHint: "कुल पक्षियों की संख्या दर्ज करें — मैं निर्माण लागत, निवेश और लाभ की गणना करूँगा।",
    selectType: "अपने फार्मिंग प्रकार का चयन करें:",
    broiler: "ब्रॉयलर (BROILER)",
    broilerDesc: "मांस · 42-दिन का चक्र",
    layer: "लेयर (LAYER)",
    layerDesc: "अंडे · वार्षिक योजना",
    showCosts: "🏗️ फार्म निर्माण लागत →",
    showRoadmap: "📅 चरण रोडमैप →",
    costTitle: "🏗️ फार्म निर्माण लागत अनुमान",
    costSub: "पक्षी · वर्तमान बाजार दर (मार्च 2026)",
    totalInvestment: "कुल आवश्यक निवेश",
    totalSub: "सेटअप + पहले ऑपरेटिंग चक्र सहित",
    marketWarning: "⚠️ दरें वर्तमान बाजार कीमतों (मार्च 2026) पर आधारित हैं। वास्तविक लागत क्षेत्र, नस्ल और ठेकेदार के अनुसार भिन्न हो सकती है।",
    newEstimate: "🔄 नया अनुमान",
    roadmapTitle: "पूरा रोडमैप",
    expertTips: "💡 विशेषज्ञ सुझाव",
    startNew: "🔄 नया रोडमैप शुरू करें",
    downloadBtn: "पूरा बिजनेस प्लान PDF डाउनलोड करें",
    headerTitle: "AI बिजनेस आर्किटेक्ट",
    headerDesc: "चरण-दर-चरण AI गाइड — आपके पोल्ट्री फार्म के लिए रोडमैप, निर्माण लागत और लाभ कैलकुलेटर।",
    architect: "पोल्ट्री AI आर्किटेक्ट",
    liveStatus: "निर्माण लागत · रोडमैप · लाभ · लाइव",
    labels: {
      space: "आवश्यक जगह",
      feed: "खाद्य/चक्र",
      investment: "निवेश",
      profit: "अनुमानित लाभ",
      eggsDay: "अंडे/दिन",
      annualProfit: "वार्षिक लाभ",
      shed: "🏗️ शेड निर्माण",
      equipment: "🔧 उपकरण (फीडर/ड्रिंकर/ब्रूडर)",
      cages: "🔧 बैटरी पिंजरे और उपकरण",
      chicks: "🐣 चूजों की लागत",
      feedLabel: "🌾 खाद्य",
      medicine: "💊 दवाएं और टीके",
      labor: "👷 मजदूरी लागत",
      util: "⚡ बिजली और पानी",
      misc: "📦 फुटकर और कार्यशील पूंजी"
    }
  },
  mr: {
    welcome: "👋 AI बिझनेस आर्किटेक्टमध्ये आपले स्वागत आहे",
    welcomeDesc: "पोल्ट्री फार्म सुरू करण्यासाठी आवश्यक असलेल्या सर्व गोष्टींबद्दल — ज्यामध्ये बांधकाम खर्च, रोडमॅप आणि नफा समाविष्ट आहे — मी तुम्हाला टप्प्याटप्प्याने मार्गदर्शन करेन.",
    features: ['🏗️ फार्म बांधकाम खर्च', '💰 गुंतवणूक आणि नफा', '📅 फार्मिंग रोडमॅप', '💡 तज्ज्ञ टिप्स'],
    generateBtn: "🚀 माझा पोल्ट्री रोडमॅप तयार करा",
    askCount: "तुम्ही किती पक्षी पाळण्याचे नियोजन करत आहात?",
    countHint: "पक्ष्यांची एकूण संख्या टाका — मी बांधकाम खर्च, गुंतवणूक आणि नफ्याची गणना करेन.",
    selectType: "तुमच्या शेतीचा प्रकार निवडा:",
    broiler: "ब्रॉयलर (BROILER)",
    broilerDesc: "मांस · ४२ दिवसांचे चक्र",
    layer: "लेअर (LAYER)",
    layerDesc: "अंडी · वार्षिक योजना",
    showCosts: "🏗️ फार्म बांधकाम खर्च →",
    showRoadmap: "📅 टप्पा रोडमॅप →",
    costTitle: "🏗️ फार्म बांधकाम खर्च अंदाज",
    costSub: "पक्ष्यांची संख्या · चालू बाजार दर (मार्च २०२६)",
    totalInvestment: "एकूण आवश्यक गुंतवणूक",
    totalSub: "सेटअप + पहिल्या ऑपरेटिंग सायकलसह",
    marketWarning: "⚠️ दर चालू बाजारभावावर (मार्च २०२६) आधारित आहेत. वास्तविक खर्च प्रदेश, जात आणि कंत्राटदारानुसार बदलू शकतो.",
    newEstimate: "🔄 नवीन अंदाज",
    roadmapTitle: "संपूर्ण रोडमॅप",
    expertTips: "💡 तज्ज्ञ टिप्स",
    startNew: "🔄 नवीन रोडमॅप सुरू करा",
    downloadBtn: "संपूर्ण बिझनेस प्लॅन PDF डाउनलोड करा",
    headerTitle: "AI बिझनेस आर्किटेक्ट",
    headerDesc: "टप्प्याटप्प्याने AI मार्गदर्शन — तुमच्या पोल्ट्री फार्मसाठी रोडमॅप, बांधकाम खर्च आणि नफा कैलकुलेटर.",
    architect: "पोल्ट्री AI आर्किटेक्ट",
    liveStatus: "बांधकाम खर्च · रोडमॅप · नफा · लाईव्ह",
    labels: {
      space: "आवश्यक जागा",
      feed: "खाद्य/चक्र",
      investment: "गुंतवणूक",
      profit: "अपेक्षित नफा",
      eggsDay: "दररोजची अंडी",
      annualProfit: "वार्षिक नफा",
      shed: "🏗️ शेड बांधकाम",
      equipment: "साहित्य (फीडर्स/ड्रिंकर्स/ब्रूडर्स)",
      cages: "बॅटरी केजेस आणि साहित्य",
      chicks: "पिल्लांची किंमत",
      feedLabel: "खाद्य खर्च",
      medicine: "औषधे आणि लसीकरण",
      labor: "मजुरी खर्च",
      util: "वीज आणि पाणी",
      misc: "इतर आणि भांडवल"
    }
  }
};

const poultryInfo = {
  Broiler: {
    en: {
      overview: `🐔 **Broiler Farming** is the commercial raising of chickens for meat production. A typical cycle is **42 days (6 weeks)**. This is a high-turnover, fast-profit business with consistent market demand across India.`,
      stages: [
        { icon: "🏗️", label: "Farm Setup", desc: "Build a well-ventilated shed (0.75 sq ft/bird). Install brooder, feeders, drinkers, and proper litter material (rice husk). Ensure biosecurity measures." },
        { icon: "🐣", label: "Chick Arrival (Day 1)", desc: "Receive day-old chicks from a certified hatchery. Brooding temperature: 32–35°C. Provide pre-starter mash and clean water with electrolytes." },
        { icon: "🌾", label: "Starter Phase (Days 8–21)", desc: "Shift to Starter crumble. Vaccinate for Newcastle (Lasota) and Gumboro (IBD). Reduce temperature gradually. Ensure proper floor space." },
        { icon: "⚖️", label: "Grower Phase (Days 22–35)", desc: "Switch to Grower/Finisher pellets. Target body weight: 1.5–2.0 kg. Keep ventilation optimal. Monitor FCR daily (target: 1.6–1.8)." },
        { icon: "🏪", label: "Harvest (Day 36–42)", desc: "Birds reach 2.2–2.5 kg. Contact live bird market/processor. Clean the farm, lime it, and rest 2 weeks before the next batch." },
      ],
      tips: [
        "💧 Water:Feed ratio should be 2:1",
        "🌬️ Ventilation prevents heat stress and ammonia buildup",
        "📊 Track Feed Conversion Ratio (FCR) weekly",
        "🧹 Litter management is key — avoid wet litter",
        "💉 Never miss the IBD vaccination on Day 14",
      ]
    },
    hi: {
      overview: `🐔 **ब्रॉयलर फार्मिंग** व्यावसायिक मांस उत्पादन के लिए मुर्गियों का पालन है। एक चक्र **42 दिन (6 सप्ताह)** का होता है। यह पूरे भारत में लगातार बाजार मांग वाला एक उच्च-टर्नओवर वाला व्यवसाय है।`,
      stages: [
        { icon: "🏗️", label: "फार्म सेटअप", desc: "अच्छी तरह हवादार शेड (0.75 वर्ग फुट/पक्षी) बनाएं। ब्रूडर, फीडर, ड्रिंकर और उचित बिछावन सामग्री (चावल की भूसी) स्थापित करें।" },
        { icon: "🐣", label: "चूजों का आगमन (दिन 1)", desc: "प्रमाणित हैचरी से चूजे प्राप्त करें। ब्रूडिंग तापमान: 32-35 डिग्री सेल्सियस। प्री-स्टार्टर मैश और इलेक्ट्रोलाइट्स प्रदान करें।" },
        { icon: "🌾", label: "स्टार्टर चरण (दिन 8-21)", desc: "स्टार्टर क्रंबल दें। न्यूकैसल और गंभोरो के लिए टीकाकरण करें। तापमान धीरे-धीरे कम करें।" },
        { icon: "⚖️", label: "ग्रोअर चरण (दिन 22-35)", desc: "ग्रोअर/फिनिशर पेलेट्स शुरू करें। लक्षित शरीर का वजन: 1.5-2.0 किलो। वेंटिलेशन का ध्यान रखें।" },
        { icon: "🏪", label: "कटाई (दिन 36-42)", desc: "पक्षी 2.2-2.5 किलो तक पहुँच जाते हैं। बाजार से संपर्क करें। फार्म साफ़ करें और अगले बैच से पहले 2 सप्ताह आराम दें।" },
      ],
      tips: [
        "💧 पानी:फीड का अनुपात 2:1 होना चाहिए",
        "🌬️ वेंटिलेशन गर्मी के तनाव और अमोनिया के निर्माण को रोकता है",
        "📊 साप्ताहिक रूप से फीड कन्वर्जन अनुपात (FCR) ट्रैक करें",
        "🧹 बिछावन प्रबंधन महत्वपूर्ण है — गीली बिछावन से बचें",
        "💉 दिन 14 पर IBD टीकाकरण कभी न छोड़ें",
      ]
    },
    mr: {
      overview: `🐔 **ब्रॉयलर फार्मिंग** म्हणजे मांसासाठी कोंबड्यांचे व्यावसायिक उत्पादन. एक चक्र **42 दिवस (6 आठवडे)** असते. हा संपूर्ण भारतात मागणी असलेला जलद नफा देणारा व्यवसाय आहे.`,
      stages: [
        { icon: "🏗️", label: "फार्म सेटअप", desc: "हवेशीर शेड (०.७५ चौ. फूट/पक्षी) तयार करा. ब्रूडर, फीडर, ड्रिंकर आणि योग्य भुसा बसवा. जैवसुरक्षा उपायांची खात्री करा." },
        { icon: "🐣", label: "पिल्लांचे आगमन (दिवस १)", desc: "प्रमाणित हॅचरीकडून पिल्ले मिळवा. ब्रूडिंग तापमान: ३२-३५ अंश सेल्सिअस. प्री-स्टार्टर मॅश आणि औषधोपचार सुरू करा." },
        { icon: "🌾", label: "स्टार्टर फेज (दिवस ८-२१)", desc: "स्टार्टर क्रंबल द्या. रानीखेत आणि गंभोरो लस द्या. तापमान हळूहळू कमी करा." },
        { icon: "⚖️", label: "ग्रोअर फेज (दिवस २२-३५)", desc: "ग्रोअर/फिनिशर पेलेट्स सुरू करा. वजन १.५-२.० किलोचे लक्ष ठेवा. वेंटिलेशन उत्तम ठेवा." },
        { icon: "🏪", label: "विक्री (दिवस ३६-४२)", desc: "पक्षी २.२-२.५ किलोपर्यंत पोहोचतात. बाजाराशी संपर्क साधा. फार्म स्वच्छ करा आणि २ आठवडे विश्रांती द्या." },
      ],
      tips: [
        "💧 पाणी:खाद्य प्रमाण २:१ असावे",
        "🌬️ वेंटिलेशनमुळे गरम हवा आणि अमोनिया बाहेर जातो",
        "📊 साप्ताहिक FCR ट्रॅक करा",
        "🧹 भुसा ओला होणार नाही याची काळजी घ्या",
        "💉 १४ व्या दिवशी IBD लस चुकवू नका",
      ]
    }
  },
  Layer: {
    en: {
      overview: `🥚 **Layer Farming** is the commercial production of eggs. Hens begin laying at ~18 weeks and produce for 14–16 months. This is a **long-term, stable income** business with consistent daily revenue.`,
      stages: [
        { icon: "🏗️", label: "Farm Setup", desc: "Build a cage/deep litter system (1.5 sq ft/bird). Install battery cages, automatic feeders/drinkers, egg trays, and proper lighting systems." },
        { icon: "🐣", label: "Chick Brooding (Weeks 1–8)", desc: "Brooding at 32°C reducing to 28°C. Provide starter feed. Administer Marek's vaccine on day 1. Light: 24 hrs in week 1, then reduce." },
        { icon: "🌾", label: "Grower Phase (Weeks 9–16)", desc: "Switch to grower feed. Maintain 8–10 hours light. Monitor body weight vs. breed-standard chart. Deworm birds at week 12." },
        { icon: "💡", label: "Pre-Laying Phase (Weeks 17–18)", desc: "Switch to pre-layer feed with calcium. Gradually increase light to 16 hrs/day to stimulate egg production. First egg expected at ~18 weeks." },
        { icon: "🥚", label: "Peak Production (Weeks 19–75)", desc: "Target 90–95% daily production. Feed layer mash with 4% calcium. Collect eggs 3x/day. Monitor shell quality and feed intake." },
        { icon: "♻️", label: "Culling & Reset (Month 15–16)", desc: "Identify and remove poor layers. Clean, disinfect, and lime the farm. Rest 2–4 weeks before the next flock cycle." },
      ],
      tips: [
        "💡 Maintain 16 hours of light per day for peak production",
        "🧆 Calcium at 4% in feed = strong eggshells",
        "🥚 Collect eggs 3x/day to prevent breakage",
        "📉 Monitor molting — production dips are normal",
        "📊 Track Hen-Day Production (HDP) weekly",
      ]
    },
    hi: {
      overview: `🥚 **लेयर फार्मिंग** अंडों का व्यावसायिक उत्पादन है। मुर्गिया लगभग 18 सप्ताह में अंडे देना शुरू करती हैं। यह दैनिक आय वाला एक **दीर्घकालिक, स्थिर आय** व्यवसाय है।`,
      stages: [
        { icon: "🏗️", label: "फार्म सेटअप", desc: "पिंजरा/गहरी बिछावन प्रणाली बनाएं। बैटरी पिंजरों, फीडरों और उचित प्रकाश व्यवस्था को स्थापित करें।" },
        { icon: "🐣", label: "ब्रूडिंग (सप्ताह 1-8)", desc: "तापमान 32°C से घटाकर 28°C करें। स्टार्टर फीड दें। पहले दिन मारेक का टीका लगवाएं।" },
        { icon: "🌾", label: "ग्रोअर चरण (सप्ताह 9-16)", desc: "ग्रोअर फीड पर स्विच करें। 8-10 घंटे प्रकाश रखें। शरीर के वजन की निगरानी करें।" },
        { icon: "💡", label: "पी-लेइंग चरण (सप्ताह 17-18)", desc: "कैल्शियम के साथ प्री-लेयर फीड दें। प्रकाश को 16 घंटे तक बढ़ाएं।" },
        { icon: "🥚", label: "पीक उत्पादन (सप्ताह 19-75)", desc: "90-95% दैनिक उत्पादन का लक्ष्य रखें। 4% कैल्शियम वाला फीड दें। दिन में 3 बार अंडे एकत्र करें।" },
        { icon: "♻️", label: "रीसेट (महीना 15-16)", desc: "खराब लेयर्स को हटा दें। फार्म साफ़ करें और विश्राम दें।" }
      ],
      tips: [
        "💡 पीक उत्पादन के लिए प्रतिदिन 16 घंटे प्रकाश बनाए रखें",
        "🧆 फीड में 4% कैल्शियम = मजबूत अंडे के छिलके",
        "🥚 टूटने से बचाने के लिए दिन में 3 बार अंडे एकत्र करें",
        "📉 मोल्टिंग की निगरानी करें — उत्पादन में गिरावट सामान्य है",
        "📊 साप्ताहिक रूप से हेन-डे प्रोडक्शन (HDP) को ट्रैक करें"
      ]
    },
    mr: {
      overview: `🥚 **लेअर फार्मिंग** म्हणजे अंड्यांचे व्यावसायिक उत्पादन. कोंबड्या १८ आठवड्यात अंडी घालण्यास सुरुवात करतात. हा दररोज उत्पन्न देणारा एक **दीर्घकालीन, स्थिर उत्पन्न** देणारा व्यवसाय आहे.`,
      stages: [
        { icon: "🏗️", label: "फार्म सेटअप", desc: "पिंजरा/डीप लिटर सिस्टीम तयार करा. बॅटरी केजेस, फीडर्स आणि योग्य प्रकाश व्यवस्था बसवा." },
        { icon: "🐣", label: "ब्रूडिंग (आठवडा १-८)", desc: "तापमान ३२°C वरून २८°C पर्यंत कमी करा. स्टार्टर फीड द्या. पहिल्या दिवशी मारेक लस द्या." },
        { icon: "🌾", label: "ग्रोअर फेज (आठवडा ९-१६)", desc: "ग्रोअर फीड सुरू करा. ८-१० तास प्रकाश ठेवा. शरीराच्या वजनावर लक्ष ठेवा." },
        { icon: "💡", label: "अंडी उत्पादन पूर्व (आठवडा १७-१८)", desc: "कॅल्शियमयुक्त प्री-लेयर फीड द्या. प्रकाश १६ तासांपर्यंत वाढवा." },
        { icon: "🥚", label: "पीक उत्पादन (आठवडा १९-७५)", desc: "९०-९५% दैनंदिन उत्पादनाचे लक्ष्य ठेवा. ४% कॅल्शियम फीड द्या. दिवसातून ३ वेळा अंडी गोळा करा." },
        { icon: "♻️", label: "रीसेट (महिना १५-१६)", desc: "खराब लेअर्स काढून टाका. फार्म निर्जंतुक करा आणि विश्रांती द्या." }
      ],
      tips: [
        "💡 उत्पादनासाठी दिवसाला १६ तास प्रकाश ठेवा",
        "🧆 फीडमध्ये ४% कॅल्शियम = मजबूत अंडी",
        "🥚 अंडी दिवसातून ३ वेळा गोळा करा",
        "📉 उत्पादनातील चढ-उतारांकडे लक्ष द्या",
        "📊 साप्ताहिक HDP ट्रॅक करा"
      ]
    }
  }
};

const getRoadmapStats = (count, type, lang) => {
  const lbl = translations[lang].labels;
  if (type === 'Broiler') {
    const space = Math.round(count * 0.75);
    const feed = Math.round(count * 3.5);
    const investment = Math.round(count * 120);
    const revenue = Math.round(count * 220);
    const profit = revenue - investment;
    return [
      { label: lbl.space, value: `${space.toLocaleString()} ${lang === 'mr' ? 'चौ. फूट' : 'Sq.Ft'}`, icon: "📐" },
      { label: lbl.feed, value: `${feed.toLocaleString()} Kg`, icon: "🌾" },
      { label: lbl.investment, value: `₹${investment.toLocaleString()}`, icon: "💰" },
      { label: lbl.profit, value: `₹${profit.toLocaleString()}`, icon: "📈" },
    ];
  } else {
    const space = Math.round(count * 1.5);
    const eggsPerDay = Math.round(count * 0.92);
    const investment = Math.round(count * 600);
    const annualProfit = Math.round(eggsPerDay * 300 * 5) - Math.round(count * 350);
    return [
      { label: lbl.space, value: `${space.toLocaleString()} ${lang === 'mr' ? 'चौ. फूट' : 'Sq.Ft'}`, icon: "📐" },
      { label: lbl.eggsDay, value: `${eggsPerDay.toLocaleString()}`, icon: "🥚" },
      { label: lbl.investment, value: `₹${investment.toLocaleString()}`, icon: "💰" },
      { label: lbl.annualProfit, value: `₹${annualProfit.toLocaleString()}`, icon: "📈" },
    ];
  }
};

const getFarmConstructionCost = (count, type, lang) => {
  const isBroiler = type === 'Broiler';
  const lbl = translations[lang].labels;
  const unitSqFt = lang === 'mr' ? 'चौ. फूट' : lang === 'hi' ? 'वर्ग फुट' : 'Sq.Ft';
  const unitBird = lang === 'mr' ? 'पक्षी' : lang === 'hi' ? 'पक्षी' : 'bird';
  const unitChick = lang === 'mr' ? 'पिल्लू' : lang === 'hi' ? 'चूजा' : 'chick';
  const unitMonths = lang === 'mr' ? 'महिने' : lang === 'hi' ? 'महीने' : 'Months';
  const unitWorker = lang === 'mr' ? 'कामगार' : lang === 'hi' ? 'मजदूर' : 'Worker(s)';

  // Current live market rates (March 2026)
  const shedCostPerSqFt = 450;
  const sqFtPerBird = isBroiler ? 0.75 : 1.5;
  const shedArea = Math.round(count * sqFtPerBird);
  const shedCost = shedArea * shedCostPerSqFt;

  const equipmentPerBird = isBroiler ? 80 : 350;
  const equipmentCost = Math.round(count * equipmentPerBird);

  const chickCostPerBird = isBroiler ? 48 : 55;
  const chickCost = Math.round(count * chickCostPerBird);

  const feedCostPerBird = isBroiler ? 195 : 280;
  const feedCost = Math.round(count * feedCostPerBird);

  const medicineCostPerBird = isBroiler ? 18 : 22;
  const medicineCost = Math.round(count * medicineCostPerBird);

  const laborPerMonth = Math.round(count / 500) * 14000;
  const laborCost = isBroiler ? laborPerMonth * 2 : laborPerMonth * 4;

  const electricityWater = Math.round(count * 15);
  const miscellaneous = Math.round(count * 25);

  const grandTotal = shedCost + equipmentCost + chickCost + feedCost + medicineCost + laborCost + electricityWater + miscellaneous;

  return {
    items: [
      { label: lbl.shed, note: `${shedArea.toLocaleString()} ${unitSqFt} @ ₹${shedCostPerSqFt}/${unitSqFt}`, amount: shedCost },
      { label: isBroiler ? lbl.equipment : lbl.cages, note: `₹${equipmentPerBird}/${unitBird}`, amount: equipmentCost },
      { label: lbl.chicks, note: `₹${chickCostPerBird}/${unitChick}`, amount: chickCost },
      { label: isBroiler ? `${lbl.feedLabel} (${lang === 'mr' ? 'पूर्ण चक्र' : 'Full Cycle'})` : `${lbl.feedLabel} (${lang === 'mr' ? 'पहिले ३ महिने' : 'First 3 Months'})`, note: `₹${feedCostPerBird}/${unitBird}`, amount: feedCost },
      { label: lbl.medicine, note: `₹${medicineCostPerBird}/${unitBird}`, amount: medicineCost },
      { label: lbl.labor, note: `${Math.round(count / 500)} ${unitWorker} × ${isBroiler ? '2' : '4'} ${unitMonths}`, amount: laborCost },
      { label: lbl.util, note: `₹15/${unitBird}`, amount: electricityWater },
      { label: lbl.misc, note: lang === 'mr' ? 'निर्जंतुकीकरण, वाहतूक इ.' : 'Litter, disinfectants, transport', amount: miscellaneous },
    ],
    grandTotal
  };
};

const AIBusinessPlan = () => {
  const [lang, setLang] = useState('en');
  const [messages, setMessages] = useState([
    { role: 'ai', content: null, card: 'language' }
  ]);
  const [step, setStep] = useState('lang'); // Start with language selection
  const [birdCount, setBirdCount] = useState('');
  const [selectedType, setSelectedType] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef(null);

  const t = translations[lang];

  const handleLangSelect = (l) => {
    setLang(l);
    addMsg('user', l === 'en' ? 'English' : l === 'hi' ? 'Hindi' : 'Marathi');
    setTimeout(() => { addMsg('ai', null, 'welcome'); setStep('start'); }, 400);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const addMsg = (role, content, card = null) => {
    setMessages(prev => [...prev, { role, content, card }]);
  };

  const handleStart = () => {
    addMsg('user', 'Start Poultry Roadmap');
    setTimeout(() => { addMsg('ai', null, 'ask-count'); setStep('count'); }, 400);
  };

  const handleCountSubmit = () => {
    const num = parseInt(inputValue);
    if (!num || num <= 0) return;
    setBirdCount(num);
    setInputValue('');
    addMsg('user', `${t.askCount}: ${num.toLocaleString()}`);
    setTimeout(() => { addMsg('ai', null, 'ask-type'); setStep('type'); }, 400);
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    addMsg('user', `${t.selectType} ${type === 'Broiler' ? t.broiler : t.layer}`);
    setTimeout(() => { addMsg('ai', null, 'show-overview'); setStep('info'); }, 400);
  };

  const handleShowRoadmap = () => {
    addMsg('user', t.showRoadmap);
    setTimeout(() => { addMsg('ai', null, 'show-roadmap'); setStep('roadmap'); }, 400);
  };

  const handleShowCosts = () => {
    addMsg('user', t.showCosts);
    setTimeout(() => { addMsg('ai', null, 'show-costs'); setStep('costs'); }, 400);
  };

  const handleDownloadPDF = () => {
    if (!birdCount || !selectedType) return;

    const stats = getRoadmapStats(birdCount, selectedType, lang);
    const costData = getFarmConstructionCost(birdCount, selectedType, lang);
    const info = poultryInfo[selectedType][lang];
    const date = new Date().toLocaleDateString();

    const doc = new jsPDF();

    // 1. Premium Header
    doc.setFillColor(31, 41, 55); // Dark Gray
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(16, 185, 129); // Emerald 500
    doc.text("DETHE PATIL", 105, 20, { align: "center" });
    
    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255);
    doc.text("AI POULTRY BUSINESS ARCHITECT", 105, 30, { align: "center" });

    // 2. Project Summary
    doc.setFontSize(16);
    doc.setTextColor(31, 41, 55);
    doc.text("BUSINESS PLAN OVERVIEW", 20, 55);
    
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Generated on: ${date}`, 150, 55);
    
    autoTable(doc, {
      startY: 60,
      head: [['Metric', 'Details']],
      body: [
        ['Bird Count', `${birdCount.toLocaleString()} birds`],
        ['Farming Type', selectedType],
        ...stats.map(s => [s.label, s.value])
      ],
      theme: 'striped',
      headStyles: { fillColor: [16, 185, 129], textColor: [255, 255, 255] },
      styles: { fontSize: 10, cellPadding: 4 }
    });

    // 3. Construction Cost Breakdown
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("CONSTRUCTION & SETUP COSTS", 20, doc.lastAutoTable.finalY + 15);
    
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 20,
      head: [['Item Description', 'Notes', 'Amount (INR)']],
      body: [
        ...costData.items.map(item => [item.label, item.note, `Rs. ${item.amount.toLocaleString()}`]),
        [{ content: 'GRAND TOTAL INVESTMENT', colSpan: 2, styles: { fontStyle: 'bold', fillColor: [240, 240, 240] } }, { content: `Rs. ${costData.grandTotal.toLocaleString()}`, styles: { fontStyle: 'bold', fillColor: [240, 240, 240], textColor: [16, 185, 129] } }]
      ],
      theme: 'grid',
      headStyles: { fillColor: [234, 88, 12], textColor: [255, 255, 255] }, // Orange for costs
      styles: { fontSize: 9, cellPadding: 4 }
    });

    // 4. Roadmap Stages
    doc.addPage();
    doc.setFillColor(31, 41, 55);
    doc.rect(0, 0, 210, 25, 'F');
    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255);
    doc.text("OPERATIONAL ROADMAP", 105, 17, { align: "center" });

    let currentY = 40;
    info.stages.forEach((stage, index) => {
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(16, 185, 129);
      doc.text(`${index + 1}. ${stage.label}`, 20, currentY);
      
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(75, 85, 99);
      const splitText = doc.splitTextToSize(stage.desc, 170);
      doc.text(splitText, 25, currentY + 7);
      currentY += (splitText.length * 5) + 15;
    });

    // 5. Expert Tips
    doc.setFillColor(243, 244, 246);
    doc.rect(15, currentY, 180, 45, 'F');
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(31, 41, 55);
    doc.text("EXPERT TIPS FOR SUCCESS", 20, currentY + 10);
    
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    info.tips.forEach((tip, idx) => {
      doc.text(`• ${tip}`, 25, currentY + 18 + (idx * 5));
    });

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(156, 163, 175);
    doc.text("This business plan is AI-generated based on current market estimates.", 105, 285, { align: "center" });

    doc.save(`Dethe_Patil_Poultry_Plan_${birdCount}_Birds.pdf`);
  };

  const handleReset = (e) => {
    if (e) e.preventDefault();
    // Preserve current lang, just reset the flow
    setMessages([{ role: 'ai', content: null, card: 'welcome' }]);
    setStep('start');
    setBirdCount('');
    setSelectedType(null);
    setInputValue('');
    
    // Scroll back to the top of the section
    const section = document.getElementById('optimizer');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderCard = (card, isLatest) => {
    const type = selectedType;
    const info = type ? poultryInfo[type][lang] : null;
    const stats = birdCount && type ? getRoadmapStats(birdCount, type, lang) : [];
    const costData = birdCount && type ? getFarmConstructionCost(birdCount, type, lang) : null;

    if (card === 'language') return (
      <div className="space-y-4">
        <p className="text-white font-bold text-center">Select Language / भाषा निवडा / भाषा चुनें</p>
        <div className="grid grid-cols-3 gap-2">
          {['en', 'hi', 'mr'].map((l) => (
            <button key={l} onClick={() => handleLangSelect(l)} className="bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold py-3 rounded-xl transition-all active:scale-95">
              {l === 'en' ? 'English' : l === 'hi' ? 'हिंदी' : 'मराठी'}
            </button>
          ))}
        </div>
      </div>
    );

    if (card === 'welcome') return (
      <div className="space-y-3">
        <p className="text-emerald-400 font-black text-lg">{t.welcome}</p>
        <p className="text-gray-300 text-sm">{t.welcomeDesc}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-xs text-gray-400">
          {t.features.map(f => (
            <div key={f} className="bg-white/5 rounded-lg px-3 py-2">{f}</div>
          ))}
        </div>
        {isLatest && step === 'start' && (
          <button onClick={handleStart} className="mt-4 w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black py-3 rounded-xl transition-all active:scale-95">
            {t.generateBtn}
          </button>
        )}
      </div>
    );

    if (card === 'ask-count') return (
      <div className="space-y-3">
        <p className="text-white font-bold">{t.askCount}</p>
        <p className="text-gray-400 text-xs">{t.countHint}</p>
        {isLatest && (
          <div className="flex gap-2 mt-2">
            <input type="number" min="1" value={inputValue} onChange={e => setInputValue(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleCountSubmit()}
              placeholder="e.g. 5000"
              className="flex-1 bg-gray-900 border border-gray-700 focus:border-emerald-500 rounded-xl px-4 py-3 text-white text-sm outline-none transition-all"
              autoFocus />
            <button onClick={handleCountSubmit} className="bg-emerald-500 hover:bg-emerald-400 text-black px-5 rounded-xl font-black transition-all active:scale-95">→</button>
          </div>
        )}
      </div>
    );

    if (card === 'ask-type') return (
      <div className="space-y-3">
        <p className="text-white font-bold">{t.selectType}</p>
        {isLatest && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
            <button onClick={() => handleTypeSelect('Broiler')} className="bg-yellow-500/10 hover:bg-yellow-500/20 border-2 border-yellow-500/30 hover:border-yellow-400 rounded-2xl p-5 text-center transition-all active:scale-95">
              <div className="text-4xl mb-2">🐔</div>
              <p className="text-yellow-400 font-black text-base uppercase">{t.broiler}</p>
              <p className="text-yellow-400/50 text-[10px] mt-1">{t.broilerDesc}</p>
            </button>
            <button onClick={() => handleTypeSelect('Layer')} className="bg-cyan-500/10 hover:bg-cyan-500/20 border-2 border-cyan-500/30 hover:border-cyan-400 rounded-2xl p-5 text-center transition-all active:scale-95">
              <div className="text-4xl mb-2">🥚</div>
              <p className="text-cyan-400 font-black text-base uppercase">{t.layer}</p>
              <p className="text-cyan-400/50 text-[10px] mt-1">{t.layerDesc}</p>
            </button>
          </div>
        )}
      </div>
    );

    if (card === 'show-overview' && info) return (
      <div className="space-y-4">
        <p className="text-sm text-gray-200 leading-relaxed">{info.overview}</p>
        <div className="grid grid-cols-2 gap-2">
          {stats.map((s, i) => (
            <div key={i} className="bg-gray-900/60 border border-gray-700/50 rounded-xl p-3 text-center">
              <p className="text-lg">{s.icon}</p>
              <p className="text-[10px] text-gray-500 uppercase font-bold mt-1">{s.label}</p>
              <p className="text-white font-black text-sm mt-0.5">{s.value}</p>
            </div>
          ))}
        </div>
        {isLatest && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            <button onClick={handleShowCosts} className="w-full bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-orange-400 font-bold py-3 rounded-xl text-sm transition-all active:scale-95">
              {t.showCosts}
            </button>
            <button onClick={handleShowRoadmap} className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 font-bold py-3 rounded-xl text-sm transition-all active:scale-95">
              {t.showRoadmap}
            </button>
          </div>
        )}
      </div>
    );

    if (card === 'show-costs' && costData) return (
      <div className="space-y-4">
        <div>
          <p className="font-black text-orange-400 text-base mb-1">{t.costTitle}</p>
          <p className="text-gray-400 text-xs">{birdCount?.toLocaleString()} {t.costSub}</p>
        </div>

        {/* Itemized Cost Table */}
        <div className="space-y-2">
          {costData.items.map((item, i) => (
            <div key={i} className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3">
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-bold">{item.label}</p>
                <p className="text-gray-500 text-[10px] mt-0.5">{item.note}</p>
              </div>
              <p className="text-emerald-400 font-black text-sm sm:ml-3 shrink-0">₹{item.amount.toLocaleString()}</p>
            </div>
          ))}
        </div>

        {/* Grand Total */}
        <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/10 border-2 border-emerald-500/40 rounded-2xl px-5 py-4 flex justify-between items-center">
          <div>
            <p className="text-xs text-emerald-400 font-bold uppercase">{t.totalInvestment}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">{t.totalSub}</p>
          </div>
          <p className="text-emerald-400 font-black text-2xl">₹{costData.grandTotal.toLocaleString()}</p>
        </div>

        <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-3 text-xs text-yellow-400/80">
          {t.marketWarning}
        </div>

        {isLatest && (
          <div className="flex flex-col gap-3 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button onClick={handleShowRoadmap} className="bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 font-bold py-3 rounded-xl text-sm transition-all active:scale-95">
                {t.showRoadmap}
              </button>
              <button onClick={(e) => handleReset(e)} className="bg-gray-800 hover:bg-gray-700 border border-gray-600 text-gray-400 font-bold py-3 rounded-xl text-sm transition-all active:scale-95">
                {t.newEstimate}
              </button>
            </div>
          </div>
        )}
      </div>
    );

    if (card === 'show-roadmap' && info) return (
      <div className="space-y-5">
        <p className={`font-black text-base ${type === 'Broiler' ? 'text-yellow-400' : 'text-cyan-400'}`}>
          {type === 'Broiler' ? '🐔 ' + t.broiler : '🥚 ' + t.layer} — {birdCount?.toLocaleString()} {t.roadmapTitle}
        </p>
        <div className="space-y-3">
          {info.stages.map((s, i) => (
            <div key={i} className="flex gap-3 bg-gray-900/50 border border-gray-700/30 rounded-xl p-4">
              <div className="text-2xl flex-shrink-0 mt-0.5">{s.icon}</div>
              <div>
                <p className="font-black text-white text-sm">{i + 1}. {s.label}</p>
                <p className="text-gray-400 text-xs mt-1 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-xs font-black text-emerald-400 uppercase mb-3">{t.expertTips}</p>
          <ul className="space-y-1.5">
            {info.tips.map((t, i) => (
              <li key={i} className="text-xs text-gray-300">{t}</li>
            ))}
          </ul>
        </div>
        {isLatest && (
          <div className="space-y-3 mt-4">
            <button onClick={(e) => handleReset(e)} className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-600 text-gray-300 font-bold py-3 rounded-xl text-sm transition-all active:scale-95">
              {t.startNew}
            </button>
          </div>
        )}
      </div>
    );

    return null;
  };

  return (
    <section id="optimizer" className="py-20 scroll-mt-24 bg-[#0d1117] text-white font-sans">
      <div className="text-center mb-14 px-4">
        <h2 className="text-4xl font-bold mb-4 text-emerald-400">{t.headerTitle}</h2>
        <p className="text-gray-400">{t.headerDesc}</p>
      </div>

      <div className="max-w-3xl mx-auto p-4">
        <div className="bg-[#161b22] border border-emerald-500/20 shadow-2xl rounded-3xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 p-5 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 border-b border-white/5">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-xl">🤖</div>
            <div>
              <p className="font-black text-white text-lg leading-none">{t.architect}</p>
              <p className="text-emerald-400 text-[10px] font-bold tracking-widest uppercase mt-0.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse inline-block"></span>
                {t.liveStatus}
              </p>
            </div>
          </div>

          {/* Chat Body */}
          <div ref={scrollRef} className="p-4 sm:p-6 md:p-10 space-y-5 overflow-y-auto max-h-[750px] custom-scrollbar">
            {messages.map((msg, idx) => {
              const isLatest = idx === messages.length - 1;
              return (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'ai' && (
                    <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center text-sm mr-3 mt-1 flex-shrink-0">🤖</div>
                  )}
                  <div className={`max-w-[92%] px-5 py-4 rounded-2xl text-sm ${
                    msg.role === 'user'
                      ? 'bg-emerald-600 text-white rounded-tr-none ml-auto'
                      : 'bg-[#0d1117] border border-white/10 text-gray-200 rounded-tl-none'
                  }`}>
                    {msg.card ? renderCard(msg.card, isLatest) : (
                      <p dangerouslySetInnerHTML={{ __html: msg.content }} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIBusinessPlan;
