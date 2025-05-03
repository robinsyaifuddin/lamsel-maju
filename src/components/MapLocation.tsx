
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useIsMobile } from '@/hooks/use-mobile';

interface MapLocationProps {
  longitude: number;
  latitude: number;
  locationName: string;
}

export const MapLocation: React.FC<MapLocationProps> = ({ longitude, latitude, locationName }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    // This is a temporary public token for demonstration purposes
    // In a production app, this should be stored securely in environment variables
    setMapboxToken('pk.eyJ1IjoibG92YWJsZWRldiIsImEiOiJjbHRsZzc0NTAwNm41MmptbXlndnNjMjk2In0.mfbP5aOlF_0_s9HSEbI4XA');
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoading || !mapboxToken || !mapContainer.current) return;

    // Initialize the map
    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [longitude, latitude],
      zoom: 12,
      interactive: true
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    // Add marker at the location
    marker.current = new mapboxgl.Marker({ color: '#0EA5E9' })
      .setLngLat([longitude, latitude])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 })
          .setHTML(`<h3 class="font-medium">${locationName}</h3>`)
      )
      .addTo(map.current);
    
    // Open popup by default
    marker.current.togglePopup();

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [longitude, latitude, locationName, mapboxToken, isLoading]);

  return (
    <div className="relative w-full overflow-hidden rounded-lg border shadow-sm">
      {isLoading ? (
        <div className="flex h-64 w-full items-center justify-center bg-gray-100">
          <p>Loading map...</p>
        </div>
      ) : (
        <>
          <div 
            ref={mapContainer} 
            className={`h-${isMobile ? '64' : '96'} w-full`}
            style={{ height: isMobile ? '300px' : '400px' }}
          />
          <div className="absolute bottom-2 right-2">
            <a 
              href={`https://maps.google.com/?q=${latitude},${longitude}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="rounded bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
            >
              Open in Google Maps
            </a>
          </div>
        </>
      )}
    </div>
  );
};
