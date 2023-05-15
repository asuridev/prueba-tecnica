const {  DataTypes } = require('sequelize');
const {sequelize} = require('../config/dbConnection')

const User = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  password:{
    type: DataTypes.STRING,
    allowNull: false
  }
});

const sinc = async ()=>{
  await User.sync();
}
sinc();

module.exports = { User }