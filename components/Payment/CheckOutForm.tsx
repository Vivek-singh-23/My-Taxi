import {
    PaymentElement,
    useElements,
    useStripe,
  } from "@stripe/react-stripe-js";
  import React from "react";
  
  function CheckOutForm() {
    const stripe: any = useStripe();
    const elements = useElements();
  
    const handleSubmit = async (event: any) => {
      event.preventDefault();
      if (elements == null) {
        return;
      }
  
      const { error: submitError } = await elements.submit();
      if (submitError) {
        return;
      }
  
      const res = await fetch("/api/create-intent", {
        method: "POST",
        body: JSON.stringify({
          amount: 58,
        }),
      });
  
      const secretKey = await res.json();
      console.log(secretKey);
      const { error } = await stripe.confirmPayment({
        clientSecret: secretKey,
        elements,
        confirmParams: {
          return_url: "http://localhost:3000/",
        },
      });
    };
  
    return (
      <div className="flex flex-col justify-center items-center w-full mt-6">
        <form
          onSubmit={handleSubmit}
          className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 space-y-4"
        >
          <PaymentElement className="p-2 border border-gray-300 rounded-md" />
          <button
            type="submit"
            disabled={!stripe || !elements}
            className="w-full py-2 px-4 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Pay
          </button>
        </form>
      </div>
    );
  }
  
  export default CheckOutForm;
  