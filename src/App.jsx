import { useState, useEffect } from "react";
import Header from "./components/Header";
import SummaryCard from "./components/SummaryCard";
import InfoCards from "./components/InfoCards";
import ChartAlertCards from "./components/ChartAlertCards";
import HourlyForecastCards from "./components/HourlyForecastCards";
import DailyForecastCards from "./components/DailyForecastCards";
import Footer from "./components/Footer";
import api from "./api";

function App() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const fallbackLocation = "Rio de Janeiro, Brasil";

  const resolveLocationToLatLon = async (locationText) => {
    const query = locationText?.trim();

    if (!query) {
      return null;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(query)}`,
        {
          headers: {
            "Accept-Language": "pt-BR",
          },
        },
      );

      if (!response.ok) {
        return null;
      }

      const results = await response.json();
      if (!results?.length) {
        return null;
      }

      const { lat, lon } = results[0];
      if (!lat || !lon) {
        return null;
      }
      setLocation(results[0].display_name);

      return `${lat},${lon}`;
    } catch {
      return null;
    }
  };

  const handleSearch = async (newLocation) => {
    const latLonQuery = await resolveLocationToLatLon(newLocation);
    const weatherQuery = latLonQuery ?? newLocation;

    try {
      const response = await api.get("/forecast.json", {
        params: {
          q: weatherQuery,
          lang: "pt",
          alerts: "yes",
          days: 3,
        },
      });
      setWeatherData(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados da previsão:", error);
    }
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      handleSearch(fallbackLocation);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const currentLocation = `${coords.latitude},${coords.longitude}`;
        handleSearch(currentLocation);
      },
      () => {
        handleSearch(fallbackLocation);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      },
    );
  }, []);

  return (
    <main className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Header onSearch={handleSearch} />
        <SummaryCard
          location={location}
          date={weatherData?.location?.localtime}
          lastUpdated={weatherData?.current?.last_updated}
          temperature={weatherData?.current?.temp_c}
          condition={weatherData?.current?.condition?.text}
          feelsLike={weatherData?.current?.feelslike_c}
          chanceOfRain={weatherData?.current?.chance_of_rain}
          wind={`${weatherData?.current?.wind_kph} km/h ${weatherData?.current?.wind_dir}`}
        />
        <InfoCards
          humidity={weatherData?.current?.humidity}
          wind={`${weatherData?.current?.wind_kph} km/h ${weatherData?.current?.wind_dir}`}
          pressure={weatherData?.current?.pressure_mb}
          visibility={weatherData?.current?.vis_km}
          uv={weatherData?.current?.uv}
        />
        <ChartAlertCards
          time={weatherData?.location?.localtime}
          forecast={weatherData?.forecast?.forecastday.slice(0, 2)}
          alerts={weatherData?.alerts?.alert || []}
        />
        <HourlyForecastCards
          hourlyData={weatherData?.forecast?.forecastday[0]?.hour || []}
        />
        <DailyForecastCards
          dailyForecast={weatherData?.forecast?.forecastday.slice(1) || []}
        />

        <Footer />
      </div>
    </main>
  );
}

export default App;
