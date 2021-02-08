const express = require('express');
const fs = require('fs');

const app = express();

if (!process.env.PORT)
{
    throw new Error("Please specify the port number for the HTTP server with the environment variable PORT.");
}

const port = process.env.PORT;

app.get('/video', (req, res) => 
{
    const path = "videos/SampleVideo_1280x720_1mb.mp4";
    fs.stat(path, (err, stats) => 
    {
        if (err)
        {
            console.error(`An error has occurred: ${err}`);
            res.sendStatus(500);

            return;
        }

        res.writeHead(200, 
        {
            "Content-Length": stats.size,
            "Contents-Type": "video/mp4"
        });

        fs.createReadStream(path).pipe(res);
    });
});

app.get('/', (req, res) => 
{
    res.send('Hello World!');
});

app.listen(port, () => 
{
    console.log(`Example app listening on port ${port}!`);
});