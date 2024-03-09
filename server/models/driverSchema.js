"use strict";
const { Schema, model } = require("mongoose");

var drivers = new Schema({
    firstname: {type: String, allowNull: false, required: [true, 'firstname is required']},
    lastname: { type: String, allowNull: false, required: [true, 'lastname is required'] },
    mobilenumber:{type:Number,allowNull:false},
    email: { type: String, allowNull: false, required: [true, 'email is required'] },
    gender: { type: String, allowNull: false },
    driverLicenseNumber: { type: String, allowNull: false },
    reviews: {type: String},
    profilepicture:{type: String}},
  { timestamps: true }
);

const driverSchema = model("driverSchema", drivers);
module.exports = driverSchema;
