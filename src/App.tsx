import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Industries } from './components/Industries';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Team } from './components/Team';
import { Contact } from './components/Contact';
import { Navigation } from './components/Navigation';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1128]">
      <Navigation activeSection={activeSection} onNavigate={scrollToSection} />
      
      <main>
        <section id="home">
          <Hero onNavigate={scrollToSection} />
        </section>
        
        <section id="services">
          <Services />
        </section>
        
        <section id="industries">
          <Industries />
        </section>
        
        <section id="about">
          <WhyChooseUs />
        </section>
        
        <section id="team">
          <Team />
        </section>
        
        <section id="contact">
          <Contact />
        </section>
      </main>
      
      <footer className="bg-[#030712] border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-xl text-white mb-4">Sterling & Associates CPA</h3>
              <p className="text-slate-400 mb-4">
                Trusted accounting and financial advisory for businesses that scale.
              </p>
              <p className="text-slate-500 text-sm">
                © 2026 Sterling & Associates CPA. All rights reserved.
              </p>
            </div>
            
            <div>
              <h4 className="text-white mb-4">Services</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>Tax Preparation</li>
                <li>Bookkeeping</li>
                <li>Payroll Services</li>
                <li>Financial Reporting</li>
                <li>Business Advisory</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>contact@sterlingcpa.com</li>
                <li>(555) 123-4567</li>
                <li>123 Financial District</li>
                <li>New York, NY 10004</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
