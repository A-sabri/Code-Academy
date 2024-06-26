const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//le modéle User
const userSchema = mongoose.Schema({
    name: { type: String, required: true, trimp: true, unique: true },
    email: { type: String, required: true, lowercase: true, trimp: true, unique: true },
    password: { type: String, required: true, max: 1024, min: 1 },
    picture:  { type: String, default: " " },
    courseIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    isAdmin : {type : Boolean, default: false}

  },
  { timestamps: true },
);

//plugin pour les mots de pass
userSchema.plugin(uniqueValidator);

//exportaion du module
module.exports = mongoose.model('User', userSchema);