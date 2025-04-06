import React, { useEffect, useState } from "react";
import Map, {
  Marker,
  NavigationControl,
  FullscreenControl,
} from "react-map-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import maplibregl from "maplibre-gl";
import axios from "axios";

import { TfiWorld } from "react-icons/tfi";
import { Flex } from "antd";
import InValidAddress from "./InValidAddress";
import PropertyMapLoading from "../UI/loading/PropertyMapLoading";
import ObserverWrapper from "../shared/ObserverWrapper";

const PropertyMap = ({ location }) => {
  const opencagemapKey = process.env.NEXT_PUBLIC_OPENCAGEMAP_API_KEY;
  const maptilerKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;
  const geocodeUrl = "https://api.opencagedata.com/geocode/v1/json?q=";
  const address = `${location.country}, ${location.street}, ${location.city}, ${location.state}`;

  const [isInValidAddress, setIsInValidAddress] = useState(false);
  const [geometry, setGeometry] = useState({ lat: null, lng: null });
  const [countryName, setCountryName] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${geocodeUrl}${encodeURIComponent(
          address
        )}&key=${opencagemapKey}`;
        const { data } = await axios.get(url);

        if (data.results.length <= 0) {
          setIsInValidAddress(true);
          return;
        }
        setCountryName(data.results[0].annotations.timezone.name);
        setGeometry(data.results[0].geometry);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, [location]);

  if (isInValidAddress) return <InValidAddress />;

  return (
    <Flex gap={16} vertical className="borderB pb-8">
      <h2 className="gradient_title inline">Location</h2>
      <ObserverWrapper location>
        {geometry.lat && geometry.lng ? (
          <div className="w-full">
            <div className="flex gap-1 mb-2 items-center">
              <TfiWorld className="text-[16px] text-gray-800" />
              <p>{countryName?.replaceAll("_", " ")}</p>
            </div>
            <div className="rounded overflow-hidden">
              <Map
                mapLib={maplibregl}
                initialViewState={{
                  longitude: geometry.lng,
                  latitude: geometry.lat,
                  zoom: 14,
                }}
                style={{ width: "100%", height: 380, zIndex: 0 }}
                mapStyle={`https://api.maptiler.com/maps/openstreetmap/style.json?key=${maptilerKey}`}
              >
                <FullscreenControl position="top-right" />
                <NavigationControl position="top-left" />
                <Marker
                  color="#2e2e2e"
                  longitude={geometry.lng}
                  latitude={geometry.lat}
                />
              </Map>
            </div>
          </div>
        ) : (
          <PropertyMapLoading />
        )}
      </ObserverWrapper>
    </Flex>
  );
};

export default PropertyMap;
