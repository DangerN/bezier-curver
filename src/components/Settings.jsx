import React from 'react'

const Settings = props => {
  const {dispatch, multiplier} = props
  const behaviorButtons = () => {
    return (
      <div className='behaviorButtons'>
        <input type='button' value=''></input>
      </div>
    )
  }
  const speedSlider = () => {
    return (
      <div className='speedSlider'>
        <input type='range' min='0.5' max='12' step='0.25'></input>
      </div>
    )
  }
  const multiplierButtons = () => {
    const handleMultiplierClick = event => {
      let yeet = parseInt(/(\d)x/.exec(event.target.value)[1])
      console.log(yeet);
    }
    return (
      <div className='multiplierButtons'>
        <input type='button' value='1x' onClick={handleMultiplierClick}/>
        <input type='button' value='2x' onClick={handleMultiplierClick}/>
        <input type='button'value='5x' onClick={handleMultiplierClick}/>
      </div>
    )
  }
  return (
    <div className='controls'>
      {speedSlider()}
      {behaviorButtons()}
      {multiplierButtons()}
    </div>
  )
}

export default Settings
