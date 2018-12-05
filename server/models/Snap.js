const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const snapSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    userId: {
        type: Schema.ObjectId
    }
});

module.exports = mongoose.model('snap', snapSchema);