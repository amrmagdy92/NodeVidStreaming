var router = require('express').Router();
const fs = require('fs');
const path = require('path');
const streamController = require('../Controller/StreamController');

router.get('/', (req, res) => {
    streamController.validateHeaders(req, res);
    const videoMeta = streamController.videoMeta(req.headers.range);
    const headers = {
        "Content-Range": `bytes ${videoMeta.vidStart}-${videoMeta.vidEnd}/${videoMeta.size}`,
        "Accept-Ranges": "bytes",
        "Content-Length": videoMeta.contentLength,
        "Content-Type": "video/mp4",
    };
    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoMeta.path, { 
        start: videoMeta.vidStart,
        end: videoMeta.vidEnd
    });
    videoStream.pipe(res);
});

module.exports = router;