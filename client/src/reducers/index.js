
const initialState = {
    Dogs: [],
    FiltadoDogs:[],
    Temperametos: [],
    CardDogs:{nump:0,dogs:[]},
    DogDetail: {},
  };
let prox=1;
let back=0;
let numP=0;
function Paginado(state){
    let numPaginado=[]
    const numTheDog=Math.floor(state.FiltadoDogs.length/8)//22   
     for (let i = 0; i <= numTheDog ; i++) {
         numPaginado.push(i*8)
     }
     numPaginado.push(state.FiltadoDogs.length)
     return numPaginado
}

  function rootReducer(state=initialState, {type, payload}){
      switch(type){
        
        case  "DOGS" :{
            try {
                let dogs={}
                if (state.Dogs.length<1) {
                    state={
                        ...state,
                        Dogs: payload,
                        FiltadoDogs:payload,
                    }   
                    numP= Paginado(state)
                    dogs={nump:numP.length-2,dogs:state.Dogs.slice(0,8)}
                }else if (state.Dogs.length!==payload.length){
                    state={
                        ...state,
                        Dogs: payload,
                        FiltadoDogs:payload,
                    }
                    numP= Paginado(state)
                    dogs={nump:numP.length-2,dogs:state.Dogs.slice(0,8)}
                }
                else{
                    return{
                        ...state,
                        CardDogs:state.CardDogs
                    }   
                }
               return{
                    ...state,
                    CardDogs:dogs
                }   
                
            } catch (error) {
                return{
                    ...state,
                    CardDogs:{nump:0,dogs:[{message:"Error in bringing the dogs, refresh the page to continue"}]},
                }   
            }
        }
        
    case "PAGINADO" :{
          let numTheDog =  Paginado(state)
            
          if (payload==="REINICIAR") {
                prox=1
                back=0
            return state
          }
            if (payload.prox=="PROX") {
                
                prox++
                back++
                if (prox==numTheDog.length) {
                    prox=22
                    back=21
                }
                
                return {
                    ...state,
                    CardDogs:{nump:numTheDog.length-2,dogs:state.FiltadoDogs.slice(numTheDog[back],numTheDog[prox])},
                }
            }
            if (payload.back=="BACK") {
                prox--
                back--
                if (prox==0) {
                    prox=1//0
                    back=0//0
                }
                
                return{
                    ...state,
                    CardDogs:{nump:numTheDog.length-2,dogs:state.FiltadoDogs.slice(numTheDog[back],numTheDog[prox])}
                }
            }
        }
        case "FILTRO":{
            let dogs=[];
            let data =[];
            let valid= new RegExp(/\w+/g)
            data.push(state.Dogs)
            data=data.flat()

            if (payload=='All') {
                state={
                    ...state,
                    FiltadoDogs:state.Dogs
                }
                numP= Paginado(state)
                dogs=state.FiltadoDogs.slice(0,8)
                return {
                    ...state,
                    CardDogs:{nump:numP.length-2,dogs:dogs}
                }
            }
            if (payload=='existente') {
                state={
                    ...state,
                    FiltadoDogs:state.Dogs.filter(e=>typeof e.id!=='string')
                }
                numP= Paginado(state)
                dogs=state.FiltadoDogs.slice(0,8)
        
                return {
                    ...state,
                    CardDogs:{nump:numP.length-2,dogs:dogs}
                }
            }
            if (payload=='creados') {
                state={
                    ...state,
                    FiltadoDogs:state.Dogs.filter(e=>typeof e.id==='string')
                }
                numP= Paginado(state)
                if (state.FiltadoDogs.length===0) {
                    state.FiltadoDogs.push({message:"Not Dog"})
                }
                dogs=state.FiltadoDogs.slice(0,8)
                return {
                    ...state,
                    CardDogs:{nump:numP.length-2,dogs:dogs}
                }
            }
            if (payload.split('/')[0]==="Temperamento") {
                let temp=payload.split('/')[1]
            
                if (temp=="null") {
                    state= {
                        ...state,
                        FiltadoDogs:state.Dogs.filter(e=> !e.temperament)
                    }
                    numP= Paginado(state)
                    dogs=state.FiltadoDogs.slice(0,8)
                    return {
                        ...state,
                        CardDogs:{nump:numP.length-2,dogs:dogs}
                    }
                }
                state={
                    ...state,
                    FiltadoDogs:state.Dogs.filter(e=> e.temperament===temp)
                }
                numP= Paginado(state)
                dogs=state.FiltadoDogs.slice(0,8)
                
                return {
                    ...state,
                    CardDogs:{nump:numP.length-2,dogs:dogs}
                }
            }
            if (payload=='A-z') {
            
                state={
                    ...state,
                    FiltadoDogs:data.sort((x,y)=>{
                        if (x.name.toLowerCase() < y.name.toLowerCase()) {return -1;}
                        if (x.name.toLowerCase() > y.name.toLowerCase()) {return 1;}
                   })
                }
    
                numP= Paginado(state)
                dogs=state.FiltadoDogs.slice(0,8)
                return {
                    ...state,
                    CardDogs:{nump:numP.length-2,dogs:dogs}
                }
            }
            
            if (payload=='Z-a') {
                state={
                    ...state,
                    FiltadoDogs:data.sort((x,y)=>{
                        if (x.name.toLowerCase() < y.name.toLowerCase()) {return 1;}
                       if (x.name.toLowerCase() > y.name.toLowerCase()) {return -1;}
                   })
                }
        
                numP= Paginado(state)
                dogs=state.FiltadoDogs.slice(0,8)
        
                return {
                    ...state,
                    CardDogs:{nump:numP.length-2,dogs:dogs}
                }
            }
            if (payload=='KG↑') {
                function qsort(array){
                    if(array.length<1){
                      return []
                    }
                  let left =[];
                  let right =[];
                  let pivot =array[0];
                    
                  for (let i = 1; i < array.length; i++) {
        
                    let num= array[i].weight.match(valid)[1]
                    let pivotnum= pivot.weight.match(valid)[1]
                    if(!num){
                        num=array[i].weight
                    }
                    if(!pivotnum){
                        pivotnum=pivot.weight
                    }
                    
                    if(+num>+pivotnum){
                          left.push(array[i]);
                        }else{
                          right.push(array[i])
                        }
                      }
                    return [].concat(qsort(left),pivot,qsort(right))
                }
                data=qsort(state.Dogs)
              
                state={
                    ...state,
                    FiltadoDogs:data
                }
                
                numP= Paginado(state)
                dogs=state.FiltadoDogs.slice(0,8)
    
                return {
                    ...state,
                    CardDogs:{nump:numP.length-2,dogs:dogs}
                }
            }
            if (payload=='KG↓') {
                function qsort(array){
                    if(array.length<1){
                      return []
                    }
                    let left =[];
                    let right =[];
                    let pivot =array[0];

                    for (let i = 1; i < array.length; i++) {
                        let num= array[i].weight.match(valid)[1]
                        let pivotnum= pivot.weight.match(valid)[1]

                        if(!num){
                            num=array[i].weight
                        }
                        if(!pivotnum){
                            pivotnum=pivot.weight
                        }
                        
                        if(+num<+pivotnum){
                          left.push(array[i]);
                        }else{
                          right.push(array[i])
                        }
                      }
                    return [].concat(qsort(left),pivot,qsort(right))
                }
                 data=qsort(state.Dogs)
              
                state={
                    ...state,
                    FiltadoDogs:data
                }
                numP= Paginado(state)
                dogs=state.FiltadoDogs.slice(0,8)
                return {
                    ...state,
                    CardDogs:{nump:numP.length-2,dogs:dogs}
                }
            }
            
        }
                   
        case  "TEMPERAMENTOS" :{
            if (state.Temperametos.length>0) {
                payload =state.Temperametos.filter(x => x.Nombre_t !== payload.Nombre_t)
            }

           return{
                ...state,
                    Temperametos: payload
            }
            
        }
        
        case "DETALL_DOGS":{
            if (!payload.description) {
                payload.description =`${payload.name} Is your best friend, live ${payload.life_span} and only weight ${payload.weight&&payload.weight.imperial} `
              }
            return {
                ...state,
                DogDetail: payload
            }
        }
        case "SEARCH_DOG":{
            if (payload.message) {
                numP=Paginado(state)
                return {
                    ...state,
                    CardDogs: {nump:0,dogs:[payload]}
                } 
              }  
            state={
                    ...state,
                    FiltadoDogs:payload,
            }   
            let dogs=[]
            numP=Paginado(state)
            dogs=state.FiltadoDogs.slice(0,8)
              
            return {
                ...state,
                CardDogs: {nump:numP.length-2,dogs:dogs}
            }
        }
        case "REMOVE_DETALLE":{
            return {
                ...state,
                DogDetail: {}
            }
        }

    default: return state;
    }
    
  }

   export default rootReducer;