const express = require('express');
const azure = require('azure-storage');

const app = express();

const port = process.env.PORT;
const storageAccountName = process.env.STORAGE_ACCOUNT_NAME;
const storageAccessKey = process.env.STORAGE_ACCESS_KEY;

function createBlobService()
{
    return azure.createBlobService(storageAccountName, storageAccessKey);
}

app.get('/video', (req, res) => 
{
    const videoPath = req.query.path;
    const blobService = createBlobService();

    const containerName = "bootstrapping-microservices";
    blobService.getBlobProperties(containerName, videoPath, (err, properties) => 
    {
        if (err)
        {
            res.sendStatus(500);
            return;
        }

        res.writeHead(200, 
        {
            "Content-Length": properties.contentLength,
            "Content-Type": "video/mp4"
        });

        blobService.getBlobToStream(containerName, videoPath, res, err => 
        {
            if (err)
            {
                res.sendStatus(500);
                return;
            }
        });
    });
});

app.listen(port, () => 
{
    console.log('Microservice online');
});