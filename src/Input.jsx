import PropTypes from 'prop-types';

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
        className="min-w-xl p-2 rounded-md shadow-md border-1 text-black bg-slate-200" // Added text color
        placeholder="Enter city name"
      />
      <button
        className="p-2 ml-2 bg-gray-400  text-white rounded-md shadow-md hover:bg-gray-600" // Changed button color
        onClick={handleSearch} 
      >
        Search
      </button>
    </div>
  );
}

Input.propTypes = {
  setCity: PropTypes.func.isRequired,
};