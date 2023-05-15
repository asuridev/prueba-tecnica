import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { Link as RouterLink, useNavigate } from 'react-router-dom/dist';
import { Alert, Link, Snackbar, TextField } from '@mui/material';
import { AppContext } from '../context/AppContext';
import axios from "axios";
import { endpoints } from '../settings/endpoints';

const pages = [
    {
      label:'sign in',
      path:'/login'
    },
    {
      label:'sign up',
      path:'/register'
    },
  ] 
  
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export function ResponsiveAppBar() {
  const [valueInput, setValueInput] = React.useState('')
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const {state,setState} = React.useContext(AppContext);
  const [snack, setsnack] = React.useState({
    open:false,
    severity:"success",
    message:""
  });

  const navigate = useNavigate();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function onMenuClick({target}){
    if(target.id === 'Logout'){
      setState({
        firstName:"",
        lastName:"",
        isLogin:false
      });
      navigate('/login',{replace:true})
    }
  }

  const handleCloseSnack=()=>{
    setsnack({
      ...snack,
      open:false
    });
  }

  function handleInput({target}){
    setValueInput(target.value);
  }

  async function addTask(){
    if(valueInput){
      const url = `${endpoints.tasks}`;
      try {
         await axios.post(url,{
          description:valueInput
        });
        setState({
          ...state,
          apdateListTask:!state.apdateListTask
        })
        setsnack({
          ...snack,
          open:true,
          severity:"success",
          message:'La tarea fue Agregada exitosamente.'
        });
        setValueInput("");

      } catch (error) {
        setsnack({
          ...snack,
          open:true,
          severity:"error",
          message:'No fué posible Agregar la tarea'
        });
      }
    }
  }


  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <FlightTakeoffIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.05rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Domina Tasks
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {/* {pages.map((page) => (
                <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                  <Button   component={RouterLink} to={page.path}>{page.label}</Button>
                </MenuItem>
              ))} */}
            </Menu>
          </Box>
          <FlightTakeoffIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Task
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <TextField value={valueInput} sx={{width:'19rem',bgcolor:'#fff'}} onChange={handleInput} id="outlined-basic" color="secondary" type='text' size="small" label="Escribe  una tarea" variant="standard" />
            <Button onClick={addTask} sx={{marginLeft:'1rem'}} size="small" variant="contained" color="secondary">Agregar tarea al sistema</Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Button id={setting} onClick={onMenuClick}>{setting}</Button>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
        <Snackbar open={snack.open} autoHideDuration={6000} onClose={handleCloseSnack}>
          <Alert onClose={handleCloseSnack} severity={snack.severity}>
            {snack.message}
          </Alert>
        </Snackbar>
      </Container>
    </AppBar>
  );
}