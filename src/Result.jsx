import PropTypes from 'prop-types';
import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm, WiFog, WiDust, 
         WiHumidity, WiStrongWind, WiBarometer, WiThermometer } from "react-icons/wi";
import { motion, AnimatePresence } from "framer-motion";

export default function Result({ city }) {
    const [loading, setLoading] = useState(false);
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    const getWeatherIcon = (weatherId) => {
        const iconClass = "text-8xl text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]";
        if (weatherId >= 200 && weatherId < 300) return <WiThunderstorm className={iconClass} />;
        if (weatherId >= 300 && weatherId < 600) return <WiRain className={iconClass} />;
        if (weatherId >= 600 && weatherId < 700) return <WiSnow className={iconClass} />;
        if (weatherId >= 700 && weatherId < 800) return <WiDust className={iconClass} />;
        if (weatherId === 800) return <WiDaySunny className={iconClass} />;
        if (weatherId > 800) return <WiCloudy className={iconClass} />;
        return <WiFog className={iconClass} />;
    };

    useEffect(() => { 
        const apiKey = import.meta.env.VITE_KEY;
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
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        getWeather(); // Call the function
    }, [city]); // Dependency array ensures this runs when `city` changes

    const WeatherCard = ({ icon, title, value, unit }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-md p-4 rounded-xl flex flex-col items-center justify-center gap-2"
        >
            {icon}
            <p className="text-gray-300 text-sm font-medium">{title}</p>
            <p className="text-white text-lg font-bold">{value}{unit}</p>
        </motion.div>
    );

    WeatherCard.propTypes = {
        icon: PropTypes.node.isRequired,
        title: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        unit: PropTypes.string.isRequired,
    };

    return (
        <div className="w-full flex justify-center px-4 py-8">
            <AnimatePresence mode="wait">
                {loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <CircularProgress size="60px" sx={{ color: 'white' }} />
                    </motion.div>
                )}

                {error && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-red-500/30 backdrop-blur-md p-6 rounded-xl shadow-lg border border-red-500/20"
                    >
                        <p className="text-white text-xl font-medium">{error}</p>
                    </motion.div>
                )}

                {weather && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="max-w-2xl w-full"
                    >
                        <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/10">
                            <div className="flex flex-col items-center space-y-6">
                                {/* Main Weather Info */}
                                <div className="text-center">
                                    {getWeatherIcon(weather.weather[0].id)}
                                    <h2 className="text-3xl font-bold text-white mt-4">
                                        {weather.name}, {weather.sys.country}
                                    </h2>
                                    <div className="flex items-center justify-center gap-2 mt-2">
                                        <WiThermometer className="text-3xl text-white" />
                                        <span className="text-5xl font-bold text-white">
                                            {Math.round(weather.main.temp - 273.15)}°C
                                        </span>
                                    </div>
                                    <p className="text-xl text-gray-300 mt-2">
                                        {weather.weather[0].description.charAt(0).toUpperCase() + 
                                         weather.weather[0].description.slice(1)}
                                    </p>
                                </div>

                                {/* Weather Details Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full mt-6">
                                    <WeatherCard
                                        icon={<WiHumidity className="text-3xl text-white" />}
                                        title="Humidity"
                                        value={weather.main.humidity}
                                        unit="%"
                                    />
                                    <WeatherCard
                                        icon={<WiStrongWind className="text-3xl text-white" />}
                                        title="Wind Speed"
                                        value={Math.round(weather.wind.speed * 3.6)}
                                        unit=" km/h"
                                    />
                                    <WeatherCard
                                        icon={<WiBarometer className="text-3xl text-white" />}
                                        title="Pressure"
                                        value={weather.main.pressure}
                                        unit=" hPa"
                                    />
                                    <WeatherCard
                                        icon={<WiThermometer className="text-3xl text-white" />}
                                        title="Temperature feels like" 
                                        value={Math.round(weather.main.feels_like - 273.15)}
                                        unit="°C"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

Result.propTypes = {
    city: PropTypes.string.isRequired,
};