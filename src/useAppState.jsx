import { useReducer } from 'react'

function useAppState() {
  const initialState = {
    x1: null,
    y1: null,
    x2: null,
    y2: null
  }
  function scalePositions(positions) {
    positions.x1 = (positions.x1 - 12.5)
    positions.x2 = (positions.x2 - 12.5)
    positions.y1 = (0 - positions.y1) - 100
    positions.y2 = (positions.y2)
    console.log(positions);
    return positions
  }
  function reducer(state, action) {
    switch (action.type) {
      case 'updatePositions':
        return {...state, ...scalePositions(action.positions)}
      case 'boning':
        return {...state, ham: 'moaning'}
      case 'moaning':
        return {...state, ham: 'boning'}
      default:
        throw new Error()
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  return [state, dispatch]
}

export default useAppState
