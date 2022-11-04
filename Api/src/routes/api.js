const axios = require('axios')
const {Dog,Temperamento}  = require('../db')

const {
  KeyAPi
} = process.env;

let temperaments=[]  

   module.exports={
    DogsApi:async function DogsApi({id,name}) {
        //
      const dogs=[];
      let DataDogBD=[];
    

      const DogBD= await Dog.findAll()

      for (let i = 0; i < DogBD.length; i++) { 
      let temperament= await DogBD[i].getTemperamentos()
      console.log(DogBD[i].img)
        DataDogBD.push({ 
          id: DogBD[i].id,
          name:DogBD[i].Nombre_d,
          image:DogBD[i].img?{url:DogBD[i].img}:{url:"https://tse4.mm.bing.net/th?id=OIP.u0pg0TY7VHTBN0QJqQfwbwHaHa&pid=Api&P=0&w=161&h=161"},
          temperament:temperament[0].Nombre_t,
          weight:{imperial:DogBD[i].Peso},
          height:{imperial:DogBD[i].Altura},
          life_span:DogBD[i].AñoDevida
        }) 
      }


      const repusta = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${KeyAPi}`)
      const dataDog = await repusta.data;
    
      if (name) {
        name=name.trimStart().trimEnd()
      
        if (name.length<=1) {
          throw new Error('Please enter more than three letters')
        }
      
        let dog =dataDog.filter(dog=>dog.name.includes(name));
        if (dog.length==0) {
          dog =DataDogBD.filter(dog=>dog.name.includes(name));
        }
      
      
          if (dog.length===0) {
            throw new Error('not result found')
          }
      
          dog.map(e=>{
            dogs.push({   
            id:e.id,
            name:e.name, 
            Image:e.image.url,
            temperament:e.temperament,
            weight:e.weight.imperial,
            });
          })
          return dogs
      }
      if (id) {
        let searchD=dataDog.find(e=>e.id === +id);
        if(!searchD){
           searchD=DataDogBD.find(e=>e.id === id);
        }
        if (searchD) {
        
          const {id,name,image,temperament,weight,height,life_span,description}= searchD
        
         const Detall_dogs={  
            id,
            name,
            image,
            temperament,
            weight,
            height,
            life_span,
            description
            }
          return Detall_dogs
        }else{
          throw new Error('Could not find')
        }
      }
      
     
    
      dataDog.map(e=>{
         dogs.push({
          id:e.id,
         name:e.name,
         Image:e.image.url,
         temperament:e.temperament,
         weight:e.weight.imperial, 
         })
      })
        if (DataDogBD.length>0) {
          DataDogBD.map(e=>{
            
            dogs.unshift({
              id:e.id, 
              name:e.name,
              Image:e.image.url,
              temperament:e.temperament,
              weight:e.weight.imperial, 
              })
          }) 
        }
       return dogs
      }, 

  Temperamentos_api:async function Temperamentos() {
    if (temperaments.length>0) {
  
      return
    }

    const repusta = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${KeyAPi}`)
    const dataTemp = await repusta.data;

    dataTemp.map(e=>{
      if (e.temperament!==undefined) {
       let r=e.temperament.split(", ")//[sdfsdfs.dfsd,fsd,fsd,f]
          r.map(e=>{
            temperaments.push(e)

          })
      }
    })

    
    
      let newTemperaments= new Set(temperaments)
      temperaments=[]
      newTemperaments.forEach(e=>{
        temperaments.push({Nombre_t:e})
      });
      temperaments= temperaments.sort((x,y)=>{
        if (x.Nombre_t < y.Nombre_t) {return -1;}
       if (x.Nombre_t > y.Nombre_t) {return 1;}
       return 0;
      })
      console.log(temperaments[0])
      temperaments.map(async e=>{
        await Temperamento.create(e)
        })          
  },

   };



