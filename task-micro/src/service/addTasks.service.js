const { Task } = require('../models/task.model');

const  addTasks = async (newTask)=>{
  const task = Task.build(newTask);
  try {
    await task.save();
    return true;
  }
  catch (error) {
    console.log(error);
    return false;
  }
}

const getAllTask = async ()=>{
  try {
    return await Task.findAll();
  }
  catch (error) {
    console.log(error);
    return false;
  }
}
module.exports =  { addTasks, getAllTask }
