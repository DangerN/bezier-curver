import React from 'react'

const Instructions = (props) => {
  const {handleOne, handleTwo} = props
  const controlCoordinates = () => {
    return (
      <section style={{alignSelf: 'center'}}>
        cubic-bezier({handleOne.x},  {handleOne.y},  {handleTwo.x},  {handleTwo.y}) <br/>
        <p style={{color: 'grey'}}>prototype: cubic-bezier(x1, y1, x2, y2)</p>
      </section>
    )
  }
  const instructions = () => {
    return (
      <p>
        This page helps visualize the cubic-bezier animation timing funtion. The values specified are control points. There some things to note about the cubic-bezier in the context of CSS.
        <br/>
        <br/>
        The x-axis represents the beginning and end of the animation. Valid x values are between 0 and 1.
        <br/>
        The y-axis represents how complete the animation is. Both positive and negative value are valid.
        <br/>
        <br/>
        The function can make an animation go past its end values generating some interesting effects. Generated values will be clamped if they fall outside valid ranges for the specified rule. For example opacity will be clamped between 0 and 1 even if the function specifies differently.
      </p>
    )
  }
  return (
    <div className='instructions'>
      {controlCoordinates()}
      {instructions()}
    </div>
  )
}

export default Instructions
