import { AdvancedMarker, Map, useMap } from "@vis.gl/react-google-maps";
import { useEffect } from "react";
import type { PlaceLocation } from "./common/inputs/PlacesAutocomplete";
/// <reference types="@types/google.maps" />
type MapPreviewProps = {
  zoom?: number;
  height?: number;
  position?: PlaceLocation;
};

type RecenterProps = Pick<MapPreviewProps, "position">;

function Recenter({ position }: RecenterProps) {
  const map = useMap();

  useEffect(() => {
    if (map && position) {
      map.panTo(position);
    }
  }, [map, position]);

  return position ? <AdvancedMarker position={position} /> : null;
}

export function MapPreview({ position, height = 300 }: MapPreviewProps) {
  return (
    <div style={{ height: `${height}px` }}>
      <Map
        defaultZoom={9}
        defaultCenter={{ lat: 43.45, lng: -80.5 }}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        mapId={import.meta.env.VITE_GOOGLE_MAPS_MAP_ID}
      >
        <Recenter position={position} />
      </Map>
    </div>
  );
}
