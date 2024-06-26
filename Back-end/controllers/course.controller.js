const CourseModel = require('../models/course.model.js');
const UserModel = require('../models/user.model.js');
const ObjectID = require('mongoose').Types.ObjectId;
const courseData =  req.body;
const courseId = req.params.id;


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
                return res.status(404).json({ error: 'Coure non existant' });
            }
            res.status(200).json(course);
        })
        .catch(error => res.status(400).json({ error }));
};

//crée un coure
exports.createCourse = (req, res, next) => {

    let imageUrl = '' ;
    if(req.file && req.file.filename) {
    imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
    }
    
    const course = new CourseModel({
        name: courseData.name,
        description: courseData.description,
        nbOfStudent: courseData.nbOfStudent,
        picture: imageUrl,
        studentIds: [],
    });
  
    course.save()
    .then(() => { res.status(201).json({message: 'coure enregistré !'})})
    .catch(error => { res.status(400).json( { error })})
};

//modification d'un coure
exports.updateCourse = (req, res, next) => {
    CourseModel.findByIdAndUpdate(courseId, courseData, { new: true })
        .then(updatedCourse => {
            if (!updatedCourse) {
                return res.status(404).json({ error: 'Coure non existant' });
            }
            res.status(200).json(updatedCourse);
        })
        .catch(error => res.status(400).json({ error }));
};

//suprimer un coure
exports.deleteCourse = (req, res, next) => {
    CourseModel.findByIdAndDelete(courseId)
        .then(deletedCourse => {
            if (!deletedCourse) {
                return res.status(404).json({ error: 'Course not found' });
            }
            res.status(200).json({ message: 'Coure suprimer' });
        })
        .catch(error => res.status(400).json({ error }));
};

exports.addStudentToCourse = (req, res, next) => {
    Promise.all([
        CourseModel.findById(req.params.courseId),
        UserModel.findById(req.params.studentId)
    ])
    .then(([course, student]) => {
        if (!course || !student) {
            throw new Error('Course or student not found');
        }
        if (!course.studentIds.includes(req.params.studentId)) {
            course.studentIds.push(req.params.studentId);
            course.nbOfStudent = course.studentIds.length;
            return course.save();
        }
        return course;
    })
    .then(course => res.status(200).json(course))
    .catch(error => res.status(400).json({ error: error.message }));
};

exports.removeStudentFromCourse = (req, res, next) => {
    Promise.all([
        CourseModel.findById(req.params.courseId),
        UserModel.findById(req.params.studentId)
    ])
    .then(([course, student]) => {
        if (!course || !student) {
            throw new Error('Course or student not found');
        }
        course.studentIds = course.studentIds.filter(id => id.toString() !== req.params.studentId);
        course.nbOfStudent = course.studentIds.length;
        return course.save();
    })
    .then(course => res.status(200).json(course))
    .catch(error => res.status(400).json({ error: error.message }));
};