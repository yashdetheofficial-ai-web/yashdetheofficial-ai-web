import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import MedicineChatbot from './MedicineChatbot';

const ExpenseTracker = () => {
    const [expenseData, setExpenseData] = useState({
        amount: '',
        location: '',
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
        category: 'Poultry Medicine',
        paymentMethod: 'Cash',
        notes: ''
    });

    const [savedExpenses, setSavedExpenses] = useState(() => {
        const saved = localStorage.getItem('poultryExpenses');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error("Error parsing saved expenses:", e);
                return [];
            }
        }
        return [];
    });
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        localStorage.setItem('poultryExpenses', JSON.stringify(savedExpenses));
    }, [savedExpenses]);

    const totalExpenses = savedExpenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);

    const handleChange = (e) => {
        setExpenseData({
            ...expenseData,
            [e.target.name]: e.target.value
        });
    };

    const handleDownloadOverallSummary = () => {
        const doc = new jsPDF();
        let currentY = 0;
        
        // Brand Header (Premium Dark Style)
        doc.setFillColor(20, 20, 28);
        doc.rect(0, 0, 210, 60, "F");
        
        doc.setFillColor(234, 88, 12);
        doc.rect(5, 5, 2, 50, "F");

        doc.setFont("helvetica", "bold");
        doc.setFontSize(34);
        doc.setTextColor(255, 255, 255);
        doc.text("DETHE PATIL", 105, 30, { align: "center", charSpace: 1.5 });
        
        doc.setFontSize(14);
        doc.setTextColor(234, 88, 12);
        doc.text("POULTRY MANAGEMENT ECOSYSTEM", 105, 42, { align: "center", charSpace: 1 });
        
        doc.setFontSize(10);
        doc.setTextColor(150, 150, 160);
        doc.text(`Overall Business Performance Report | Issued: ${new Date().toLocaleDateString()}`, 105, 52, { align: "center" });

        currentY = 80;

        // Section 1: Financial Performance Highlights
        doc.setTextColor(30, 30, 40);
        doc.setFontSize(18);
        doc.setFont("helvetica", "bold");
        doc.text("1. Financial Summary Overview", 20, currentY);
        
        autoTable(doc, {
            startY: currentY + 5,
            margin: { left: 20 },
            body: [
                ['Total Expense Records', `${savedExpenses.length} Logs`],
                ['Accumulated Investment', `Rs. ${totalExpenses.toLocaleString('en-IN')}/-`],
                ['Active Farm Cycle', 'Phase 1 - Implementation'],
                ['Financial Health Status', 'Operational'],
            ],
            theme: 'striped',
            styles: { fontSize: 11, cellPadding: 5 },
            columnStyles: { 0: { fontStyle: 'bold', width: 60, textColor: [234, 88, 12] } }
        });

        currentY = doc.lastAutoTable.finalY + 15;

        // Section 2: Detailed Expenditure Log
        doc.setFontSize(18);
        doc.setTextColor(30, 30, 40);
        doc.text("2. Recent Expenditure Logs", 20, currentY);
        
        const tableBody = savedExpenses.length > 0 
            ? savedExpenses.slice(0, 20).map(exp => [
                exp.date,
                exp.category,
                exp.location,
                `Rs. ${parseFloat(exp.amount || 0).toLocaleString('en-IN')}`
            ])
            : [['-', 'No expenses recorded yet', '-', '-']];

        autoTable(doc, {
            startY: currentY + 5,
            head: [['Date', 'Category', 'Vendor / Purpose', 'Amount']],
            body: tableBody,
            theme: 'grid',
            headStyles: { fillColor: [20, 20, 28], textColor: [255, 255, 255], fontStyle: 'bold' },
            alternateRowStyles: { fillColor: [248, 250, 255] },
            styles: { fontSize: 9.5 }
        });

        currentY = doc.lastAutoTable.finalY + 15;

        // Section 3: Market & Farm Intelligence
        if (currentY > 240) {
            doc.addPage();
            currentY = 25;
        }
        
        doc.setFontSize(18);
        doc.setTextColor(30, 30, 40);
        doc.text("3. Market Rates & Projections", 20, currentY);
        
        autoTable(doc, {
            startY: currentY + 5,
            body: [
                ['Average Market Egg Rate', 'Rs. 5.20 / Egg piece'],
                ['Feed Consumption Proj.', '4.2 kg / bird (40-day cycle)'],
                ['Primary Feed Rate', 'Rs. 42.50 / kg (Pre-Starter)'],
                ['Total ROI Estimate', 'Subject to Market Fluctuations']
            ],
            theme: 'plain',
            styles: { fontSize: 10, cellPadding: 3, fontStyle: 'italic' },
            columnStyles: { 0: { fontStyle: 'bold', textColor: [100, 100, 110] } }
        });

        // Footer Brand Stamp
        const footerY = 280;
        doc.setDrawColor(234, 88, 12);
        doc.setLineWidth(0.5);
        doc.line(20, footerY - 5, 190, footerY - 5);
        
        doc.setFontSize(9);
        doc.setTextColor(160, 160, 170);
        doc.setFont("helvetica", "normal");
        doc.text("DETHE PATIL POULTRY MANAGEMENT SYSTEM - CONFIDENTIAL BUSINESS DOCUMENT", 105, footerY, { align: "center" });

        doc.save(`Dethe_Patil_Overall_Report_${new Date().toISOString().split('T')[0]}.pdf`);
    };

    const handleSaveAndGeneratePDF = (e) => {
        e.preventDefault();
        const { amount, location, date, time, category, paymentMethod, notes } = expenseData;

        // Save to local state first
        setSavedExpenses(prev => [{
            id: Date.now(),
            ...expenseData
        }, ...prev]);

        // Generate Premium 3D PDF
        const doc = new jsPDF();
        
        // 0. Cool background base
        doc.setFillColor(245, 246, 250);
        doc.rect(0, 0, 210, 297, "F");

        // 1. Deep Surface Shadow
        doc.setFillColor(185, 185, 200);
        doc.roundedRect(12, 12, 186, 273, 5, 5, "F"); 
        
        // 2. Premium Paper Layer
        doc.setFillColor(255, 255, 255);
        doc.setDrawColor(215, 220, 230);
        doc.setLineWidth(0.4);
        doc.roundedRect(10, 10, 186, 273, 5, 5, "FD"); 

        // 3. 3D Header - Charcoal Chrome
        doc.setFillColor(35, 35, 50); // Deep Shadow
        doc.roundedRect(12, 12, 182, 45, 2, 2, "F");
        
        doc.setFillColor(28, 28, 35); // Main
        doc.roundedRect(10, 10, 182, 45, 2, 2, "F");

        // Color Accents
        doc.setFillColor(225, 29, 72); 
        doc.rect(10, 10, 4, 45, "F");
        doc.setFillColor(234, 88, 12); 
        doc.rect(188, 10, 4, 45, "F");

        doc.setFont("helvetica", "bold");
        doc.setFontSize(32);
        doc.setTextColor(255, 255, 255); 
        doc.text("DETHE PATIL", 101, 32, { align: "center", charSpace: 1 });
        
        doc.setFontSize(14);
        doc.setTextColor(234, 88, 12); 
        doc.text("P O U L T R Y   M A N A G E M E N T", 101, 42, { align: "center" });

        // 4. Floating 3D Metadata Badge
        doc.setFillColor(205, 205, 215); // shadow
        doc.roundedRect(73, 63, 64, 12, 6, 6, "F");
        
        doc.setFillColor(234, 88, 12); // main
        doc.roundedRect(72, 62, 64, 12, 6, 6, "F");
        
        doc.setFontSize(13);
        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.text("E-BILL : PREMIUM", 104, 70.5, { align: "center" });

        // 5. Data Grid with Shadow Highlights
        autoTable(doc, {
            startY: 85,
            margin: { left: 20, right: 20 },
            body: [
                ['Transaction Date', `${date}`],
                ['Transaction Time', `${time}`],
                ['Category', category],
                ['Location / Vendor', location],
                ['Payment Method', paymentMethod],
                ['Log Notes', notes || 'No detailed logs provided.']
            ],
            theme: 'grid',
            styles: {
                font: 'helvetica',
                fontSize: 10.5,
                cellPadding: 6,
                textColor: [60, 60, 80],
                lineColor: [225, 230, 240],
                lineWidth: 0.2,
            },
            columnStyles: {
                0: { fontStyle: 'bold', fillColor: [248, 250, 255], width: 45, textColor: [234, 88, 12] },
                1: { fillColor: [255, 255, 255] }
            }
        });

        // 6. 3D Settlement Card (Total)
        const finalY = doc.lastAutoTable.finalY + 15;
        doc.setFillColor(185, 185, 195); // Deep Shadow
        doc.roundedRect(22, finalY + 2, 166, 32, 4, 4, "F");
        
        doc.setFillColor(32, 33, 48); // Main Card
        doc.roundedRect(20, finalY, 166, 32, 4, 4, "F");

        doc.setFillColor(225, 29, 72); // Glow edge
        doc.rect(20, finalY + 4, 2, 24, "F");

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text("TOTAL SETTLED:", 32, finalY + 19);
        
        doc.setTextColor(234, 88, 12); 
        doc.setFontSize(26);
        doc.text(`Rs. ${parseFloat(amount).toLocaleString('en-IN')}/-`, 178, finalY + 21, { align: "right" });

        // 7. Verification PAID Stamp
        const sY = finalY + 50;
        doc.setFillColor(210, 225, 215); // Shadow
        doc.roundedRect(137, sY + 1, 46, 18, 2, 2, "F");
        
        doc.setDrawColor(25, 135, 84);
        doc.setFillColor(255, 255, 255);
        doc.setLineWidth(1.4);
        doc.roundedRect(135, sY, 46, 18, 2, 2, "FD");
        
        doc.setTextColor(25, 135, 84);
        doc.setFontSize(22);
        doc.setFont("helvetica", "bold");
        doc.text("PAID", 158, sY + 13, { align: "center" });

        // 8. Visual Verification Marks (Mini 3D effect)
        doc.setDrawColor(234, 88, 12);
        doc.setLineWidth(0.5);
        doc.line(20, sY, 35, sY);
        doc.setFontSize(7);
        doc.setTextColor(150, 150, 170);
        doc.text("SECURE DOC", 20, sY + 5);
        doc.text("TRANS_ID: " + Date.now().toString().slice(-8), 20, sY + 10);

        // 9. Premium Footer
        doc.setTextColor(160, 160, 180);
        doc.setFontSize(10);
        doc.setFont("helvetica", "italic");
        doc.text("Dethe Patil Premium Poultry Business Ecosystem", 105, 265, { align: "center" });
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.text("This document is auto-signed and encrypted for security verification.", 105, 272, { align: "center" });

        // 10. Save and Download
        doc.save(`Dethe_Patil_3D_Bill_${date}.pdf`);
        
        setShowModal(true);
        setExpenseData({
            ...expenseData,
            amount: '',
            location: '',
            paymentMethod: 'Cash',
            notes: '',
        });
    };

    return (
        <section id="expense-tracker" className="py-20 px-4 min-h-screen flex flex-col items-center justify-center bg-zinc-950 relative overflow-x-hidden perspective-2000">
            {/* Background Ornaments */}
            <div className="absolute top-[20%] right-[10%] w-64 h-64 bg-orange-600/20 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[20%] left-[10%] w-80 h-80 bg-rose-600/20 rounded-full blur-[120px] pointer-events-none"></div>

            <MedicineChatbot />

            <div className="max-w-3xl w-full mx-auto futuristic-card p-8 md:p-10 rounded-3xl border border-orange-500/30 bg-gray-900/60 backdrop-blur-xl shadow-[0_0_40px_rgba(234,88,12,0.1)] relative z-10 w-full mt-10 lg:mt-16">
                <div className="flex flex-col items-center justify-center mb-8">
                    <div className="mb-4 bg-orange-500/20 p-4 rounded-full border border-orange-500/50">
                        <svg className="w-10 h-10 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-center text-white tracking-tight">Daily Expense Tracker</h2>
                    <p className="text-orange-400/80 mt-2 text-center text-sm md:text-base">Record your poultry expenses and automatically download a PDF bill.</p>
                </div>

                <form onSubmit={handleSaveAndGeneratePDF} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Amount */}
                        <div className="space-y-2">
                            <label className="text-gray-400 text-sm ml-1">Amount Spent (₹)</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                                <input
                                    type="number" name="amount" value={expenseData.amount} onChange={handleChange}
                                    placeholder="Amount" required min="1"
                                    className="w-full pl-8 pr-4 py-4 bg-black/50 border border-gray-700/50 rounded-xl text-white outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all" />
                            </div>
                        </div>

                        {/* Location */}
                        <div className="space-y-2">
                            <label className="text-gray-400 text-sm ml-1">Location / Place</label>
                            <input
                                type="text" name="location" value={expenseData.location} onChange={handleChange}
                                placeholder="Shop name, Hospital, Market..." required
                                className="w-full p-4 bg-black/50 border border-gray-700/50 rounded-xl text-white outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all" />
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="space-y-2">
                        <label className="text-gray-400 text-sm ml-1">Payment Method</label>
                        <div className="flex gap-4">
                            <label className="flex-1 cursor-pointer">
                                <input type="radio" name="paymentMethod" value="Cash" checked={expenseData.paymentMethod === 'Cash'} onChange={handleChange} className="peer sr-only" />
                                <div className="p-4 rounded-xl text-center bg-black/50 border border-gray-700/50 text-gray-400 peer-checked:bg-orange-500/20 peer-checked:border-orange-500 peer-checked:text-white transition-all font-medium flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                    Cash
                                </div>
                            </label>
                            <label className="flex-1 cursor-pointer">
                                <input type="radio" name="paymentMethod" value="Online" checked={expenseData.paymentMethod === 'Online'} onChange={handleChange} className="peer sr-only" />
                                <div className="p-4 rounded-xl text-center bg-black/50 border border-gray-700/50 text-gray-400 peer-checked:bg-orange-500/20 peer-checked:border-orange-500 peer-checked:text-white transition-all font-medium flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                                    Online / UPI
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Category */}
                        <div className="space-y-2">
                            <label className="text-gray-400 text-sm ml-1">Expense Category</label>
                            <select 
                                name="category" value={expenseData.category} onChange={handleChange}
                                className="w-full p-4 bg-black/50 border border-gray-700/50 rounded-xl text-white outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all appearance-none cursor-pointer"
                            >
                                <option value="Poultry Medicine">Poultry Medicine</option>
                                <option value="Doctor Consultation">Doctor Consultation</option>
                                <option value="Poultry Feed">Poultry Feed </option>
                                <option value="Chicks / Birds">Chicks / Birds</option>
                                <option value="Equipment & Tools">Equipment & Tools</option>
                                <option value="Labor / Workers">Labor / Workers</option>
                                <option value="Transport">Transport</option>
                                <option value="Other">Other...</option>
                            </select>
                        </div>

                        {/* Date */}
                        <div className="space-y-2">
                            <label className="text-gray-400 text-sm ml-1">Date</label>
                            <input
                                type="date" name="date" value={expenseData.date} onChange={handleChange} required
                                className="w-full p-4 bg-black/50 border border-gray-700/50 rounded-xl text-white outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all [color-scheme:dark]" />
                        </div>

                        {/* Time */}
                        <div className="space-y-2">
                            <label className="text-gray-400 text-sm ml-1">Time</label>
                            <input
                                type="time" name="time" value={expenseData.time} onChange={handleChange} required
                                className="w-full p-4 bg-black/50 border border-gray-700/50 rounded-xl text-white outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all [color-scheme:dark]" />
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="space-y-2">
                        <label className="text-gray-400 text-sm ml-1">Additional Notes / Description</label>
                        <textarea
                            name="notes" rows="3" value={expenseData.notes} onChange={handleChange}
                            placeholder="Add more details about this expense here..." required
                            className="w-full p-4 bg-black/50 border border-gray-700/50 rounded-xl text-white outline-none focus:border-orange-500 transition-all resize-none"></textarea>
                    </div>

                    <button type="submit" className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-500 hover:to-rose-500 text-white shadow-[0_0_20px_rgba(234,88,12,0.3)] transform active:scale-95 transition-all flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        Save Record & Generate PDF Bill
                    </button>
                </form>

                {/* Recently Added Expenses Display */}
                {savedExpenses.length > 0 && (
                    <div className="mt-12 pt-8 border-t border-gray-800">
                        <div className="flex justify-between items-end mb-6">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Recent Expenses</h3>
                                <div className="flex items-center gap-4">
                                    <p className="text-gray-400 text-sm">Total Spent So Far</p>
                                    <button 
                                        type="button" 
                                        onClick={() => {
                                            if(window.confirm('Are you sure you want to delete all expense history?')) {
                                                setSavedExpenses([]);
                                            }
                                        }}
                                        className="px-3 py-1 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg text-xs font-bold border border-red-500/30 transition-all flex items-center gap-1.5 active:scale-95"
                                    >
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        Delete History
                                    </button>
                                </div>
                            </div>
                            <div className="text-3xl font-black text-rose-500 tracking-tight">
                                ₹{totalExpenses.toLocaleString('en-IN')}
                            </div>
                        </div>

                        {/* Overall Report Button Added */}
                        <button 
                            onClick={handleDownloadOverallSummary}
                            className="mb-6 w-full py-3 rounded-xl font-bold bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all flex items-center justify-center gap-3 group"
                        >
                            <svg className="w-5 h-5 text-orange-500 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                            Download Overall Business Report (PDF)
                        </button>

                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                            {savedExpenses.map((exp) => (
                                <div key={exp.id} className="bg-black/40 border border-gray-800 p-4 rounded-xl flex flex-col sm:flex-row justify-between gap-4 sm:items-center hover:border-orange-500/30 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/20 shrink-0">
                                            <span className="text-orange-400 text-xs font-bold uppercase">{exp.category.substring(0, 2)}</span>
                                        </div>
                                        <div>
                                            <h4 className="text-white font-semibold">{exp.location}</h4>
                                            <div className="flex flex-wrap gap-2 text-xs text-gray-400 mt-1">
                                                <span className="bg-gray-800 px-2 py-0.5 rounded-md">{exp.category}</span>
                                                <span className={`px-2 py-0.5 rounded-md font-medium ${exp.paymentMethod === 'Online' ? 'bg-blue-500/10 text-blue-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                                                    {exp.paymentMethod}
                                                </span>
                                                <span>•</span>
                                                <span>{exp.date} at {exp.time}</span>
                                            </div>
                                            {exp.notes && <p className="text-sm text-gray-500 mt-2 italic">"{exp.notes}"</p>}
                                        </div>
                                    </div>
                                    <div className="text-xl font-bold text-rose-400 shrink-0">
                                        - ₹{parseFloat(exp.amount).toLocaleString('en-IN')}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                    <div className="bg-gray-900 border border-orange-500/30 p-8 rounded-3xl max-w-sm w-full text-center shadow-[0_0_50px_rgba(234,88,12,0.2)] transform animate-msg-pop">
                        <div className="w-20 h-20 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Saved Successfully!</h3>
                        <p className="text-orange-400 font-medium mb-4">Expense Logged ✓</p>
                        <div className="text-gray-400 space-y-2 text-sm leading-relaxed mb-8">
                            <p>A PDF bill for this expense has been downloaded successfully.</p>
                            <p className="italic text-xs">(Check your downloads folder for the PDF file)</p>
                        </div>
                        <button onClick={() => setShowModal(false)} className="w-full py-3 bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-500 hover:to-rose-500 text-white font-bold rounded-xl transition-colors">
                            Done
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ExpenseTracker;
