import React from "react";
import {useDispatch,useSelector } from "react-redux";
import {getTemperament} from '../../actions';
import './CreatTemp.css'
import validesfurm from './validacionFromu'
import imgFurm from './fondoFormulari.png'
import Carga from "../inicio/Carga"

let validInput={}
export default function CreatDogs(){
  const Dispatch = useDispatch()
  let state = useSelector(state=>state.Temperametos)
  const [cargandoSachr,setcarga]=React.useState("")
  const [Temperamentos,setTemperamentos]=React.useState([])
 
  const [Valides,setValides] =React.useState({message:"",Error:"",messageEnvio:"off-on",addTemp:false});
  const [FromDog,setFromDog] =React.useState(
      {
        Nombre_d:"",
        Altura_min:"",
        Altura_max:"",
        Peso_min:"",
        Peso_max:"",
        AñoDevida_min:"",
        AñoDevida_max:"",
        Nombre_t:"",
        img:"",
      }
    );
      React.useEffect(()=>{
        Dispatch(getTemperament())
      },[])
      React.useEffect(()=>{
        if (state&&state.length>=168) {
          setTemperamentos(state.slice(0,168));
        }
      },[state])

    function handleChange(event) {
      if (event.target.value ==="add"&&event.target.name=="Nombre_t") {
        setValides(pv=>({...pv,addTemp:true}))
        setFromDog(pv=>
          ({...pv,
          [event.target.name]: ""}
        ));
        return
      }else if(event.target.value =="selectemp"){
  
        setValides(pv=>({...pv,addTemp:false}))
        return
      }
      setFromDog(pv=>
        ({...pv,
        [event.target.name]: event.target.value }
      ));
      setValides({message:"",Error:"",messageEnvio:"off-on",addTemp:Valides.addTemp})
    }
    React.useEffect(()=>{

        if (Valides.message) {
          setValides(pv=>({...pv,messageEnvio:"on"}))
        }
        if(Valides.Error){
 

          setValides(pv=>({...pv,messageEnvio:"off"}))
        }
      },[Valides.Error,Valides.message])

    async function  handleSubmit(event) {
      event.preventDefault();  
      Valides.input=""
      validInput = validesfurm(FromDog)   
      setValides({message:"",Error:"",messageEnvio:"off-on",addTemp:Valides.addTemp})
  
             
     const { nombre,Altura,Peso,AñoDevida,Nombret} = validInput
      if (nombre.length > 0||Altura.length>0||Peso.length>0||AñoDevida.length>0||Nombret.length>0) {
        setValides({input:validInput, messageEnvio:"off-on",addTemp:Valides.addTemp})
        return 
      }
    let data={
      Nombre_d:FromDog.Nombre_d,
      Altura:`${FromDog.Altura_min} - ${FromDog.Altura_max}`,
      Peso:`${FromDog.Peso_min} - ${FromDog.Peso_max}`,
      AñoDevida:`${FromDog.AñoDevida_min} - ${FromDog.AñoDevida_max}`,
      Nombre_t:FromDog.Nombre_t,
      img:FromDog.img,
    }
    setcarga(<Carga/>)

       try {
          const petic = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
            }
            const response = await fetch('https://dogbackend.vercel.app/dogs',petic);
            const respuesta = await response.json();
            
            if (respuesta.message) {
               setValides(pv=>({...pv,message:respuesta.message}))
              setcarga("")

            }else{
              setValides(pv=>({...pv,Error:respuesta.Error}))
              setcarga("")

            }

        } catch (error) {

        }
    }    
  return(
    <div className="containerForm">
      <div className="carga">
          {cargandoSachr}
      </div>
      <div className="imgF">  <img src={imgFurm} /></div>
      <form className="formulari" onSubmit={(e) => handleSubmit(e)}>
      <div className="c-inptus" >
      <div  className="i-temperamfrom">
            <div className={`Cont-SelectTem-${Valides.addTemp?"off":"on"}`}>
              <select  name="Nombre_t" onChange={(e) =>handleChange(e)} id="selecTemp">
              <option >--Select Temperament--</option>
              <option id="boton-add" value="add" >Customize your own temperament</option>
              {Temperamentos&&Temperamentos.map(e=>{
                return (
                  <option key={e.id} value={e.Nombre_t} >{e.Nombre_t}</option>
                )
              })}
            </select>
          </div>
          <div className={`Cont-addTemp-${Valides.addTemp?"on":"off"}`}>
            <button type="button" onClick={()=>setValides(pv=>({...pv,addTemp:false}))}>Select temperament</button>
          <span className={Valides.input&&Valides.input.Nombret?"validacionInput":"NotValidacionInput"}>{Valides.input&&Valides.input.Nombret}</span>
              <input
                  type="text"
                  id="nameDog"
                  autoComplete="off"
                  name="Nombre_t"
                  placeholder="Add Temperamet"
                  value={FromDog.Nombre_t}
                  onChange={(e) => handleChange(e)}
                />
          </div>
        </div>    
        <div className="i-namefrom">
              <span 
              className={
                Valides.input&&Valides.input.nombre? "validacionInput":
                FromDog.Nombre_d?"Notobligatorio":"obligatorio"
                }
              >{Valides.input&&Valides.input.nombre}
              </span>
              <input
                type="text"
                id="nameDog"
                autoComplete="off"
                placeholder="Name"
                name="Nombre_d"
                value={FromDog.Nombre_d}
                onChange={(e) => handleChange(e)}
              />
          </div>
        <div className="i-alturafrom">
           
            <span className={
                Valides.input&&Valides.input.Altura? "validacionInput":
                FromDog.Altura_min?"Notobligatorio":"obligatorio"}>
                {Valides.input&&Valides.input.Altura}
              </span>
            <input
              type="number"
              min="2" max="100"
              id="Al_min"
              autoComplete="off"
              placeholder="Min:2cm"
              name="Altura_min"
              value={FromDog.Altura_min}
              onChange={(e) => handleChange(e)}
            />
            <span className={
                Valides.input&&Valides.input.Altura? "NotValidacionInput":
                FromDog.Altura_max?"Notobligatorio":"obligatorio"
            }></span>
            <input
              type="number"
              id="Al_max"
              min="2" max="200"
              autoComplete="off"
              placeholder="Max:200cm"
              name="Altura_max"
              value={FromDog.Altura_max}
              onChange={(e) => handleChange(e)}
            /> 
        </div>  
        <div className="i-pesofrom">
            <span className={
                Valides.input&&Valides.input.Peso? "validacionInput":
                FromDog.Peso_min?"Notobligatorio":"obligatorio"
            }>{Valides.input&&Valides.input.Peso}</span>
            <input
              type="Number"
              id="nameDog"
              min="1" max="100"
              autoComplete="off"
              name="Peso_min"
              placeholder="min:1kg"
              value={FromDog.Peso_min}
              onChange={(e) => handleChange(e)}
            />
             <span className={
                Valides.input&&Valides.input.Peso? "NotValidacionInput":
                FromDog.Peso_max?"Notobligatorio":"obligatorio"
            }></span>
            <input
              type="Number"
              id="nameDog"
              min="1" max="300"
              autoComplete="off"
              name="Peso_max"
              placeholder="max:500kg"
              value={FromDog.Peso_max}
              onChange={(e) => handleChange(e)}
            />
        </div>
      
        <div className="i-vidaform">
            <span className={Valides.input&&Valides.input.AñoDevida?"validacionInput":"NotValidacionInput"}>{Valides.input&&Valides.input.AñoDevida}</span>
            <input
              type="Number"
              id="nameDog"
              min="2" max="100"
              autoComplete="off"
              name="AñoDevida_min"
              placeholder="2 years"
              value={FromDog.AñoDevida_min}
              onChange={(e) => handleChange(e)}
            />
            <input
              type="Number"
              id="nameDog"
              min="2" max="300"
              autoComplete="off"
              name="AñoDevida_max"
              placeholder="100 years"
              value={FromDog.AñoDevida_max}
              onChange={(e) => handleChange(e)}
            />
        </div>
        <div  className="i-imUrl">
            <input
              type="url"
              id="nameDog"
              autoComplete="off"
              name="img"
              placeholder="Url"
              value={FromDog.img}
              onChange={(e) => handleChange(e)}
            />
        </div>
        <div className="i-buttonCreat">
         <button type="submit">Create Dogs</button>
        </div>
      </div>
    </form>
    <div className={`validacionM_true-${Valides.messageEnvio}`}>
      <span>✅{Valides.message}</span>
    </div>
    <div className={`validacionM_Error-${Valides.messageEnvio}`}>
      <span>⚠️{Valides.Error}</span>  
    </div>
  </div>

  )
}
