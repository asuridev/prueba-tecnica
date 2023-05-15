const { TaskUser} = require('../models/task_user.model');
const { Task } = require('../models/task.model');

const  assignTask = async (newTask)=>{
  const assign = TaskUser.build(newTask);
  try {
    await assign.save();
    return true;
  }
  catch (error) {
    console.log(error);
    return false;
  }
}

const  getTaskByUserId = async (id)=>{
  try {
    return await TaskUser.findAll(
      { 
        where:{
          user_id :id
        }
      }
    );
  }
  catch (error) {
    console.log(error);
    return false;
  }
}

const  deleteById = async (id)=>{
  try {
    return await TaskUser.destroy({
      where: { id: id }
    })
  } catch (error) {
    console.log(error);
    return false;
  }
}

const  updateById = async (newState, id)=>{
  try {
    await TaskUser.update(
      {
        state:newState
      },
      {
        where: { id: id }
      }
    );
    return true;
  }
  catch (error) {
    console.log(error);
    return false;
  }
}


module.exports =  { assignTask, getTaskByUserId, deleteById, updateById}