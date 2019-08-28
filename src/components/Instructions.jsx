import React from 'react'

const Instructions = (props) => {
  const {handleOne, handleTwo} = props
  const controlCoordinates = () => {
    return (
      <section>
        {handleOne.x}  {handleOne.y}  {handleTwo.x}  {handleTwo.y} <br/>
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
