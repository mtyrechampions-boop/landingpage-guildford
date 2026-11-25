'use client';

import React from 'react';
import { Radio } from 'lucide-react';
import PostcodeAvailabilityForm from '../PostcodeAvailabilityForm';

const GuildfordPostcodeChecker = () => {
  return (
    <section id="postcode-checker" className="scroll-mt-20 lg:scroll-mt-24 bg-white py-12 md:py-16 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
      <div className="max-w-3xl mx-auto text-center">

        <div className="inline-flex items-center gap-2 bg-[#FB7E10]/10 border border-[#FB7E10]/20 text-[#FB7E10] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-3">
          <Radio size={14} />
          <span>Live Guildford Technician Lookup</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900 leading-tight mb-3">
          HOW CLOSE IS YOUR<br />
          <span className="text-[#FB7E10]">GUILDFORD TYRE TECHNICIAN?</span>
        </h2>

        <p className="text-gray-500 text-base sm:text-lg mb-6 max-w-xl mx-auto">
          Enter your UK postcode to verify whether you are within confirmed Guildford Borough service zones (such as GU1, GU12, or GU10), then connect straight to booking or speak directly with our dispatch team.
        </p>

        <div className="max-w-lg mx-auto">
          <PostcodeAvailabilityForm
            variant="light"
            source="guildford-postcode-checker"
            buttonLabel="Check now"
            placeholder="e.g. GU1 4YT, GU12 6DP, GU10 1AA"
          />
        </div>

        <p className="mt-4 text-xs text-gray-400 font-medium">
          Confirmed operational coverage includes Guildford (GU1), Ash (GU12), and Tongham (GU10) with typical 20–40 min deployment from our Aldershot dispatch hub.
        </p>

      </div>
    </section>
  );
};

export default GuildfordPostcodeChecker;
