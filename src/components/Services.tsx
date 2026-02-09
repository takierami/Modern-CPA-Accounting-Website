import React, { useState } from 'react';
import { FileText, Calculator, Users, TrendingUp, BarChart3, Shield } from 'lucide-react';
import { motion } from 'motion/react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';

interface Service {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  details: string;
}

export function Services() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const services: Service[] = [
    {
      id: 'tax',
      icon: <FileText className="w-8 h-8" />,
      title: 'Tax Preparation & Planning',
      description: 'Strategic tax solutions to minimize liability and maximize returns for individuals and businesses.',
      features: [
        'Federal & State Tax Filing',
        'Quarterly Tax Estimates',
        'Tax Strategy Consulting',
        'Audit Representation',
        'Multi-State Tax Compliance'
      ],
      details: 'Our tax experts stay current with ever-changing tax laws to ensure you receive maximum deductions while maintaining full compliance. We provide year-round support and proactive planning to optimize your tax position.'
    },
    {
      id: 'bookkeeping',
      icon: <Calculator className="w-8 h-8" />,
      title: 'Bookkeeping',
      description: 'Accurate, timely financial records that give you clarity and control over your business finances.',
      features: [
        'Monthly Financial Close',
        'Account Reconciliation',
        'QuickBooks Integration',
        'Expense Tracking',
        'Financial Statement Preparation'
      ],
      details: 'Clean books are the foundation of sound financial decisions. We maintain meticulous records, reconcile accounts, and provide regular reports so you always know where your business stands financially.'
    },
    {
      id: 'payroll',
      icon: <Users className="w-8 h-8" />,
      title: 'Payroll Services',
      description: 'Comprehensive payroll management ensuring accurate, compliant, and timely employee payments.',
      features: [
        'Payroll Processing',
        'Direct Deposit Setup',
        'Tax Withholding & Filing',
        'Benefits Administration',
        'W-2 & 1099 Preparation'
      ],
      details: 'Let us handle the complexity of payroll taxes, filings, and compliance while you focus on growing your team. We ensure accuracy and timeliness with every payroll run.'
    },
    {
      id: 'reporting',
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Financial Reporting',
      description: 'Clear, actionable financial reports that provide insights for informed business decisions.',
      features: [
        'Monthly Financial Statements',
        'Cash Flow Analysis',
        'Budget vs. Actual Reports',
        'KPI Dashboards',
        'Custom Reporting'
      ],
      details: 'Transform raw financial data into strategic insights. Our comprehensive reporting gives you a clear picture of profitability, cash flow, and financial health.'
    },
    {
      id: 'advisory',
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Business Advisory',
      description: 'Strategic guidance to help you make confident decisions and achieve sustainable growth.',
      features: [
        'Business Planning',
        'Financial Forecasting',
        'Profitability Analysis',
        'Entity Structure Consulting',
        'Exit Planning'
      ],
      details: 'Partner with experienced advisors who understand the financial and operational challenges of growing a business. We provide strategic insights to help you scale successfully.'
    },
    {
      id: 'assurance',
      icon: <Shield className="w-8 h-8" />,
      title: 'Audit & Assurance',
      description: 'Independent verification and assurance services that build trust with stakeholders.',
      features: [
        'Financial Statement Audits',
        'Review Engagements',
        'Compilation Services',
        'Internal Control Assessment',
        'Due Diligence'
      ],
      details: 'Our audit and assurance services provide credibility to your financial statements, meeting the requirements of lenders, investors, and regulatory bodies.'
    }
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
            Comprehensive Accounting Services
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Full-service accounting solutions tailored to your business needs,
            from bookkeeping to strategic advisory.
          </p>
        </motion.div>

        {/* Service Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full bg-slate-900/50 border border-slate-800 rounded-xl p-8 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-400 mb-6 group-hover:bg-emerald-500/20 transition-colors">
                  {service.icon}
                </div>

                <h3 className="text-xl text-white mb-3">{service.title}</h3>
                <p className="text-slate-400 mb-6">{service.description}</p>

                <Button
                  onClick={() => setSelectedService(service)}
                  variant="ghost"
                  className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 p-0 h-auto"
                >
                  Learn More →
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Service Details Modal */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-400">
                {selectedService?.icon}
              </div>
              {selectedService?.title}
            </DialogTitle>
            <DialogDescription className="text-slate-400 text-base mt-4">
              {selectedService?.details}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6">
            <h4 className="text-lg text-white mb-4">What's Included:</h4>
            <ul className="space-y-3">
              {selectedService?.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-slate-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800">
            <Button
              onClick={() => setSelectedService(null)}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Schedule a Consultation
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
