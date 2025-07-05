import { useDispatch } from "react-redux";
import { clearWeatherData } from "../state/WeatherDataSlice";
import type { LocationInterface } from "../types/LocationInterface";
import { useState, type FormEvent } from "react";
import { setLocation } from "../state/LocationSlice";
import { fetchGeoData, geoLocationFetch } from "../api/GeoLocation";
import { handleAxiosError } from "../api/HandleAxiosError";
import { setError } from "../state/StatusSlice";

function Form() {
  const [value, setValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<LocationInterface[]>([]);
  const [showDropdown, setShowDropDown] = useState<boolean>(false);
  const [highlightIndex, setHighlightIndex] = useState<number>(-1);

  const dispatch = useDispatch();

  // Change location
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setShowDropDown(false);
    setHighlightIndex(-1);
  };

  // Format location to be "name, state, country"
  const formatLocation = (location: LocationInterface): string => {
    const formatted = `${location.name}${
      location.state ? `, ${location.state}` : ""
    }, ${location.country}`;
    return formatted;
  };

  const onSelectSuggestion = (location: LocationInterface) => {
    const formatted = formatLocation(location);
    setValue(formatted);
    setShowDropDown(false);
    setHighlightIndex(-1);
  };

  const showSuggestions = async () => {
    if (!value.trim()) {
      setSuggestions([]);
      setShowDropDown(false);
    } else {
      geoLocationFetch(value, setSuggestions, setShowDropDown, (msg: string) =>
        dispatch(setError(msg))
      );
    }
    setHighlightIndex(-1);
  };

  // Keyboard navigation for suggestions dropdown
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev <= 0 ? suggestions.length - 1 : prev - 1
      );
    } else if (e.key === "Enter") {
      if (highlightIndex >= 0 && highlightIndex < suggestions.length) {
        e.preventDefault();
        onSelectSuggestion(suggestions[highlightIndex]);
      }
    } else if (e.key === "Escape") {
      setShowDropDown(false);
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const locationName = formData.get("locationName")?.toString();

    // Check if location exists in suggestions
    const match = suggestions.find(
      (locationToCheck) => formatLocation(locationToCheck) === locationName
    );

    if (match) {
      dispatch(setLocation(match));
      setValue("");
    } else {
      // Fetch location data from API
      try {
        const locationData = await fetchGeoData(locationName as string);

        if (locationData.length === 0) {
          dispatch(clearWeatherData());
          dispatch(setError("Location not found. Please check the spelling."));
        } else {
          dispatch(setLocation(locationData[0]));
        }

        setValue("");
      } catch (error) {
        handleAxiosError(error, setError);
      }
    }

    setShowDropDown(false);
    setValue("");
    setHighlightIndex(-1);
  };

  return (
    <form
      action="#"
      className="black-background flex flex-col items-center gap-5 xl:flex-row"
      onSubmit={onSubmit}
    >
      <div className="w-full relative">
        <label htmlFor="locationName" className="sr-only">
          Location search input
        </label>
        <input
          id="locationName"
          type="text"
          placeholder="Enter a location"
          className="placeholder:text-gray-300 text-white border-2 border-gray-300 rounded-lg w-full py-2 px-3"
          name="locationName"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={value}
          autoComplete="off"
          required
          aria-autocomplete="list"
          aria-controls="location-suggestion-list"
          aria-expanded={showDropdown}
          aria-activedescendant={
            highlightIndex >= 0
              ? `location-option-${highlightIndex}`
              : undefined
          }
        />

        {showDropdown && (
          <ul className="dropdown">
            {suggestions.length > 0 ? (
              suggestions.map((loc, idx) => (
                <li
                  id={`location-option-${idx}`}
                  key={idx}
                  role="option"
                  aria-selected={highlightIndex === idx}
                  onClick={() => onSelectSuggestion(loc)}
                  className={`${
                    idx === highlightIndex ? "bg-gray-600 text-white" : ""
                  }`}
                >
                  {loc.name} {loc.state ? `, ${loc.state}` : ""}, {loc.country}
                </li>
              ))
            ) : (
              <li>No suggestions found</li>
            )}
          </ul>
        )}
      </div>
      <div className="flex gap-5 w-full md:w-auto">
        <button
          type="button"
          className="button-orange"
          onClick={showSuggestions}
          aria-label="Show suggestions"
        >
          Suggestions
        </button>
        <input type="submit" value="Search" className="button-orange" />
      </div>
    </form>
  );
}

export default Form;
