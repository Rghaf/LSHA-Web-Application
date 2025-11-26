import { useState } from "react";

export function usePost(url) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const postData = async (payload) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Tells server we are sending JSON
        },
        body: JSON.stringify(payload), // Converts JS Object to JSON String
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data); // Save response to state
      return data; // Return data so the component can check success immediately
    } catch (err) {
      setError(err.message);
      return null; // Return null if failed
    } finally {
      setIsLoading(false);
    }
  };

  return { postData, isLoading, error, response };
}
