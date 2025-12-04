import React, { useEffect, useRef } from 'react';
import { getLandTransactions } from '../services/mockData';

// Declare L global for Leaflet since it's loaded via CDN
declare const L: any;

const MapWidget: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current && typeof L !== 'undefined') {
      // Initialize Map centered on Beijing
      const map = L.map(mapRef.current).setView([39.9042, 116.4074], 10);
      
      // Add OpenStreetMap Tile Layer (Open Source)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        language: 'zh'
      }).addTo(map);

      // Add Data Points
      const transactions = getLandTransactions();
      
      // Coordinates mapping for mock data (Approximate lat/lng for districts)
      const districtCoords: Record<string, [number, number]> = {
        '朝阳区': [39.9219, 116.4866],
        '海淀区': [39.9561, 116.2981],
        '浦东新区': [31.2222, 121.5447],
        '天河区': [23.1353, 113.3614],
        '南山区': [22.5323, 113.9355]
      };

      transactions.forEach(t => {
        const coords = districtCoords[t.district];
        if (coords) {
          // Add random jitter to separate dots in same district
          const lat = coords[0] + (Math.random() - 0.5) * 0.05;
          const lng = coords[1] + (Math.random() - 0.5) * 0.05;

          const marker = L.marker([lat, lng]).addTo(map);
          
          const popupContent = `
            <div class="p-2 font-sans text-sm">
              <h3 class="font-bold text-slate-800 mb-1">${t.plotName}</h3>
              <p class="text-slate-600">用途: ${t.usage}</p>
              <p class="text-slate-600">价格: ${t.transactionPrice} 万元</p>
              <p class="text-slate-500 text-xs mt-1">${t.date}</p>
            </div>
          `;
          
          marker.bindPopup(popupContent);
        }
      });

      mapInstanceRef.current = map;
    }

    return () => {
      // Cleanup if needed
    }
  }, []);

  return (
    <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-100 h-[600px] z-0 relative">
      <div ref={mapRef} className="w-full h-full rounded-lg" style={{ zIndex: 0 }} />
      <div className="absolute top-4 right-4 bg-white p-3 rounded-md shadow-md z-[400] text-sm text-slate-600">
        <h4 className="font-bold mb-2">地图图例</h4>
        <div className="flex items-center mb-1">
          <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
          <span>土地成交地块</span>
        </div>
        <div className="text-xs text-slate-400 mt-2">数据来源: 国信达数据库</div>
      </div>
    </div>
  );
};

export default MapWidget;