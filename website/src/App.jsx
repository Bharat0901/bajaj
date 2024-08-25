import React, { useState } from 'react';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [response, setResponse] = useState(null);

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      // Replace the API URL with your actual backend URL
      const result = await fetch('https://bajaj-6gyx.onrender.com/bfhl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsedInput),
      });
      const data = await result.json();
      console.log('API Response:', data);
      setResponse(data);

    } catch (error) {
      console.error('Invalid JSON or API Error:', error);
    }
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    if (!selectedFilters.includes(value)) {
      setSelectedFilters([...selectedFilters, value]);
    }
  };

  const removeFilter = (filter) => {
    setSelectedFilters(selectedFilters.filter(item => item !== filter));
  };

  const renderResponse = () => {
    if (!response) return <div className="empty-result-box">Results will appear here</div>;

    return (
      <div className="result-box">
        {selectedFilters.includes('Numbers') && response.numbers.length > 0 && (
          <p>Numbers: {response.numbers.join(', ')}</p>
        )}
        {selectedFilters.includes('Alphabets') && response.alphabets.length > 0 && (
          <p>Alphabets: {response.alphabets.join(', ')}</p>
        )}
        {selectedFilters.includes('Highest lowercase alphabet') && response.highest_lowercase_alphabet.length > 0 && (
          <p>Highest Lowercase Alphabet: {response.highest_lowercase_alphabet.join(', ')}</p>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>API Input and Filter</h1>
      <textarea
        className="input-box"
        placeholder='Enter JSON data here'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      <button className="submit-button" onClick={handleSubmit}>Submit</button>
      <div className="filter-container">
        <select className="filter-dropdown" onChange={handleFilterChange}>
          <option value="">Select Filter</option>
          <option value="Numbers">Numbers</option>
          <option value="Alphabets">Alphabets</option>
          <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
        </select>
        <div className="selected-filters">
          {selectedFilters.map(filter => (
            <span key={filter} className="filter-tag">
              {filter} <button className="remove-button" onClick={() => removeFilter(filter)}>x</button>
            </span>
          ))}
        </div>
      </div>
      {renderResponse()}
    </div>
  );
}

export default App;
