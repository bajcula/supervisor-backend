const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workerSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    department: {type: String, required: true},
    salary: {type:Number, required: true},
    age: { type: Number, required: true },
    goals: {type: String, required: true},
    bonusTracker: {type: Number, min: -2, max: 2, default: -2},
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    img: {type: String, default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
}, { timestamps: true })

const Worker = mongoose.model('Worker', workerSchema);

module.exports = Worker;