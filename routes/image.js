const express = require('express');

const { body} = require('express-validator');

const router = express.Router();

// import node-fetch
const fetch = require('node-fetch');

// set url as constant
const imageURL = 'https://source.unsplash.com/1100x500/?';

/*
    Get Feeds API endpoint: http://host/api/images/:imagename
    method: GET
*/
router.get("/:imageName",
     async (req, res) => {
        try {
            const { imageName } = req.params;
            //imageName ="car"
            console.log(imageName)
            images = []
            for(i=0; i<3;i++)
            {
               images[i] =  await fetch(imageURL+imageName)
                            .then(response => response.url)
                            .then(imageUrl=> {
                                console.log(imageUrl)
                                return imageUrl
                            })
                            .catch(err => console.error(err));
            }
            
            return res.status(200).json({
                "responseMessage": "Response given as image array and info", 
                "images": images, 
                "info" : "This is the text returned for the "+imageName});
            
        }
        catch (error) {
            console.log(error.message)
            res.status(500).send({ "errorMessage ": "Pass valid imagename" })
        }
    });



async function getImage(imageName){
}


module.exports = router;