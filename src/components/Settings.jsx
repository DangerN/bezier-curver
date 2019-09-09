import React from 'react'

const Settings = props => {
  const {dispatch, multiplier, animationSpeed} = props
  const behaviorButtons = () => {
    return (
      <div className='behaviorButtons'>
        <input type='button' value='Auto' disabled></input>
        <input type='button' value='Manual' disabled></input>
      </div>
    )
  }
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
  const multiplierButtons = () => {
    const handleMultiplierClick = event => {
      let newMultiplier = parseInt(/(\d)x/.exec(event.target.value)[1])
      dispatch({type: 'changeMultiplier', multiplier: newMultiplier})
    }
    return (
      <div className='multiplierButtons'>
        <input type='button' value='1x' disabled onClick={handleMultiplierClick}/>
        <input type='button' value='2x' disabled onClick={handleMultiplierClick}/>
        <input type='button'value='5x' disabled onClick={handleMultiplierClick}/>
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
