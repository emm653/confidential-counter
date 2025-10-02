import React from 'react';
import Counter from './Counter'; 
import ConfidentialCounterABI from './abis/ConfidentialCounter.json';
console.log("ABI Loaded:", ConfidentialCounterABI);


function App() {
  return (
    <div>
      <h1>Confidential Counter App</h1>
      <Counter />
    </div>
  );
}

export default App;
