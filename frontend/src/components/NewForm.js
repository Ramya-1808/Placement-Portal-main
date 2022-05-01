import { FormGroup } from '@material-ui/core'
import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox'
import { MenuItem } from '@material-ui/core';
import { Select } from '@material-ui/core';

const useStyles = makeStyles((theme)=>({
    cardContent:{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      // width: '40%',
      height: '80%'
    },
    linkRouter: {
        textDecoration: 'none',
    },
    toolbar:{
      backgroundColor:"#35281E"
    },
    navButton:{
      backgroundColor:"#cc7722",
      color: 'white',
      "&:hover": {
        backgroundColor: "#b7410e",
      },
    },
    card:{
      width:'25%',
      borderRadius: '15px',
      background:'linear-gradient(145deg, #ffffff, #e6e6e6)',
      boxShadow:'2px 2px 4px #b48648'
    },
    cardContainer:{
      display:'flex',
      justifyContent: 'center',
      marginTop: '12%',
    },
    formElement: {
      margin:'10px',
      width:'75%'
    },
    formButton:{
      margin:'15px',
      backgroundColor:"#cc7722",
      "&:hover": {
        backgroundColor: "#b7410e",
      },
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    pos: {
      marginBottom: 12,
    },
    title: {
        flexGrow: 1,
    },
    buttons:{
        display: 'flex',
        justifyContent: 'space-between',
        minWidth:'12vw'
    },
    heading:{
      fontSize:'2rem',
      fontWeight:'bold',
    },
  }))

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#35281E',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#35281E',
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: '#35281E',
    },
  },
})(TextField);


const NewForm = () => {
    const [role,setRole]=useState('')
    const [mincgpa,setMincgpa]=useState('')
    const [description,setDescription]=useState('')
    const [mintenth,setMintenth]=useState('')
    const [mintwelfth,setMintwelfth]=useState('')
    const [eligibledept,setEligibledept]=useState([])
    const classes=useStyles()
  return (
    <div>
        <h1>NewForm</h1>
        <FormControl className={classes.formElement}>
            <CssTextField 
            id="role" label="Role" type="text" 
            value={role} onChange={(e)=>setRole(e.target.value)}
            aria-describedby="my-helper-text" />
        </FormControl>
        <FormControl className={classes.formElement}>
            <CssTextField 
            id="description" label="Description" type="text" 
            value={description} onChange={(e)=>setDescription(e.target.value)}
            aria-describedby="my-helper-text" />
        </FormControl>
        <FormControl className={classes.formElement}>
            <CssTextField 
            id="mingpa" label="Minimum CGPA" type="number" 
            value={mincgpa} onChange={(e)=>setMincgpa(e.target.value)}
            aria-describedby="my-helper-text" />
        </FormControl>
        <FormControl className={classes.formElement}>
            <CssTextField 
            id="mintenth" label="Minimum Tenth Marks" type="number" 
            value={mintenth} onChange={(e)=>setMintenth(e.target.value)}
            aria-describedby="my-helper-text" />
        </FormControl>
        <FormControl className={classes.formElement}>
            <CssTextField 
            id="mintwelfth" label="Minimum Twelfth Marks" type="number" 
            value={mintwelfth} onChange={(e)=>setMintwelfth(e.target.value)}
            aria-describedby="my-helper-text" />
        </FormControl>
        <Typography variant="h3" component="h3">
        Eligible Departments
        </Typography>
        <Checkbox
        inputProps={{ 'aria-label': 'controlled' }}
        />
    </div>
    
  )
}

export default NewForm