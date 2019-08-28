import React from 'react'

const Instructions = (props) => {
  const {x1, x2, y1, y2} = props
  console.log(props);
  const controlCoordinates = () => {
    
    return (
      <section>

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
