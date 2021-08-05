const express = require('express');
const router = express.Router();

var ImageKit = require("imagekit");
var fs = require('fs');
require('dotenv').config();



router.use('', (req, res)=>{
    let imagekit = new ImageKit({
        publicKey : process.env.PUBLIC_IMAGEKIT_API_KEY,
        privateKey : process.env.PRIVATE_IMAGEKIT_API_KEY,
        urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT
    });
    
    let authenticationParameters = imagekit.getAuthenticationParameters();
    console.log(authenticationParameters);
    
    res.json(authenticationParameters);
});


module.exports = router;
