const express = require('express');
const router = express.Router();
const {getUserById} = require('../service/getUserById.service');


router.post('/', async (req,res)=>{
  const data = req.body;
  const {id,password} = data;
  const resDb = await getUserById(id);
  if(resDb){
    if(!(resDb.dataValues.password === password)){
      res.status(401).json({massage:'credenciales incorrectas'});
    }else{
      res.status(200).json(resDb);
    }
  }
  else{
    res.status(404).end();
  }
});

module.exports = router;