const { Double, Integer } = require("mongodb")
const { Schema, model } = require("mongoose")
const mongoose = require('mongoose')  
const CompanySchema = new Schema({
  companyName:String,
  password:String,
  description:String,
})

module.exports = Company = mongoose.model("Company", CompanySchema)