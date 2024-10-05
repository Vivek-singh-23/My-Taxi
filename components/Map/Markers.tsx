"use client";

import React, { useContext } from "react";

import { UserLocationContext } from "@/context/UserLocationContext";
import { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { DestinationCoordinatesContext } from "@/context/DestinationCoordinatesContext";
import { SourceCoordinatesContext } from "@/context/SourceCoordinatesContext";

function Markers() {
  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const {sourceCoordinates,setSourceCoordinates} = useContext(SourceCoordinatesContext)
  const {destinationCoordinates,setDestinationCoordinates} = useContext(DestinationCoordinatesContext)

  return (
    <div>
      <Marker
        longitude={userLocation?.lng}
        latitude={userLocation?.lat}
        anchor="bottom"
      >
        <img src="./pin.avif" className="h-10 w-10" />
      </Marker>

      {/* source marker */}
      {sourceCoordinates.length!=0? <Marker
        longitude={sourceCoordinates?.lng}
        latitude={sourceCoordinates?.lat}
        anchor="bottom"
      >
        <img src="./pin.avif" className="h-10 w-10" />
      </Marker> : null}

      {/* destination markers */}
      {destinationCoordinates.length!=0?<Marker
        longitude={destinationCoordinates?.lng}
        latitude={destinationCoordinates?.lat}
        anchor="bottom"
      >
        <img src="./pin.avif" className="h-10 w-10" />
      </Marker>:null}
    </div>
  );
}

export default Markers;
