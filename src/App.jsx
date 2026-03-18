import { useState, useEffect } from 'react';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AIBusinessPlan from './components/AIBusinessPlan';
import PremiumInventory from './components/PremiumInventory';
import ExpenseTracker from './components/ExpenseTracker';
import Footer from './components/Footer';
import EggRateChatbot from './components/EggRateChatbot';
import ExpenseChatbot from './components/ExpenseChatbot';

function App() {
  useEffect(() => {
    // Prevent browser's default scroll restoration behavior on refresh
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    // Remove hash from the URL if any to prevent jumping to sections on refresh
    if (window.location.hash) {
      window.history.replaceState('', document.title, window.location.pathname + window.location.search);
    }
    
    // Force scroll to top immediately
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="text-gray-100 min-h-screen">
      <Cursor />
      <Navbar />
      <Hero />
      <main>
        <AIBusinessPlan />
        <PremiumInventory />
        <ExpenseTracker />
      </main>
      <EggRateChatbot />
      <ExpenseChatbot />
      <Footer />
    </div>
  );
}

export default App;
