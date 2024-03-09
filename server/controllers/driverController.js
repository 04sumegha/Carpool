const { driverSchema } = require("../models");
const { to, ReE, ReS } = require("../services/util.service");
const logger = require("../lib/logging");
const jwt = require('jsonwebtoken');

const register = async function (req, res) {
  res.setHeader("Content-Type", "application/json");
  let body = req.body;
  let err, driver;
  if (!body.firstname) {
    logger.error("Driver Controller - register - firstname not entered");
    return ReE(res, new Error("Enter your first name"), 422);
  }
  if (!body.lastname) {
    logger.error("Driver Controller - register - lastname not entered");
    return ReE(res, new Error("Enter your last name"), 422);
  }
  if (!body.email) {
    logger.error("Driver Controller - register - email not entered");
    return ReE(res, new Error("Enter your email"), 422);
  }
  if (!body.mobilenumber) {
    logger.error("Driver Controller - register - mobilenumber not entered");
    return ReE(res, new Error("Enter your mobilenumber"), 422);
  }
  if (!body.gender) {
    logger.error("Driver Controller - register - gender not entered");
    return ReE(res, new Error("Enter your gender"), 422);
  }
  if (!body.driverLicenseNumber) {
    logger.error("Driver Controller - register - driverLicenseNumber not entered");
    return ReE(res, new Error("Enter your driverLicenseNumber"), 422);
  }
//   console.log(body);
  [err, finddriver] = await to(driverSchema.findOne({email: body.email }));
  if (finddriver) {
    logger.error("Driver Controller - register - driver already exists with this email. Please try logging in");
    return ReE(res, finddriver, 422);
  }
  [err, driver] = await to(driverSchema.create(body));
  if (err) {
    logger.error("Driver Controller - register - driver could not be created");
    return ReE(res, err, 422);
  }

  const token = jwt.sign(
    { driverId: driver._id },
    process.env.JWT_SECRET,
    { expiresIn: '24h' });

  return ReS(res, { message: "Successfully created new driver", driver: driver.toObject(), token}, 201);
};
module.exports.register = register;

const login = async function(req, res){
    let email = req.body.email;
  
    if (!email){
        logger.error("Driver Controller - login - email not entered");
        return ReE(res, new Error("Enter the email"));
    }
    let err,driver;
    [err, driver] = await to(driverSchema.findOne({'email' : email}));
    if (err){
        logger.error("Driver Controller - login - could not find the driver");
        return ReE(res, err, 404);
    }
    if(!driver){
        logger.error("Driver Controller - login - could not find the driver");
        return ReS(res, {message: "No such driver exists"},404);
    }

	const token = jwt.sign(
		{ driverId: driver._id },
		process.env.JWT_SECRET,
		{ expiresIn: '24h' }
	);

    return ReS(res, {message: "Successfully logged in", token});
}
module.exports.login = login;

const findByPk = async function (id) {
  let driver_id, err, driver;
  driver_id = id;

  [err, driver] = await to(driverSchema.findById(driver_id));

  if (err || !driver) {
    logger.error("driver Controller - findbypk : driver not found");
    throw new Error(" not found");
  }
  return driver;
};
module.exports.findByPk = findByPk;

const list = async function (req, res) {
  let driverList, driverCount, err;
  var limit = req.query.limit ? req.query.limit < 20 && req.query.limit > 0 ? parseInt(req.query.limit) : 20 : 20;
  var offset = req.query.offset ? req.query.offset > 0 ? parseInt(req.query.offset) : 0 : 0;

  var search = {};
  if (req.query.search) {
    search = req.query.search;
    search = JSON.parse(search);
  }
  [err, driverList] = await to(driverSchema.find().limit(limit).skip(offset));
  if (err) {
    logger.error("driver Controller - list : driver could not be fetched", err);
    return ReE(res, err, 422);
  }
  [err, driverCount] = await to(driverSchema.find().count());
  if (err) {
    logger.error(
      "driver Controller - list : driver count could not be fetched",
      err
    );
    return ReE(res, err, 422);
  }

  res.setHeader("Content-Type", "application/json");
  return ReS(res, { driver: JSON.stringify(driverList), count: driverCount });
};
module.exports.list = list;

const update = async function (req, res) {
  let driver_id, err, driver, saveddriver;
  if (!req.query._id) {
    logger.error("driver Controller - update : driver Id is empty");
    return ReE(res, new Error("driver Id is empty."), 422);
  }
  driver_id = req.query._id;

  [err, driver] = await to(findByPk(driver_id));
  if (err) {
    logger.error("driver Controller - update : driver not found", err);
    return ReE(res, err, 422);
  }
  if (req.body.email) driver.email = req.body.email;
  if (req.body.mobilenumber) driver.mobilenumber = req.body.mobilenumber;
  if (req.body.firstname) driver.firstname = req.body.firstname;
  if (req.body.lastname) driver.lastname = req.body.lastname;
  if (req.body.profilepicture) driver.profilepicture = req.body.profilepicture;
  if (req.body.driverLicenseNumber) driver.driverLicenseNumber = req.body.driverLicenseNumber;
  [err, saveddriver] = await to(driver.save());
  if (err) {
    logger.error("driver Controller - update : driver could not be updated", err);
    return ReE(res, err, 422);
  }
  return ReS(res, { message: "Updated driver: " + driver.firstname });
};
module.exports.update = update;

const cancel = async function (req, res) {
  let driver_id = req.query._id;
  let err, driver;
  if (!driver_id) {
    logger.error("driver Controller - Delete : driver Id is empty");
    return ReE(res, new Error("driver Id is empty."), 422);
  }

  [err, driver] = await to(findByPk(driver_id));
  if (err) {
    logger.error("driver Controller - Delete : driver not found", err);
    return ReE(res, err, 422);
  }
  [err, driver] = await to(driver.deleteOne());
  if (err) {
    logger.error("driver Controller - Delete : driver could not be Deleted", err);
    return ReE(res, err, 422);
  }
  return ReS(res, { message: "driver deleted" }, 201);
};
module.exports.cancel = cancel;
