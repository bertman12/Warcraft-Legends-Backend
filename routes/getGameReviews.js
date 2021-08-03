const express = require('express');
const router = express.Router();

//get all game reviews
router.get("/", async (req, res)=> {
    try{
        const [gameReviews] = await req.db.query(
            `SELECT * FROM game_reviews`);
            //inject the review features rows and publish date into the game review object
        const [review_feature_images] = await req.db.query(`
            SELECT feature_image FROM review_features`);
        console.log(review_feature_images);
        const [review_feature_descriptions] = await req.db.query(`
            SELECT feature_description FROM review_features`);
        console.log(review_feature_descriptions);

            for(const x in gameReviews){
                let tempImagesArr = [];
                let tempDescriptionsArr = [];
                gameReviews[x].myprop = 5;

                console.log('game review at x === ', gameReviews[x].id);
                //assign temp array the appropriate data then inject into the game review
                //iterate over the object from the query and insert into an array to follow the format on the front end
                let [tempImages] = await req.db.query(`SELECT feature_image FROM review_features WHERE review_id = :id`,
                {
                    id: gameReviews[x].id
                });
                let [tempDescriptions] = await req.db.query(`SELECT feature_description FROM review_features WHERE review_id = :id`,
                {
                    id: gameReviews[x].id
                });
                console.log('temp images',tempImages);
                console.log('temp descriptions',tempDescriptions);
                for(const y in tempImages){
                    //iterate over this object and put it in an array
                    console.log('here we are in the object data...', tempImages[y].feature_image);
                    tempImagesArr.push(tempImages[y].feature_image);
                    tempDescriptionsArr.push(tempDescriptions[y].feature_description);
                }
                //get the review publish date object
                let [[tempReviewDate]] = await req.db.query(`SELECT * FROM review_publish_date WHERE review_id = :id`,
                {
                    id: gameReviews[x].id
                })
                //now put the array in the game object
                console.log('The new temp image array to go into the object', tempImagesArr);
                console.log('The new temp description array to go into the object', tempDescriptionsArr);
                console.log('The new temp description array to go into the object', tempReviewDate);

                gameReviews[x].featureDescriptions = tempDescriptionsArr

            }
            res.json(gameReviews);
            console.log('All games have been grabbed: ', gameReviews);
    }
    catch(err){
        console.error(err);
    }
});

//get an individual game review
router.get("/:id", async (req, res)=> {
    try{
        const [[gameReview]] = await req.db.query(
            `SELECT * FROM game_reviews WHERE id = :id`,
            {
                id: req.params.id
            });
            res.json(gameReview);
            console.log('All games have been grabbed: ', gameReview);
    }
    catch(err){
        console.error(err);
    }
});

/**Private Endpoints that will require user authentication or perhaps I could use angular guards to prevent certain actions via the frontend
 * instead of the backend.?
*/
module.exports = router;
