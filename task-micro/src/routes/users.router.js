const express = require('express');
const router = express.Router();
const {getUsers} = require('../service/fetch.service')


router.get('/', async (req,res)=>{
  try {
    console.log('obteniendo solicitud de usuarios')
    const users =  await getUsers();
    res.status(200).json(users.data);
  } catch (error) {
    res.status(404).json(error);
  }
})

// router.get('/:id', async (req,res)=>{
//   const {id} = req.params;
//   const data = await getUserById(id);
//   res.status(200).json(data);
// })

// router.post('/', async (req,res)=>{
//   const data = req.body;
//   console.log(data);
//   const result = await addUser(data);
//   if(result){
//     res.status(201).json(data);
//   }else{
//     res.status(404).end();
//   }
// });



module.exports = router;



