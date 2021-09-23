require('dotenv').config();
const cluster = require('cluster');
const cpuCount = require('os').cpus().length;
const http = require('http');
const process = require('process');

var app = require('./app');

if (cluster.isMaster) {
    console.info(`Main process is running at ${process.pid}`);

    for (let i = 0; i < cpuCount; i++) {
        cluster.fork();
        console.log(`created worker #${i+1}`);
    };

    cluster.on('exit', (worker, code, signal) => {
        console.error(`Worker(${worker.process.pid}) just died with code(${code}) and signal(${signal})`);
        cluster.fork();
    });
} else {
    http.createServer(app).listen(process.env.SERVER_PORT);
    console.log(`Server at process: ${process.pid} just started...`);
}