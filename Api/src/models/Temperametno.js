const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('Temperamento', {
    Nombre_t:{
      type: DataTypes.STRING
    }
  });
};