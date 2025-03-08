import { useState } from "react";
import Header from "./Header";
import Input from "./Input";
import Result from "./Result";

function App() {
  const [city, setCity] = useState(""); // State is managed here

  return (
    <div
      className="flex flex-col items-center w-screen min-h-screen "
      style={{ backgroundImage: "url('/bg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <Header />
      <Input setCity={setCity} />
      <div className="mt-4 text-xl font-mono text-white">
        {city === "" ? (
          <p className="text-gray-800">Please enter a city name</p>
        ) : (
          <p className="text-white">Selected City: {city.toUpperCase()}</p>
        )}
      </div>
      <Result city={city} />
    </div>
  );
}

export default App;