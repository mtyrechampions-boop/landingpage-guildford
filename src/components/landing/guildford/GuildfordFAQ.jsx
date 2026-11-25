'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Phone, MessageSquare } from 'lucide-react';
import { GUILDFORD_FAQS } from '../../../data/guildfordFaqs';

export { GUILDFORD_FAQS };

const GuildfordFAQ = () => {
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section id="faq" className="scroll-mt-20 lg:scroll-mt-24 bg-white py-12 md:py-16 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 bg-[#FB7E10]/10 border border-[#FB7E10]/20 text-[#FB7E10] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-3">
            <HelpCircle size={14} />
            <span>Guildford Tyre Questions Answered</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900 leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-gray-500 text-base sm:text-lg">
            Everything you need to know about our mobile tyre fitting service across Guildford Borough.
          </p>
        </div>

        {/* FAQ Accordions */}
        <div className="space-y-4">
          {GUILDFORD_FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className={`bg-white border-2 ${
                  isOpen ? 'border-[#FB7E10]/40 shadow-lg' : 'border-gray-200'
                } rounded-3xl overflow-hidden transition-all duration-300`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left group"
                  aria-expanded={isOpen}
                >
                  <span className={`text-base sm:text-lg font-bold pr-4 transition-colors ${
                    isOpen ? 'text-[#FB7E10]' : 'text-gray-900 group-hover:text-[#FB7E10]'
                  }`}>
                    {faq.q}
                  </span>
                  <div className={`p-2 rounded-xl transition-all duration-300 shrink-0 ${
                    isOpen ? 'rotate-180 bg-[#FB7E10] text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-[#FB7E10]/10 group-hover:text-[#FB7E10]'
                  }`}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out px-5 sm:px-6 ${
                    isOpen ? 'grid-rows-[1fr] pb-6 opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-gray-500 font-normal leading-relaxed text-sm sm:text-base pt-3 border-t border-gray-100">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Card */}
        <div className="mt-12 p-6 sm:p-8 bg-gray-50 border border-gray-200 rounded-3xl text-center space-y-4 shadow-sm">
          <h3 className="text-lg sm:text-xl font-black text-gray-900">
            Need urgent assistance or have a specific tyre size enquiry in Guildford?
          </h3>
          <p className="text-sm text-gray-500 max-w-lg mx-auto">
            Our expert dispatch controllers are on the line 24/7 to check stock and give you an immediate fixed quote.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="tel:02071013856"
              data-conversion="phone-call"
              className="inline-flex items-center gap-2 bg-[#FB7E10] hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-black text-sm uppercase tracking-wider transition-all shadow-lg active:scale-95"
            >
              <Phone size={16} />
              <span>Call 0207 101 3856</span>
            </a>
            <a
              href="https://wa.me/447494024653?text=Hi%20Mobile%20Tyre%20Champions%2C%20I%20have%20a%20question%20about%20mobile%20tyre%20fitting%20in%20Guildford."
              target="_blank"
              rel="noopener noreferrer"
              data-conversion="whatsapp"
              className="inline-flex items-center gap-2 bg-[#22C55E] hover:bg-green-600 text-white px-6 py-3 rounded-xl font-black text-sm uppercase tracking-wider transition-all shadow-lg active:scale-95"
            >
              <MessageSquare size={16} />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default GuildfordFAQ;
