import React from 'react'
import noinfomeme from '../resources/noinfomeme.jpg'
const Header = props => {
  const {infoOpen, dispatch} = props
  return (
    <header className={infoOpen ? 'infoOpen' : 'infoClosed'}>
      <div id='pog'>
        <div onClick={()=>dispatch({type: 'toggleInfo'})} id='infocon'>ⓘ</div>
        <img id='meme' src={noinfomeme} alt='no info available'/>
      </div>
    </header>
  )
}

export default Header
