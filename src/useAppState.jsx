import { useReducer } from 'react'

function useAppState() {
  const initialState = {
    handleOne: {x: 0.5, y: 0.5},
    handleTwo: {x: 0.5, y: 0.5}
  }
  function scalePositions(positions) {
    return positions
  }
  function reducer(state, action) {
    switch (action.type) {
      case 'handleOne':
        return {...state, [action.type]: {
          x: ((action.x-25)/100).toFixed(2),
          y: ((-(action.y-200))/100).toFixed(2)
        }}
      case 'handleTwo':
        return {...state, [action.type]: {
          x: ((action.x-25)/100).toFixed(2),
          y: ((-(action.y-200))/100).toFixed(2)
        }}
      default:
        console.log('wowee an error', action);
        throw new Error()
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  return [state, dispatch]
}

export default useAppState
