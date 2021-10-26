import React, { useState } from "react";

const App = () => {
  const [number, setNumber] = useState(0);
  const [delay, setDelay] = useState(0);

 

  const handleFetch = () => {
    fetch("https://random-data-api.com/api/stripe/random_stripe").then(
      (response) => {
        response.json()
        .then((data) => console.log(data));
      }
    );
  }

  const handleStart = () => {
    for(let i = 0; i < number; i++){
      setTimeout(handleFetch, (delay * 1000) * i)
    } 
  }
 

  return (
    <div className="App">
      <div className="pair">
        <label htmlFor="number">Enter Number of fetch requests: </label>
        <input
          type="number"
          id="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>
      <div className="pair">
        <label htmlFor="times">How long between each request (s): </label>
        <input
          type="number"
          id="times"
          value={delay}
          onChange={(e) => setDelay(e.target.value)}
        />
      </div>
      <button onClick={handleStart}>Start</button>
    </div>
  );
};

export default App;
