
function valides(FromDog){
  let setValidInput={
    nombre:"",
    Altura:"",
    Peso:"",
    AñoDevida:"",
    Nombret:"",
  }

  if (!FromDog) {
    return setValidInput
  }
  let errorName=false
  let errorTemp=false
  let Temp= FromDog.Nombre_t.split(", ").join("").split("")
  let valid= new RegExp(/[a-zA-Z]+/)
  let name= FromDog.Nombre_d.split("")


 

    if (+FromDog.Altura_min>+FromDog.Altura_max) {
        return({...setValidInput,
             Altura:"⚠️ The minimum must not exceed the maximum"}
         );
        
      }


      if (FromDog.Altura_max===FromDog.Altura_min &&FromDog.Altura_max>0&&FromDog.Altura_min>0 ) {
        
        return({...setValidInput,
          Altura:"⚠️ Oh... the values are the same"}
        );
      
      }
      

      if (+FromDog.Peso_min>+FromDog.Peso_max) {

        return({...setValidInput,
          Peso:"⚠️ The minimum must not exceed the maximum"}
        );
      
      }

      if (FromDog.Peso_max===FromDog.Peso_min &&FromDog.Peso_min>0&&FromDog.Peso_max>0 ) {
        return({...setValidInput,
          Peso:"⚠️ Oh... the values are the same"}
        );
      
      }

      if (+FromDog.AñoDevida_min>+FromDog.AñoDevida_max) {
        return({...setValidInput,
          AñoDevida:"⚠️ Remember that the minimum must not exceed the maximum"}
        );
      
      }
      if (FromDog.AñoDevida_min===FromDog.AñoDevida_max &&FromDog.AñoDevida_max>0&&FromDog.AñoDevida_min>0 ) {
         return({...setValidInput,
          AñoDevida:"⚠️ Oh... the values are the same"}
        );
      }
      
      name.forEach(e=>{
          if (!valid.test(e)) {  
            return errorName=true
          }
      })

      if (errorName===true) {
        return({...setValidInput,
          nombre:"⚠️ Not symbols or number"}
          );
      }


        Temp.forEach(e=>{
          if (!valid.test(e)) {
            return errorTemp=true
          }
        })
      


      if (errorTemp===true) {
        return({...setValidInput,
          Nombret:"⚠️ A very rare temperament..., remember it should not have symbols or numberss"}
        );
    }

   return setValidInput 
}

export default valides