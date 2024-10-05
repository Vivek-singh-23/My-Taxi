"use client";
import { UserLocationContext } from "@/context/UserLocationContext";
import React, { useContext, useEffect, useRef } from "react";
import Map, { Marker } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import Markers from "./Markers";
import { SourceCoordinatesContext } from "@/context/SourceCoordinatesContext";
import { DestinationCoordinatesContext } from "@/context/DestinationCoordinatesContext";
import { DirectionDataContext } from "@/context/DirectionDataContext";
import MapBoxRoute from "./MapBoxRoute";

const MAPBOX_DRIVING_ENDPOINT="https://api.mapbox.com/directions/v5/mapbox/driving/"
// paste your session token here
const session_token=""


function MapBoxMap() {
  const mapRef=useRef<any>()
  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const {sourceCoordinates,setSourceCoordinates} = useContext(SourceCoordinatesContext)
  const {destinationCoordinates,setDestinationCoordinates} = useContext(DestinationCoordinatesContext)
  const {directionData, setDirectionData} = useContext(DirectionDataContext)
  useEffect(() => {
    if(sourceCoordinates){
      mapRef.current?.flyTo({
        center:[sourceCoordinates.lng,sourceCoordinates.lat],
        duration:2500
      })
    }
  }, [sourceCoordinates])

  useEffect(() => {
    if(destinationCoordinates){
      mapRef.current?.flyTo({
        center:[destinationCoordinates.lng,destinationCoordinates.lat],
        duration:2500
      })
    }

    if(sourceCoordinates&&destinationCoordinates){
      getDirectionRoute();
    }
  }, [destinationCoordinates])
  

  const getDirectionRoute=async()=>{
    const res=await fetch(MAPBOX_DRIVING_ENDPOINT+sourceCoordinates.lng+","+sourceCoordinates.lat+";"+destinationCoordinates.lng+","
      +destinationCoordinates.lat+"?overview=full&geometries=geojson"+"&access_token="+process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,{
        headers:{
          "Content-Type":"application/json"
        }
      });

      const result=await res.json();
      setDirectionData(result)
  }

  return (
    <div className="p-5">
      <h2 className="text-[20px] font-semibold ">Map</h2>
      <div className="rounded-lg overflow-hidden">
        {userLocation ? (
          <Map
            //   Add mapbox access token'
            ref={mapRef}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            initialViewState={{
              longitude: userLocation?.lng,
              latitude: userLocation?.lat,
              zoom: 14,
            }}
            style={{ width: "100%", height: 450, borderRadius: 10 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          > 

            
            <Markers/>

            {directionData?.routes?(
              <MapBoxRoute coordinates={directionData?.routes[0]?.geometry?.coordinates}/>
            ):null}
          </Map>
        ) : null}
      </div>
    </div>
  );
}

export default MapBoxMap;
