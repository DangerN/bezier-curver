import { useReducer } from 'react'

function useAppState() {
  const initialState = {
    ham: 'boning',
    x1: null,
    y1: null,
    x2: null,
    y2: null
  }
  function scalePositions({x1, y1, x2, y2}) {
    x1 = (x1 - 25) / 100
    x2 = (x2 - 25) / 100
    y1 = (y1 - 200) / 100
    y2 = (y2 - 200) / 100

    console.log('x1',x1, 'y1', y1, x2, y2);
  }
  function reducer(state, action) {
    console.log(action.positions);
    switch (action.type) {
      case 'updatePositions':
        scalePositions(action.positions)
        return {...state, ...action.positions}
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
