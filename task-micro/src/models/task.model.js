const {  DataTypes } = require('sequelize');
const {sequelize} = require('../config/dbConnection')

const Task = sequelize.define('tasks', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
});

const sinc = async ()=>{
  await Task.sync();
}
sinc();

module.exports = { Task }