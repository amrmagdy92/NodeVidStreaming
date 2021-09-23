const VideoDataModel = require('../Model/VideoData');

module.exports = {
    getVideoMeta: (videoName) => {
        VideoDataModel.findOne({fileName: videoName}, (err, video) => {
            if (err) throw err;
            return video;
        });
    }
}