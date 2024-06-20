import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { debounce } from "lodash";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const fetchResults = async (searchQuery) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${searchQuery}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setResults(data.products);
      setSuggestions(data.products);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  const debouncedFetchResults = useCallback(
    debounce((nextQuery) => fetchResults(nextQuery), 300),
    []
  );

  useEffect(() => {
    if (query) {
      debouncedFetchResults(query);
    } else {
      setSuggestions([]);
      setResults([]);
    }
  }, [query, debouncedFetchResults]);

  const handleSearch = () => {
    setShowResults(true);
    fetchResults(query);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Search Products</h1>
        <div className="flex mb-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white p-2 mx-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            Search
          </button>
        </div>
        {loading && <p className="text-blue-500">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <ul>
          {!showResults &&
            suggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                className="mb-2 p-2 border rounded-lg bg-gray-50"
              >
                <h2 className="text-md font-mono">{suggestion.title}</h2>
              </li>
            ))}
        </ul>
        <ul>
          {showResults &&
            results.map((result) => (
              <li
                key={result.id}
                className="mb-4 p-4 border rounded-lg bg-gray-50"
              >
                <h2 className="text-xl font-bold">{result.title}</h2>
                <p>{result.description}</p>
                <p className="font-semibold mt-2">Price: ${result.price}</p>
              </li>
            ))}
        </ul>
      </div>
      <div className="fixed bottom-0 left-0 w-full bg-white p-4 border-t text-center">
        <Link
          to="/"
          className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Search;
