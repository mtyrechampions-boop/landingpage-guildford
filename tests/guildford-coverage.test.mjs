import test from 'node:test';
import assert from 'node:assert/strict';

import {
  GUILDFORD_HUB,
  GUILDFORD_CONFIRMED_LOCATIONS,
  GUILDFORD_BOROUGH_SECTORS,
} from '../src/data/guildfordCoverage.js';
import { GUILDFORD_FAQS } from '../src/data/guildfordFaqs.js';
import { isListedDistrict, assessCoverage } from '../src/lib/coverage.js';
import { parsePostcode } from '../src/lib/postcode.js';

test('Guildford operational database contains confirmed locations only', () => {
  const confirmedNames = GUILDFORD_CONFIRMED_LOCATIONS.map((l) => l.name);
  assert.deepEqual(confirmedNames.sort(), ['Ash', 'Guildford', 'Tongham'].sort());
  assert.ok(!confirmedNames.includes('Ash Vale'), 'Ash Vale is not shown as Guildford Borough customer coverage');
  assert.ok(!confirmedNames.includes('Aldershot'), 'Aldershot is not shown as Guildford Borough customer coverage');

  for (const loc of GUILDFORD_CONFIRMED_LOCATIONS) {
    assert.equal(loc.status, 'Operational');
    assert.equal(loc.deploymentEstimate, '20–40 minutes');
    assert.ok(loc.lat > 51 && loc.lat < 52, `latitude for ${loc.name} is sane`);
    assert.ok(loc.lng < 0 && loc.lng > -1.5, `longitude for ${loc.name} is sane`);

    // Verify district is on MTC's operational list
    const parsed = parsePostcode(loc.postcode);
    assert.ok(parsed, `postcode ${loc.postcode} parses`);
    assert.ok(isListedDistrict(parsed.outcode), `${parsed.outcode} is in listed districts`);
  }
});

test('Guildford borough sectors structure contains all 5 required geographic zones', () => {
  const sectorNames = GUILDFORD_BOROUGH_SECTORS.map((s) => s.sector);
  assert.ok(sectorNames.includes('Central Guildford'));
  assert.ok(sectorNames.includes('Northern Guildford'));
  assert.ok(sectorNames.includes('Southern Guildford'));
  assert.ok(sectorNames.includes('Eastern Guildford'));
  assert.ok(sectorNames.includes('Western Guildford'));

  // Ensure Southern and Eastern sectors are explicitly not confirmed
  const southern = GUILDFORD_BOROUGH_SECTORS.find((s) => s.sector === 'Southern Guildford');
  const eastern = GUILDFORD_BOROUGH_SECTORS.find((s) => s.sector === 'Eastern Guildford');
  assert.equal(southern.confirmedLocations.length, 0);
  assert.equal(eastern.confirmedLocations.length, 0);
  assert.equal(southern.status, 'Coverage Under Review / Verification Required');
  assert.equal(eastern.status, 'Coverage Under Review / Verification Required');
});

test('Guildford FAQs are complete, non-empty and structured', () => {
  assert.ok(GUILDFORD_FAQS.length >= 10, 'At least 10 FAQs provided');
  for (const faq of GUILDFORD_FAQS) {
    assert.ok(faq.q && faq.q.length > 5, 'FAQ question is valid');
    assert.ok(faq.a && faq.a.length > 20, 'FAQ answer is valid');
  }
});

test('Central dispatch hub is Aldershot and distances to Guildford are within operational reach', () => {
  assert.equal(GUILDFORD_HUB.postcode, 'GU11');
  const coverageGuildford = assessCoverage({
    outcode: 'GU1',
    lat: GUILDFORD_CONFIRMED_LOCATIONS.find((l) => l.name === 'Guildford').lat,
    lng: GUILDFORD_CONFIRMED_LOCATIONS.find((l) => l.name === 'Guildford').lng,
  });
  assert.equal(coverageGuildford.status, 'covered');
  assert.ok(coverageGuildford.distanceMiles < 12, 'Guildford is under 12 miles from Aldershot hub');
});
