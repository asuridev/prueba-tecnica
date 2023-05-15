const {User} = require('../models/user.model');

const  addUser = async (newUser)=>{
  const user = User.build(newUser);
  try {
    await user.save();
    return true;
  }
  catch (error) {
    console.log(error);
    return false;
  }
}

module.exports =  { addUser }
