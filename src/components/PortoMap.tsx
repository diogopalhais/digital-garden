import { Map, MapMarker, MarkerContent } from "@/components/ui/map";

const PORTO = { lng: -8.6291, lat: 41.1579 } as const;

export default function PortoMap() {
  return (
    <Map
      center={[PORTO.lng, PORTO.lat - 0.015]}
      zoom={11.5}
      theme="dark"
      interactive={false}
      attributionControl={false}
      className="h-full w-full"
    >
      <MapMarker longitude={PORTO.lng} latitude={PORTO.lat}>
        <MarkerContent>
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500 border border-amber-300" />
          </span>
        </MarkerContent>
      </MapMarker>
    </Map>
  );
}
