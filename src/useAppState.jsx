import { useReducer } from 'react'

function useAppState() {
  const initialState = {
    ham: 'boning',
  }
  function reducer(state, action) {
    console.log(action.type);
    switch (action.type) {
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
