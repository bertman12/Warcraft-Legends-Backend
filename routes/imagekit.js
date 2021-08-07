const express = require('express');
const router = express.Router();

const ImageKit = require("imagekit");
const fs = require('fs');
require('dotenv').config();

// router.use('', (req, res) => {
//     console.log('hit imagekit endpoint');
    
// })

router.use('/authenticate', (req, res)=>{
    let imagekit = new ImageKit({
        publicKey : process.env.PUBLIC_IMAGEKIT_API_KEY,
        privateKey : process.env.PRIVATE_IMAGEKIT_API_KEY,
        urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT
    });
    let authenticationParameters = imagekit.getAuthenticationParameters();
    console.log(authenticationParameters);
    
    res.json(authenticationParameters);
});

//i need to hit these endpoints after user submits the form and then get the url result from the response and store it in the database
router.use('/upload', (req, res) => {
    let imagekit = new ImageKit({
        publicKey : process.env.PUBLIC_IMAGEKIT_API_KEY,
        privateKey : process.env.PRIVATE_IMAGEKIT_API_KEY,
        urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT
    });
    
    imagekit.upload({
        file : req.body.encoded_file, //required
        fileName : req.body.encoded_file_name,   //required
    }, function(error, result) {
        if(error) console.error(error);
        else {
            console.log(result);
            res.json(result);}
    });
})

module.exports = router;
