const { timeStamp } = require('console');
const mongoose = require('mongoose');
const { Script } = require('vm');
const Schema = mongoose.Schema;
const videoSchema = mongoose.Schema({
   
    writer: {
        type: String,
        ref: "User"
    },
    title: {
        type: String,
        maxlength: 50,
    },
    description: {
        type: String,
    },
    privacy: {
        type: Number,
    },
    filePath: {
        type: String,
    },
    category: {
        type: String,
    },
    views: {
        type: Number,
        default: 0
    },
    duration: {
        type: String,
    },
    thumbnail: {
        type: String,
    }

}, { timeStamps: true} )

const Video = mongoose.model('Video', videoSchema)

module.exports = { Video }

