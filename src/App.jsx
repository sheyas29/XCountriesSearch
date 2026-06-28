import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');

  const filteredCountries = countries.filter((p) =>
    p?.common?.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    async function fetchCountries() {
      const url =
        'https://countries-search-data-prod-812920491762.asia-south1.run.app/countries';
      try {
        const response = await axios.get(url);
        setCountries(response.data);
      } catch (err) {
        console.error('Error fetching countries:', err);
      }
    }

    fetchCountries();
  }, []);

  return (
    <>
      <div className="container">
        <label htmlFor="search">
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            name="search"
            value={search}
            placeholder="Search for countries..."
          />
        </label>

        <div className="countries-grid">
          {filteredCountries.map((c) => {
            const countryName = c?.common || 'Unknown Country';

            return (
              <div key={countryName} className="countryCard">
                <img
                  src={c?.png}
                  alt={`Flag of ${countryName}`}
                  width="150"
                  height="100"
                  loading="lazy"
                />
                <p>{countryName}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
