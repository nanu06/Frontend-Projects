import  { useState } from 'react';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const response = await fetch(`https://dummyjson.com/products/search?q=${query}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setResults(data.products);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Search Products</h1>
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <button onClick={handleSearch} style={{ padding: '5px' }}>Search</button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {results.map(result => (
          <li key={result.id} style={{ marginTop: '10px' }}>
            <h2>{result.title}</h2>
            <p>{result.description}</p>
            <p><strong>Price:</strong> ${result.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
