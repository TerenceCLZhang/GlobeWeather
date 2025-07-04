import axios from "axios";
import type { LocationInterface } from "../types/LocationInterface";
import { handleAxiosError } from "./HandleAxiosError";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export const fetchGeoDataLatLon = async (
  lat: number,
  lon: number
): Promise<LocationInterface[]> => {
  // console.log("API CALLED");
  const response = await axios.get<LocationInterface[]>(
    "http://api.openweathermap.org/geo/1.0/reverse",
    {
      params: {
        lat: lat,
        lon: lon,
        appid: API_KEY,
      },
    }
  );

  return response.data;
};

export const fetchGeoData = async (
  location: string,
  limit: number = 1
): Promise<LocationInterface[]> => {
  // console.log("API CALLED");
  const response = await axios.get<LocationInterface[]>(
    "http://api.openweathermap.org/geo/1.0/direct",
    {
      params: {
        q: location.toLowerCase(),
        limit: limit,
        appid: API_KEY,
      },
    }
  );

  return response.data;
};

export const geoLocationFetch = async (
  location: string,
  setSuggestions: (item: LocationInterface[]) => void,
  setShowDropdown: (val: boolean) => void,
  setError: (msg: string) => void
) => {
  if (!location.trim()) {
    setSuggestions([]);
    setShowDropdown(false);
    return;
  }

  try {
    const data = await fetchGeoData(location, 5);

    if (data.length > 0) {
      setSuggestions(data);
    } else {
      setSuggestions([]);
    }

    setShowDropdown(true);
  } catch (error) {
    setSuggestions([]);
    setShowDropdown(true);
    handleAxiosError(error, setError);
  }
};
