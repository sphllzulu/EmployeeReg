import { Route, Routes } from 'react-router-dom';
import './App.css'

import Home from './Home';
import Active from './Active';
import Removed from './Removed';
import Login from './Login';





function App() {


  return (
    <div className="App">
      <div className="container">
      <Routes>
         <Route path='/home' element={<Home/>} />
         
         <Route path='/active' element={<Active/>} />
         <Route path='/removed' element={<Removed/>} />
         <Route path='/' element={<Login/>} />
         
         
       </Routes>
      </div>
      
       
    </div>
  )
}

export default App
