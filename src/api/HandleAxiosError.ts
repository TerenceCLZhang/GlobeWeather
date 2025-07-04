import axios from "axios";

export const handleAxiosError = (
  error: unknown,
  setError: (msg: string) => void
): void => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      if (error.response.status === 401) {
        setError("Invalid API key.");
      } else {
        setError(
          `Error ${error.response.status}: ${
            (error.response.data as any)?.message || "Unexpected error"
          }`
        );
      }
    } else if (error.request) {
      setError(
        "No response from server. Please check your network connection."
      );
    } else {
      setError(`Request error: ${error.message}`);
    }
  } else {
    setError("An unexpected error occurred.");
  }

  console.error(error);
};
