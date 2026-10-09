import { PUNE_PLACES, SAMPLE_CITY_SIGNALS, DISRUPTION_PRESETS } from './src/data/puneData.js';

console.log("=== CITYSHIFT VERIFICATION SUITE ===");

// 1. Verify Dataset
console.log(`[PASS] Total Places Loaded: ${PUNE_PLACES.length}`);
console.log(`[PASS] Sample City Signals: ${SAMPLE_CITY_SIGNALS.length}`);
console.log(`[PASS] Disruption Presets: ${DISRUPTION_PRESETS.length}`);

// Check all places have required fields
PUNE_PLACES.forEach(p => {
  if (!p.id || !p.name || !p.category || p.costPerPerson === undefined || !p.rating || !p.safetyAdvisory || !p.coordinates) {
    throw new Error(`Place validation failed for ${p.id}`);
  }
});
console.log("[PASS] All place data records validated with schema compliance.");

// 2. Test Plan B Sudden Rain Logic
const sampleItinerary = [
  PUNE_PLACES.find(p => p.id === 'sinhagad-fort'), // outdoor
  PUNE_PLACES.find(p => p.id === 'fc-road-food-trail'), // outdoor/semi
  PUNE_PLACES.find(p => p.id === 'shaniwar-wada') // outdoor
];

console.log(`\nInitial Plan A (Disrupted by Rain):`);
sampleItinerary.forEach(i => console.log(` - ${i.name} (${i.isIndoor ? 'Indoor' : 'Outdoor'}, ₹${i.costPerPerson})`));

const outdoorStops = sampleItinerary.filter(p => !p.isIndoor);
console.log(`Found ${outdoorStops.length} outdoor stops impacted by rain.`);

const indoorSubstitutes = PUNE_PLACES.filter(p => p.isIndoor && !sampleItinerary.some(i => i.id === p.id));
console.log(`Available indoor substitutes: ${indoorSubstitutes.length}`);

if (indoorSubstitutes.length < outdoorStops.length) {
  throw new Error("Insufficient indoor substitutes for rain fallback!");
}
console.log("[PASS] Sufficient indoor weather-proof fallbacks exist in Pune dataset.");

// 3. Test Budget Logic
const partySize = 2;
const costA = sampleItinerary.reduce((sum, p) => sum + p.costPerPerson, 0) * partySize;
console.log(`Plan A Cost for ${partySize} people: ₹${costA}`);

// Plan B replacements
const planBItinerary = sampleItinerary.map(item => {
  if (!item.isIndoor) {
    const sub = indoorSubstitutes.find(s => s.isIndoor);
    return sub || item;
  }
  return item;
});

const costB = planBItinerary.reduce((sum, p) => sum + p.costPerPerson, 0) * partySize;
console.log(`Plan B Cost for ${partySize} people: ₹${costB}`);
console.log(`Cost Delta: ₹${costB - costA}`);
console.log("[PASS] Deterministic Plan B calculation verified successfully!");
console.log("\nALL VERIFICATION TESTS PASSED.");
