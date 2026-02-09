import React from 'react';
import { Linkedin, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Team() {
  const team = [
    {
      name: 'Jennifer Sterling',
      role: 'Managing Partner, CPA',
      credentials: 'CPA, EA, MBA',
      image: 'https://images.unsplash.com/photo-1736939666660-d4c776e0532c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGFjY291bnRhbnQlMjBjb3Jwb3JhdGUlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NzAzNDA0NDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      bio: 'With over 25 years of experience in corporate tax and financial advisory, Jennifer leads our team with a focus on strategic growth and client success.',
      specialties: ['Corporate Tax', 'M&A Advisory', 'Strategic Planning']
    },
    {
      name: 'Michael Chen',
      role: 'Senior Partner, CPA',
      credentials: 'CPA, CFP',
      image: 'https://images.unsplash.com/photo-1740153204804-200310378f2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHByb2Zlc3Npb25hbCUyMGFjY291bnRhbnQlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzAzNDAyNTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      bio: 'Michael specializes in small business accounting and startup advisory, helping entrepreneurs build strong financial foundations.',
      specialties: ['Small Business', 'Startup Advisory', 'Financial Planning']
    },
    {
      name: 'Sarah Anderson',
      role: 'Tax Director, CPA',
      credentials: 'CPA, EA',
      image: 'https://images.unsplash.com/photo-1659353220597-71b8c6a56259?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBmZW1hbGUlMjBleGVjdXRpdmUlMjBmaW5hbmNlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcwMzQwNDQ4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      bio: 'Sarah brings deep expertise in tax compliance and planning for individuals and businesses, with a track record of maximizing client savings.',
      specialties: ['Tax Compliance', 'IRS Representation', 'Estate Planning']
    },
    {
      name: 'David Rodriguez',
      role: 'Audit & Assurance Partner',
      credentials: 'CPA, CIA',
      image: 'https://images.unsplash.com/photo-1758599543154-76ec1c4257df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzc21hbiUyMGhlYWRzaG90JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcwMzQwMjUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      bio: 'David leads our audit practice with extensive experience in financial statement audits and internal control assessments.',
      specialties: ['Financial Audits', 'Internal Controls', 'Risk Management']
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
            Meet Our Team
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Experienced CPAs and financial advisors dedicated to your success.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-all duration-300 hover:shadow-xl">
                {/* Profile Image */}
                <div className="aspect-square overflow-hidden bg-slate-800">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl text-white mb-1">{member.name}</h3>
                  <div className="text-emerald-400 text-sm mb-2">{member.role}</div>
                  <div className="text-slate-500 text-xs mb-4">{member.credentials}</div>
                  
                  <p className="text-slate-400 text-sm mb-4 line-clamp-3">{member.bio}</p>

                  {/* Specialties */}
                  <div className="space-y-1 mb-4">
                    {member.specialties.map((specialty, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-emerald-400" />
                        <span className="text-xs text-slate-500">{specialty}</span>
                      </div>
                    ))}
                  </div>

                  {/* Contact Icons */}
                  <div className="flex gap-3 pt-4 border-t border-slate-800">
                    <button className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-emerald-500/20 hover:text-emerald-400 transition-colors">
                      <Mail className="w-4 h-4" />
                    </button>
                    <button className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-emerald-500/20 hover:text-emerald-400 transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Join Team CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-slate-900/30 border border-slate-800 rounded-xl p-8 text-center"
        >
          <h3 className="text-2xl text-white mb-3">Join Our Team</h3>
          <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
            We're always looking for talented CPAs and accounting professionals
            who are passionate about client service and excellence.
          </p>
          <button className="text-emerald-400 hover:text-emerald-300 transition-colors">
            View Open Positions →
          </button>
        </motion.div>
      </div>
    </div>
  );
}