import React,{useState,useEffect} from 'react'
import Navbar from './Navbar'

const Profile = () => {
    const [student,setStudent]=useState('')
    const [details,setDetails]=useState('')
    useEffect(() =>{
        getProfile()
    }, [])
    async function getProfile(){
        const jwtToken = localStorage.getItem("jwt")
        const user = JSON.parse(localStorage.getItem('user'))
        const email=user.email
        console.log(email)
        console.log(user)
        const res=await fetch('/profile',{
          method: 'post',
          headers: {
            "Content-Type":"application/json",
            'Accept': 'application/json, text/plain, */*',
            "Authorization":"Bearer "+ jwtToken
          },
          body: JSON.stringify({'email':email})
        })
        const data= await res.json()
        console.log(data.profile)
        setDetails(data.profile)
    }
    return (
        <div>
         
          <main>
          <div><b>Profile</b></div>
          <div>
            <div>Name: {details.fullname}</div>
            <div>roll no: {details.rollno}</div>
          </div>
          </main>
        </div>
        
    )
}
export default Profile
