
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";
import { endpoints } from '../settings/endpoints';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Button} from '@mui/material';




export function Home() {
  const [users,setUsers] = useState([]);
  const navigate = useNavigate();
  const {state,setState} = React.useContext(AppContext);
  React.useEffect(()=>{
    const getData= async() =>{
      try {
        const dataUsers = await axios.get(endpoints.users);
        //console.log(dataUsers.data);
        setUsers(dataUsers.data);
      } catch (error) {
        console.log(error)
      }
    }
    getData();
  },[]);

  function handleClick({target}){
    setState({
      ...state,
      idNumber:target.id,
      firstName:target.dataset.first,
      lastName:target.dataset.last
    })
    navigate('/details',{replace:true});
  }

  return (
    <TableContainer sx={{ maxWidth: 550, margin:'2rem auto' }} component={Paper}>
      <Table sx={{ width:'100%', margin:'0 auto' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Number ID</TableCell>
            <TableCell align="center">FirstName</TableCell>
            <TableCell align="right">LastName</TableCell>
            <TableCell align="right">Ver Detalle</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="center">
                {row.firstName}
              </TableCell>
              <TableCell align="right">
                {row.lastName}
              </TableCell>
              <TableCell align="right">
                <Button id={row.id} data-first={row.firstName} data-last={row.lastName} onClick={handleClick}> Ver </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}