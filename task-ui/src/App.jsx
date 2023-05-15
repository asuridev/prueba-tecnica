import { useContext } from 'react'
import { Box } from "@mui/material";
import { ResponsiveAppBar } from "./components/AppBar";
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Navigate, Route, Routes } from 'react-router-dom/dist';
import { AppContext } from './context/AppContext';
import { useAppState } from './hooks/useAppState.js'
import { Profile } from './components/Profile';
import { Home } from './components/Home';
import { Details } from './components/Details';



function App() {
  const {state, setState} = useAppState();
  
  return (
    <Box>
      <AppContext.Provider value={{state, setState}}>
        <ResponsiveAppBar/>
        <Routes>
          <Route path="" element={ <Home/>} />
          <Route path="/details" element={ <Details/>} />
          <Route path="/register" element={ !state.isLogin ? <Register/> : (<Navigate to='/profile'/>) } />
          <Route path="/login" element={ !state.isLogin ? <Login/>: (<Navigate to='/profile'/>) } />
          <Route path="/profile" element={ state.isLogin ? <Profile /> : ((<Navigate to='/login'/>))} />
        </Routes>
      </AppContext.Provider>
    </Box>
  )
}

export default App
