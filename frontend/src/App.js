import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route,Routes, Navigate} from 'react-router-dom'
import {Suspense,lazy} from 'react'
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home'
import Organization from './components/Organization'
import SDashboard from './components/SDashboard'
import Profile from './components/Profile'
import NewForm from './components/NewForm'
import Registerform from './components/Registerform'
import Applications from './components/Applications';

function Routers(){
  return(
    <>
    <Routes>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/organization" element={<Organization/>}/>
      <Route path="/sdashboard" element={<SDashboard/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/newform" element={<NewForm/>}/>
      <Route path="/registerform" element={<Registerform/>}/>
      <Route path="/applications" element={<Applications/>}/>
      <Route path="/" element={<Home/>}/>
    </Routes>
    </>
  )
}

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routers/>
        </BrowserRouter>
    </div>
  );
}

export default App;
