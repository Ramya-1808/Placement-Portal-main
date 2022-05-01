
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button'
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {useNavigate,Link} from 'react-router-dom'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
import Navbar from './Navbar';

const useStyles = makeStyles((theme) => ({
  media: {
    height: 180,
  },
  toolbar:{
    display:'flex',
    justifyContent:'space-between',
    backgroundColor: "#35281E",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
    paddingTop:theme.spacing(10),
    paddingBottom: theme.spacing(7),
    backgroundColor: '#F9E4B7',
    minHeight:'100vh'
  },
  cardContent:{
    display: 'flex',
    justifyContent:'space-between',
    width: '100%',
    alignItems: 'center',
  },
  joinButton:{
    backgroundColor:'#cc7722',
    color:"white",
    margin: theme.spacing(2),
    "&:hover": {
      backgroundColor: "#b7410e",
    },
  },
  joinButtonInverse:{
    backgroundColor:'#b7410e',
    color:"white",
    margin: theme.spacing(2),
    "&:hover": {
      backgroundColor: "#cc7722",
    },
  },
  cardHeading:{
    padding: theme.spacing(2),
    fontWeight:'600',
    color:'black'
    // fontSize: '1.4rem'
  },
  heading:{
    paddingTop: theme.spacing(2.75),
    padding: theme.spacing(1.5),
    fontSize:'2.2rem',
    fontWeight:'bold',
    // textAlign: 'center'
  },
  cardDesc: {
    paddingTop: 0,
    padding: theme.spacing(2), 
  },
  Logo:{
    marginRight:theme.spacing(6),
  },
  navItems:{
    textDecoration: 'none',
    color:'white',
    margin:theme.spacing(1.5)
  },
  partNav:{
    display:'flex',
    alignItems: 'center',
  },
}));

const Applications = () => {
    const classes = useStyles();
    const navigate = useNavigate()

    
    const [applications,setApplications]=useState([])

    useEffect(() =>{

        fetchApplications() 
    },[])

    const fetchApplications = async() => {
        const jwtToken = localStorage.getItem("jwt")
        const res = await fetch('/allApplications',{
            method: 'get',
            headers: {
                "Content-Type":"application/json",
            }
        })
        const data = await res.json()
        let finApplications=[]
        const allApplications=data.applications
        const user=JSON.parse(localStorage.getItem("user"))
        console.log(allApplications)
        console.log(user)
        allApplications.map(a=>{
            if(user.CGPA>=a.minCGPA && user.tenth>=a.minTenth && user.twelfth>=a.minTwelfth){
                finApplications=[...finApplications, a]
            }
        })
        console.log(finApplications)
        setApplications(finApplications)
        console.log(data)
    }
    if(applications.length===0){
        return(
          <div
          style={{ display:'flex',justifyContent: 'center',alignItems: 'center',height:'100vh',backgroundColor:'#F9E4B7',color:'#35281E'}}
          >
            <CircularProgress size={80} style={{color:"#35281E"}}/>
          </div>
        )
      }
  return (
    <div>
        <Navbar/>    
      {<main className={classes.content}>
        <Typography className={classes.heading} variant="h5">
           Applications
        </Typography>
        <Grid container spacing={4}>
          {
            applications?.map(a=>( 
              <Grid item lg={4} md={6} xs={12} key={a.id}>
                <Card style={{backgroundColor:"white"}}>
                  <div className={classes.cardContent}>
                    
                      <Typography className={classes.cardHeading} variant="h5">
                        {a.role}
                      </Typography>
                  </div>
                  <Typography className={classes.cardDesc} variant="subtitle2">
                    {a.companyName}
                  </Typography>
                </Card>
              </Grid>
            ))
          }
        </Grid>
        </main>}
    </div>
  )
}

export default Applications