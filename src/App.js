import React from 'react';
import Header from './components/Header'
import Graph from './components/Graph'
import Controls from './components/Controls'
import Instructions from './components/Instructions'
import Output from './components/Output'

function App() {
  return (
    <div className="App">
      <Header />
      <Graph />
      <Controls />
      <Instructions />
      <Output />
    </div>
  );
}

export default App;
