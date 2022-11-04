import React from "react";
import {useDispatch,useSelector } from "react-redux"
import {getDetallDog,removeDetali} from '../../actions';
import './detallStyle.css';
import detailDogimg from'./DetailDog.png'
import Carga from "../inicio/Carga"

export default function DetallDog(props){
  const [altura, setaltura]= React.useState({min:"",max:""})
  const Dispatch= useDispatch()
  const state = useSelector((state)=>state.DogDetail)
  React.useEffect(()=>{
    let id=props.match.params.id
    Dispatch(removeDetali())
    Dispatch(getDetallDog(id))
  },[])
  React.useEffect(()=>{
       let altura=state.height&&state.height.imperial.split("-")
        if (altura!==undefined) {
          if (altura.length>1) {
            setaltura({min:altura[0],max:altura[1]})
           }else{
            setaltura({min:altura[0],max:altura[1]})
           }
        }
  },[state])

if (state&&!state.name) {
  return(
    <div>
    <Carga />
    <div className="titel">
      <h2>Dog Details</h2>
    </div>
    <div className={`carga-notDog`}></div>
    </div>
  )
}
  return(
  <div>
    <div className="titel">
      <h2>Dog Details</h2>
    </div>
    <div className="conteiner">
      <div className="i-Text">
        <p>{state.name}</p>
      </div>
      <div className="c-datos">
        <span className="liniaT"></span>
        <span className="liniaP"></span>
        <span className="liniaA"></span>
        <div className="i-imagen">
          <img src={state.image&&state.image.url} />
        </div>
        <div className="i-vida">
          <p>❤️Life:{state.life_span}</p>
        </div>
        <div className="i-peso">
          <p>⚖️weight: {state.weight&&state.weight.imperial} kg</p>
        </div>
        <div  className="c-altura">
          <div className="i-altura">
            <p>min: {altura.min}Cm</p>
            <p>max:{altura.max} Cm</p>
          </div>
          <div className="imgAl">
            <img id="img1" src={detailDogimg} />
            <img  id="img2" src={detailDogimg} />
          </div>
        </div>
        <div className="i-temperam">
          <p>🧬temperament: {state.temperament}</p>
        </div>
         <div className="decription">
          <div className="DecripiTex">
            <p>{state.description}</p>
          </div>
        </div>
        <div className="Decripimg">
            <img src={state.image&&state.image.url} />
          </div>
      </div>
    </div>
  </div>
  )
}
