const { Double, Integer } = require("mongodb")
const { Schema, model } = require("mongoose")
const mongoose = require('mongoose')  
const RegistrationSchema = new Schema({
  companyName: String,
  minCGPA:Number,
  description:String,
  role:String,
  minTwelfth:Number,
  minTenth:Number,
  registeredStudents:[Schema.Types.ObjectId],
  eligibleDept:[String]
})

module.exports = Registration = mongoose.model("Registration", RegistrationSchema)