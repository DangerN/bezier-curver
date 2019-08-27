import React from 'react';
import Header from './components/Header'
import Graph from './components/Graph'
import Settings from './components/Settings'
import Instructions from './components/Instructions'
import Output from './components/Output'

function App() {
  return (
    <div className="App">
      <Header />
      <Graph height='400' width='200'/>
      <Settings />
      <Instructions />
      <Output />
    </div>
  );
}

export default App;
