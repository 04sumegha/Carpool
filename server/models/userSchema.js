"use strict";

const mongoose = require('mongoose');
// require('mongoose-type-email');

const userSchema = mongoose.model("userSchema", new mongoose.Schema({
	email: { type: String, allowNull: false, required: [true, 'email is required'] },
    mobilenumber: {type: Number, allowNull: false, required: [true, 'mobilenumber is required']},
    firstname: { type: String, allowNull: false, required: [true, 'firstname is required'] },
    lastname: { type: String, allowNull: false, required: [true, 'lastname is required'] },
    livesIn : {type: String}
}, { timestamps: true }));
module.exports = userSchema;