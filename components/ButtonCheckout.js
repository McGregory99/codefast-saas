"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const ButtonCheckout = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    if (isLoading) return;
    setIsLoading(true);

    // API call
    try {
      // 1. Asynchronous call to API to create new board
      const response = await axios.post("/api/billing/create-checkout", {
        // DEV -> http://localhost:3000/dashboard/success
        // PROD -> http://goyocancio.es/dashboard/success
        successUrl: window.location.href + "/success",
        cancelUrl: window.location.href,
      });
      const checkoutUrl = response.data.url;
      window.location.href = checkoutUrl;
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || error.message || "Something went wrong";
      // 1. Display error message
      toast.error(errorMessage);
    } finally {
      // Stop loading spinner
      setIsLoading(false);
    }
  };

  return (
    <button className="btn btn-primary" onClick={handleSubscribe}>
      {isLoading && (
        <span className="loading loading-spinner loading-xs"></span>
      )}
      Suscribe
    </button>
  );
};

export default ButtonCheckout;
