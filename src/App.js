import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";

const App = () => {
  const [number, setNumber] = useState(0);
  const [delay, setDelay] = useState(0);
  const [times, setTimes] = useState([])
  const [average, setAverage] = useState(0)

  const handleFetch = () => {
    const start = performance.now();
    fetch("https://random-data-api.com/api/stripe/random_stripe").then(
      (response) => {
        response.json().then((data) => console.log(data));
      }
    );
    const end = performance.now();
    const elapsedTime = end - start;
    setTimes(prev => [...prev, elapsedTime])
  };

  const handleStart = () => {
    setTimes([])
    for (let i = 0; i < number; i++) {
      setTimeout(handleFetch, delay * 1000 * i);
    }
  };

  useEffect(()=>{
    let sum =times.reduce((a, b) => a + b, 0 ).toFixed(2)
    console.log(sum)
    setAverage(sum / times.length)
  }, [setAverage, times])



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
        <label htmlFor="times">How long between each request (in seconds): </label>
        <input
          type="number"
          id="times"
          value={delay}
          onChange={(e) => setDelay(e.target.value)}
        />
      </div>
      <h2>Average time: {average.toFixed(2)}s</h2>
      <button onClick={handleStart}>Start</button>
    </div>
  );
};

export default App;
