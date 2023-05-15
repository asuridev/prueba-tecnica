const express = require('express');
const router = express.Router();
const {addTasks,getAllTask} = require('../service/addTasks.service');


router.post('/', async (req,res)=>{
  const data = req.body;
  console.log(data);
  const result = await addTasks(data);
  if(result){
    res.status(201).json(data);
  }else{
    res.status(404).end();
  }
});

router.get('/', async (req,res)=>{
  const result = await getAllTask();
  if(result){
    res.status(200).json(result);
  }else{
    res.status(404).end();
  }
});

module.exports = router;