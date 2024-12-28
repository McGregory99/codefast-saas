"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const FormNewBoard = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent refreshing the page when the button is clicked
    if (isLoading) return; // Prevent for double click and send more than one request

    setIsLoading(true);
    try {
      // 1. Asynchronous call to API to create new board
      const data = await axios.post("/api/board", { name });
      setName("");
      toast.success("Board created!");
      router.refresh();
      // 2. Redirect to dedicated board page
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
    <form
      className="bg-base-100 p-8 rounded-3xl space-y-8"
      onSubmit={handleSubmit}
    >
      <p className="font-bold text-lg">Create a new feedback board</p>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Board name</span>
        </div>
        <input
          required
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <button className="btn btn-primary w-full" type="submit">
        {isLoading && (
          <span className="loading loading-spinner loading-xs"></span>
        )}
        Create Board
      </button>
    </form>
  );
};

export default FormNewBoard;
