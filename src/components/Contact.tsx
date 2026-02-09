import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ConsultationForm } from './ConsultationForm';
import { ClientIntakeForm } from './ClientIntakeForm';

export function Contact() {
  return (
    <div className="bg-[#0F172A] py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl text-white mb-4">
            Get Started Today
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Schedule a consultation or begin your client onboarding process.
            We're here to help you achieve financial clarity and success.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 space-y-8 sticky top-24">
              <div>
                <h3 className="text-xl text-white mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-400 flex-shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-slate-400 text-sm mb-1">Phone</div>
                      <div className="text-white">(555) 123-4567</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-400 flex-shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-slate-400 text-sm mb-1">Email</div>
                      <div className="text-white">contact@sterlingcpa.com</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-400 flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-slate-400 text-sm mb-1">Address</div>
                      <div className="text-white">
                        123 Financial District<br />
                        New York, NY 10004
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-400 flex-shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-slate-400 text-sm mb-1">Business Hours</div>
                      <div className="text-white">
                        Mon-Fri: 9:00 AM - 6:00 PM<br />
                        Sat: 10:00 AM - 2:00 PM<br />
                        Sun: Closed
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800">
                <h4 className="text-white mb-3">Why Schedule a Consultation?</h4>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">✓</span>
                    <span>Free 30-minute initial consultation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">✓</span>
                    <span>Personalized service recommendations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">✓</span>
                    <span>No obligation or commitment required</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">✓</span>
                    <span>Same-day response guaranteed</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Forms Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <Tabs defaultValue="consultation" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-slate-900/50 border border-slate-800 p-1">
                <TabsTrigger 
                  value="consultation"
                  className="text-white data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
                >
                  Schedule Consultation
                </TabsTrigger>
                <TabsTrigger 
                  value="intake"
                  className="text-white data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
                >
                  Client Intake
                </TabsTrigger>
              </TabsList>

              <TabsContent value="consultation" className="mt-6">
                <ConsultationForm />
              </TabsContent>

              <TabsContent value="intake" className="mt-6">
                <ClientIntakeForm />
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  );
}