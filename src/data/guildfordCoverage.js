/**
 * Guildford Borough Geographic & Operational Coverage Database
 * Authoritative single source of truth for:
 * - Guildford Borough Coverage Section
 * - Interactive Google Maps & Coverage Table
 * - Local Schema.org Structured Data
 * 
 * STRICT RULES:
 * Only confirmed operational locations from MTC published operational records
 * are marked as active customer coverage.
 * Ash Vale and Aldershot are NOT shown as Guildford Borough customer coverage.
 * (Aldershot is strictly the external operational dispatch hub in Hampshire).
 */

export const GUILDFORD_HUB = {
  name: 'Aldershot Operating Hub',
  shortName: 'Aldershot HQ',
  region: 'Hampshire',
  postcode: 'GU11',
  lat: 51.2484,
  lng: -0.7560,
  isHub: true,
  role: 'Central Dispatch Hub & Inventory Depot (External Operating Base)',
  distanceToGuildfordMiles: 8.1,
  responseTime: '20–40 min deployment',
  address: 'Grosvenor Road, Aldershot, GU11 3HY',
};

/**
 * Confirmed Operational Customer Locations in Guildford Borough.
 * Strictly limited to verified Guildford Borough operational locations.
 * Neither Ash Vale nor Aldershot is included as Guildford Borough customer coverage.
 */
export const GUILDFORD_CONFIRMED_LOCATIONS = [
  {
    id: 'guildford-central',
    name: 'Guildford',
    boroughSector: 'Central Guildford',
    postcode: 'GU1',
    fullPostcodeExample: 'GU1 4YT',
    lat: 51.2362,
    lng: -0.5704,
    dir: 'right',
    status: 'Operational',
    statusLabel: 'Confirmed Operational',
    deploymentEstimate: '20–40 minutes',
    primaryRoads: 'A3, A31 (Hog\'s Back), A281, A322',
    description: 'Guildford town centre, retail parks, commercial districts and central residential areas.',
    coverageType: 'Borough Centre & Key Transport Hub',
    primary: true,
  },
  {
    id: 'ash',
    name: 'Ash',
    boroughSector: 'Western Guildford Borough',
    postcode: 'GU12',
    fullPostcodeExample: 'GU12 6DP',
    lat: 51.2526,
    lng: -0.7180,
    dir: 'top',
    status: 'Operational',
    statusLabel: 'Confirmed Operational',
    deploymentEstimate: '20–40 minutes',
    primaryRoads: 'A323, A31, A331',
    description: 'Ash village, residential areas, and business zones along the western borough border.',
    coverageType: 'Western Borough Community',
    primary: true,
  },
  {
    id: 'tongham',
    name: 'Tongham',
    boroughSector: 'Western Guildford Borough',
    postcode: 'GU10',
    fullPostcodeExample: 'GU10 1AA',
    lat: 51.2380,
    lng: -0.7300,
    dir: 'bottom',
    status: 'Operational',
    statusLabel: 'Confirmed Operational',
    deploymentEstimate: '20–40 minutes',
    primaryRoads: 'A31 (Hog\'s Back), A331 Interchange',
    description: 'Tongham village and immediate surrounds at the foot of the Hog\'s Back.',
    coverageType: 'Western Road Corridor & Junction',
    primary: true,
  },
];

/**
 * Geographic Borough Sectors Classification
 * Fulfills the requirement to organize the borough into 5 geographic zones:
 * - Central Guildford
 * - Western Guildford
 * - Northern Guildford
 * - Southern Guildford
 * - Eastern Guildford
 */
export const GUILDFORD_BOROUGH_SECTORS = [
  {
    id: 'central',
    sector: 'Central Guildford',
    headline: 'Guildford Town & Central Urban Core',
    status: 'Confirmed Operational',
    confirmedLocations: [
      {
        name: 'Guildford',
        postcode: 'GU1',
        responseTime: '20–40 min arrival',
        keyAreas: 'Guildford Town Centre, Guildford Station, Commercial Core',
      },
    ],
    primaryRoads: 'A3, A31 (Hog\'s Back), A281, A322',
    unconfirmedCandidates: [
      { name: 'Burpham', postcode: 'GU4', note: 'Subject to live postcode validation' },
      { name: 'Merrow', postcode: 'GU1/GU4', note: 'Subject to live postcode validation' },
      { name: 'Stoughton', postcode: 'GU2', note: 'Subject to live postcode validation' },
      { name: 'Onslow Village', postcode: 'GU2', note: 'Subject to live postcode validation' },
      { name: 'Park Barn', postcode: 'GU2', note: 'Subject to live postcode validation' },
      { name: 'Westborough', postcode: 'GU2', note: 'Subject to live postcode validation' },
      { name: 'Bellfields', postcode: 'GU1', note: 'Subject to live postcode validation' },
      { name: 'Slyfield', postcode: 'GU1', note: 'Subject to live postcode validation' },
      { name: 'Jacobs Well', postcode: 'GU4', note: 'Subject to live postcode validation' },
      { name: 'Wood Street Village', postcode: 'GU3', note: 'Subject to live postcode validation' },
      { name: 'Fairlands', postcode: 'GU3', note: 'Subject to live postcode validation' },
    ],
    summary: 'Guildford (GU1) is an active operational service zone with typical 20–40 min deployment from our Aldershot dispatch hub. Surrounding central residential neighbourhoods are serviced based on technician proximity and validated via our live postcode tool.',
  },
  {
    id: 'western',
    sector: 'Western Guildford',
    headline: 'Western Corridor (A31 / A331 / Hog\'s Back)',
    status: 'Confirmed Operational',
    confirmedLocations: [
      {
        name: 'Ash',
        postcode: 'GU12',
        responseTime: '20–40 min arrival',
        keyAreas: 'Ash Village, Ash Hill, Ash Common',
      },
      {
        name: 'Tongham',
        postcode: 'GU10',
        responseTime: '20–40 min arrival',
        keyAreas: 'Tongham Village, Poyle Road, A31 Interchange',
      },
    ],
    primaryRoads: 'A31, A331, A323',
    unconfirmedCandidates: [
      { name: 'Seale', postcode: 'GU10', note: 'Verification required' },
      { name: 'Wanborough', postcode: 'GU3', note: 'Verification required' },
      { name: 'Puttenham', postcode: 'GU3', note: 'Verification required' },
    ],
    summary: 'Ash and Tongham enjoy priority dispatch from our central hub with typical response times of 20–40 minutes.',
  },
  {
    id: 'northern',
    sector: 'Northern Guildford',
    headline: 'Northern Borough Corridor & Rural Parishes',
    status: 'Coverage Under Review / Verification Required',
    confirmedLocations: [],
    primaryRoads: 'A331, B3012, A323',
    unconfirmedCandidates: [
      { name: 'Ash Vale', postcode: 'GU12', note: 'Verification required' },
      { name: 'Worplesdon', postcode: 'GU3', note: 'Verification required' },
      { name: 'Normandy', postcode: 'GU3', note: 'Verification required' },
      { name: 'Pirbright', postcode: 'GU24', note: 'Verification required' },
      { name: 'Compton', postcode: 'GU3', note: 'Verification required' },
      { name: 'Ash Green', postcode: 'GU12', note: 'Verification required' },
    ],
    summary: 'Northern Guildford Borough parishes are not pre-set as confirmed customer operational coverage. Service availability is verified on request via our postcode lookup tool.',
  },
  {
    id: 'southern',
    sector: 'Southern Guildford',
    headline: 'Southern Borough & Surrey Hills Boundary',
    status: 'Coverage Under Review / Verification Required',
    confirmedLocations: [],
    primaryRoads: 'A281, A25, B2128',
    unconfirmedCandidates: [
      { name: 'Shalford', postcode: 'GU4', note: 'Verification required' },
      { name: 'Chilworth', postcode: 'GU4', note: 'Verification required' },
      { name: 'Albury', postcode: 'GU5', note: 'Verification required' },
      { name: 'Shere', postcode: 'GU5', note: 'Verification required' },
      { name: 'Bramley', postcode: 'GU5', note: 'Border area (Waverley) - verification required' },
      { name: 'Wonersh', postcode: 'GU5', note: 'Border area (Waverley) - verification required' },
      { name: 'Shamley Green', postcode: 'GU5', note: 'Border area (Waverley) - verification required' },
    ],
    summary: 'Southern Guildford Borough locations are currently not listed as active operational bases. Serviceability is assessed on request depending on mobile technician availability.',
  },
  {
    id: 'eastern',
    sector: 'Eastern Guildford',
    headline: 'Eastern Parishes & M25 / A3 Approaches',
    status: 'Coverage Under Review / Verification Required',
    confirmedLocations: [],
    primaryRoads: 'A3, A246, A247',
    unconfirmedCandidates: [
      { name: 'East Clandon', postcode: 'GU4', note: 'Verification required' },
      { name: 'West Clandon', postcode: 'GU4', note: 'Verification required' },
      { name: 'Ripley', postcode: 'GU23', note: 'Verification required' },
      { name: 'Send', postcode: 'GU23', note: 'Verification required' },
      { name: 'Ockham', postcode: 'GU23', note: 'Verification required' },
      { name: 'Wisley', postcode: 'GU23', note: 'Verification required' },
      { name: 'East Horsley', postcode: 'KT24', note: 'Verification required' },
      { name: 'West Horsley', postcode: 'KT24', note: 'Verification required' },
      { name: 'Effingham', postcode: 'KT24', note: 'Verification required' },
    ],
    summary: 'Eastern Guildford Borough rural villages are not pre-confirmed as guaranteed operational zones. Enter your postcode in our availability tool or call 0207 101 3856 for immediate verification.',
  },
];

/**
 * Key transport corridors serving Guildford Borough
 */
export const GUILDFORD_ROAD_CORRIDORS = [
  {
    road: 'A3 Corridor',
    coverage: 'Guildford bypass, University, Cathedral turn-off, Burpham slip roads',
    service: 'Rapid roadside emergency assistance & mobile breakdown tyre fitting',
  },
  {
    road: 'A31 (Hog\'s Back)',
    coverage: 'Connecting Aldershot Hub -> Tongham -> Guildford Town Centre',
    service: 'Primary rapid-transit dispatch artery (20–30 min typical arrival)',
  },
  {
    road: 'A331 Corridor',
    coverage: 'Ash junction, Blackwater Valley route and western borough approaches',
    service: 'Dual carriageway mobile tyre patrol & roadside recovery',
  },
  {
    road: 'A281 / A322 Corridors',
    coverage: 'Guildford south/north approaches and commercial trading estates',
    service: 'Scheduled residential and business car park tyre installations',
  },
];
