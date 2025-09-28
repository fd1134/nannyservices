import { Routes,Route } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from '../../pages/Home/Home'
import Nannies from '../../pages/Nannies/Nannies'
import './App.css'

function App() {
 

  return (
    <>
 

  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/nannies' element={<Nannies />} />
  </Routes>
     <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App
