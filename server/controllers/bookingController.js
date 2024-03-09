const { to, ReE, ReS } = require('../services/util.service');
const logger = require('../lib/logging');
const { bookingSchema } = require('../models');
const { findbypk } = require('./userController');
const { findByPk } = require('./driverController');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    const userId = req.user.userId;
    console.log(userId);
    if(!body.driverId){
        logger.error("Booking Controller - create - driverId not present");
        return ReE(res, new Error("Enter driverId"), 422);
    }
    if(!body.startTime){
        logger.error("Booking Controller - create - startTime not entered");
        return ReE(res, new Error("Enter startTime"), 422);
    }
    if(!body.endTime){
        logger.error("Booking Controller - create - endTime not entered");
        return ReE(res, new Error("Enter endTime"), 422);
    }
    if(!body.source){
        logger.error("Booking Controller - create - source not entered");
        return ReE(res, new Error("Enter source"), 422);
    }
    if(!body.destination){
        logger.error("Booking Controller - create - destination not entered");
        return ReE(res, new Error("Enter destination"), 422);
    }
    if(!body.noofpassengers){
        logger.error("Booking Controller - create - noofpassengers not entered");
        return ReE(res, new Error("Enter noofpassengers"), 422);
    }
    //CHECK FOR NO OF PASSENGERS    
    //CHECK FOR SPACE VACANT

    let err, user, driver, booking;

    [err, user] = await to(findbypk(userId));
	if (err) {
		logger.error("Booking Controller - create : not able to fetch user by userId");
		return ReE(res, new Error('Please enter a valid userId.'), 422);
	}
    [err, driver] = await to(findByPk(body.driverId));
	if (err) {
		logger.error("Booking Controller - create : not able to fetch driver by driverId");
		return ReE(res, new Error('Please enter a valid driverId.'), 422);
	}
    if(body.noofpassengers > 6){
        logger.error("Booking Controller - update - limit exceeded");
        return ReE(res, new Error('Max limit is 6 passengers'), 422);
    }
    body.userId = userId;
    // console.log(body.userId);
    // console.log(body);

    [err, booking] = await to(bookingSchema.create(body));
	if (err) {
		logger.error("Booking Controller - create : Booking could not be created", err);
		return ReE(res, err, 422);
	}
    // user.bookings = true; CHECK THIS
    return ReS(res, {message: "Booking Created Successfully", booking: booking.toObject()}, 201);
}
module.exports.create = create;

const update = async function(req, res){
    let bookingId, err, booking, savedBooking;
    const body = req.body;
	if (!req.query._id) {
		logger.error("Booking Controller - update : booking Id is empty");
		return ReE(res, new Error('booking Id is empty.'), 422);
	}
	bookingId = req.query._id;

	[err,booking] = await to(findBooking(bookingId));
	if (err) {
		logger.error("Booking Controller - update : booking not found", err);
		return ReE(res, err, 422);
	}

    const userId = req.user.userId;
    let user;
    [err, user] = await to(findbypk(userId));
	if (err) {
		logger.error("Booking Controller - update : not able to fetch user by userId");
		return ReE(res, new Error('Please enter a valid userId.'), 422);
	}
    // booking.userId.push(userId);
    booking.userId = userId;
    let availableSeats;
    availableSeats = 6 - booking.noofpassengers;
    if(body.noofpassengers > availableSeats){
        logger.error("Booking Controller - update - limit exceeded");
        return ReE(res, new Error('No of seats available is: ' + (availableSeats)), 422);
    }

    booking.noofpassengers = body.noofpassengers + booking.noofpassengers;
    // if(booking.noofpassengers > 6){
    //     logger.error("Booking Controller - update - limit exceeded");
    //     return ReE(res, new Error('No of seats available is: ' + (6 - booking.noofpassengers)), 422);
    // }
    [err, savedBooking] = await to(booking.save());
    if (err) {
		logger.error("Booking Controller - update : Booking could not be updated", err);
		return ReE(res, err, 422);
	}
	return ReS(res, { message: 'Updated Booking' });
}
module.exports.update = update;

const findBooking = async function (id) {
	let bookingId, err,booking;
	bookingId = id;

	[err, booking] = await to(bookingSchema.findById(bookingId));

	if (err || !booking) {
		logger.error("Booking Controller - findbypk : booking not found");
		throw new Error(" not found");
	}
	return booking;
}
module.exports.findBooking = findBooking;

const list = async function (req, res) {
    let bookingList, bookingCount, err;
    var limit = req.query.limit ? req.query.limit < 20 && req.query.limit > 0 ? parseInt(req.query.limit) : 20 : 20;
    var offset = req.query.offset ? req.query.offset > 0 ? parseInt(req.query.offset) : 0 : 0;
  
    var search = {};
    if (req.query.search) {
      search = req.query.search;
      search = JSON.parse(search);
    }
    [err, bookingList] = await to(bookingSchema.find().limit(limit).skip(offset));
    if (err) {
      logger.error("Booking Controller - list : bookings could not be fetched", err);
      return ReE(res, err, 422);
    }
    [err, bookingCount] = await to(bookingSchema.find().count());
    if (err) {
      logger.error("Booking Controller - list : booking count could not be fetched", err);
      return ReE(res, err, 422);
    }
  
    res.setHeader("Content-Type", "application/json");
    return ReS(res, { booking: JSON.stringify(bookingList), count: bookingCount });
};
module.exports.list = list;