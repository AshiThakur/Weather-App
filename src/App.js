//Made By Adarsh Thakur

import "./App.css";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import { TempreatureAndDetails } from "./components/TempreatureAndDetails";

import { ToastContainer, toast } from "react-toastify";

import getFormattedWeatherData from "./services/weatherService";

import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import "react-toastify/dist/ReactToastify.css";
import { ForeCast } from "./components/ForeCast";

import { data } from "jquery";

function App() {
  const [query, setQuery] = useState({ q: "berlin" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : "current location";
      toast.info("Fetching weather for " + message);

      await getFormattedWeatherData({ ...query, units }).then(
        (data) => setWeather(data),
        toast.success(
          `Successfully fetched weather for ${data.name},${data.country} `
        ),
        toast.success(`Tempreature is in ${units}`)
      );
    };
    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return " from-cyan-700 to-blue-700";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-cyan-700 to-blue-700";

    return "from-yellow-700 to-orange-700";
  };

  return (
    <>
      <div
        className={`mx-auto max-w-screen-md mt-4 py-1 px-28 bg-gradient-to-br  h-fit shadow-xl
    shadow-grey-400"
    ${formatBackground()}`}
      >
        <TopButtons setQuery={setQuery} />
        <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

        {weather && (
          <div>
            <TimeAndLocation weather={weather} />
            <TempreatureAndDetails weather={weather} />

            <ForeCast title="hourly forecast" items={weather.hourly} />
            <ForeCast title="daily forecast" items={weather.daily} />
          </div>
        )}
      </div>
      <Footer />
      <ToastContainer autoClose={3000} theme="colored" newestOnTop={true} />
    </>
  );
}

export default App;
