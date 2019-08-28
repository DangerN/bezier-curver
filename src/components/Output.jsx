import React, { useState, useEffect} from 'react'

const Output = props => {
  const {handleOne, handleTwo} = props
  let yeet = `cubic-bezier(${handleOne.x}, ${handleOne.y}, ${handleTwo.x}, ${handleTwo.y})`
  console.log(yeet);
  const animation = {
    animationTimingFunction: `cubic-bezier(${handleOne.x}, ${handleOne.y}, ${handleTwo.x}, ${handleTwo.y})`,
    // animationTimingFunction: 'linear',
    color: 'yellow'
  }
  return (
    <div className='output'>
      <div
        className='box'
        style={animation}
      >
        bepis
      </div>
    </div>
  )
}

export default Output
