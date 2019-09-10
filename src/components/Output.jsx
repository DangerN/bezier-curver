import React from 'react'

const Output = props => {
  const {handleOne, handleTwo, animationSpeed} = props
  const animation = {
    animationDuration: `${animationSpeed}s`,
    animationTimingFunction: `cubic-bezier(${handleOne.x}, ${handleOne.y}, ${handleTwo.x}, ${handleTwo.y})`,
  }
  return (
    <div className='output'>
      <div
        className='box'
        style={animation}/>
      <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={'0 0 12 12'}
      id='circle'
      style={animation}>
        <circle cx='6' cy='6' r='5' fill='red'/>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={'0 0 10 10'}
        id='cross'
        style={animation}>
        <line fill='green' stroke='purple' strokeWidth='4' x1='0' y1='5' x2='10' y2='5' />
        <line fill='green' stroke='purple' strokeWidth='4' x1='5' y1='0' x2='5' y2='10' />
        <circle cx='5' cy='2' r='1' fill='white' />
      </svg>
      <div
        id='ghostBox'
        style={animation}/>
      <div
        id='colorBox'
        style={animation}/>
    </div>
  )
}

export default Output
