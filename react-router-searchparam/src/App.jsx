import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const App = () => {
  const [input, setInput] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setSearchParams({ query: input });
    }
  };

  return (
    <div className="container">
      <h1>React-Router-SearchParams</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter something"
        />
        <button type="submit">Submit</button>
      </form>
      <p>Query Param: {searchParams.get('query') || 'None'}</p>
    </div>
  );
};

export default App;
