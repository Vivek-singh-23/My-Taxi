"use client";
import React, { useContext, useState } from "react";
import AutocompleteAddress from "./AutocompleteAddress";
import Cars from "./Cars";
import Cards from "./Cards";
import { useRouter } from "next/navigation";
import { SelectedCarAmountContext } from "@/context/SelectedCarAmountContext";

function Booking() {
  const screenHeight = window.innerHeight * 0.82;
  const {carAmount, setCarAmount} = useContext(SelectedCarAmountContext)
  const router:any = useRouter()
  return (
    <div className="p-5">
      <h2 className="text-[20px] font-semibold">Booking</h2>
      <div
        className="border-[1px] p-5 rounded-md"
        style={{ height: screenHeight }}
      >
        <AutocompleteAddress />
        <Cars  />
        <Cards />
        <button onClick={()=>router.push('/payment')} className={`w-full bg-yellow-400 p-1 rounded-md mt-4 ${!carAmount?'bg-gray-200':null} `} 
          disabled={!carAmount}>
          Book
        </button>
      </div>
    </div>
  );
}

export default Booking;
