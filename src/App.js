import React, { useState, useEffect } from "react";
import { FaGlobeAsia, FaFlag, FaSun, FaMoon } from "react-icons/fa";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === "true";
  });

  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const extraInfo = {
      Bangladesh: { note: "Famous for its rich culture and history." },
      India: { note: "Second most populous country in the world." },
      USA: { note: "Known for diverse culture and economy." },
    };

    setLoading(true);
    setError(null);

    fetch(
      "https://restcountries.com/v3.1/all?fields=name,capital,region,population,area,flags,currencies,languages"
    )
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        const sorted = data
          .map((c) => {
            const name = c.name.common;
            const currency = c.currencies
              ? Object.values(c.currencies)
                  .map((cur) => cur.name)
                  .join(", ")
              : "💰 Not Available";
            const language = c.languages
              ? Object.values(c.languages).join(", ")
              : "🗣️ Not Available";
            return {
              name,
              capital: c.capital ? c.capital[0] : "No Capital",
              region: c.region,
              population: c.population,
              area: c.area,
              flag: c.flags?.png || "",
              currency,
              language,
              note:
                extraInfo[name]?.note ||
                `ℹ️ ${name} is a country located in ${c.region}.`,
            };
          })
          .sort((a, b) => a.name.localeCompare(b.name));
        setCountries(sorted);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch countries. Try again later.");
        setLoading(false);
      });
  }, []);

  const filteredCountries = countries.filter((c) =>
    `${c.name} ${c.capital}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen p-5 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 text-gray-800 dark:text-gray-100 transition-colors duration-500">
      {/* Header */}
      <div className="bg-purple-700 dark:bg-purple-900 text-white py-6 rounded-lg mb-6 shadow-md flex flex-col items-center justify-center space-y-2 relative">
        <div className="flex items-center space-x-4">
          <FaGlobeAsia className="text-4xl animate-bounce" />
          <h1 className="text-5xl font-extrabold font-serif tracking-wide drop-shadow-lg animate-fade-in">
            Country Info
          </h1>
          <FaFlag className="text-4xl animate-bounce" />
        </div>
        <p className="text-sm font-light">Created by Rimon</p>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute top-4 right-4 text-xl p-2 rounded-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-800 dark:hover:bg-purple-700 transition"
          title="Toggle Theme"
        >
          {darkMode ? <FaSun className="text-yellow-300" /> : <FaMoon />}
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by country or capital..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-md p-3 rounded-md mb-6 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 mx-auto block bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition duration-300"
      />

      {/* Status */}
      {loading && (
        <p className="text-center text-lg font-semibold text-purple-800 dark:text-purple-300 animate-pulse">
          Loading countries...
        </p>
      )}
      {error && <p className="text-center text-red-600">{error}</p>}

      {/* List */}
      {!loading && !error && (
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 overflow-y-auto max-h-[400px]">
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country) => (
              <div
                key={country.name}
                className="p-2 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-800 rounded transform transition duration-200 hover:scale-[1.02]"
                onClick={() => setSelectedCountry(country)}
              >
                {country.name}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No country found
            </p>
          )}
        </div>
      )}

      {/* Country Details */}
      {selectedCountry && (
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 mt-6 animate-fade-in">
          <h2 className="text-3xl font-bold mb-4 text-center">
            {selectedCountry.name}
          </h2>
          <img
            src={selectedCountry.flag}
            alt={`${selectedCountry.name} flag`}
            className="w-32 mb-4 mx-auto rounded shadow"
          />
          <p>
            <strong>🏛️ Capital:</strong>{" "}
            <span className="text-purple-700 dark:text-purple-400">
              {selectedCountry.capital}
            </span>
          </p>
          <p>
            <strong>🌍 Region:</strong>{" "}
            <span className="text-purple-700 dark:text-purple-400">
              {selectedCountry.region}
            </span>
          </p>
          <p>
            <strong>👥 Population:</strong>{" "}
            <span className="text-purple-700 dark:text-purple-400">
              {selectedCountry.population.toLocaleString()}
            </span>
          </p>
          <p>
            <strong>📐 Area:</strong>{" "}
            <span className="text-purple-700 dark:text-purple-400">
              {selectedCountry.area.toLocaleString()} km²
            </span>
          </p>
          <p>
            <strong>💰 Currency:</strong>{" "}
            <span className="text-green-700 dark:text-green-400">
              {selectedCountry.currency}
            </span>
          </p>
          <p>
            <strong>🗣️ Language:</strong>{" "}
            <span className="text-green-700 dark:text-green-400">
              {selectedCountry.language}
            </span>
          </p>

          {selectedCountry.note && (
            <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded shadow">
              <strong>Note:</strong> {selectedCountry.note}
            </div>
          )}

          {selectedCountry.capital !== "No Capital" && (
            <a
              href={`https://www.google.com/maps/search/${selectedCountry.capital}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-300 underline mt-4 block"
            >
              📍 View {selectedCountry.capital} on Google Maps
            </a>
          )}

          <button
            onClick={() => setSelectedCountry(null)}
            className="mt-6 px-6 py-2 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold rounded-lg hover:scale-105 transform transition"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default App;

