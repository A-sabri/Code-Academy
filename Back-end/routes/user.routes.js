//importaion des dépendances
const express = require('express');
const router = express.Router();

//importaion des middleware
//const auth = require('../middleware/auth.middlware.js');
const multer = require('../middleware/multer-config.user.js');

//importaion des controller 
const userCtrl = require('../controllers/user.controller.js');
const authCtrl = require('../controllers/auth.controller.js');

//auth
router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);

//user display
router.get('/', userCtrl.getAllUsers);
router.get('/:id', userCtrl.getUserById);
router.post('/', userCtrl.createUser);
router.put('/:id', multer, userCtrl.updateUser);
router.delete('/:id', userCtrl.deleteUser);

module.exports = router;
