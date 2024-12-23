import React, { useState } from "react";
import Header from "./Header";
import Input from "./Input";
import Result from "./Result";

function App() {
  const [city, setCity] = useState(""); // State is managed here

  return (
    <div className="flex flex-col items-center w-screen min-h-screen">
      <Header />
      <Input setCity={setCity} />
      {city === "" ? (
        <p className="mt-4 text-xl text-white font-mono">Please enter a city name</p>
      ) : (
        <p className="mt-4 text-xl text-white font-mono">Selected City: {city.toUpperCase()}</p>
      )}
      <Result city={city} />
    </div>
  );
}

export default App;