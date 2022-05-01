import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
  return (
    <div>
        <b>Home</b>
        <div>
            <button onClick={()=>{
               navigate('\login') 
            }}>Student</button>
            <button onClick={()=>{
              navigate('\organization')
            }}>Organization</button>
        </div>
    </div>
  )
}

export default Home