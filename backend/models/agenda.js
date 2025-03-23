// models/agenda.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Agenda = sequelize.define('Agenda', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titre: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { 
      notEmpty: true,
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
    validate: {
      notEmpty: false, // description est optionnelle, donc on n'exige pas qu'elle soit remplie
    },
  },
  daterapel: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: true,  // Assure-toi que c'est une date valide
    },
  },

  //tableName: 'agenda',
  
});

module.exports = Agenda;
