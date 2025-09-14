import { Routes,Route } from 'react-router-dom'
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

    </>
  )
}

export default App
