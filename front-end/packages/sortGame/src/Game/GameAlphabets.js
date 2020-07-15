import React from 'react'
import { useDrop } from 'react-dnd'
import ItemTypes from './ItemTypes';

const style = {
  color: 'white',
  marginLeft: '0.5px',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
  height: '150px',
  width: '150px'
}
export const Alphabet = ({accept, name, type, onDrop, lastDropped, receivedAlpha, isDropped}) => {
  const [{ canDrop, isOver}, drop] = useDrop({
    accept: accept,
    drop(item,monitor){onDrop(item.name, item.correctAlpha,name)
    return {name: name,
    lastDropped: item.name,
alpha: name}
    },
    canDrop(item, monitor){
      if(receivedAlpha!==''){
        return false
      }
      return true

    },
    collect: (monitor) => (
      {
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    }),})
  const isActive = canDrop && isOver
  let backgroundColor = '#222'
  if (isActive) {
    backgroundColor = 'grey'
  } else if (canDrop) {
    backgroundColor = 'teal'
  }

  function answerCheck(){
    if (receivedAlpha === name){
      return (<span style={{fontSize:"20px"}}>&#9989;</span>)
    }
    else if(receivedAlpha === "") {
      return
    }
    else{
      return (<span style={{fontSize:"20px"}}>&#10060;</span>)
    }
  }
  return (
    <div>
      <b className='alphabetDiv' ref={drop} style={{...style,backgroundColor }}>{name}</b>
    {lastDropped ? <img className='imageDiv1' style={{height:"50px", width:"50px" }} fluid alt="Not available" src={lastDropped} /> : <br/>}
      {answerCheck()}
    </div>

  )
}

export default Alphabet;
