import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { endpoints } from "../settings/endpoints";

import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import PendingIcon from '@mui/icons-material/Pending';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { Alert, Button, FormControl, IconButton, InputLabel, MenuItem, Select, Snackbar, Typography } from "@mui/material";

export  function Details(){
  const {state} = useContext(AppContext);
  const [tasks, setTasks] = useState([]);
  const [allTasks, setallTasks] = useState([]);
  const [upDateData, SetUpDateData] = useState(false);
  const [taskSelected, setTaskSelected] = React.useState('');
  const [snack, setsnack] = React.useState({
    open:false,
    severity:"success",
    message:""
  });

  const handleCloseSnack=()=>{
    setsnack({
      ...snack,
      open:false
    });
  }

  // trae las tareas por id de usuario
  useEffect(()=>{
    const getData= async() =>{
      const url = `${endpoints.assign}/${state.idNumber}`;
      try {
        const dataTask = await axios.get(url);
        console.log(dataTask.data);
        setTasks(dataTask.data);
      } catch (error) {
        console.log(error)
      }
    }
    getData();
  },[upDateData]);

  //trae todas las tareas  creadas para el sistema
  useEffect(()=>{
    const getData= async() =>{
      const url = `${endpoints.tasks}`;
      try {
        const tasks = await axios.get(url);
        console.log(tasks.data);
        setallTasks(tasks.data)
      } catch (error) {
        console.log(error)
      }
    }
    getData();
  },[state.apdateListTask]);

  async function deleteTask(id){
    const url = `${endpoints.assign}/${id}`;
    try {
       await axios.delete(url);
       SetUpDateData(!upDateData);
       setsnack({
        ...snack,
        open:true,
        severity:"success",
        message:'La tarea fue Eliminada exitosamente.'
      });
    } catch (error) {
      setsnack({
        ...snack,
        open:true,
        severity:"error",
        message:'No fue Posible Eliminar la tarea'
      });
      console.log(error)
    }
  }

  async function updateTask(id,state){
    const url = `${endpoints.assign}/${id}`;
    try {
       await axios.put(url,{
        state:!state
       });
       SetUpDateData(!upDateData);
       setsnack({
        ...snack,
        open:true,
        severity:"success",
        message:'El estado de la Tarea fue Actualizado'
      });
    } catch (error) {
      setsnack({
        ...snack,
        open:true,
        severity:"error",
        message:'No fué Posible eliminar La tarea'
      });
      console.log(error)
    }
  }
    function handleChangeSelect({target}){
      console.log(target.value);
      setTaskSelected(target.value)
    }

    async function assignTask(){
      const url = `${endpoints.assign}`;
      const info = {
        "user_id":state.idNumber,
          "task_id":taskSelected,
          state:false
      }
      console.log(url);
      console.log(info);
      try {
        await axios.post(url,info);
        SetUpDateData(!upDateData);
        setsnack({
          ...snack,
          open:true,
          severity:"success",
          message:'La tarea fue Asignada Exitosamente'
        });
      } catch (error) {
        setsnack({
          ...snack,
          open:true,
          severity:"error",
          message:'No fué Posible eliminar La tarea'
        });
        console.log(error);
      }  
    }


    function findTaskById(id){
      const task =  allTasks.find(task => task.id === id);
      console.log(task);
      return task;
    }
    return(
      <>
      <Box sx={{display:'flex', margin:'1rem'}}>
        <Typography sx={{marginRight:'1rem'}} variant="h4" component="h2">
          {state.firstName} {state.lastName}
        </Typography>
        <Box sx={{ width: 220, marginRight:'1rem' }}>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Tareas</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={taskSelected}
              label="Tareas"
              onChange={handleChangeSelect}
            >
              {
                allTasks.map(task =>(
                  <MenuItem key={task.createdAt} value={task.id}>{task.description}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Box>
        <Button  sx={{flexShrink:0}}onClick={assignTask} size='small' variant="contained" color="secondary">Asignar uan Tarea Al usuario</Button>
      </Box>
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', margin:'1rem' }}>
      <nav aria-label="main mailbox folders">
        <List>
        {
          tasks.map( task =>(
            <ListItem key={task.id} disablePadding>
              {
                (task.state) ?(
                  <DoneAllIcon sx={{marginRight:'1rem'}} color="success" />
                ):(
                  <PendingIcon sx={{marginRight:'1rem'}} color="error"/>
                )
              }
            <>
              <ListItemText primary={findTaskById(task.task_id).description} />
              <IconButton aria-label="delete"  onClick={() =>{updateTask(task.id,task.state)}}>
                  <PublishedWithChangesIcon />
              </IconButton>
              <IconButton aria-label="delete" onClick={() =>{deleteTask(task.id)}}>
                  <DeleteOutlineIcon />
              </IconButton>
            </>
          </ListItem>
          ))
        }
        </List>
      </nav>
      <Snackbar open={snack.open} autoHideDuration={6000} onClose={handleCloseSnack}>
          <Alert onClose={handleCloseSnack} severity={snack.severity}>
            {snack.message}
          </Alert>
     </Snackbar>
    </Box>
  </>
  );
}