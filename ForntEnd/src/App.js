import React , {useState} from 'react'
import './App.css';
import Home from './components/home';
import NavBar from './components/NavBar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import About from './components/About';
import NoteState from './context/notes/notestate';
import Alert from './components/alert';
import Login from './components/login';
import Singup from './components/singUp';


const App = () => {
const [alert, setalert] = useState(null)
const showalert = (message , type) =>{
setalert({
  type:type,
  message : message
})
setTimeout(() => {
  setalert(null)
}, 1500);
}
  return (

    <NoteState>
      <Router>
        <NavBar />
        <Alert alert={alert}/>
        <div className='container'>
        <Routes>
          <Route exact path="/" element={<Home showalert={showalert}/>}>
          </Route>
          <Route exact path="/about" element={<About name="about what" />}>
          </Route>
          <Route exact path='/login' element={<Login showalert={showalert}/>}></Route>
          <Route exact path='/singup' element={<Singup showalert={showalert}/>}></Route>
        </Routes>
        </div>
      </Router>
    </NoteState>


  )
}

export default App;