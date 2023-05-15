const axios = require('axios')
const{endpoints} = require('../settings/endpoints');

const getUsers = async() => {
  return await axios.get('http://user:3000/api/v1/users');
}

module.exports =  { getUsers }