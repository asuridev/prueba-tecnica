const express = require('express');
const router = express.Router();
const {assignTask,getTaskByUserId,deleteById,updateById} = require('../service/assignTask.service');


router.post('/', async (req,res)=>{
  const data = req.body;
  console.log(data);
  const result = await assignTask(data);
  if(result){
    res.status(201).json(data);
  }else{
    res.status(404).end();
  }
});

router.get('/:id', async (req,res)=>{
  const { id } = req.params;
  const result = await getTaskByUserId(id);
  console.log(result);
  if(result){
    res.status(201).json(result);
  }else{
    res.status(404).end();
  }
});

router.delete('/:id', async (req,res)=>{
  const { id } = req.params;
  console.log(id);
  const result = await deleteById(id);
  console.log(result);
  if(result){
    res.status(201).json(result);
  }else{
    res.status(404).end();
  }
});

router.put('/:id', async (req,res)=>{
  const data = req.body;
  const { id } = req.params;
  console.log(data);
  const result = await updateById(data.state,id);
  if(result){
    res.status(201).json(data);
  }else{
    res.status(404).end();
  }
});



module.exports = router;