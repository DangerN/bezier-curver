import React from 'react'
import useAppState from '../useAppState'

const Output = () => {
  const [state, dispatch] = useAppState()
  function thething() {
    console.log(state.ham);
    return (
      <button onClick={_=>dispatch({type: state.ham})} label={state.ham} >{state.ham}</button>
    )
  }
  return (
    <div className='output'>
      { thething() }
    </div>
  )
}

export default Output
