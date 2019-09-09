import React from 'react'

const Instructions = (props) => {
  const {handleOne, handleTwo, multiplier} = props
  const controlCoordinates = () => {
    return (
      <section>
        cubic-bezier({handleOne.x},  {handleOne.y*multiplier},  {handleTwo.x},  {handleTwo.y*multiplier}) <br/>
      </section>
    )
  }
  return (
    <div className='instructions'>
      {controlCoordinates()}
    </div>
  )
}

export default Instructions
