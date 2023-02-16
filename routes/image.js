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

                setTimeout(wait,4000);
            }

            function wait()
            {
                console.log("waiting")
            }

            // var i = 0;                  //  set your counter to 1

            // async function myLoop() {         //  create a loop function
            //  await setTimeout(async function() {   //  call a 3s setTimeout when the loop is called
            //     images[i] = await fetch(imageURL+imageName)
            //                 .then(response => response.url)
            //                 .then(imageUrl=> {
            //                     console.log(imageUrl)
            //                     return imageUrl
            //                 })
            //                 .catch(err => console.error(err));
            //     i++;                    //  increment the counter
            //     if (i < 3) {           //  if the counter < 10, call the loop function
            //     await myLoop();             //  ..  again which will trigger another 
            //     }                       //  ..  setTimeout()
            // }, 1000)
            // }

            // await myLoop();                   //  start the loop
            
            return res.status(200).json({
                "responseMessage": "Response given as image array and info", 
                "images": images, 
                "info" : "This is the text returned for the "+ await imageName});
            
        }
        catch (error) {
            console.log(error.message)
            res.status(500).send({ "errorMessage ": "Pass valid imagename" })
        }
    });



async function getImage(imageName){
}


module.exports = router;
