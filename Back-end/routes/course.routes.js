//importaion des dépendances
const express = require('express');
const router = express.Router();

//importaion des middleware
const auth = require('../middleware/auth.middlware.js');
const multer = require('../middleware/multer-config.course.js');

//importaion des controller 
const courseCtrl = require('../controllers/course.controller.js');

//cours display
router.get('/', courseCtrl.getAllCourses);
router.get('/:id', courseCtrl.getCourseById);
router.post('/', auth, multer, courseCtrl.createCourse);
router.put('/:id', auth, multer, courseCtrl.updateCourse);
router.delete('/:id', auth, courseCtrl.deleteCourse);
router.put('/:courseId/users/:studentId', auth, courseCtrl.addStudentToCourse);
router.delete('/:courseId/users/:studentId', auth, courseCtrl.removeStudentFromCourse);

module.exports = router;

