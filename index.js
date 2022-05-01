
const express = require('express');
const app = express()
const router = express.Router()
const mongoose = require('mongoose')
const Student = require('./models/Student')
const Company = require('./models/Company')
app.use(express.json())
const PORT = 5000
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Registrations=require('./models/Registrations')
var MongoClient = require('mongodb').MongoClient;


app.listen(PORT,()=>{
    console.log("Server is running",PORT);
})

const uri = "mongodb+srv://Ramanan:rammv%40123@placementdb.a9jku.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB Connected…')
})
.catch(err => console.log(err))





app.post("/signup",(req,res) => {
    console.log(req.body)
    const { email,
            password,
            name,
            rollno,
            dept,
            tenth,
            twelfth,
            cgpa,
            phone} = req.body
    if(!email || !name || !password || !rollno || !dept || !tenth || !twelfth || !cgpa || !phone){
        res.statusCode = 422
        return res.json({errMess:"All fields have not been filled"})
    }
    bcrypt.hash(password,12)
    .then((hashedpass) => {
        Student.findOne({email: email})
        .then((saveduser)=>{
            if(saveduser){
                res.statusCode = 422
                return res.json({errMess: "User already exists"})
            }
            const student = new Student({
                email: email, password: hashedpass, fullname: name, rollno: rollno, dept: dept, tenth: tenth, twelfth: twelfth, CGPA: cgpa, phone: phone
            })
            student.save()
            .then((sample)=> res.json("User Created Successfully"))
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})


app.post("/newform",(req,res) => {
    console.log("Received new form")
    const { companyName,
            role,
            description,
            minTenth,
            minTwelfth,
            minCGPA,
            selectedDepts
            } = req.body
    if(!companyName || !role || !description || !minTenth || !minTwelfth || !minCGPA || !selectedDepts){
        res.statusCode = 422
        return res.json({errMess:"All fields have not been filled"})
    }
    const registration=new Registrations({
        companyName: companyName,
        minCGPA:minCGPA,
        description: description,
        role: role,
        minTwelfth: minTwelfth,
        minTenth: minTenth,
        registeredStudents:[],
        eligibleDept:selectedDepts
    })
    registration.save()
    .then((sample)=> res.json("New Form Created Successfully"))
})

app.post('/login',(req,res)=>{
    console.log('Login Request received')
    const {email,password} = req.body
    if(!email || !password){
        res.statusCode = 422
        return res.json({errMess:"All fields have not been filled"})
    }
    Student.findOne({email: email})
    .then((saveduser)=>{
        if(!saveduser){
            res.statusCode = 422
            return res.json({errMess: "Student does not exist"})
        }
        bcrypt.compare(password,saveduser.password)
        .then((match)=>{
            if(match){
                const token = jwt.sign({_id:saveduser},'skayy')
                const {_id,fullname,email,tenth,twelfth,CGPA,dept} = saveduser
                res.json({token,user:{_id,fullname,email,tenth,twelfth,CGPA,dept}})
            }
            else{
                res.statusCode = 422
                return res.json({errMess: "Incorrect Password"})
            }
        })
        .catch(err =>console.log(err))
    })
    .catch(err =>console.log(err))
})

app.post('/orglogin',(req,res)=>{
    console.log('Organisation request login')
    const {cname,password} = req.body
    console.log(cname)
    console.log(password)
    if(!cname || !password){
        res.statusCode = 422
        return res.json({errMess:"All fields have not been filled"})
    }
    Company.findOne({companyName: cname})
    .then((savedcompany)=>{
        if(!savedcompany){
            console.log("nooo")
            res.statusCode = 422
            return res.json({errMess: "Company does not exist"})
        }
        bcrypt.compare(password,savedcompany.password)
        .then((match)=>{
            if(match){
                const token = jwt.sign({_id:savedcompany},'skayy')
                const {_id,companyName,description} = savedcompany
                res.json({token,company:{_id,companyName,description}})
            }
            else{
                res.statusCode = 422
                return res.json({errMess: "Incorrect Password"})
            }
        })
        .catch(err =>console.log(err))

    })
    .catch(err =>console.log(err))
})

app.post("/orgsignup",(req,res) => {
    console.log(req.body)
    const { cname,
            password,
            description} = req.body
    if(!cname|| !password || !description){
        res.statusCode = 422
        return res.json({errMess:"All fields have not been filled"})
    }
    bcrypt.hash(password,12)
    .then((hashedpass) => {
        Company.findOne({companyName: cname})
        .then((savedcompany)=>{
            if(savedcompany){
                res.statusCode = 422
                return res.json({errMess: "Company already exists"})
            }
            const company = new Company({
                companyName: cname, password: hashedpass, description: description
            })
            company.save()
            .then((sample)=> res.json("Company Created Successfully"))
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

app.post("/profile",(req,res) =>{
    console.log("yesss")
    const email=req.body.email
    console.log(email)
    Student.findOne({email: email})
    .then((savedstudent)=>{
        if(savedstudent){
            return res.json({profile:savedstudent})
        }
        else{
            res.send({errMess:"success"})
        }
    })
    
    //Student.findOne({email:em})
    //.then(details => res.json({details}))
})

app.get("/allapplications",(req,res)=>{
    console.log("Applications List Request Received")
    Registrations.find()
    .then(applications=> res.json({applications}))
})