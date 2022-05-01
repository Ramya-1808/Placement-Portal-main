const { Double, Integer } = require("mongodb")
const { Schema, model } = require("mongoose")
const mongoose = require('mongoose')  
const StudentSchema = new Schema({
  email:String,
  password:String,
  fullname:String,
  rollno:String,
  dept:String,
  tenth: Number,
  twelfth: Number,
  CGPA: Number,
  phone: String
})

module.exports = Student = mongoose.model("Student", StudentSchema)