import React from 'react';
import Header from './components/Header'
import Graph from './components/Graph'
import Settings from './components/Settings'
import Instructions from './components/Instructions'
import Output from './components/Output'
import useMediaQuery from 'use-media-query-hook'
import useAppState from './useAppState'

function App() {
  const [appState, dispatch] = useAppState()
  const tooSmall = useMediaQuery('(max-width: 650px)')
  console.log(tooSmall);
  const tooSmallOverlay = () => {
    return (
      <div className='too-small'>
        This app requires a larger screen. Please visit on desktop.
      </div>
    )
  }
  return (
    <div className="App">
      <Header infoOpen={appState.infoOpen} dispatch={dispatch}/>
      <Graph dispatch={dispatch} multiplier={appState.multiplier}/>
      <Settings dispatch={dispatch} {...appState}/>
      <Instructions {...appState}/>
      <Output {...appState}/>
      { tooSmall ? tooSmallOverlay() : null}
    </div>
  );
}

export default App;
