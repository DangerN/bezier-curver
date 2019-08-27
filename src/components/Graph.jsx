import React, { useState } from 'react'

const Graph = (props) => {
  const { dispatch } = props
  const initialState = {
    x1: 0,
    x2: 0,
    y1: 0,
    y2: 0,
    draggingPointId: null
  }
  const [ graphState, setGraphState ] = useState(initialState)
  const handleMouseDown = (pointId) => {
    setGraphState({...graphState, draggingPointId: pointId})
  }
  const handleMouseUp = (pointId) => {
    setGraphState({...graphState, draggingPointId: null})
  }
  // const handleMouseMove = ({clientX, clientY}) => {
  const handleMouseMove = (event) => {
    const {clientX, clientY} = event
    const {top, left} =event.target.getBoundingClientRect()
    const { draggingPointId } = graphState
    console.log('x:',clientX-left,'y:',clientY-top)
    if(!draggingPointId) {return}
  }
  return (
    <svg className='graph' width='350' height='350'
      onMouseMove={event=>{handleMouseMove(event)}}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}>
      <rect x='25' y='25' height='300' width='300' fill='none' stroke='black' strokeWidth='5'/>
      <circle cx='25' cy='325' r='10' fill='red'/>
      <circle cx='325' cy='25' r='10' fill='red'/>
      <circle cx={graphState.x1} cy={graphState.x2} r='10' fill='hotpink' onMouseDown={()=>{handleMouseDown('x1')}}/>
    </svg>
  )
}

export default Graph
