import React, { useState, useEffect} from 'react'

const Output = props => {
  const {handleOne, handleTwo, multiplier} = props
  const animation = {
    animationTimingFunction: `cubic-bezier(${handleOne.x}, ${handleOne.y*multiplier}, ${handleTwo.x}, ${handleTwo.y*multiplier})`,
  }
  return (
    <div className='output'>
      <div
        className='box'
        style={animation}
      >
        bepis
      </div>
      <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={'0 0 10 10'}
      id='circle'
      style={animation}>
        <circle cx='5' cy='5' r='5' fill='red'/>
      </svg>
    </div>
  )
}

export default Output
