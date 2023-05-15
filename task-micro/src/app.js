const express = require('express');
const { controller } = require('./routes');
const { dbConnection } = require('./config/dbConnection');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('dist'))
const port = 3000;
dbConnection();


controller(app);

app.listen(port,()=>{
  console.log('listening port: ', port );
})