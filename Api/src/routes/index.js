const { Router } = require('express');
// Importar todos los routers;
const authRouter = require('./rutas.js'); 

const router = Router();
 
// Configurar los routers
router.use('/', authRouter);


module.exports = router;







 