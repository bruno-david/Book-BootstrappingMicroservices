const express = require('express');
const http = require('http');

const app = express();

const port = process.env.PORT;
const videoStorageHost = process.env.VIDEO_STORAGE_HOST;
const videoStoragePort = parseInt(process.env.VIDEO_STORAGE_PORT);

app.get('/video', (req, res) => 
{
    const forwardRequest = http.request(
        {
            host: videoStorageHost,
            port: videoStoragePort,
            path: '/video?path=SampleVideo_1280x720_1mb.mp4',
            method: 'GET',
            headers: req.headers
        }, 
        forwardResponse => 
        {
            res.writeHeader(forwardResponse.statusCode, forwardResponse.headers);
            forwardResponse.pipe(res);
        }
    );

    req.pipe(forwardRequest);
});

app.listen(port, () => 
{
    console.log('Microservice online');
});