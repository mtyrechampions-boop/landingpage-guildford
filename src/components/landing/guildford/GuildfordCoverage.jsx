'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Navigation, Radio, CheckCircle2, AlertCircle } from 'lucide-react';
import { GUILDFORD_BOROUGH_SECTORS, GUILDFORD_CONFIRMED_LOCATIONS, GUILDFORD_ROAD_CORRIDORS } from '../../../data/guildfordCoverage';

const GuildfordCoverage = () => {
  return (
    <section id="areas" className="scroll-mt-20 lg:scroll-mt-24 bg-white py-12 md:py-16 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 bg-[#FB7E10]/10 text-[#FB7E10] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-3 border border-[#FB7E10]/20">
            <Radio size={14} className="animate-pulse" />
            <span>Guildford Borough Operational Zones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900 leading-tight">
            24/7 Mobile Tyre Coverage Across Guildford Borough
          </h2>
          <p className="mt-3 text-gray-500 text-base sm:text-lg">
            Rapid mobile tyre fitting and emergency roadside recovery across confirmed operational service zones in Guildford Borough, with direct dispatch from our central Aldershot hub via the A31 and A3 corridors.
          </p>
        </div>

        {/* 5 Geographic Borough Sectors Grid: 3 in Row 1, 2 Centred in Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8 md:mb-10 items-stretch">
          {GUILDFORD_BOROUGH_SECTORS.map((sector, index) => {
            const isConfirmed = sector.status === 'Confirmed Operational';
            
            // Grid placement classes:
            // Desktop (lg): 6 columns. Row 1 has 3 cards (span 2 each). Row 2 has 2 cards (span 2 each), starting at col 2 to be centred.
            // Tablet (md): 2 columns. Cards 1-4 take 1 col each; Card 5 takes col-span-2 and is centred.
            // Mobile: 1 column.
            const gridClasses =
              index === 3
                ? 'col-span-1 md:col-span-1 lg:col-span-2 lg:col-start-2'
                : index === 4
                ? 'col-span-1 md:col-span-2 md:max-w-[calc(50%-12px)] md:mx-auto md:w-full lg:max-w-none lg:w-auto lg:col-span-2 lg:col-start-4'
                : 'col-span-1 md:col-span-1 lg:col-span-2';

            return (
              <div
                key={sector.id}
                id={`areas-${sector.id}`}
                className={`scroll-mt-28 lg:scroll-mt-32 rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between shadow-sm border ${gridClasses} ${
                  isConfirmed
                    ? 'bg-gray-50 hover:bg-white border-gray-200 hover:border-[#FB7E10]/40 hover:shadow-lg'
                    : 'bg-slate-50/70 border-slate-200/80 hover:bg-slate-50'
                }`}
              >
                {/* Top Section */}
                <div className="space-y-4">
                  {/* Sector Header */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-gray-900 font-black text-lg">
                      <MapPin size={20} className="shrink-0 text-[#FB7E10]" />
                      <span>{sector.sector}</span>
                    </div>
                    <span
                      className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full whitespace-nowrap border shrink-0 ${
                        isConfirmed
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      {isConfirmed ? '● Confirmed Operational' : 'Verification Required'}
                    </span>
                  </div>

                  <p className="text-xs font-bold text-gray-800 leading-snug">
                    {sector.headline}
                  </p>

                  {/* Confirmed locations list or unconfirmed notification */}
                  {isConfirmed ? (
                    <div className="space-y-2 pt-2 border-t border-gray-200/60">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-gray-500 block">
                        Confirmed Service Locations:
                      </span>
                      <ul className="space-y-2">
                        {sector.confirmedLocations.map((loc) => (
                          <li key={loc.name} className="flex items-start justify-between gap-2 text-xs">
                            <span className="font-bold text-gray-900 flex items-center gap-1.5">
                              <CheckCircle2 size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                              {loc.name} ({loc.postcode})
                            </span>
                            <span className="text-[11px] font-extrabold text-[#FB7E10] bg-[#FB7E10]/10 px-2 py-0.5 rounded">
                              {loc.responseTime}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="p-3 bg-amber-50/80 rounded-2xl border border-amber-200/60 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800">
                        <AlertCircle size={14} className="shrink-0" />
                        <span>Not Confirmed as Pre-Set Base</span>
                      </div>
                      <p className="text-[11px] text-amber-700 leading-relaxed font-medium">
                        Locations in this sector (e.g. {sector.unconfirmedCandidates.slice(0, 4).map(c => c.name).join(', ')}) require manual postcode verification with our dispatch team.
                      </p>
                    </div>
                  )}
                </div>

                {/* Bottom Section */}
                <div className="space-y-3 pt-4 mt-4 border-t border-gray-200/60">
                  <div className="text-[11px] text-gray-500 leading-relaxed">
                    <span className="font-bold text-gray-700">Connecting Corridors: </span>
                    <span className="text-gray-600 font-medium">{sector.primaryRoads}</span>
                  </div>

                  <p className="text-xs text-gray-500 leading-relaxed font-normal">
                    {sector.summary}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Road & Highway Corridor Callouts */}
        <div className="mb-8 md:mb-10 bg-gray-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FB7E10] animate-ping" />
            <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-[#FB7E10]">
              Strategic Road Corridors Across Guildford Borough
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {GUILDFORD_ROAD_CORRIDORS.map((corridor) => (
              <div key={corridor.road} className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-1.5">
                <h4 className="text-sm font-black text-white">{corridor.road}</h4>
                <p className="text-xs text-slate-300 font-medium">{corridor.coverage}</p>
                <p className="text-[11px] text-[#FB7E10] font-bold">{corridor.service}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Confirmed Immediate Dispatch Badges */}
        <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-center gap-2 mb-5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <h3 className="text-sm sm:text-base font-black uppercase tracking-widest text-gray-900 text-center">
              Confirmed Active Service Zones in Guildford Borough (30–60 Min Response)
            </h3>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {GUILDFORD_CONFIRMED_LOCATIONS.map((loc) => (
              <Link
                key={loc.name}
                href={`/availability?postcode=${encodeURIComponent(loc.postcode)}`}
                className="bg-white hover:bg-[#FB7E10] hover:text-white transition-all border border-gray-200 hover:border-[#FB7E10] px-5 py-3 rounded-2xl text-xs sm:text-sm font-black text-gray-800 shadow-sm active:scale-95 flex items-center gap-2 group"
              >
                <Navigation size={14} className="text-[#FB7E10] group-hover:text-white transition-colors" />
                <span>{loc.name} ({loc.postcode})</span>
                <span className="text-[10px] bg-gray-100 group-hover:bg-white/20 text-gray-600 group-hover:text-white px-2 py-0.5 rounded-md font-bold">
                  30–60 Min
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="text-xs sm:text-sm text-gray-600 max-w-xl">
              <strong className="text-gray-900">Coverage Verification Notice:</strong> Mobile Tyre Champions strictly advertises confirmed operational areas. If your Guildford Borough postcode is outside GU1, GU12, or GU10, enter your postcode into our checker or call our dispatch desk.
            </div>
            <a
              href="tel:02071013856"
              data-conversion="phone-call"
              className="bg-[#FB7E10] hover:bg-orange-600 text-white px-7 py-3 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider transition-all whitespace-nowrap shadow-lg shadow-orange-500/15 active:scale-95 shrink-0"
            >
              Verify My Postcode
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default GuildfordCoverage;
