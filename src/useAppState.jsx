import { useReducer } from 'react'

function useAppState() {
  const initialState = {
    handleOne: {x: 0.25, y: 0.25},
    handleTwo: {x: 0.75, y: 0.75},
    multiplier: 1,
    animationSpeed: 2,
    autoPlay: true
  }
  function scalePositions(positions) {
    return positions
  }
  function reducer(state, action) {
    switch (action.type) {
      case 'handleOne':
        return {...state, [action.type]: {
          x: ((action.x-25)/100).toFixed(2),
          y: ((-(action.y-275))/100).toFixed(2)*state.multiplier
        }}
      case 'handleTwo':
        return {...state, [action.type]: {
          x: ((action.x-25)/100).toFixed(2),
          y: ((-(action.y-275))/100).toFixed(2)*state.multiplier
        }}
      case 'changeMultiplier':
        return {...state, multiplier: action.multiplier}
      case 'changeAnimationSpeed':
        return {...state, animationSpeed: action.speed}
      default:
        console.log('wowee an error', action);
        throw new Error()
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  return [state, dispatch]
}

export default useAppState
