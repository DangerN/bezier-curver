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

  Instructions.defaultProps = {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
  }
