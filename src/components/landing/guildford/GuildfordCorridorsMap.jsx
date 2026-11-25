'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Loader2, MapPin, Phone } from 'lucide-react';
import { loadGoogleMaps } from '../../../lib/googleMapsLoader';
import {
  GUILDFORD_HUB,
  GUILDFORD_CONFIRMED_LOCATIONS,
} from '../../../data/guildfordCoverage';

const ORANGE = '#FB7E10';
const INK = '#0F172A';
const LAND = '#eef2f6';
const EDGE = '#CBD5E1';

// Styling for clean, high-contrast map rendering
const LIGHT_STYLE = [
  { elementType: 'geometry', stylers: [{ color: '#f4f6f9' }] },
  { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#64748b' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#ffffff' }, { weight: 3 }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  { featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{ color: EDGE }] },
  { featureType: 'administrative.locality', elementType: 'labels', stylers: [{ visibility: 'off' }] },
  { featureType: 'landscape.natural', elementType: 'geometry', stylers: [{ color: LAND }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#ffffff' }] },
  { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#e2e8f0' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#fde1c3' }] },
  { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#f7c58f' }] },
  { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#b45309' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#cfe8f7' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#3b82a6' }] },
];

const LABEL_POSITION = {
  top: 'bottom:14px;left:50%;transform:translateX(-50%)',
  bottom: 'top:14px;left:50%;transform:translateX(-50%)',
  left: 'right:16px;top:50%;transform:translateY(-50%)',
  right: 'left:16px;top:50%;transform:translateY(-50%)',
};

const LABEL_FONT = `font:800 13px Outfit,system-ui,sans-serif;color:${INK};white-space:nowrap;text-shadow:0 0 3px #fff,0 0 6px #fff,0 1px 2px #fff`;

const townHtml = (town) => `
<div style="position:relative;cursor:pointer" title="${town.name} (${town.postcode}) - Confirmed MTC Operational Area">
  <span data-accent style="position:absolute;left:-8px;top:-8px;width:16px;height:16px;border-radius:9999px;background:#fff;border:3px solid ${ORANGE};box-shadow:0 0 0 3px rgba(251,126,16,.25),0 2px 6px rgba(15,23,42,.35)"></span>
  <span data-label style="position:absolute;${LABEL_POSITION[town.dir]};${LABEL_FONT};transition:opacity .25s">
    ${town.name} <span style="font-size:10px;color:#D96A00;font-weight:900">(${town.postcode})</span>
  </span>
</div>`;

const hubHtml = (hub) => `
<div style="position:relative;cursor:pointer" title="${hub.name} - Central Dispatch Hub">
  <span class="animate-ping" style="position:absolute;left:-20px;top:-20px;width:40px;height:40px;border-radius:9999px;background:rgba(251,126,16,.4)"></span>
  <span style="position:absolute;left:-12px;top:-12px;width:24px;height:24px;border-radius:9999px;background:${ORANGE};border:4px solid #fff;box-shadow:0 0 0 3px rgba(251,126,16,.35),0 2px 8px rgba(15,23,42,.45)"></span>
  <span style="position:absolute;right:18px;top:50%;transform:translateY(-62%);text-align:right;white-space:nowrap;text-shadow:0 0 3px #fff,0 0 6px #fff,0 1px 2px #fff">
    <span style="display:block;font:900 15px Outfit,system-ui,sans-serif;color:${INK}">${hub.shortName}</span>
    <span style="display:block;font:800 9px Outfit,system-ui,sans-serif;letter-spacing:.18em;color:#D96A00">DISPATCH HUB</span>
  </span>
</div>`;

// Convex boundary encompassing the verified operational corridor
// (Aldershot Hub -> Ash -> Guildford -> Tongham along A31/A331)
const CORRIDOR_POLYGON = [
  { lat: 51.2700, lng: -0.7250 }, // North of Ash
  { lat: 51.2750, lng: -0.6300 }, // North corridor towards Guildford
  { lat: 51.2550, lng: -0.5400 }, // East of Guildford Town
  { lat: 51.2200, lng: -0.5500 }, // South-East Guildford
  { lat: 51.2150, lng: -0.6600 }, // South along A31 Hog's Back
  { lat: 51.2200, lng: -0.7450 }, // South of Tongham
  { lat: 51.2380, lng: -0.7750 }, // South-West of Aldershot Hub
  { lat: 51.2650, lng: -0.7700 }, // North-West of Aldershot
];

const createHtmlOverlayClass = (google) =>
  class HtmlOverlay extends google.maps.OverlayView {
    constructor({ position, html, interactive = false, onClick }) {
      super();
      this.position = new google.maps.LatLng(position.lat, position.lng);
      this.root = document.createElement('div');
      this.root.style.cssText = `position:absolute;width:0;height:0;${interactive ? 'pointer-events:auto;cursor:pointer' : 'pointer-events:none'}`;
      this.root.innerHTML = html;
      if (onClick) this.root.addEventListener('click', onClick);
    }

    onAdd() {
      this.getPanes().overlayMouseTarget.appendChild(this.root);
    }

    draw() {
      const projection = this.getProjection();
      if (!projection) return;
      const pixel = projection.fromLatLngToDivPixel(this.position);
      this.root.style.left = `${pixel.x}px`;
      this.root.style.top = `${pixel.y}px`;
    }

    onRemove() {
      this.root.remove();
    }
  };

const MESSAGES = {
  'no-key': 'Google Maps is not configured for this site yet.',
  auth: 'Google Maps could not verify this site, so the map is unavailable.',
  load: 'The map could not be loaded.',
};

const GuildfordCorridorsMap = ({ onLocationSelect, activeSector = 'all' }) => {
  const containerRef = useRef(null);
  const [status, setStatus] = useState('loading');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const mapInstanceRef = useRef(null);
  const filterSectorRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    let cleanup = () => {};

    loadGoogleMaps()
      .then((google) => {
        if (cancelled || !containerRef.current) return;

        // Geographical centre: Guildford Town Centre (lat: 51.2362, lng: -0.5704)
        const guildfordCenter = { lat: 51.2362, lng: -0.5704 };

        const map = new google.maps.Map(containerRef.current, {
          center: guildfordCenter,
          zoom: 11,
          styles: LIGHT_STYLE,
          disableDefaultUI: false,
          zoomControl: true,
          zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER,
          },
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          gestureHandling: 'cooperative',
          clickableIcons: false,
        });

        mapInstanceRef.current = map;

        // Accurate operational coverage envelope connecting Aldershot Hub with confirmed Guildford locations
        const corridorPolygon = new google.maps.Polygon({
          map,
          paths: CORRIDOR_POLYGON,
          strokeColor: ORANGE,
          strokeOpacity: 0.9,
          strokeWeight: 2,
          fillColor: ORANGE,
          fillOpacity: 0.08,
          clickable: false,
          zIndex: 1,
        });

        const HtmlOverlay = createHtmlOverlayClass(google);
        const overlays = [];
        const pins = [];

        const addOverlay = (item, isHub = false) => {
          const overlay = new HtmlOverlay({
            position: { lat: item.lat, lng: item.lng },
            html: isHub ? hubHtml(item) : townHtml(item),
            interactive: true,
            onClick: (e) => {
              e.stopPropagation();
              setSelectedLocation(item);
              if (onLocationSelect) onLocationSelect(item);
            },
          });
          overlay.setMap(map);
          overlays.push(overlay);
          pins.push({ overlay, ...item, isHub });
        };

        // Add Aldershot Central Hub
        addOverlay(GUILDFORD_HUB, true);

        // Add confirmed operational locations only
        GUILDFORD_CONFIRMED_LOCATIONS.forEach((loc) => {
          addOverlay(loc);
        });

        map.addListener('click', () => {
          setSelectedLocation(null);
        });

        // Fit bounds around Guildford and confirmed corridor
        const fitToCorridor = () => {
          const bounds = new google.maps.LatLngBounds();
          bounds.extend({ lat: GUILDFORD_HUB.lat, lng: GUILDFORD_HUB.lng });
          GUILDFORD_CONFIRMED_LOCATIONS.forEach((loc) => {
            bounds.extend({ lat: loc.lat, lng: loc.lng });
          });
          map.fitBounds(bounds, { top: 60, right: 60, bottom: 60, left: 60 });
        };

        fitToCorridor();

        filterSectorRef.current = (sectorId) => {
          if (!sectorId || sectorId === 'all') {
            fitToCorridor();
            pins.forEach(({ overlay }) => {
              const el = overlay.root.firstElementChild;
              if (el) el.style.opacity = '1';
            });
            return;
          }

          const filtered = GUILDFORD_CONFIRMED_LOCATIONS.filter(
            (l) => l.boroughSector.toLowerCase().includes(sectorId)
          );

          if (filtered.length > 0) {
            const bounds = new google.maps.LatLngBounds();
            bounds.extend({ lat: GUILDFORD_HUB.lat, lng: GUILDFORD_HUB.lng });
            filtered.forEach((t) => bounds.extend({ lat: t.lat, lng: t.lng }));
            map.fitBounds(bounds, { top: 60, right: 60, bottom: 60, left: 60 });
          }

          pins.forEach(({ overlay, boroughSector, isHub }) => {
            const el = overlay.root.firstElementChild;
            if (!el || isHub) return;
            const matches = boroughSector.toLowerCase().includes(sectorId);
            el.style.opacity = matches ? '1' : '0.25';
          });
        };

        const observer = new ResizeObserver(() => {
          google.maps.event.trigger(map, 'resize');
          fitToCorridor();
        });
        observer.observe(containerRef.current);

        setStatus('ready');
        cleanup = () => {
          observer.disconnect();
          overlays.forEach((o) => o.setMap(null));
          corridorPolygon.setMap(null);
          google.maps.event.clearInstanceListeners(map);
          mapInstanceRef.current = null;
        };
      })
      .catch((error) => {
        if (!cancelled) setStatus(MESSAGES[error?.message] ? error.message : 'load');
      });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  useEffect(() => {
    if (filterSectorRef.current) {
      filterSectorRef.current(activeSector);
    }
  }, [activeSector]);

  return (
    <div className="relative w-full h-full" style={{ background: LAND }}>
      <div
        ref={containerRef}
        role="region"
        aria-label="Interactive map of confirmed mobile tyre fitting coverage across Guildford Borough and connecting road corridors"
        className="w-full h-full"
      />

      {status === 'loading' && (
        <div role="status" className="absolute inset-0 flex items-center justify-center" style={{ background: LAND }}>
          <Loader2 size={32} className="animate-spin text-[#FB7E10]" aria-hidden="true" />
          <span className="sr-only">Loading Guildford Coverage Map</span>
        </div>
      )}

      {MESSAGES[status] && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center" style={{ background: LAND }}>
          <MapPin size={32} className="text-[#FB7E10]" aria-hidden="true" />
          <p className="text-sm font-semibold text-slate-700 max-w-xs">{MESSAGES[status]}</p>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Mobile+Tyre+Champions+Guildford"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-[#FB7E10] text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider"
          >
            Open in Google Maps <ExternalLink size={12} aria-hidden="true" />
          </a>
        </div>
      )}

      {/* Selected Location Popup Card */}
      {selectedLocation && (
        <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md border border-gray-200 rounded-2xl p-4 shadow-xl max-w-xs animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#FB7E10]">
                {selectedLocation.isHub ? 'Central Operating Hub' : `${selectedLocation.boroughSector} • ${selectedLocation.postcode}`}
              </span>
              <h4 className="text-base font-black text-gray-900 leading-tight">
                {selectedLocation.name}
              </h4>
            </div>
            <button
              onClick={() => setSelectedLocation(null)}
              className="text-gray-400 hover:text-gray-600 text-sm font-bold p-1 cursor-pointer"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          <p className="mt-1.5 text-xs text-gray-500 font-medium leading-relaxed">
            {selectedLocation.description || 'Confirmed operational mobile tyre fitting service area with 24/7 emergency dispatch.'}
          </p>
          <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between gap-2">
            <span className="text-[11px] font-extrabold text-emerald-600">
              ● {selectedLocation.deploymentEstimate || '20–40 Min Response'}
            </span>
            <a
              href="tel:02071013856"
              className="inline-flex items-center gap-1 bg-[#FB7E10] hover:bg-orange-600 text-white font-black px-3 py-1.5 rounded-lg text-xs uppercase tracking-wider transition-all shadow-md shadow-orange-500/20 active:scale-95"
            >
              <Phone size={12} className="fill-current" />
              <span>Call Van</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuildfordCorridorsMap;
