/* global require process module */
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jimp = require('jimp');
const request = require('request');
const fs = require('fs');

// private function
const download = (uri, filename) => {
    return new Promise((resolve) => {
        request.head(uri, (err, res) => {
            if(err) resolve({
                "status": 404,
                "msg": "File not found"
            });
            else if(res.headers['content-type'].split("/")[0] === "image" ) {
                const imageType = res.headers['content-type'].split("/")[1];
                request(uri).pipe(fs.createWriteStream(filename+"."+imageType)).on('close', ()=>{
                    resolve({
                        "status": 200,
                        "msg": "Image downloaded Successfully",
                        "fileName": filename+"."+imageType
                    })    
                });
            } else {
                resolve({
                    "status": 400,
                    "msg": "File is not an Image"
                })
            }
        })
    })
}

// login function
const login = (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    if(username && password){
        const accessToken =  jwt.sign({username}, process.env.ACCESS_TOKEN_SECRET);
        res.status(200).send({
            "msg": "Logged In Successfully",
            "accessToken": accessToken,
        });
    } else {
        res.status(403).send({
            "msg": "Invalid Credentials"
        })
    }    
}

const compress = async (req, res)=>{
    const result = await download(req.body.imageUrl, 'original');
    if(result.status === 200) {
        jimp.read(result.fileName, (err, lenna) => {
            if(err) res.status(500).send();
            lenna.resize(50, 50).write('thumbnail'+"."+result.fileName.split('.')[1]);
            res.status(200).send();
        });
    } else {
        res.status(result.status).send(result);
    }
}


module.exports = {
    "compress": compress,
    "login": login
}



// https://www.google.com/images/srpr/logo3w.png