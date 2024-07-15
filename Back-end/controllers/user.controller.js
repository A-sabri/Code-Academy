const UserModel = require('../models/user.model.js');

exports.getAllUsers = (req, res, next) => {
    UserModel.find()
        .sort({ createdAt: -1 })
        .then(users => res.status(200).json(users))
        .catch(error => res.status(400).json({ error }));
};

exports.getUserById = (req, res, next) => {
    UserModel.findById(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json(user);
        })
        .catch(error => res.status(400).json({ error }));
};

exports.createUser = (req, res, next) => {
    const user = new UserModel(req.body);
    user.save()
        .then(newUser => res.status(201).json(newUser))
        .catch(error => res.status(400).json({ error }));
};

exports.updateUser = (req, res, next) => {
    const updateData = { ...req.body };
    if (req.file) {
        updateData.picture = `${req.protocol}://${req.get('host')}/uploads/profil/${req.file.filename}`;
    }

    UserModel.findByIdAndUpdate(req.params.id, updateData, { new: true })
        .then(updatedUser => {
            if (!updatedUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json(updatedUser);
        })
        .catch(error => res.status(400).json({ error }));
};


exports.deleteUser = (req, res, next) => {
    UserModel.findByIdAndDelete(req.params.id)
        .then(deletedUser => {
            if (!deletedUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json({ message: 'User deleted' });
        })
        .catch(error => res.status(400).json({ error }));
};



