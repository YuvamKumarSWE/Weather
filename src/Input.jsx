import React from "react";

export default function Input({ setCity }) {
  const handleSearch = () => {
    
    const inputValue = document.getElementById("city-input").value;
    setCity(inputValue);
    console.log(`Searching for weather in: ${inputValue}`);
  };

  return (
    <div className="w-full flex justify-center m-10">
      <input
        type="text"
        id="city-input"
        className="w-1/2 p-2 rounded-md shadow-md"
        placeholder="Enter city name"
      />
      <button
        className="p-2 ml-2 bg-blue-500 text-white rounded-md shadow-md"
        onClick={handleSearch} 
      >
        Search
      </button>
    </div>
  );
}