const jwt = require('jsonwebtoken');
const { to, ReE, ReS } = require('../services/util.service');
const { userSchema } = require('../models');
const logger = require('../lib/logging');

const register = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let body = req.body;
    let err, user;
	console.log(body);
    if (!body.firstname){
        logger.error("Auth Controller - register - firstname not entered");
        return ReE(res, new Error("Enter your first name"), 422);
    }
    if (!body.lastname){
        logger.error("Auth Controller - register - lastname not entered");
        return ReE(res, new Error("Enter your last name"), 422);
    }
    if (!body.email){
        logger.error("Auth Controller - register - email not entered");
        return ReE(res, new Error("Enter your email"), 422);
    }
    if (!body.mobilenumber){
        logger.error("Auth Controller - register - mobilenumber not entered");
        return ReE(res, new Error("Enter your mobilenumber"), 422);
    }
    [err, findUser] = await to(userSchema.findOne({email : body.email}));
    if (findUser){
        logger.error("Auth Controller - register - User already exists with this email. Please try logging in");
        return ReE(res, findUser, 422);
    }
    [err, user] = await to(userSchema.create(body));
    if (err){
        logger.error("Auth Controller - register - User could not be created");
        return ReE(res, err, 422);
    }

	const token = jwt.sign(
		{ userId: user._id },
		process.env.JWT_SECRET,
		{ expiresIn: '24h' }
	);

    return ReS(res, {message: "Successfully created new user", user: user.toObject(), token}, 201);
}
module.exports.register = register;


const login = async function(req, res){
    let email = req.body.email;
	console.log(email)
    if (!email){
        logger.error("Auth Controller - login - email not entered");
        return ReE(res, new Error("Enter the email"));
    }
    let err,user;
    [err, user] = await to(userSchema.findOne({'email' : email}));
    if (err){
        logger.error("Auth Controller - login - could not find the user");
        return ReE(res, err, 404);
    }
    if(!user){
        logger.error("Auth Controller - login - could not find the user");
        return ReS(res, {message: "No such user exists"},404);
    }
	let id;

	const token = jwt.sign(
		{ userId: user._id },
		process.env.JWT_SECRET,
		{ expiresIn: '24h' }
	);
	console.log(token)
	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        id = user.userId;
        console.log(id);
    });
    return ReS(res, {message: "Successfully logged in", token, id});
}
module.exports.login = login;


const findByPk = async function (id) {
	let user_id, err,user;
	user_id = id;

	[err, user] = await to(userSchema.findById(user_id));

	if (err || !user) {
		logger.error("user Controller - findbypk : user not found");
		throw new Error(" not found");
	}
	return user;
}
module.exports.findbypk = findByPk;

const get = async function (req, res) {
	let user_id, err, user;
	if (!req.query._id) {
		logger.error("userSchema Controller - get : user Id is empty");
		return ReE(res, new Error('user Id is empty'), 422);
	}

	user_id = req.query._id;

	[err,user] = await to(findByPk(user_id));
	if (err) {
		logger.error("User Controller - get : User not found", err);
		return ReE(res, err, 422);
	}

	res.setHeader('Content-Type', 'application/json');

	return ReS(res, { user: user.toObject() });
}
module.exports.get = get;

const list = async function (req, res) {

	let userList, userCount, err;
	var limit = req.query.limit ? (req.query.limit < 20 && req.query.limit > 0) ? parseInt(req.query.limit) : 20 : 20;
	var offset = req.query.offset ? req.query.offset > 0 ? parseInt(req.query.offset) : 0 : 0;

	var search = {};
	if (req.query.search) {
		search = req.query.search;
		search = JSON.parse(search)
	}
	[err, userList] = await to(userSchema.find().limit(limit).skip(offset));
	if (err) {
		logger.error("user Controller - list : user could not be fetched", err);
		return ReE(res, err, 422);
	}
	[err, userCount] = await to(userSchema.find().count());
	if (err) {
		logger.error("user Controller - list : user count could not be fetched", err);
		return ReE(res, err, 422);
	}

	res.setHeader('Content-Type', 'application/json');
	return ReS(res, { user: JSON.stringify(userList), count: userCount });
}
module.exports.list = list;


const update = async function (req, res) {
	let user_id, err, user, saveduser;
	if (!req.query._id) {
		logger.error("user Controller - update : user Id is empty");
		return ReE(res, new Error('user Id is empty.'), 422);
	}
	user_id = req.query._id;

	[err,user] = await to(findByPk(user_id));
	if (err) {
		logger.error("user Controller - update : user not found", err);
		return ReE(res, err, 422);
	}
	if (req.body.email) user.email = req.body.email;
	if (req.body.mobilenumber) user.mobilenumber = req.body.mobilenumber;
	if (req.body.firstname) user.firstname = req.body.firstname;
    if (req.body.lastname) user.lastname = req.body.lastname;
	if (req.body.livesIn) user.livesIn = req.body.livesIn;
	[err, saveduser] = await to(user.save());
	if (err) {
		logger.error("user Controller - update : user could not be updated", err);
		return ReE(res, err, 422);
	}
	return ReS(res, { message: 'Updated user: ' + user.firstname });
}
module.exports.update = update;

const cancel = async function (req, res) {
	let user_id = req.query._id
	let err, user;
	if (!user_id) {
		logger.error("user Controller - Delete : user Id is empty");
		return ReE(res, new Error('user Id is empty.'), 422);
	}

	[err, user] = await to(findByPk(user_id));
	if (err) {
		logger.error("user Controller - Delete : user not found", err);
		return ReE(res, err, 422);
	}
	[err, user] = await to(user.deleteOne());
	if (err) {
		logger.error("user Controller - Delete : user could not be Deleted", err);
		return ReE(res, err, 422);
	}
	return ReS(res, { message: 'user deleted' }, 201);
}
module.exports.cancel = cancel;