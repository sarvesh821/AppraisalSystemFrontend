

import {Routes,Route, Router, BrowserRouter} from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { NavBar } from './components/Header/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
function App() {


  return (
    <>
   
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>

    </>
  )
}

export default App
