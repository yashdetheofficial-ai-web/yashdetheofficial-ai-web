import { useState, useEffect } from 'react';

const OrderSection = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        deliveryHub: '',
        requirements: ''
    });
    const [isLocating, setIsLocating] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phone') {
            // Only allow digits and max 10 characters
            const onlyNums = value.replace(/[^0-9]/g, '').slice(0, 10);
            setFormData({
                ...formData,
                [name]: onlyNums
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const getLocation = () => {
        if (navigator.geolocation) {
            setIsLocating(true);
            navigator.geolocation.getCurrentPosition(async (pos) => {
                try {
                    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`);
                    const data = await res.json();
                    
                    // Show full exact address based on coordinates
                    const exactLocation = data.display_name || data.address.city || data.address.town || "Location Found";
                    setFormData(prev => ({ ...prev, deliveryHub: exactLocation }));
                } catch (e) {
                    setFormData(prev => ({ ...prev, deliveryHub: "Pune" }));
                } finally {
                    setIsLocating(false);
                }
            });
        }
    };

    useEffect(() => {
        getLocation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const { fullName, phone, deliveryHub, requirements } = formData;

        const message = `*Order Confirmation - Dethe Patil Poultry*%0A%0A` +
            ` *${fullName}*,%0A` +
            `     . %0A%0A` +
            `*Details:*%0A` +
            ` Location: ${deliveryHub}%0A` +
            ` Requirements: ${requirements}%0A%0A` +
            `Thank you for visiting our business!     .`;


        const whatsappUrl = `https://wa.me/918080294291?text=${message}`;
        window.open(whatsappUrl, '_blank');

        // Show Modal
        setShowModal(true);
        setFormData({ fullName: '', phone: '', deliveryHub: '', requirements: '' });
    };

    return (
        <section id="order" className="py-20 px-4 min-h-screen flex items-center justify-center bg-black">
            <div className="">
                <div className="flex flex-col items-center justify-center mb-8">
                    <div className="animate-bounce-slow mb-4">
                        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
                                    <stop offset="100%" style={{ stopColor: '#059669', stopOpacity: 1 }} />
                                </linearGradient>
                                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                                    <feGaussianBlur in="SourceAlpha" stdDeviation="1" />
                                    <feOffset dx="1" dy="1" result="offsetblur" />
                                    <feComponentTransfer><feFuncA type="linear" slope="0.5" /></feComponentTransfer>
                                    <feMerge>
                                        <feMergeNode />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>
                            <path d="M12 2L3.5 6.5V17.5L12 22L20.5 17.5V6.5L12 2Z" stroke="url(#iconGradient)" strokeWidth="2" strokeLinejoin="round" filter="url(#shadow)" />
                            <path d="M3.5 6.5L12 11L20.5 6.5" stroke="url(#iconGradient)" strokeWidth="2" strokeLinejoin="round" />
                            <path d="M12 22V11" stroke="url(#iconGradient)" strokeWidth="2" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-center text-white font-sans tracking-tight">Place Your Order</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <input
                            type="text" name="fullName" value={formData.fullName} onChange={handleChange}
                            placeholder="Full Name" required pattern="^[A-Za-z\s]{3,}$" title="Numbers not allowed"
                            className="w-full p-4 bg-black/40 border border-gray-700 rounded-xl text-white outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all" />

                        <input
                            type="tel" name="phone" value={formData.phone} onChange={handleChange}
                            placeholder="WhatsApp Number" required pattern="[0-9]{10}" title="Enter 10 digit number"
                            className="w-full p-4 bg-black/40 border border-gray-700 rounded-xl text-white outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all" />
                    </div>

                    <div className="relative">
                        <input
                            type="text" name="deliveryHub" value={formData.deliveryHub} onChange={handleChange}
                            placeholder={isLocating ? "Locating..." : "Delivery Hub (Location)"} required pattern="^[A-Za-z\s,]+$"
                            className="w-full p-4 bg-black/40 border border-gray-700 rounded-xl text-white outline-none focus:border-emerald-400 pr-12" />
                        <button type="button" onClick={getLocation} className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-400 hover:scale-110 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                    </div>

                    <textarea
                        name="requirements" rows="4" value={formData.requirements} onChange={handleChange}
                        placeholder="Your Requirements..." required
                        className="w-full p-4 bg-black/40 border border-gray-700 rounded-xl text-white outline-none focus:border-emerald-400 transition-all"></textarea>

                    <button type="submit" className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-black shadow-lg shadow-emerald-500/20 transform active:scale-95 transition-all">
                        Confirm & Send to WhatsApp
                    </button>
                </form>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                    <div className="bg-gray-900 border border-emerald-500/30 p-8 rounded-3xl max-w-sm w-full text-center shadow-[0_0_50px_rgba(16,185,129,0.2)] transform transition-transform duration-300">
                        <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Order Received!</h3>
                        <p className="text-emerald-400 font-medium mb-4"> ! (Thank You)</p>
                        <div className="text-gray-400 space-y-2 text-sm leading-relaxed mb-8">
                            <p> .</p>
                            <p className="italic">"We truly appreciate your visit and the trust you've placed in our business. Looking forward to serving you!"</p>
                        </div>
                        <button onClick={() => setShowModal(false)} className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl transition-colors">
                            Done
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default OrderSection;
