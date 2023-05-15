const {User} = require('../models/user.model');

const  getUserById = async (id)=>{
  try {
    return await User.findByPk(id);
  }
  catch (error) {
    console.log(error);
    return false;
  }
}

module.exports =  { getUserById }