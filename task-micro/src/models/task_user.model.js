const {  DataTypes } = require('sequelize');
const {sequelize} = require('../config/dbConnection')
const {Task} = require('./task.model');

const TaskUser = sequelize.define('tasks_user', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
    primaryKey:true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  task_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: false,
  },
  state: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
});

//TaskUser.hasMany(Task, { foreignKey: 'id' });
//Task.belongsTo(TaskUser, { foreignKey: 'id' });


const sinc = async ()=>{
  await TaskUser.sync();
}
sinc();

module.exports = { TaskUser }