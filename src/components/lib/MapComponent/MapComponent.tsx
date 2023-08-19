import "leaflet/dist/leaflet.css";

import L, { Icon } from "leaflet";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

delete (Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  iconUrl:
    "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

const MapComponent = ({ events }: any) => {
  const defaultZoom = 7; // Default zoom level, adjust as needed
  const [latitude, longitude] =
    events.location &&
    events.location.split(",").map((coord: any) => parseFloat(coord.trim()));
  const defaultCenter = { lat: latitude, lng: longitude }; // Default center
  console.log(events);
  return (
    <MapContainer
      // @ts-ignore
      center={defaultCenter}
      zoom={defaultZoom}
      zoomControl={false}
      doubleClickZoom={false}
      closePopupOnClick={false}
      dragging={false}
      zoomSnap={false}
      zoomDelta={false}
      trackResize={false}
      touchZoom={false}
      scrollWheelZoom={false}
      className=" h-[250px] w-[350px] content-center items-center rounded-2xl md:h-[349px] md:w-[713px]"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[latitude, longitude]}>
        <Popup>{events.city}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
