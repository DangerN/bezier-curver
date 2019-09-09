import React, { useState, useEffect} from 'react'

const Output = props => {
  const {handleOne, handleTwo, multiplier, animationSpeed} = props
  const animation = {
    animationDuration: `${animationSpeed}s`,
    animationTimingFunction: `cubic-bezier(${handleOne.x}, ${handleOne.y*multiplier}, ${handleTwo.x}, ${handleTwo.y*multiplier})`,
  }
  return (
    <div className='output'>
      <div
        className='box'
        style={animation}/>
      <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={'0 0 10 10'}
      id='circle'
      style={animation}>
        <circle cx='5' cy='5' r='5' fill='red'/>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={'0 0 10 10'}
        id='cross'
        style={animation}>
        <line fill='green' stroke='purple' strokeWidth='4' x1='0' y1='5' x2='10' y2='5' />
        <line fill='green' stroke='purple' strokeWidth='4' x1='5' y1='0' x2='5' y2='10' />
      </svg>
    </div>
  )
}

export default Output
