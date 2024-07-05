const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    name:{ type: String, required: true },
    description: { type: String, required: true },
    image:  { type: String, default: "../uploads/course/Code-Academy.jpg" },
    nbOfStudent: { type: Number, default: 0 },
    studentIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
    },  
    { timestamps: true }
);

module.exports = mongoose.model('Course', courseSchema);
