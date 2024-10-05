"use client";
import Booking from "@/components/Booking/Booking";
import MapBoxMap from "@/components/Map/MapBoxMap";
import { DestinationCoordinatesContext } from "@/context/DestinationCoordinatesContext";
import { DirectionDataContext } from "@/context/DirectionDataContext";
import { SourceCoordinatesContext } from "@/context/SourceCoordinatesContext";
import { UserLocationContext } from "@/context/UserLocationContext";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const [userLocation, setUserLocation] = useState<any>();
  const [sourceCoordinates,setSourceCoordinates] = useState<any>([])
  const [destinationCoordinates,setDestinationCoordinates] = useState<any>([])
  const [directionData, setDirectionData] = useState<any>([])

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      setUserLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  };
  return (
    <div>
      <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
        <SourceCoordinatesContext.Provider value={{sourceCoordinates, setSourceCoordinates}}>
          <DestinationCoordinatesContext.Provider value={{destinationCoordinates, setDestinationCoordinates}}>
            <DirectionDataContext.Provider value={{directionData, setDirectionData}}>
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="">
                <Booking />
              </div>

              <div className="col-span-2 bg-red-100 ">
                <MapBoxMap />
              </div>
            </div>
            </DirectionDataContext.Provider>
          </DestinationCoordinatesContext.Provider>
        </SourceCoordinatesContext.Provider>
      </UserLocationContext.Provider>
    </div>
  );
}
