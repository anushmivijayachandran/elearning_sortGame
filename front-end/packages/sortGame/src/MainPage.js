import React, {useState} from 'react';
import { Container } from 'react-bootstrap';
import GameComponent from './Game/GameComponent';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function MainPage() {

  const [score, setScore] = useState(0)
    return (
      <>
        <Container>
        <div className="jumbotron">
          <div style={{display: 'flex',  justifyContent:'center',  height: '100px'}}>
            <h1>Match the pictures on the right with the correct alphabets on the left.</h1>
          </div>

          </div>
          <div>
            <DndProvider backend={HTML5Backend}>

                <h1 style={{textAlign:'center'}}>Your score is {score} out of 26!!!</h1>
              <GameComponent score = {score}/>
              console.log("score:", score);
            </DndProvider>
          </div>
          </Container>
      </>
    );
  }


//export default MainPage;
