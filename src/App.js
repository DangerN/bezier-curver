import React from 'react';
import Header from './components/Header'
import Graph from './components/Graph'
import Settings from './components/Settings'
import Instructions from './components/Instructions'
import Output from './components/Output'
import useAppState from './useAppState'

function App() {
  const [appState, dispatch] = useAppState()
  return (
    <div className="App">
      <Header />
      <Graph dispatch={dispatch} height='400' width='200'/>
      <Settings dispatch={dispatch}/>
      <Instructions {...appState}/>
      <Output {...appState}/>
    </div>
  );
}

export default App;
