export const kelvinToCelsius = (kelvin: number): number => {
  return kelvin - 273.15;
};

export const kelvinToFahrenheit = (kelvin: number): number => {
  return ((kelvin - 273.15) * 9) / 5 + 32;
};

export const msToKph = (ms: number): number => {
  return ms * 3.6;
};

export const msToMph = (ms: number): number => {
  return ms * 2.23694;
};
