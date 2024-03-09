// Booking schema 
// userId
// driverId
// start date and time
// end date and time
// source
// destination
// no of passengers
// space available or not

"use strict";
const mongoose = require('mongoose');

const bookingSchema = mongoose.model("bookingSchema", new mongoose.Schema({
    userId: [{ type: mongoose.ObjectId, required: [true, 'userId is required'] }],
    driverId: { type: mongoose.ObjectId,ref:'driverSchema', required: [true, 'driverId is required'] },
    startTime: { type: Date, allowNull: false },
	endTime: { type: Date, allowNull: false },
    source:{ type: String, allowNull: false,required: [true, 'address is required'] },
    destination: {type: String, allowNull: false,required: [true, 'address is required'] },
    noofpassengers:{type:Number,min:1,max:6,allowNull:false,required:[true,'no of passengers is required']}
    // spacevacant:{ type:Boolean, default: true }
},
     { timestamps: true }));
     
module.exports = bookingSchema;







