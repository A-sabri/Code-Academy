const express = require('express');
const router = express.Router();
const courseCtrl = require('../controllers/course.controller.js');

router.get('/', courseCtrl.getAllCourses);
router.get('/:id', courseCtrl.getCourseById);
router.post('/', courseCtrl.createCourse);
router.put('/:id', courseCtrl.updateCourse);
router.delete('/:id', courseCtrl.deleteCourse);
router.put('/:courseId/users/:studentId', courseCtrl.addStudentToCourse);
router.delete('/:courseId/users/:studentId', courseCtrl.removeStudentFromCourse);

module.exports = router;

