'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { MapPin, Phone, Radio, CheckCircle2, Clock, ShieldCheck, AlertTriangle } from 'lucide-react';
import {
  GUILDFORD_HUB,
  GUILDFORD_CONFIRMED_LOCATIONS,
  GUILDFORD_BOROUGH_SECTORS,
} from '../../../data/guildfordCoverage';

// Google Maps loaded client-side only
const GuildfordCorridorsMap = dynamic(() => import('./GuildfordCorridorsMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 min-h-[440px]">
      <div className="w-10 h-10 border-3 border-[#FB7E10] border-t-transparent rounded-full animate-spin mb-3" />
      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Loading Guildford Coverage Map...</span>
    </div>
  ),
});

const SECTOR_FILTERS = [
  { id: 'all', label: 'All Confirmed Zones' },
  { id: 'central', label: 'Central Guildford' },
  { id: 'western', label: 'Western Guildford' },
  { id: 'northern', label: 'Northern Guildford' },
];

const GuildfordCorridors = () => {
  const [activeSector, setActiveSector] = useState('all');

  return (
    <section
      id="corridors"
      className="scroll-mt-20 lg:scroll-mt-24 bg-white py-12 md:py-16 px-4 sm:px-6 lg:px-8 border-b border-gray-100"
    >
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 bg-[#FB7E10]/10 border border-[#FB7E10]/20 text-[#FB7E10] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-3">
            <Radio size={14} className="animate-pulse" />
            <span>Interactive Guildford Coverage Map</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900 leading-tight">
            Guildford Borough Confirmed Coverage Map
          </h2>
          <p className="mt-4 text-gray-500 text-base sm:text-lg leading-relaxed">
            Centred on Guildford with direct deployment from our central Aldershot hub along the A31 (Hog's Back), A331, and A3 corridors. Only confirmed operational service locations are displayed.
          </p>
        </div>

        {/* Full-Width Interactive Google Maps Card */}
        <div className="rounded-3xl md:rounded-[2.5rem] overflow-hidden bg-white border border-gray-200 shadow-xl shadow-slate-200/60 p-4 sm:p-6 mb-10">

          {/* Map Top Bar: Hub details & Sector Filter Pills */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-3 w-3 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FB7E10] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FB7E10]"></span>
              </span>
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-gray-900 block leading-tight">
                  Guildford Operating Centre (Centred: GU1)
                </span>
                <span className="text-[11px] font-bold text-gray-400">
                  Direct dispatch from Aldershot Hub • 20–40 min estimated arrival
                </span>
              </div>
            </div>

            {/* Sector Filter Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full no-scrollbar text-xs">
              {SECTOR_FILTERS.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveSector(filter.id)}
                  className={`px-3.5 py-1.5 rounded-full font-extrabold transition-all whitespace-nowrap cursor-pointer ${
                    activeSector === filter.id
                      ? 'bg-[#FB7E10] text-white shadow-md shadow-orange-500/20'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* The Google Map Container */}
          <div className="isolate relative w-full h-[460px] sm:h-[540px] lg:h-[600px] rounded-2xl overflow-hidden border border-gray-200">
            <GuildfordCorridorsMap activeSector={activeSector} />
          </div>

          {/* Map Legend */}
          <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4 text-xs font-bold text-gray-600">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <li className="flex items-center gap-2">
                <span className="h-3.5 w-6 rounded-full border-2 border-[#FB7E10] bg-[#FB7E10]/10" aria-hidden="true" />
                <span>Verified Guildford Borough service corridor</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 rounded-full border-[3px] border-[#FB7E10] bg-white shadow-sm" aria-hidden="true" />
                <span>Confirmed operational locations</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 rounded-full bg-[#FB7E10] border-2 border-white shadow-sm" aria-hidden="true" />
                <span>Aldershot dispatch hub</span>
              </li>
            </ul>

            <div className="flex items-center gap-1.5 text-gray-500 text-[11px]">
              <Clock size={13} className="text-[#FB7E10]" />
              <span>Click any marker for location details and immediate call link</span>
            </div>
          </div>
        </div>

        {/* Locations Table Beneath Map (Unified with Same Data Source) */}
        <div className="bg-gray-50 rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                Confirmed Operational Service Locations in Guildford Borough
              </h3>
              <p className="text-sm text-gray-500 font-medium mt-1">
                Authoritative MTC operational data. No unverified areas are displayed as active.
              </p>
            </div>
            <a
              href="tel:02071013856"
              className="inline-flex items-center justify-center gap-2 bg-[#FB7E10] hover:bg-orange-600 text-white px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md shadow-orange-500/20 active:scale-95 shrink-0"
            >
              <Phone size={14} className="fill-current" />
              <span>Call 0207 101 3856</span>
            </a>
          </div>

          {/* Desktop Table View */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-gray-400 text-[11px] font-black uppercase tracking-wider">
                  <th className="py-3 px-3">Location</th>
                  <th className="py-3 px-3">Borough Sector</th>
                  <th className="py-3 px-3">Postcode District</th>
                  <th className="py-3 px-3">Primary Road Arteries</th>
                  <th className="py-3 px-3">Deployment Estimate</th>
                  <th className="py-3 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/70">
                {/* Aldershot Hub */}
                <tr className="bg-orange-50/50 hover:bg-orange-50/80 transition-colors">
                  <td className="py-3.5 px-3 font-black text-gray-900 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#FB7E10]"></span>
                    {GUILDFORD_HUB.name}
                  </td>
                  <td className="py-3.5 px-3 font-bold text-gray-600">Central Operating Hub</td>
                  <td className="py-3.5 px-3 font-mono font-bold text-gray-900">{GUILDFORD_HUB.postcode}</td>
                  <td className="py-3.5 px-3 text-gray-600">Grosvenor Road, A323 / A331 Link</td>
                  <td className="py-3.5 px-3 font-bold text-[#FB7E10]">Hub Depot</td>
                  <td className="py-3.5 px-3">
                    <span className="bg-[#FB7E10]/15 text-[#D96A00] text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border border-orange-300">
                      Central HQ
                    </span>
                  </td>
                </tr>

                {/* Confirmed Locations */}
                {GUILDFORD_CONFIRMED_LOCATIONS.map((loc) => (
                  <tr key={loc.id} className="hover:bg-white transition-colors">
                    <td className="py-3.5 px-3 font-black text-gray-900">
                      {loc.name}
                    </td>
                    <td className="py-3.5 px-3 font-medium text-gray-600">
                      {loc.boroughSector}
                    </td>
                    <td className="py-3.5 px-3 font-mono font-bold text-gray-900">
                      {loc.postcode}
                    </td>
                    <td className="py-3.5 px-3 text-gray-600">
                      {loc.primaryRoads}
                    </td>
                    <td className="py-3.5 px-3 font-bold text-emerald-700">
                      {loc.deploymentEstimate}
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border border-emerald-200">
                        {loc.statusLabel}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Borough Sectors Verification Notice */}
          <div className="mt-6 pt-5 border-t border-gray-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-200/80">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-700">
                <AlertTriangle size={15} />
                <span>Southern &amp; Eastern Guildford Borough Parishes</span>
              </div>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                Rural areas (such as Shalford, Chilworth, Albury, Shere, Ripley, Send, and Horsley) are not listed as confirmed operational bases. Live dispatch availability is confirmed individually via our postcode checker.
              </p>
            </div>
            <a
              href="#postcode-checker"
              className="inline-flex items-center gap-1.5 bg-gray-900 hover:bg-[#FB7E10] text-white px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shrink-0 whitespace-nowrap"
            >
              <span>Check Any Postcode</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};

export default GuildfordCorridors;
