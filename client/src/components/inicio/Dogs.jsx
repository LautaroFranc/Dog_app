import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import {getDog,Paginado,getTemperament,searchDog,Filtros} from '../../actions'
import Carga from "./Carga"
import './DogsStyle.css'
import './Filtros.css'

function Dogs(props){
  const [cargandoSachr,setcarga]=React.useState("")
  const [getSearch,SetSearch] = React.useState("")
  const [Numpaginado,SetNumpaginado] = React.useState({
    pagina:0,
    totalp:0,
  })

  React.useEffect(()=>{
    props.getDog();
    props.getTemperament()
  },[])
  React.useEffect(()=>{
    let num=props.CardDogs.nump
    SetNumpaginado(pv=>({...pv,totalp:num}))
    
      if (props.CardDogs.dogs.length==0) {
      
        setcarga(<Carga />);
      }else{
        setcarga("");
      }
    },[props.CardDogs])

  function FiltreDog(action){
    props.Paginado("REINICIAR")
    props.Filtros(action)
    SetNumpaginado(pv=>({...pv,pagina:0}))
  }
  function handleChange(e) {
    SetSearch(e)
  }
  function Search(e){    
    e.preventDefault();
    props.searchDog(getSearch)
    SetNumpaginado(pv=>({...pv,pagina:0}))
    props.CardDogs.dogs=[]
    setcarga(<Carga />)
  }
  function GetDogProx(){
    if (Numpaginado.pagina!==Numpaginado.totalp) {
      SetNumpaginado(pv=>({...pv,pagina:pv.pagina+1}))
    }
    if (Numpaginado.totalp===0) {
      SetNumpaginado(pv=>({...pv,pagina:0})) 
    }
    if (props.CardDogs.dogs.length>1) {
      props.Paginado({prox:"PROX",back:""})  
    }
   }

   function GetDogPrv(){
    if (Numpaginado.pagina>0) {
       SetNumpaginado(pv=>({...pv,pagina:pv.pagina-1}))
    }
    if (Numpaginado.totalp===0) {
      SetNumpaginado(pv=>({...pv,pagina:0})) 
    }
    if (props.CardDogs.dogs.length>1) {
      props.Paginado({back:"BACK"})   
    }
   }
   
  return (
    <>
      <div className="container-filtro">
      {/* {filtro} */}
      <span>Filtro</span>
      <div className="i-filtro">
        <div className="container-Temperamento">
            <label htmlFor="Temperamento">Temperament</label>
              <select  name="Temperamento" onChange={(e)=>FiltreDog(`Temperamento/${e.target.value}`)} id="selec">
                <option  value="null">sin temperament</option>
                {props.temperamentos&&props.temperamentos.map(e=>{
                  return (
                    <option key={e.id} value={e.Nombre_t} >{e.Nombre_t}</option>
                  )
                })}
              </select>
        </div>
        <div className="container-button-filtro">
          <button onClick={()=>FiltreDog("existente")} >Perro existente</button>
          <button onClick={()=>FiltreDog("All")} >All</button>
          <button onClick={()=>FiltreDog("creados")} >Perro Creado</button>
        </div>
      </div>
        {/* {Ordenamiento} */}
        <span>Ordenamiento</span>
        <div className="i-orden">
        <div className="container-button-Ordenamiento">
          <button onClick={()=>FiltreDog("A-z")} >A-z</button>
          <button onClick={()=>FiltreDog("Z-a")} >Z-a</button>
          <button onClick={()=>FiltreDog("KG↑")} >KG ↑</button>
          <button onClick={()=>FiltreDog("KG↓")} >KG ↓</button>
        </div>
      </div>
    </div>
    <div className="c-CardDogs">
    {cargandoSachr}
      <div className="i-Formu">
          <form onSubmit={(e) => Search(e)}>
            <input type="text"
                  id="nameDog"
                  autoComplete="off"
                  placeholder="Name"
                  name="Nombre_d"
                  value={getSearch}
                  onChange={(e) => handleChange(e.target.value)} 
                />
            </form>
            <div className="i-button-Form">  
              <button type="submit" onClick={Search} >Buscar</button> 
            </div>
        </div>
        <div className="c-card">
          {props.CardDogs&&props.CardDogs.dogs.map((e)=>{
              if(e.message){
                return <div className="Error">
                  <p>⚠️: {e.message}</p>
                  <span className="Error-emojin">🐶</span>
                  </div>
              }
            return(
              <div key={e.id}>
                <Link to={`/DetallDog/${e.id}`}>
                  <div className = "i-card">
                    <div className="i-img">
                      <img src={e.Image}/>
                    </div>
                    <div className="i-info-text">  
                      <h2>{e.name}</h2> 
                      
                      <div className="info-temp">
                        <span>Temperament:</span>
                        <p>{e.temperament}</p></div>
                    </div>
                    <div className="info-peso"><p>KG: {e.weight}</p></div>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
          <div className="c-button-prox">
              <button id="bt1" onClick={GetDogPrv} >◀</button>
              <p>{Numpaginado.pagina}</p>
              <p>/{Numpaginado.totalp}</p> 
              <button id="bt2" onClick={GetDogProx} >▶</button>
        </div>
    </div>
  </>
)
}

function mapStateToProps(state) {
  return {
    temperamentos:state.Temperametos,
    CardDogs: state.CardDogs,
  }
}

function mapDispatchTo(dispatch){
  return{
    getDog:()=> dispatch(getDog()),
    searchDog:(e)=> dispatch(searchDog(e)),
    Paginado:(e)=> dispatch(Paginado(e)),
    Filtros:(e)=> dispatch(Filtros(e)),
    getTemperament:()=> dispatch(getTemperament()), 
  }
}


export default connect(
mapStateToProps,
mapDispatchTo
)(Dogs);