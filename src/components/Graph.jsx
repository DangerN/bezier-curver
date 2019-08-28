import React, { useState, useEffect } from 'react'

const Graph = (props) => {
  const {height, width, dispatch} = props
  const initialState = {
    handleOne: {
      x: 40,
      y: 40
    },
    handleTwo: {
      x: 70,
      y: 70
    },
    draggingPointId: null
  }
  const [ graphState, setGraphState ] = useState(initialState)
  useEffect(() => {
    dispatch({
      type: 'updatePositions',
      positions: {
        x1: graphState.handleOne.x,
        y1: graphState.handleOne.y,
        x2: graphState.handleTwo.x,
        y2: graphState.handleTwo.y
      }
    })
  },[graphState.handleOne.x, graphState.handleOne.y, graphState.handleTwo.x, graphState.handleTwo.y])
  const handleMouseDown = (pointId) => {
    setGraphState({...graphState, draggingPointId: pointId})
  }
  const handleMouseUp = (pointId) => {
    setGraphState({...graphState, draggingPointId: null})
  }
  const handleMouseMove = (event) => {
    const { draggingPointId } = graphState
    if(!draggingPointId) {return}
    const {clientX, clientY} = event
    const svgRect = event.currentTarget.getBoundingClientRect()
    const svgX = clientX - svgRect.left
    const svgY = clientY - svgRect.top
    const viewBoxX = svgX * 150 / svgRect.width;
    const viewBoxY = svgY * 300 / svgRect.height;
    viewBoxX > 125 ? viewBoxX = 125 : viewBoxX
    
    setGraphState({...graphState, [draggingPointId]: {x: viewBoxX, y: viewBoxY}})
  }
  const path = `
    M 25, 200
    C ${graphState.handleOne.x},${graphState.handleOne.y}
      ${graphState.handleTwo.x},${graphState.handleTwo.y}
      125,100
  `
  return (
    <svg className='graph'
      xmlns="http://www.w3.org/2000/svg"
      width={width} height={height}
      viewBox={`0 0 150 300`}
      onMouseMove={event=>{handleMouseMove(event)}}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}>
      <rect x='25' y='100' height='100' width='100' fill='none' stroke='black' strokeWidth='5'/>
      <line x1={graphState.handleOne.x} y1={graphState.handleOne.y} x2='25' y2='200' stroke='black' strokeWidth='5'/>
      <line x1={graphState.handleTwo.x} y1={graphState.handleTwo.y} x2='125' y2='100' stroke='black' strokeWidth='5'/>
      <circle cx='25' cy='200' r='5' fill='red'/>
      <circle cx='125' cy='100' r='5' fill='red'/>
      <circle className='handle' cx={graphState.handleOne.x} cy={graphState.handleOne.y} r='10' fill='hotpink' onMouseDown={()=>{handleMouseDown('handleOne')}}/>
      <circle className='handle' cx={graphState.handleTwo.x} cy={graphState.handleTwo.y} r='10' fill='hotpink' onMouseDown={()=>{handleMouseDown('handleTwo')}}/>
      <path stroke='red' fill='none'
        d={path}
      />
    </svg>
  )
}

export default Graph
