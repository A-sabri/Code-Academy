const CourseModel = require('../models/course.model.js');
const UserModel = require('../models/user.model.js');
const ObjectID = require('mongoose').Types.ObjectId;
const fs = require('fs');


//retourne tout les coure 
exports.getAllCourses = (req, res, next) => {
    CourseModel.find()
    .sort({createdAt: -1})
    .then(course => res.status(200).json(course))
    .catch(error => res.status(400).json({ error }));
}

//retourne un seul coure 
exports.getCourseById = (req, res, next) => {
    CourseModel.findById(req.params.id)
        .populate('studentIds')
        .then(course => {
            if (!course) {
                return res.status(404).json({ error: 'Course not found' });
            }
            res.status(200).json(course);
        })
        .catch(error => res.status(400).json({ error }));
};

//crée un coure
exports.createCourse = (req, res, next) => {
    let imageUrl = '' ;
    if(req.file && req.file.filename) {
        imageUrl = `${req.protocol}://${req.get('host')}/uploads/course/${req.file.filename}`;
    }
    
    const course = new CourseModel({
        name: req.body.name,
        description: req.body.description,
        nbOfStudent: req.body.nbOfStudent,
        image: imageUrl,
        studentIds: [],
    });
  
    course.save()
    .then(() => { res.status(201).json({message: 'Course registered !'})})
    .catch(error => { res.status(400).json( { error })})
};

//modification d'un coure
exports.updateCourse = (req, res, next) => {
    const updateData = { ...req.body };
    if (req.file) {
        updateData.image = `${req.protocol}://${req.get('host')}/uploads/course/${req.file.filename}`;
    }

    CourseModel.findByIdAndUpdate(req.params.id, updateData, { new: true })
        .then(updatedCourse => {
            if (!updatedCourse) {
                return res.status(404).json({ error: 'Course not found' });
            }
            res.status(200).json(updatedCourse);
        })
        .catch(error => res.status(400).json({ error }));
};


//suprimer un coure
exports.deleteCourse = (req, res, next) => {
    CourseModel.findByIdAndDelete(req.params.id)
        .then(deletedCourse => {
            if (!deletedCourse) {
                return res.status(404).json({ error: 'Course not found' });
            }
            res.status(200).json({ message: 'Course deleted' });
        })
        .catch(error => res.status(400).json({ error }));
};

exports.addStudentToCourse = async (req, res, next) => {
    const { courseId } = req.params;
    const { studentId } = req.body;
   
    try {
        const course = await CourseModel.findById(courseId);
        const student = await UserModel.findById(studentId);

        if (!course || !student) {
            return res.status(404).json({ error: 'Course or student not found' });
        }

        if (!course.studentIds.includes(studentId)) {
            course.studentIds.push(studentId);
            student.courseIds.push(courseId);
            course.nbOfStudent = course.studentIds.length;

            await student.save();
            await course.save();

            return res.status(200).json({ message: 'Student added to course' });
        } else {
            return res.status(400).json({ message: 'Student already in course' });
        }
    } catch (error) {
        console.error('Error adding student to course:', error);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Server error' });
        }
    }
};

exports.removeStudentFromCourse = async (req, res, next) => {
    const { courseId } = req.params;
    const { studentId } = req.body;
   
    try {
        const course = await CourseModel.findById(courseId);
        const student = await UserModel.findById(studentId);

        if (!course || !student) {
            return res.status(404).json({ error: 'Course or student not found' });
        }

        if (course.studentIds.includes(studentId)) {
            course.studentIds = course.studentIds.filter(id => id.toString() !== studentId);
            student.courseIds = student.courseIds.filter(id => id.toString() !== courseId);
            course.nbOfStudent = course.studentIds.length;

            await student.save();
            await course.save();

            return res.status(200).json({ message: 'Student removed from course' });
        } else {
            return res.status(400).json({ message: 'Student not in course' });
        }
    } catch (error) {
        console.error('Error removing student from course:', error);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Server error' });
        }
    }
};
