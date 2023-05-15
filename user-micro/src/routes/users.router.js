const express = require('express');
const router = express.Router();
const {addUser} = require('../service/addUser.service');
const {getUsers} = require('../service/getUsers.service');
const {getUserById} = require('../service/getUserById.service');

router.get('/', async (req,res)=>{
  const data = await getUsers();
  res.status(200).json(data);
})

router.get('/:id', async (req,res)=>{
  const {id} = req.params;
  const data = await getUserById(id);
  res.status(200).json(data);
})

router.post('/', async (req,res)=>{
  const data = req.body;
  console.log(data);
  const result = await addUser(data);
  if(result){
    res.status(201).json(data);
  }else{
    res.status(404).end();
  }
});



module.exports = router;



