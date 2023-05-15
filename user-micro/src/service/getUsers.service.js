const {User} = require('../models/user.model');

const  getUsers = async ()=>{
  try {
    return await User.findAll();
  }
  catch (error) {
    console.log(error);
    return false;
  }
}

module.exports =  { getUsers }