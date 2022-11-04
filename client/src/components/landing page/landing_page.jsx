import React from "react";
import { Link } from 'react-router-dom';
import './landing.css'
import dog from './img/dog5.png'
import patita from './img/patita.png'
import draw from './patitasDraw'
export default function  Landing_page(){
  React.useEffect(() => {
    draw.start()
  },[])
  function stopDraw(){
    draw.stop()
  }
  return(
    <div className="cont">
      <div className="c-draw">
        <canvas id="canvas"   width= "10000" height= "10000" ></canvas>
        <img id="img" src={patita}/>
      </div>
      <div className="c-img">
        <div className="it-img">
        <img src={dog} />
        </div>
      </div>
      <div className="c-cont">
      <div className ='ltg'><p> g</p></div>
      <div className="cont-Text"> 
        <h1>Do </h1>
        <p>look at the cute ...</p>    
        <div className='c-button'>
          <Link to="/Dogs">
            <button onClick={stopDraw}  type="button">Start</button>
          </Link>
        </div>
      </div>
      </div>
      <div className ='footer'> 
      </div>
 
    </div>
  )
}