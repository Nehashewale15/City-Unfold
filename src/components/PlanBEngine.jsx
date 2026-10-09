import React, { useState, useMemo } from 'react';
import { 
  CloudRain, AlertOctagon, DoorClosed, Wallet, ArrowRight, 
  CheckCircle, RefreshCw, Sparkles, AlertTriangle, ShieldCheck, 
  Clock, IndianRupee, MapPin, Trash2, Plus, Info 
} from 'lucide-react';
import { PUNE_PLACES, DISRUPTION_PRESETS } from '../data/puneData';

export default function PlanBEngine({ 
  itinerary, 
  setItinerary, 
  budget, 
  setBudget, 
  partySize, 
  setPartySize,
  onOpenExplore 
}) {
  const [activeDisruption, setActiveDisruption] = useState(null);
  const [appliedNotice, setAppliedNotice] = useState(null);

  // Compute total cost
  const totalCost = useMemo(() => {
    const perPersonSum = itinerary.reduce((acc, item) => acc + (item.costPerPerson || 0), 0);
    return perPersonSum * partySize;
  }, [itinerary, partySize]);

  // Remaining budget
  const budgetRemaining = budget - totalCost;

  // Plan B Recommendation Engine (Deterministic Logic)
  const planBAnalysis = useMemo(() => {
    if (!activeDisruption || itinerary.length === 0) {
      return null;
    }

    let impactedItems = [];
    let replacements = [];
    let disruptionSummary = '';
    let totalSavings = 0;
    let timeDeltaDescription = '';

    if (activeDisruption === 'sudden-rain') {
      // Find all outdoor places
      impactedItems = itinerary.filter(p => !p.isIndoor);
      
      if (impactedItems.length === 0) {
        disruptionSummary = "Monsoon downpour active. Outstanding planning! All destinations in your outing are already 100% weather-proof indoor venues.";
        timeDeltaDescription = "Zero rain disruption. Your current itinerary enjoys complete indoor shelter.";
      } else {
        disruptionSummary = `Monsoon downpour detected. ${impactedItems.length} outdoor attraction(s) present severe slip, rain, and mud risks.`;
        timeDeltaDescription = "Eliminates rain hazard & provides 100% dry climate-controlled indoor shelter.";

        // Find best indoor substitutes
        impactedItems.forEach(impacted => {
          const candidate = PUNE_PLACES.find(p => 
            p.isIndoor && 
            !itinerary.some(item => item.id === p.id) &&
            !replacements.some(r => r.id === p.id)
          ) || PUNE_PLACES.find(p => p.id === 'kelkar-museum');

          if (candidate) {
            const costDiff = (candidate.costPerPerson - impacted.costPerPerson) * partySize;
            totalSavings += (costDiff < 0 ? Math.abs(costDiff) : -costDiff);

            replacements.push({
              original: impacted,
              replacement: candidate,
              reason: `Replaces outdoor ${impacted.name} with ${candidate.name}: 100% weather-proof indoor halls with high cultural rating (★${candidate.rating}).`,
              costDiff: costDiff
            });
          }
        });
      }
    } 
    else if (activeDisruption === 'traffic-gridlock') {
      disruptionSummary = "Severe gridlock on outer highways (+45 to 60 mins transit delay).";
      timeDeltaDescription = "Saves ~45 minutes travel time by switching to central transit-connected spots.";

      // Target outskirts or eastern hubs
      impactedItems = itinerary.filter(p => p.neighborhood.includes('Outskirts') || p.neighborhood.includes('Eastern'));
      if (impactedItems.length === 0 && itinerary.length > 0) {
        impactedItems = [itinerary[itinerary.length - 1]];
      }

      impactedItems.forEach(impacted => {
        const candidate = PUNE_PLACES.find(p => 
          (p.neighborhood.includes('Central') || p.neighborhood.includes('Shivajinagar') || p.neighborhood.includes('Deccan')) &&
          !itinerary.some(item => item.id === p.id) &&
          !replacements.some(r => r.id === p.id)
        ) || PUNE_PLACES.find(p => p.id === 'pataleshwar-caves');

        if (candidate) {
          const costDiff = (candidate.costPerPerson - impacted.costPerPerson) * partySize;
          totalSavings += (costDiff < 0 ? Math.abs(costDiff) : -costDiff);

          replacements.push({
            original: impacted,
            replacement: candidate,
            reason: `Replaces distant ${impacted.name} with ${candidate.name}: Located directly in central Pune with direct Metro connectivity.`,
            costDiff: costDiff
          });
        }
      });
    }
    else if (activeDisruption === 'place-closed') {
      disruptionSummary = "Venue unexpectedly inaccessible due to unscheduled maintenance.";
      timeDeltaDescription = "0 min scheduling loss; seamless neighborhood switch.";

      // Target first item
      impactedItems = [itinerary[0]];
      const impacted = itinerary[0];

      const candidate = PUNE_PLACES.find(p => 
        p.id !== impacted.id && 
        (p.category === impacted.category || p.rating >= 4.5) &&
        !itinerary.some(item => item.id === p.id)
      ) || PUNE_PLACES.find(p => p.id === 'aga-khan-palace');

      if (candidate) {
        const costDiff = (candidate.costPerPerson - impacted.costPerPerson) * partySize;
        totalSavings += (costDiff < 0 ? Math.abs(costDiff) : -costDiff);

        replacements.push({
          original: impacted,
          replacement: candidate,
          reason: `Replaces ${impacted.name} with ${candidate.name}: Premium rated counterpart with similar historical and cultural depth.`,
          costDiff: costDiff
        });
      }
    }
    else if (activeDisruption === 'budget-crunch') {
      disruptionSummary = "Budget optimization triggered to maximize savings without sacrificing experience.";
      timeDeltaDescription = "Saves significant costs with high-rated budget & free heritage gems.";

      // Sort by cost descending to find priciest
      const sortedByCost = [...itinerary].sort((a, b) => b.costPerPerson - a.costPerPerson);
      impactedItems = sortedByCost.slice(0, 2).filter(p => p.costPerPerson > 100);
      if (impactedItems.length === 0 && itinerary.length > 0) {
        impactedItems = [itinerary[0]];
      }

      impactedItems.forEach(impacted => {
        const candidate = PUNE_PLACES.find(p => 
          p.costPerPerson < impacted.costPerPerson &&
          !itinerary.some(item => item.id === p.id) &&
          !replacements.some(r => r.id === p.id)
        ) || PUNE_PLACES.find(p => p.id === 'pataleshwar-caves');

        if (candidate) {
          const costDiff = (candidate.costPerPerson - impacted.costPerPerson) * partySize;
          totalSavings += Math.abs(costDiff);

          replacements.push({
            original: impacted,
            replacement: candidate,
            reason: `Replaces higher cost ${impacted.name} (₹${impacted.costPerPerson}) with ${candidate.name} (₹${candidate.costPerPerson}): High value city gem.`,
            costDiff: costDiff
          });
        }
      });
    }

    // Build the projected Plan B itinerary
    const revisedItinerary = itinerary.map(item => {
      const match = replacements.find(r => r.original.id === item.id);
      return match ? match.replacement : item;
    });

    const revisedCost = revisedItinerary.reduce((acc, p) => acc + (p.costPerPerson || 0), 0) * partySize;

    return {
      disruptionSummary,
      timeDeltaDescription,
      impactedItems,
      replacements,
      revisedItinerary,
      revisedCost,
      costDelta: revisedCost - totalCost
    };
  }, [activeDisruption, itinerary, partySize, totalCost]);

  // Handler to apply the revised Plan B
  const handleApplyPlanB = () => {
    if (!planBAnalysis) return;
    
    setItinerary(planBAnalysis.revisedItinerary);
    setAppliedNotice({
      title: "Plan B Applied Successfully!",
      message: `Your itinerary was updated with ${planBAnalysis.replacements.length} optimized stop(s). ${planBAnalysis.costDelta < 0 ? `Saved approx ₹${Math.abs(planBAnalysis.costDelta)}` : planBAnalysis.costDelta > 0 ? `Added ₹${planBAnalysis.costDelta}` : 'Budget neutral'}.`
    });
    setActiveDisruption(null);

    setTimeout(() => {
      setAppliedNotice(null);
    }, 6000);
  };

  // Remove single item from itinerary
  const handleRemoveItem = (id) => {
    setItinerary(itinerary.filter(item => item.id !== id));
  };

  return (
    <div className="plan-b-engine-wrapper">
      {/* Header Banner */}
      <div className="plan-b-header-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div className="plan-b-header-title">
              Smart Plan B Engine 
              <span className="plan-b-tag">Autonomous Rescheduling</span>
            </div>
            <p className="plan-b-header-desc">
              When city chaos strikes (cloudbursts, Pune traffic jams, or budget constraints), 
              the Plan B Engine automatically re-optimizes your outing with intelligent, vetted alternatives.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button 
              onClick={() => {
                // Preload a diverse default Pune itinerary if empty
                setItinerary([
                  PUNE_PLACES.find(p => p.id === 'sinhagad-fort'),
                  PUNE_PLACES.find(p => p.id === 'fc-road-food-trail'),
                  PUNE_PLACES.find(p => p.id === 'shaniwar-wada')
                ]);
              }}
              style={{
                padding: '0.55rem 1rem',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#cbd5e1',
                fontSize: '0.8rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <RefreshCw size={14} /> Load Pune Outing Preset
            </button>
          </div>
        </div>

        {/* Outing Controls: Budget & Party Size */}
        <div className="outing-controls-grid">
          <div className="control-group">
            <div className="control-label">
              <span>Target Budget (₹)</span>
              <strong>₹{budget.toLocaleString()}</strong>
            </div>
            <input 
              type="range" 
              min="200" 
              max="6000" 
              step="100" 
              value={budget} 
              onChange={(e) => setBudget(Number(e.target.value))}
              className="range-slider"
            />
          </div>

          <div className="control-group">
            <div className="control-label">
              <span>Party Size</span>
              <strong>{partySize} {partySize === 1 ? 'Person' : 'People'}</strong>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {[1, 2, 4, 6].map(num => (
                <button
                  key={num}
                  onClick={() => setPartySize(num)}
                  style={{
                    flex: 1,
                    padding: '0.4rem',
                    borderRadius: '6px',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    background: partySize === num ? '#6366f1' : 'rgba(255,255,255,0.06)',
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  {num}P
                </button>
              ))}
            </div>
          </div>

          <div className="control-group">
            <div className="control-label">
              <span>Total Estimated Outing</span>
              <strong style={{ color: totalCost > budget ? '#ef4444' : '#10b981' }}>
                ₹{totalCost.toLocaleString()}
              </strong>
            </div>
            <div style={{ fontSize: '0.75rem', color: totalCost > budget ? '#fca5a5' : '#94a3b8' }}>
              {totalCost > budget ? (
                <>⚠️ Exceeds budget by ₹{(totalCost - budget).toLocaleString()}</>
              ) : (
                <>✅ ₹{budgetRemaining.toLocaleString()} remaining in budget</>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Success Notification after applying Plan B */}
      {appliedNotice && (
        <div style={{
          background: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          borderRadius: '12px',
          padding: '1rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          color: '#6ee7b7'
        }}>
          <CheckCircle size={22} />
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{appliedNotice.title}</div>
            <div style={{ fontSize: '0.84rem', color: '#cbd5e1' }}>{appliedNotice.message}</div>
          </div>
        </div>
      )}

      {/* Disruption Trigger Deck */}
      <div className="disruption-trigger-box">
        <div className="disruption-deck-title">
          <Sparkles size={18} color="#f59e0b" />
          <span>Interactive Disruption Simulation Console</span>
          <span style={{ 
            fontSize: '0.68rem', 
            background: 'rgba(245, 158, 11, 0.2)', 
            color: '#fbbf24', 
            padding: '0.15rem 0.5rem', 
            borderRadius: '999px',
            fontWeight: 700 
          }}>
            Demo Testing Control
          </span>
        </div>
        <p className="disruption-deck-desc">
          Click any condition below to trigger a simulated city disruption and test the Plan B Engine's autonomous recalculation.
        </p>

        <div className="disruption-buttons-grid">
          {DISRUPTION_PRESETS.map((preset) => {
            const isActive = activeDisruption === preset.id;
            const IconComponent = 
              preset.id === 'sudden-rain' ? CloudRain :
              preset.id === 'traffic-gridlock' ? AlertOctagon :
              preset.id === 'place-closed' ? DoorClosed : Wallet;

            return (
              <button
                key={preset.id}
                onClick={() => setActiveDisruption(isActive ? null : preset.id)}
                className={`disruption-btn ${isActive ? 'active' : ''}`}
              >
                <div className="disruption-btn-top">
                  <IconComponent size={20} color={isActive ? '#818cf8' : '#cbd5e1'} />
                  <span>{preset.label}</span>
                </div>
                <div className="disruption-btn-desc">
                  {preset.description}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Empty State if no itinerary items */}
      {itinerary.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '3rem 1.5rem',
          background: 'rgba(19, 29, 51, 0.5)',
          borderRadius: '16px',
          border: '1px dashed rgba(255, 255, 255, 0.15)'
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🗺️</div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Your Outing Plan is Empty</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', maxWidth: '480px', margin: '0 auto 1.5rem' }}>
            Add places from the Explore view or load our Pune sample outing to test the Smart Plan B Engine.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
            <button 
              onClick={onOpenExplore}
              className="nav-cta-btn"
            >
              Explore Pune Places
            </button>
            <button 
              onClick={() => {
                setItinerary([
                  PUNE_PLACES.find(p => p.id === 'sinhagad-fort'),
                  PUNE_PLACES.find(p => p.id === 'fc-road-food-trail'),
                  PUNE_PLACES.find(p => p.id === 'shaniwar-wada')
                ]);
              }}
              style={{
                padding: '0.55rem 1.1rem',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#fff',
                fontWeight: 600,
                fontSize: '0.85rem'
              }}
            >
              ⚡ Load Sample Itinerary
            </button>
          </div>
        </div>
      ) : (
        /* Plan Comparison: Plan A vs Plan B Resolution */
        <div className="plan-b-resolution-panel">
          {/* Plan A (Current / Disrupted) */}
          <div className="plan-column-card">
            <div className="plan-column-header">
              <div className="plan-title-wrap">
                <span style={{ fontSize: '1.2rem' }}>📍</span>
                <div>
                  <div className="plan-title">Plan A (Current Outing)</div>
                  <div style={{ fontSize: '0.76rem', color: '#94a3b8' }}>
                    {itinerary.length} Stop(s) • Total est: ₹{totalCost.toLocaleString()}
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setItinerary([])}
                style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                title="Clear itinerary"
              >
                <Trash2 size={13} /> Clear
              </button>
            </div>

            {/* If Disruption Active */}
            {activeDisruption && planBAnalysis && (
              <div className="disruption-callout">
                <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong>Condition Triggered:</strong> {planBAnalysis.disruptionSummary}
                  <div style={{ marginTop: '0.3rem', fontSize: '0.76rem', opacity: 0.9 }}>
                    Impacted: {planBAnalysis.impactedItems.map(i => i.name).join(', ')}
                  </div>
                </div>
              </div>
            )}

            {/* List of current itinerary items */}
            <div className="itinerary-items-stack">
              {itinerary.map((item, idx) => {
                const isImpacted = planBAnalysis?.impactedItems.some(i => i.id === item.id);

                return (
                  <div 
                    key={item.id} 
                    className={`itinerary-item-row ${isImpacted ? 'impacted-item' : ''}`}
                  >
                    <div className="item-left-info">
                      <div className="item-index-badge">{idx + 1}</div>
                      <div className="item-name-block">
                        <div className="item-name">{item.name}</div>
                        <div className="item-subtext">
                          {item.neighborhood} • {item.isIndoor ? 'Indoor' : 'Outdoor'}
                          {isImpacted && <span style={{ color: '#ef4444', fontWeight: 700, marginLeft: '6px' }}>[DISRUPTED]</span>}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <div className="item-right-price">
                        {item.costPerPerson === 0 ? 'Free' : `₹${item.costPerPerson * partySize}`}
                      </div>
                      <button 
                        onClick={() => handleRemoveItem(item.id)}
                        style={{ color: '#64748b', padding: '0.2rem' }}
                        title="Remove stop"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <button 
              onClick={onOpenExplore}
              style={{
                padding: '0.7rem',
                borderRadius: '8px',
                border: '1px dashed rgba(255, 255, 255, 0.2)',
                color: '#94a3b8',
                fontSize: '0.82rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                marginTop: 'auto'
              }}
            >
              <Plus size={15} /> Add More Stops from Explore
            </button>
          </div>

          {/* Plan B (Autonomous Recommendation) */}
          <div className={`plan-column-card ${planBAnalysis ? 'active-plan-b' : ''}`}>
            <div className="plan-column-header">
              <div className="plan-title-wrap">
                <ShieldCheck size={22} color={planBAnalysis ? "#34d399" : "#64748b"} />
                <div>
                  <div className="plan-title">
                    {planBAnalysis ? 'Plan B (Adaptive Recommendation)' : 'Plan B Engine (Standby)'}
                  </div>
                  <div style={{ fontSize: '0.76rem', color: '#94a3b8' }}>
                    {planBAnalysis 
                      ? `${planBAnalysis.replacements.length} adjustment(s) proposed` 
                      : 'Trigger a disruption above to view smart alternatives'}
                  </div>
                </div>
              </div>
            </div>

            {!planBAnalysis ? (
              <div style={{ 
                flex: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                padding: '2.5rem 1rem', 
                textAlign: 'center', 
                color: '#64748b' 
              }}>
                <Sparkles size={36} style={{ marginBottom: '0.75rem', opacity: 0.4 }} />
                <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#94a3b8', marginBottom: '0.3rem' }}>
                  Awaiting Disruption Signal
                </div>
                <div style={{ fontSize: '0.8rem', maxWidth: '320px' }}>
                  Select "Sudden Rain", "Traffic Gridlock", or "Budget Crunch" above to watch CityShift recalculate in real-time.
                </div>
              </div>
            ) : (
              <>
                {/* Trade-off Insights Box */}
                <div className="rec-tradeoff-box">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.82rem', fontWeight: 700, color: '#6ee7b7' }}>
                    <Info size={15} /> Trade-off & Resilience Evaluation
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#cbd5e1', marginTop: '0.35rem' }}>
                    {planBAnalysis.timeDeltaDescription}
                  </div>

                  <div className="tradeoff-metrics-grid">
                    <div className="tradeoff-stat">
                      <div className="tradeoff-stat-val">
                        {planBAnalysis.costDelta <= 0 ? `Saved ₹${Math.abs(planBAnalysis.costDelta)}` : `+₹${planBAnalysis.costDelta}`}
                      </div>
                      <div className="tradeoff-stat-lbl">Cost Impact</div>
                    </div>
                    <div className="tradeoff-stat">
                      <div className="tradeoff-stat-val">100%</div>
                      <div className="tradeoff-stat-lbl">Weather/Traffic Fit</div>
                    </div>
                    <div className="tradeoff-stat">
                      <div className="tradeoff-stat-val">₹{planBAnalysis.revisedCost.toLocaleString()}</div>
                      <div className="tradeoff-stat-lbl">New Outing Total</div>
                    </div>
                  </div>
                </div>

                {/* Specific Explanations per replacement */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.25rem' }}>
                  {planBAnalysis.replacements.map((rec, i) => (
                    <div 
                      key={i}
                      style={{
                        background: 'rgba(15, 23, 42, 0.7)',
                        border: '1px solid rgba(16, 185, 129, 0.3)',
                        borderRadius: '8px',
                        padding: '0.75rem',
                        fontSize: '0.78rem'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, color: '#34d399', marginBottom: '0.2rem' }}>
                        <span>{rec.original.name}</span>
                        <ArrowRight size={13} />
                        <span>{rec.replacement.name}</span>
                      </div>
                      <div style={{ color: '#cbd5e1', lineHeight: '1.4' }}>
                        {rec.reason}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Proposed Revised Stack */}
                <div className="itinerary-items-stack">
                  {planBAnalysis.revisedItinerary.map((item, idx) => {
                    const isNew = planBAnalysis.replacements.some(r => r.replacement.id === item.id);

                    return (
                      <div 
                        key={item.id} 
                        className={`itinerary-item-row ${isNew ? 'recommended-replacement' : ''}`}
                      >
                        <div className="item-left-info">
                          <div className="item-index-badge" style={{ background: isNew ? '#10b981' : undefined, color: isNew ? '#fff' : undefined }}>
                            {idx + 1}
                          </div>
                          <div className="item-name-block">
                            <div className="item-name">
                              {item.name}
                              {isNew && <span style={{ color: '#34d399', fontWeight: 700, fontSize: '0.72rem', marginLeft: '6px' }}>★ RECOMMENDED</span>}
                            </div>
                            <div className="item-subtext">
                              {item.neighborhood} • {item.isIndoor ? 'Indoor Protected' : 'Outdoor'}
                            </div>
                          </div>
                        </div>
                        <div className="item-right-price" style={{ color: isNew ? '#34d399' : '#e2e8f0' }}>
                          {item.costPerPerson === 0 ? 'Free' : `₹${item.costPerPerson * partySize}`}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Primary Action Button */}
                <button 
                  onClick={handleApplyPlanB}
                  className="btn-apply-plan-b"
                >
                  <CheckCircle size={18} /> Apply Revised Plan B Outing
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
