const {environments} = require('../environments/environment')

const endpoints = {
  users: `${environments.users_micro}/users`,
}


module.exports = {
  endpoints
}