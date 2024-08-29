
var express = require('express');
 
var studentController = require('../src/user/studentController');
var usersController = require('../src/user/usersController');

const router = express.Router();

//student routes
router.route('/api/student').get(studentController.getDataControllerFn);
router.route('/api/student/:id').get(studentController.getDataControllerFn);
router.route('/student/login').post(studentController.loginUserControllerFn);
router.route('/student/create').post(studentController.createStudentControllerFn);
router.route('/student/delete/:id').delete(studentController.deleteStudentControllerFn);
router.route('/student/update/:id').patch(studentController.updateStudentControllerFn);


//warden and admin routes
router.route('/api/users').get(usersController.getUsersDataControllerFn);
router.route('/api/users/:id').get(usersController.getUsersDataControllerFn);
router.route('/users/login').post(usersController.loginUsersControllerFn);
router.route('/users/create').post(usersController.createUsersControllerFn);
router.route('/users/delete/:id').delete(usersController.deleteUsersControllerFn);
router.route('/users/update/:id').patch(usersController.updateUsersControllerFn);
router.route('/api/users').post(usersController.getUsersDataControllerFn);

 
module.exports = router;