# 🌍 GlobeWeather

**GlobeWeather** is a modern, accessible weather web application that allows users to search for any city worldwide and view real-time weather data in either Metric or Imperial units.

## 🚀 Features

- **Location search with autocomplete suggestions**
- **Real-time weather data** including temperature, wind speed, humidifty, and more
- **Unit toggle** (Metric ↔ Imperial)
- **Keyboard navigation and screen reader support**
- **Reponsive design** for desktop and mobile

## 🛠️ Tech Stack

- **React** with **TypeScript**
- **Redux Toolkit**
- **Tailwind CSS**
- **OpenWeatherMap API**

## 📦 Installation

1. **Clone this repo:**

   ```bash
   git clone https://github.com/TerenceCLZhang/GlobeWeather-website.git
   cd GlobeWeather-website
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory with the following

   ```ini
   VITE_OPENWEATHER_API_KEY=your_openweather_api_key
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

## ♿ Accessibility

GlobeWeather adheres to the [WCAG 2.1 AA accessibility standards](https://www.w3.org/TR/WCAG21/), achieving a **Lighthouse accessibility score of 100** and a **95% automated score from [AccessibilityChecker.org](https://www.accessibilitychecker.org/)**.
