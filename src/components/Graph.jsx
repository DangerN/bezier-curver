import React, { useState, useEffect } from 'react'
import clamp from 'lodash.clamp'

const Graph = (props) => {
  const {dispatch, multiplier, handleOne, handleTwo} = props
  const initialState = {
    handleOne: {
      x: handleOne.x*100+25,
      y: ((-(handleOne.y*100))+275)
    },
    handleTwo: {
      x: handleTwo.x*100+25,
      y: ((-(handleTwo.y*100))+275)
    },
    draggingPointId: null
  }
  const [ graphState, setGraphState ] = useState(initialState)
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
    const viewBoxY = svgY * 450 / svgRect.height;
    const xPosition = clamp(viewBoxX, 25, 125)
    const yPosition = clamp(viewBoxY, 15, 435)
    setGraphState({...graphState, [draggingPointId]: {x: xPosition, y: yPosition}})
    dispatch({
      type: draggingPointId,
      x: xPosition,
      y: yPosition
    })
  }
  const path = () =>
  {
    console.log(graphState.handleOne.y*multiplier, graphState.handleTwo.y*multiplier);
    return (`
      M 25, 275
      C ${graphState.handleOne.x},${graphState.handleOne.y*multiplier}
        ${graphState.handleTwo.x},${graphState.handleTwo.y*multiplier}
        125,175
    `)
  }
  // const path = `
  //   M 25, 275
  //   C ${graphState.handleOne.x},${graphState.handleOne.y*multiplier}
  //     ${graphState.handleTwo.x},${graphState.handleTwo.y*multiplier}
  //     125,175
  // `
  return (
    <svg className='graph'
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 150 450`}
      onMouseMove={event=>{handleMouseMove(event)}}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}>
      <rect x='25' y='175' height='100' width='100' fill='none' stroke='black' strokeWidth='2'/>
      <line x1={graphState.handleOne.x} y1={graphState.handleOne.y} x2='25' y2='275' stroke='black' strokeWidth='2'/>
      <line x1={graphState.handleTwo.x} y1={graphState.handleTwo.y} x2='125' y2='175' stroke='black' strokeWidth='2'/>
      <circle cx='25' cy='275' r='5' fill='red'/>
      <circle cx='125' cy='175' r='5' fill='red'/>
      <path stroke='red' fill='none'
      d={path()}
      />
      <circle className='handle' cx={graphState.handleOne.x} cy={graphState.handleOne.y} r='10' fill='hotpink' onMouseDown={()=>{handleMouseDown('handleOne')}}/>
      <circle className='handle' cx={graphState.handleTwo.x} cy={graphState.handleTwo.y} r='10' fill='hotpink' onMouseDown={()=>{handleMouseDown('handleTwo')}}/>
    </svg>
  )
}

export default Graph

Graph.defaultProps = {
  handleOne: {x: 0.25, y: 0.25},
  handleTwo: {x: 0.75, y: 0.75},
  multiplier: 1,
}
