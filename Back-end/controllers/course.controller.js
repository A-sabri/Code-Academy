const CourseModel = require('../models/course.model.js');
const UserModel = require('../models/user.model.js');
const ObjectID = require('mongoose').Types.ObjectId;

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
    imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
    }
    
    const course = new CourseModel({
        name: req.body.name,
        description: req.body.description,
        nbOfStudent: req.body.nbOfStudent,
        picture: imageUrl,
        studentIds: [],
    });
  
    course.save()
    .then(() => { res.status(201).json({message: 'Course registerd !'})})
    .catch(error => { res.status(400).json( { error })})
};

//modification d'un coure
exports.updateCourse = (req, res, next) => {
    CourseModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
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

exports.addStudentToCourse = (req, res, next) => {

    const { courseId } = req.params;
    const { studentId } = req.body;
   
    CourseModel.findById(courseId)
    .then(course => {
        if (!course ) {
            return res.status(404).json({ error: 'Course not found' });
        }
       
        course.studentIds.push(studentId);
        course.nbOfStudent = course.studentIds.length;
        
        return course.save();   
    })
    .then(() => res.status(200).json({ message: 'Student added to course' }))
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