

 export function getDog() {
    return async function(dispatch) {   
        const r = await fetch(`https://dogbackend.vercel.app/dogs`);
        const json = await r.json();
       dispatch({ type: "DOGS", payload: json });

    
    
   }
}

export function getDetallDog(id) {

    return async function(dispatch) {   
        const r = await fetch(`https://dogbackend.vercel.app/dogs/${id}`);
        const json = await r.json();
       dispatch({ type: "DETALL_DOGS", payload: json });
       
   }
   
}
export function getTemperament() {
    return async function(dispatch) {   
        const r = await fetch(`https://dogbackend.vercel.app/temperaments`);
        const json = await r.json();
       dispatch({ type: "TEMPERAMENTOS", payload: json });   
   }
}
export function searchDog(raza_perro) {
    return async function(dispatch) {   
        const r = await fetch(`https://dogbackend.vercel.app/dogs?name=${raza_perro}`);
        const json = await r.json();
       dispatch({ type: "SEARCH_DOG", payload: json });   
   }
}


export function Paginado(payload) {
    return {
        type: "PAGINADO",
        payload
    }
    
}
export function Filtros(payload) {
    return {
        type: "FILTRO",
        payload
    }
    
}
export function removeDetali() {
    return {
        type: "REMOVE_DETALLE",
    }
    
}




