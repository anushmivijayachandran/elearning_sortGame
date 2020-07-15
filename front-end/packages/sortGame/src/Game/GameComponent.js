import React, { useState, useCallback } from 'react';
import ItemTypes from './ItemTypes';
import './GameComponent.css';
import {Col, Row, Container} from 'react-bootstrap';
import GameImages from './GameImages';
import data_json from '../data.json';
import GameAlphabets from './GameAlphabets';
import './game-alphabet.scss';

export default function GameComponent (){
    const MAX_OPTIONS = 4;
    const MAX_LEVEL = 6;

    const [droppedBoxNames, setDroppedBoxNames] = useState([]);
    const [score, setScore] = useState(0)

    const generateOptions = (maxLevel, maxOptions) => {
      let levels = []
      for (let i=0; i< maxLevel; i++){
        levels.push(genetateOptions(data_json.data, maxOptions))
      }
      console.log("levels:", levels);
      return levels;

    }

    const genetateOptions = (maxValue, len) => {
        let options = [], letters = [], shuffled_options = [];
        for(let i =0; i < len ; i++){
            let randomIndex = Math.floor(Math.random()*maxValue.length);
            let img = data_json.data[randomIndex].img;
            let letter = data_json.data[randomIndex].alphabet;
            if (options.indexOf(img) === -1){
                options.push({img, letter});
                letters.push(letter)
            }
            else {
              i--;
            }

        }

        letters = shuffle(letters).filter(function( element ) {
          return element !== undefined;
        });
        for (let i = 0; i<len; i++){
          let val = {pic: options[i].img, correctAlpha: options[i].letter, alpha : letters[i], lastDropped: '', receivedAlpha: ''};
          shuffled_options.push(val);
        }
        return (shuffled_options);
    }

    const shuffle = (list) => {
        let len = list.length;
        for(let i = 1 ; i <= len; i++){
            let j = Math.floor(Math.random()* len);
            let temp = list[j];
            list[j] = list[i];
            list[i] = temp;
        }
        return list;
    }



     const imageList = useState( () => genetateOptions(data_json.data, MAX_OPTIONS));

     const [lastDropped, setLastDropped] = useState(null)
     const [receivedAlpha, setReceivedAlpha] = useState(null)
     const handleDrop = useCallback((url, alpha, droppedAlpha, index)=>{
       if(droppedAlpha === alpha){
         setScore((score)=>score+1)
       }
       setLastDropped(imageList[0][index].lastDropped=url)
       setReceivedAlpha(imageList[0][index].receivedAlpha=alpha)
       setDroppedBoxNames((droppedBoxNames => [...droppedBoxNames, url]))
   }
   ,[imageList])

    function isDropped(url){
       return droppedBoxNames.indexOf(url) > -1
    }

    return (
      <Container id="game-container">
        {imageList[0].map((val, index) => (
          <Row>
              <Col md={{span:3, offset:2}} className="column column-alphabet">
                <GameAlphabets
                  accept={ItemTypes.PICTURE}
                  name={val.alpha}
                  type={ItemTypes.PICTURE}
                  lastDropped={val.lastDropped}
                  receivedAlpha={val.receivedAlpha}
                  isDropped={isDropped(val.pic)}
                  ind={index}
                  onDrop={ (name, alpha, droppedAlpha)=>handleDrop(name,alpha, droppedAlpha, index)}
                  key={index}
                  />
            </Col>
            <Col className="column column-image" md={3}>
              <GameImages
                name={val.pic}
                correctAlpha={val.correctAlpha}
                shuffledAlpha={val.alpha}
                type={ItemTypes.PICTURE}
                isDropped={isDropped(val.pic)}
                key={index}
              />
            </Col>
            </Row>
        ))}

        <Row>
          <button style ={{marginLeft:'100%', height:'100px', width:'100px'}} onClick={() => window.location.reload(false)}>Next</button>
        </Row>
        {score}
      </Container>
    );
}
