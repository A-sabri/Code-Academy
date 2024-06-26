const UserModel = require('../models/user.model.js');
const ObjectID = require('mongoose').Types.ObjectId;
const userId = req.params.id;


exports.getAllUsers = (req, res, next) => {
    
    UserModel.find().select('-password')
    .then(users => res.status(200).json(users))
    .catch(error => res.status(400).json({ error }));
}


exports.getUser = (req, res, next) => {
    
    if (!ObjectID.isValid(userId)) {
        return res.status(401).json({ message: 'Id unknown : ' + userId});
    } 

    UserModel.findById(userId, (err, docs) =>{
        if(!err) res.send(docs);
        else console.log('ID unknown : ' + err);
    }).select('-password')
    
};

exports.addUser = (req, res, next) => {
    
    UserModel.save()
    .then(user => res.status(200).json(user))
    .catch(error => res.status(400).json({ error }));
    
};


exports.updateUser = (req, res, next) => {
    if (!ObjectID.isValid(userId)) {
        return res.status(401).json({ message: 'Id unknown : ' + userId});
    } 

    try {  
        UserModel.findOneAndUpdate(
            {_id: userId},
            {$set: {
                name: req.body.name, 
                courseIds: req.body.courseIds, 
                picture: "//test/image" 
            }},
            
            {new: true, upsert: true, setDefaultsOnInsert: true},
            (err, docs) => {
                if (!err) return res.send(docs);
                if(err) return res.status(500).send({message: err});
            }
        )
    }catch (err) {return res.status(500).json({message: err})}
    
};

exports.deletUser = (req, res, next) => {

    if (!ObjectID.isValid(userId)) {
        return res.status(401).json({ message: 'Id unknown : ' + userId});
    } 

    try {
        UserModel.remove({_id: userId}).exec();
        res.status(200).json({ message: 'Successfully deleted'});

    }catch (err) {return res.status(500).json({message: err})}
    
};


