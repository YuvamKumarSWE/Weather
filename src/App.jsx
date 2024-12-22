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
      <p className="mt-4 text-lg">Selected City: {city}</p>
      <Result city={city} />
    </div>
  );
}

export default App;