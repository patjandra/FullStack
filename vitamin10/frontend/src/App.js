import { useState } from 'react';
import './App.css';

function App() {
  const [quote, setQuote] = useState('');

  const fetchQuote = async () => {
    try {
      const response = await fetch('https://vitamin10-y7tn.onrender.com/quote'); 
      const data = await response.json();
      setQuote(data.quote);
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  return (
    <div className="App" style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold' }}>Quote of the Day</h1>
      <button
        onClick={fetchQuote}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '18px',
          borderRadius: '8px',
          border: '1px solid black',
          backgroundColor: '#f5f5f5',
          cursor: 'pointer'
        }}
      >
        Get Quote
      </button>
      {quote && (
        <p style={{ marginTop: '50px', fontSize: '24px', maxWidth: '600px', margin: '50px auto' }}>
          {quote}
        </p>
      )}
    </div>
  );
}

export default App;
