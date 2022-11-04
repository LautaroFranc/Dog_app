const { Router } = require('express');
 const {Dog,Temperamento}  = require('../db') 
const {DogsApi,Temperamentos_api} = require('./api')
const router =Router();
 
let LogtheDogs_api=0

router.get('/dogs',(req, res)=>{
Temperamentos_api()
  const {name}=req.query 
    if (!name) {
        DogsApi({}).then(dog=>{
          LogtheDogs_api=dog.length
            res.status(200).json(dog);
        })
        .catch(e=>{res.status(404).json({ERROR:e.message})})
    }else{
      DogsApi({name})
        .then( dog=>{
          res.status(200).json(dog);
        })  
        .catch (e=> {
          return res.status(404).json({message: e.message})
        })
    }
 })
  router.get('/dogs/:id' , (req, res)=>{
          const {id} = req.params;

          if (!id) {
            res.json("Error")
          }
         let obj={id}
          DogsApi(obj).then(dog=>{
                  res.status(200).json(dog)
                })
                .catch(err => {res.status(404).json({ERROR:err.message})})
        
  })

  router.get('/temperaments' ,async(req, res)=>{ 
      try {
         let DatosTemp = await Temperamento.findAll()
          return res.status(200).json(DatosTemp) 
      } catch (err) {
      res.status(404).json({Error:err.message});
        
      }
  })


  router.post('/dogs',async(req, res)=>{ 
    let id=0
    const DogBD= await Dog.findAll() 
    const {Nombre_d, Altura, Peso,AñoDevida,img} = req.body

    if (!Nombre_d||!Altura||Altura.length<5||!Peso||Peso.length<5) {
      return res.status(404).json({Error: 'missing information'}) 
    } 
    let error=DogBD.find(e=>e.Nombre_d==Nombre_d)
    if (error) {
     return res.status(404).json({Error: 'The dog already exists'}) 
    }
    try {
        id=LogtheDogs_api
      id++
      id+="C"
       const obj={
        id,
        Nombre_d,
        Altura,
        Peso,
        AñoDevida,
        img
       }
  
      const DogTemper= await Temperamento.create(req.body)
      const DogCreat= await Dog.create(obj)
      await DogTemper.setDogs([DogCreat]) 


      res.status(200).json({message:"Dog created successfully"})

    } catch (error) {
      return res.status(404).json({Error: error.message}) 
    }
  })

module.exports = router;
