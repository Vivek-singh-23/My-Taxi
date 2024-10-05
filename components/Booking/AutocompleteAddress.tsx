import { DestinationCoordinatesContext } from "@/context/DestinationCoordinatesContext";
import { SourceCoordinatesContext } from "@/context/SourceCoordinatesContext";
import React, { useContext, useEffect, useState } from "react";
const session_token='add your session token here'
const MAPBOX_RETRIVE_URL='https://api.mapbox.com/search/searchbox/v1/retrieve/'

function AutocompleteAddress() {
  const [source, setSource] = useState<any>();
  const [destination, setDestination] = useState<any>();
  const [addressList, setAddressList] = useState<any>([]);
  const [destinationList, setDestinationList] = useState<any>([]);
  const {sourceCoordinates,setSourceCoordinates} = useContext(SourceCoordinatesContext)
  const {destinationCoordinates,setDestinationCoordinates} = useContext(DestinationCoordinatesContext)

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getAddressList();
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [source]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getAddressListForDestination();
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [destination]);

  const getAddressList = async () => {
    const res = await fetch("/api/search-address?q=" + source, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();
    setAddressList(result);
  };

  const getAddressListForDestination = async () => {
    const res = await fetch("/api/search-address?q=" + destination, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();
    setDestinationList(result);
  };

  const onSourceAddressClick = async(item:any) => {
    setSource(item.full_address);
    setAddressList([]);
    const res=await fetch(MAPBOX_RETRIVE_URL+item.mapbox_id+"?session_token="+session_token+"&access_token="+process.env.MAPBOX_ACCESS_TOKEN)

    const result=await res.json()
    setSourceCoordinates({
        lng: result.features[0].geometry.coordinates[0],
        lat: result.features[0].geometry.coordinates[1],
      });
      
  };

  const onDestinationAddressClick = async(item:any) => {
    setDestination(item.full_address);
    setAddressList([]);
    const res=await fetch(MAPBOX_RETRIVE_URL+item.mapbox_id+"?session_token="+session_token+"&access_token="+process.env.MAPBOX_ACCESS_TOKEN)

    const result=await res.json()
    setDestinationCoordinates({
        lng: result.features[0].geometry.coordinates[0],
        lat: result.features[0].geometry.coordinates[1],
      });
  };

  return (
    <div className="mt-5">
      <div className="relative">
        <label className="text-gray-400">Where From?</label>
        <input
          type="text"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="bg-white p-1 border-[1px] w-full rounded-md outline-none focus:border-yellow-300"
        />
      </div>
      {addressList?.suggestions ? (
        <div className="shadow-md p-1 rounded-md absolute w-full bg-white">
          {addressList?.suggestions.map((item: any, index: number) => (
            <h2
              className="p-3 hover:bg-gray-100 cursor-pointer"
              onClick={() => onSourceAddressClick(item)}
              key={index}
            >
              {item.full_address}
            </h2>
          ))}
        </div>
      ) : null}

      <div className="mt-3 relative">
        <label className="text-gray-400">Where To?</label>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="bg-white p-1 border-[1px] w-full rounded-md outline-none focus:border-yellow-300"
        />
      </div>
      {destinationList?.suggestions ? (
        <div className="shadow-md p-1 rounded-md absolute w-full bg-white">
          {destinationList?.suggestions.map((item: any, index: number) => (
            <h2
              className="p-3 hover:bg-gray-100 cursor-pointer"
              onClick={() =>{onDestinationAddressClick(item)
              }}
              key={index}
            >
              {item.full_address}
            </h2>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default AutocompleteAddress;
