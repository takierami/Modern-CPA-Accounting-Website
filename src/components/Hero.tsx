import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HeroProps {
  onNavigate: (section: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  const trustIndicators = [
    'CPA Certified',
    '25+ Years Experience',
    'IRS Enrolled Agents',
    'Secure & Confidential',
  ];

  return (
    <div className="relative min-h-screen flex items-center bg-gradient-to-br from-[#0A1128] via-[#0F172A] to-[#1E293B] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(148, 163, 184) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6">
              <span className="inline-block px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm">
                Trusted by 500+ Businesses
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
              Trusted Accounting for
              <span className="block text-emerald-400 mt-2">
                Businesses That Scale
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
              Expert tax preparation, strategic financial planning, and business advisory
              services designed to help your company grow with confidence.
            </p>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 gap-3 mb-10">
              {trustIndicators.map((indicator, index) => (
                <motion.div
                  key={indicator}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span className="text-slate-300 text-sm">{indicator}</span>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => onNavigate('contact')}
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-base px-8 group"
              >
                Schedule a Consultation
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                onClick={() => onNavigate('services')}
                size="lg"
                variant="outline"
                className="border-slate-600 text-slate-200 hover:bg-slate-800 hover:text-white text-base px-8"
              >
                Our Services
              </Button>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1565688527174-775059ac429c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMG1lZXRpbmclMjBmaW5hbmNpYWwlMjBhZHZpc29yfGVufDF8fHx8MTc3MDMzNjQ5Mnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Professional financial consultation"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-transparent to-transparent opacity-60" />
            </div>

            {/* Floating Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute -bottom-6 -left-6 bg-slate-900/90 backdrop-blur-lg border border-slate-700 rounded-xl p-6 shadow-2xl"
            >
              <div className="flex gap-6">
                <div>
                  <div className="text-3xl text-emerald-400 mb-1">$2.5B+</div>
                  <div className="text-slate-400 text-sm">Assets Managed</div>
                </div>
                <div className="border-l border-slate-700" />
                <div>
                  <div className="text-3xl text-emerald-400 mb-1">98%</div>
                  <div className="text-slate-400 text-sm">Client Satisfaction</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0F172A] to-transparent" />
    </div>
  );
}
