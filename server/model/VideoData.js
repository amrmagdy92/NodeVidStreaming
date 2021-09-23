var mongoose = require('mongoose');

var VideoDataSchema = new mongoose.Schema({
    filePath: { type: String, required: true, unique: true },
    fileName: { type: String, required: true },
    fileSize: { type: Number, required: true },
    fileQuality: { type: String, required: true }
});

module.exports = mongoose.model('video_data', VideoDataSchema);