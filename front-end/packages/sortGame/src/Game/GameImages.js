import React from 'react'
import { useDrag } from 'react-dnd'
// import './GameComponent.css'
import { Image } from 'react-bootstrap';
const style = {
  paddingBottom: '1.5rem',
  marginRight: '0.5px',
  marginTop: '1.5rem',
  cursor: 'move',
  height: '200px',
  width: '200px'
}

export const Box = ({ name, correctAlpha, type, alpha, isDropped }) => {
  const [{ opacity }, drag] = useDrag({
    item: { name, type, correctAlpha,  alpha },

    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1
    }),
  })
  return (
    <div>
      {isDropped ?<br /> : <img className='imageDiv' ref={drag} style={{...style, opacity }} fluid alt="Not available" src={name} />}

  </div>
  )
}

export default Box;
