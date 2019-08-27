import React from 'react'
import useAppState from '../useAppState'

const Settings = () => {
  const [state, dispatch] = useAppState()
  function thething() {
    console.log(state.ham);
    return (
      <button onClick={_=>dispatch({type: state.ham})} label={state.ham} >{state.ham}</button>
    )
  }
  return (
    <div className='controls'>
     { thething() }
    </div>
  )
}

export default Settings
