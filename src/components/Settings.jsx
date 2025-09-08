import React, { useState, useEffect } from 'react'

const Settings = props => {
  const {dispatch, animationSpeed, handleOne, handleTwo} = props
  
  // Local state for input values while user is typing
  const [inputValues, setInputValues] = useState({
    handleOne: { x: handleOne.x, y: handleOne.y },
    handleTwo: { x: handleTwo.x, y: handleTwo.y }
  })

  // Update local state when props change (from graph handles)
  useEffect(() => {
    setInputValues({
      handleOne: { x: handleOne.x, y: handleOne.y },
      handleTwo: { x: handleTwo.x, y: handleTwo.y }
    })
  }, [handleOne.x, handleOne.y, handleTwo.x, handleTwo.y])
  
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

  const handleInputChange = (handle, coordinate, value) => {
    // Update local state immediately for smooth typing
    setInputValues(prev => ({
      ...prev,
      [handle]: {
        ...prev[handle],
        [coordinate]: value
      }
    }))
  }

  const handleInputBlur = (handle, coordinate, value) => {
    // Validate and clamp when user finishes editing
    let clampedValue = parseFloat(value) || 0
    if (coordinate === 'x') {
      clampedValue = Math.max(0, Math.min(1, clampedValue))
    }
    dispatch({
      type: 'setHandleValue',
      handle,
      coordinate,
      value: clampedValue
    })
  }

  const handleInputKeyPress = (e, handle, coordinate, value) => {
    if (e.key === 'Enter') {
      e.target.blur() // This will trigger the onBlur validation
    }
  }

  const handleReset = () => {
    dispatch({type: 'resetHandles'})
  }

  const bezierInputs = () => {
    return (
      <div className='bezierInputs'>
        <div className='inputGroup'>
          <label>Handle 1:</label>
          <div className='inputPair'>
            <div className='inputField'>
              <label htmlFor='h1x'>x:</label>
              <input
                id='h1x'
                type='number'
                min='0'
                max='1'
                step='0.01'
                value={inputValues.handleOne.x}
                onChange={(e) => handleInputChange('handleOne', 'x', e.target.value)}
                onBlur={(e) => handleInputBlur('handleOne', 'x', e.target.value)}
                onKeyPress={(e) => handleInputKeyPress(e, 'handleOne', 'x', e.target.value)}
              />
            </div>
            <div className='inputField'>
              <label htmlFor='h1y'>y:</label>
              <input
                id='h1y'
                type='number'
                step='0.01'
                value={inputValues.handleOne.y}
                onChange={(e) => handleInputChange('handleOne', 'y', e.target.value)}
                onBlur={(e) => handleInputBlur('handleOne', 'y', e.target.value)}
                onKeyPress={(e) => handleInputKeyPress(e, 'handleOne', 'y', e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <div className='inputGroup'>
          <label>Handle 2:</label>
          <div className='inputPair'>
            <div className='inputField'>
              <label htmlFor='h2x'>x:</label>
              <input
                id='h2x'
                type='number'
                min='0'
                max='1'
                step='0.01'
                value={inputValues.handleTwo.x}
                onChange={(e) => handleInputChange('handleTwo', 'x', e.target.value)}
                onBlur={(e) => handleInputBlur('handleTwo', 'x', e.target.value)}
                onKeyPress={(e) => handleInputKeyPress(e, 'handleTwo', 'x', e.target.value)}
              />
            </div>
            <div className='inputField'>
              <label htmlFor='h2y'>y:</label>
              <input
                id='h2y'
                type='number'
                step='0.01'
                value={inputValues.handleTwo.y}
                onChange={(e) => handleInputChange('handleTwo', 'y', e.target.value)}
                onBlur={(e) => handleInputBlur('handleTwo', 'y', e.target.value)}
                onKeyPress={(e) => handleInputKeyPress(e, 'handleTwo', 'y', e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <button className='resetButton' onClick={handleReset}>
          Reset to Default
        </button>
      </div>
    )
  }

  return (
    <div className='controls'>
      {speedSlider()}
      {bezierInputs()}
    </div>
  )
}

export default Settings
