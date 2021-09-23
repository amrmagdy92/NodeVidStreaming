const fs = require('fs');
const path = require('path');

module.exports = {
    validateHeaders: (request, response) => {
        if (!(request.headers.range)) {
            response.status(400).send("Requires Range header");
        }
    },
    videoMeta: (range) => {
        var data;
        // TODO: make videoPath database dependent
        const videoPath = path.join(__dirname + "../../../media/videos/bigbuck.mp4");
        const videoSize = fs.statSync(videoPath).size;
        const CHUNK_SIZE = 10 ** 6; // TODO: make this connection dependent
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
        const vidLength = end - start + 1;
        data = {
            path: videoPath,
            size: videoSize,
            chunk: CHUNK_SIZE,
            vidStart: start,
            vidEnd: end,
            contentLength: vidLength
        };
        return data;
    }
}