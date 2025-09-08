import React, { useState, useEffect } from 'react';
import Header from './components/Header'
import Graph from './components/Graph'
import Settings from './components/Settings'
import Instructions from './components/Instructions'
import Output from './components/Output'
import useAppState from './useAppState'

// Custom media query hook to replace the old dependency
function useMediaQuery(query) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia(query);
        setMatches(mediaQuery.matches);

        const handleChange = (event) => {
            setMatches(event.matches);
        };

        mediaQuery.addEventListener('change', handleChange);

        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, [query]);

    return matches;
}

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
      <Graph dispatch={dispatch} handleOne={appState.handleOne} handleTwo={appState.handleTwo}/>
      <Settings dispatch={dispatch} {...appState}/>
      <Instructions {...appState}/>
      <Output {...appState}/>
      { tooSmall ? tooSmallOverlay() : null}
    </div>
  );
}

export default App;
