const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => { 
  // defino el modelo
  sequelize.define('Dog', { 
  id:{
      type:DataTypes.STRING,
      primaryKey:true 
    },
  Nombre_d: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  Altura:{
      type: DataTypes.STRING,
      allowNull: false,
    },
  Peso: {
      type: DataTypes.STRING,
      allowNull: false,
     },
  AñoDevida:{
    type: DataTypes.STRING
  },
  img:{
    type: DataTypes.STRING
  }
  });
};
