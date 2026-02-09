import React from 'react';
import { Building2, Briefcase, Rocket, Building, User } from 'lucide-react';
import { motion } from 'motion/react';

export function Industries() {
  const industries = [
    {
      icon: <Building2 className="w-6 h-6" />,
      title: 'Small & Medium Businesses',
      description: 'Comprehensive accounting services designed for growing companies, from startups to established SMBs.',
      services: ['Tax planning', 'Bookkeeping', 'Payroll', 'Financial advisory']
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: 'Freelancers & Contractors',
      description: 'Specialized support for independent professionals managing complex income streams and quarterly taxes.',
      services: ['Estimated taxes', 'Expense tracking', '1099 filing', 'Retirement planning']
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: 'Startups & Tech Companies',
      description: 'Strategic financial guidance for fast-growing ventures, fundraising support, and scalable accounting systems.',
      services: ['Cap table management', 'R&D credits', 'Investor reporting', 'Financial modeling']
    },
    {
      icon: <Building className="w-6 h-6" />,
      title: 'Established Corporations',
      description: 'Enterprise-level accounting, audit, and compliance services for mature organizations with complex needs.',
      services: ['Financial audits', 'Tax compliance', 'Multi-entity reporting', 'M&A support']
    },
    {
      icon: <User className="w-6 h-6" />,
      title: 'High-Net-Worth Individuals',
      description: 'Personal tax planning, estate planning, and wealth management for individuals and families.',
      services: ['Tax optimization', 'Estate planning', 'Investment accounting', 'Trust administration']
    }
  ];

  return (
    <div className="bg-[#0A1128] py-24">
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
            Industries We Serve
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Specialized expertise across diverse industries and client types,
            with tailored solutions for your unique financial needs.
          </p>
        </motion.div>

        {/* Industry Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-900/30 border border-slate-800 rounded-xl p-8 hover:border-slate-700 transition-all duration-300 hover:shadow-xl"
            >
              <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-400 mb-4">
                {industry.icon}
              </div>

              <h3 className="text-xl text-white mb-3">{industry.title}</h3>
              <p className="text-slate-400 mb-6">{industry.description}</p>

              <div className="space-y-2">
                {industry.services.map((service, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-sm text-slate-500">{service}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-slate-400 mb-4">
            Don't see your industry listed?
          </p>
          <p className="text-white text-lg">
            We work with clients across many sectors.{' '}
            <button className="text-emerald-400 hover:text-emerald-300 transition-colors underline">
              Contact us
            </button>{' '}
            to discuss your specific needs.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
