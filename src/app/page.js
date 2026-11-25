import React from 'react';
import LandingHeader from '@/components/landing/LandingHeader';
import LandingTrustBar from '@/components/landing/LandingTrustBar';
import LandingMobileStickyBar from '@/components/landing/LandingMobileStickyBar';
import LandingWhatsAppFloat from '@/components/landing/LandingWhatsAppFloat';

import GuildfordHero from '@/components/landing/guildford/GuildfordHero';
import GuildfordPostcodeChecker from '@/components/landing/guildford/GuildfordPostcodeChecker';
import GuildfordWhyGarage from '@/components/landing/guildford/GuildfordWhyGarage';
import GuildfordHowItWorks from '@/components/landing/guildford/GuildfordHowItWorks';
import GuildfordCoverage from '@/components/landing/guildford/GuildfordCoverage';
import GuildfordCorridors from '@/components/landing/guildford/GuildfordCorridors';
import GuildfordReviews from '@/components/landing/guildford/GuildfordReviews';
import GuildfordQuoteForm from '@/components/landing/guildford/GuildfordQuoteForm';
import GuildfordFAQ from '@/components/landing/guildford/GuildfordFAQ';
import { GUILDFORD_FAQS } from '@/data/guildfordFaqs';
import GuildfordFinalCTA from '@/components/landing/guildford/GuildfordFinalCTA';
import GuildfordFooter from '@/components/landing/guildford/GuildfordFooter';

export const SITE_URL = 'https://mobiletyrechampions.com/';

export const metadata = {
  title: 'Mobile Tyre Fitting Guildford | 24/7 Emergency Tyre Assistance',
  description:
    'Need mobile tyre fitting in Guildford? Mobile Tyre Champions provides tyre replacement, puncture assistance and emergency mobile tyre services across confirmed Guildford-area service zones.',
  keywords: [
    'Mobile Tyre Fitting Guildford',
    'Mobile Tyre Replacement Guildford',
    'Emergency Tyre Fitting Guildford',
    'Mobile Tyre Repair Guildford',
    '24/7 Mobile Tyre Assistance Guildford',
    'Mobile Tyre Fitting GU1',
    'Mobile Tyre Fitting Ash',
    'Mobile Tyre Fitting Tongham',
  ].join(', '),
  openGraph: {
    title: 'Mobile Tyre Fitting Guildford | 24/7 Emergency Tyre Assistance',
    description:
      'Need mobile tyre fitting in Guildford? Mobile Tyre Champions provides tyre replacement, puncture assistance and emergency mobile tyre services across confirmed Guildford-area service zones.',
    url: SITE_URL,
    siteName: 'Mobile Tyre Champions',
    images: [
      {
        url: 'https://mobiletyrechampions.com/images/mobile-tyre-champions-van1.webp',
        width: 1200,
        height: 630,
        alt: 'Mobile Tyre Champions 24/7 Mobile Tyre Fitting Van in Guildford',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const guildfordHomepageSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AutoRepair',
      '@id': `${SITE_URL}#business`,
      name: 'Mobile Tyre Champions - Mobile Tyre Fitting Guildford',
      url: SITE_URL,
      logo: 'https://mobiletyrechampions.com/images/MTC%20logo%202.webp',
      image: 'https://mobiletyrechampions.com/images/mobile-tyre-champions-van1.webp',
      telephone: '+44-207-101-3856',
      email: 'info@mobiletyrechampions.com',
      description:
        '24/7 emergency mobile tyre fitting, puncture repairs and roadside tyre assistance across confirmed operational zones in Guildford Borough.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Grosvenor Road',
        addressLocality: 'Aldershot',
        addressRegion: 'Hampshire',
        postalCode: 'GU11 3HY',
        addressCountry: 'GB',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 51.2362,
        longitude: -0.5704,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '00:00',
          closes: '23:59',
        },
      ],
      areaServed: [
        { '@type': 'AdministrativeArea', name: 'Guildford Borough' },
        { '@type': 'AdministrativeArea', name: 'Surrey' },
        { '@type': 'Place', name: 'Guildford' },
        { '@type': 'Place', name: 'Ash' },
        { '@type': 'Place', name: 'Tongham' },
      ],
      priceRange: '££',
    },
    {
      '@type': 'Service',
      '@id': `${SITE_URL}#service`,
      name: 'Mobile Tyre Fitting Guildford',
      serviceType: 'Emergency Mobile Tyre Fitting, Puncture Repair & Replacement',
      provider: {
        '@id': `${SITE_URL}#business`,
      },
      areaServed: {
        '@type': 'AdministrativeArea',
        name: 'Guildford Borough',
      },
      description:
        'Rapid mobile tyre fitting and emergency roadside assistance in Guildford, Ash, and Tongham with typical 20–40 min deployment from our central Aldershot hub.',
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}#faq`,
      mainEntity: GUILDFORD_FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: SITE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Mobile Tyre Fitting Guildford',
          item: SITE_URL,
        },
      ],
    },
  ],
};

export default function RootHomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-['Outfit'] selection:bg-[#FB7E10] selection:text-white">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(guildfordHomepageSchema) }}
      />

      {/* 1. Header (24/7 status strip + in-page navigation anchors + Call CTA) */}
      <LandingHeader />

      {/* 1. Hero — Guildford Emergency Response */}
      <GuildfordHero />

      {/* 2. Emergency Status / Trust Strip */}
      <LandingTrustBar />

      {/* 3. Primary Postcode Conversion Section */}
      <GuildfordPostcodeChecker />

      {/* 4. Why Drive to a Garage Visual Comparison */}
      <GuildfordWhyGarage />

      {/* 5. Three-Step Process */}
      <GuildfordHowItWorks />

      {/* 6. Guildford Borough Coverage Areas (5 Geographic Sectors) */}
      <GuildfordCoverage />

      {/* 7. Guildford-Centred Interactive Map & Table Directory */}
      <GuildfordCorridors />

      {/* 8. Genuine Verified Customer Reviews */}
      <GuildfordReviews />

      {/* 9. Guildford Quote & Callback Request Form */}
      <GuildfordQuoteForm />

      {/* 10. Guildford Frequently Asked Questions */}
      <GuildfordFAQ />

      {/* 11. Final Emergency Call & WhatsApp CTA */}
      <GuildfordFinalCTA />

      {/* 12. Footer with Guildford Location Links */}
      <GuildfordFooter />

      {/* 13. Mobile Sticky Bottom Conversion Bar */}
      <LandingMobileStickyBar />

      {/* 14. Floating WhatsApp Chat Button */}
      <LandingWhatsAppFloat />
    </div>
  );
}
