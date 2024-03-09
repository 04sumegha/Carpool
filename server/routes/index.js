var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const driverController = require('../controllers/driverController');
const bookingController = require('../controllers/bookingController');
const authenticateToken = require('../middleware/authenticate');

//post get put delete

router.post('/user/register',userController.register);
router.post('/user/login',userController.login);
router.get('/user/get',userController.get);
router.put('/user/update',userController.update);
router.delete('/user',userController.cancel);

router.post('/driver/register',driverController.register);
router.post('/driver/login', driverController.login);
router.get('/driver/list',driverController.list);
router.put('/driver/update',driverController.update);
router.delete('/driver',driverController.cancel);

router.post('/booking/create', authenticateToken, bookingController.create);
router.put('/booking/update', authenticateToken, bookingController.update);
router.get('/booking/list', authenticateToken, bookingController.list);

module.exports = router;
