import React from 'react'

const Settings = props => {
  const {dispatch, animationSpeed} = props
  const speedSlider = () => {
    const handleSliderChange = event => {
      dispatch({type: 'changeAnimationSpeed', speed: parseFloat(event.target.value)})
    }
    return (
      <div className='speedSlider'>
        <div>Speed: {animationSpeed}s</div>
        <input onChange={handleSliderChange} value={animationSpeed} type='range' min='0.25' max='8' step='0.25'></input>
      </div>
    )
  }
  return (
    <div className='controls'>
      {speedSlider()}
    </div>
  )
}

export default Settings
