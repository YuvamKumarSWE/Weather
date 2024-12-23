import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";

export default function Result({ city }) {
    const [loading, setLoading] = useState(false);
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);


    const apiKey = import.meta.env.VITE_KEY;

    useEffect(() => { 
        if (city === "") return;

        const getWeather = async () => {
            setWeather(null);
            setLoading(true);
            setError(null);
            try {
                await new Promise((resolve) => setTimeout(resolve, 800));

                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch weather data.");
                }
                const data = await response.json();
                console.log(data);
                setWeather(data);
            } catch (error) {
                setError("An error occurred. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        getWeather(); // Call the function
    }, [city]); // Dependency array ensures this runs when `city` changes

    return (
        <div className="w-full flex justify-center m-10">
            {loading && <CircularProgress size="60px" color="secondary" />}
            {error && <p className="text-white text-xl font-mono">{error}</p>}

            {weather && (
                <div className="flex flex-col items-center">
                    <p className="text-white text-xl font-mono">
                        {weather.name}, {weather.sys.country}
                    </p>
                    <p className="text-white text-xl font-mono">
                        {Math.round(weather.main.temp - 273.15)}°C
                    </p>
                    <p className="text-white text-xl font-mono">
                        {weather.weather[0].description.toUpperCase()}
                    </p>
                </div>
            )}
        </div>
    );
}