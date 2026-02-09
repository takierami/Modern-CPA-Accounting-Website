import React from 'react';
import { Award, Shield, Clock, Users, CheckCircle2, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

export function WhyChooseUs() {
  const reasons = [
    {
      icon: <Award className="w-6 h-6" />,
      title: '25+ Years of Excellence',
      description: 'Over two decades serving businesses and individuals with integrity and expertise.'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'CPA Certified & Licensed',
      description: 'All team members are licensed CPAs and IRS Enrolled Agents with ongoing professional education.'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Responsive & Reliable',
      description: 'Quick turnaround times and year-round availability for all your accounting needs.'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Dedicated Account Team',
      description: 'Personalized service with a consistent team that knows your business inside and out.'
    },
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: 'Compliance Assurance',
      description: 'Stay compliant with federal, state, and local regulations with our expert guidance.'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Strategic Growth Focus',
      description: 'Beyond compliance, we help you make strategic decisions that drive profitability.'
    }
  ];

  const certifications = [
    { name: 'AICPA Member', badge: 'CPA' },
    { name: 'IRS Enrolled Agent', badge: 'EA' },
    { name: 'QuickBooks Certified', badge: 'QB' },
    { name: 'SOC 2 Compliant', badge: 'SOC2' }
  ];

  return (
    <div className="bg-[#0F172A] py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl text-white mb-4">
            Why Choose Sterling & Associates
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            We're more than accountants—we're trusted advisors committed to your financial success.
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex gap-4"
            >
              <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-400 flex-shrink-0">
                {reason.icon}
              </div>
              <div>
                <h3 className="text-lg text-white mb-2">{reason.title}</h3>
                <p className="text-slate-400">{reason.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl text-white mb-4">
                Certified, Secure & Compliant
              </h3>
              <p className="text-slate-400 mb-6">
                We maintain the highest standards of professional certification and data security.
                Your financial information is protected by bank-level encryption and strict
                confidentiality protocols.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span className="text-slate-300">256-bit SSL encryption on all communications</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span className="text-slate-300">Secure document portal for file sharing</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span className="text-slate-300">Regular security audits and compliance reviews</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span className="text-slate-300">Professional liability insurance coverage</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg text-white mb-6">Certifications & Memberships</h4>
              <div className="grid grid-cols-2 gap-4">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={cert.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center"
                  >
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-emerald-400 text-xs">{cert.badge}</span>
                    </div>
                    <div className="text-slate-300 text-sm">{cert.name}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: '500+', label: 'Active Clients' },
            { value: '$2.5B+', label: 'Assets Managed' },
            { value: '98%', label: 'Client Retention' },
            { value: '25+', label: 'Years Experience' }
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl text-emerald-400 mb-2">{stat.value}</div>
              <div className="text-slate-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
