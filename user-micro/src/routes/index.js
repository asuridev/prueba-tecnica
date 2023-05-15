const usersRouter = require('./users.router');
const authRouter = require('./auth.router');

const controller = (app)=>{
  app.use('/api/v1/users',usersRouter)
  app.use('/api/v1/auth',authRouter)
}

module.exports = {controller}