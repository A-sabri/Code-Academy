const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name:{ type: String, required: true },
    description: { type: String, required: true },
    nbOfStudent: { type: Number, default: 0 },
    studentIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
    },  
    { timestamps: true }
);

module.exports = mongoose.model('Course', courseSchema);
