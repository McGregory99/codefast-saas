"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const ButtonPortal = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleBilling = async () => {
        if (isLoading) return;
        setIsLoading(true);

        // API call
        try {
            // 1. Asynchronous call to API to create new board
            const response = await axios.post("/api/billing/create-portal", {
                returnUrl: window.location.href,
            });
            const portalUrl = response.data.url;
            window.location.href = portalUrl;
        } catch (error) {
            const errorMessage =
                error.response?.data?.error ||
                error.message ||
                "Something went wrong";
            // 1. Display error message
            toast.error(errorMessage);
        } finally {
            // Stop loading spinner
            setIsLoading(false);
        }
    };

    return (
        <button className="btn btn-primary" onClick={handleBilling}>
            {isLoading && (
                <span className="loading loading-spinner loading-xs"></span>
            )}
            Billing
        </button>
    );
};

export default ButtonPortal;
