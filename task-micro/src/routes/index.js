const usersRouter = require('./users.router');
const tasksRouter = require('./tasks.router');
const assignRouter = require('./assign.router');

const controller = (app)=>{
  app.use('/api/v1/users',usersRouter)
  app.use('/api/v1/tasks',tasksRouter)
  app.use('/api/v1/assign',assignRouter)
}

module.exports = {controller}