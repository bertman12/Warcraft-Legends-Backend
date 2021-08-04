const express = require('express');
const router = express.Router();

//get all game reviews
router.get("/", async (req, res)=> {
    try{
        const [gameReviews] = await req.db.query(`SELECT * FROM game_reviews`);
            for(const x in gameReviews){
                let tempImagesArr = [];
                let tempDescriptionsArr = [];
                let [tempImages] = await req.db.query(`SELECT feature_image FROM review_features WHERE review_id = :id`,
                {
                    id: gameReviews[x].id
                });
                let [tempDescriptions] = await req.db.query(`SELECT feature_description FROM review_features WHERE review_id = :id`,
                {
                    id: gameReviews[x].id
                });

                for(const y in tempImages){
                    tempImagesArr.push(tempImages[y].feature_image);
                    tempDescriptionsArr.push(tempDescriptions[y].feature_description);
                }
                let [[tempReviewDate]] = await req.db.query(`SELECT month, day, year FROM review_publish_date WHERE review_id = :id`,
                {
                    id: gameReviews[x].id
                })
                gameReviews[x].featureDescriptions = tempDescriptionsArr;
                gameReviews[x].featureImages = tempDescriptionsArr;
                gameReviews[x].publishDate = tempReviewDate;
            }
            res.json(gameReviews);
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
            let tempImagesArr = [];
            let tempDescriptionsArr = [];
            let [tempImages] = await req.db.query(`SELECT feature_image FROM review_features WHERE review_id = :id`,
            {
                id: req.params.id
            });
            let [tempDescriptions] = await req.db.query(`SELECT feature_description FROM review_features WHERE review_id = :id`,
            {
                id: req.params.id
            });

            for(const y in tempImages){
                tempImagesArr.push(tempImages[y].feature_image);
                tempDescriptionsArr.push(tempDescriptions[y].feature_description);
            }
            let [[tempReviewDate]] = await req.db.query(`SELECT month, day, year FROM review_publish_date WHERE review_id = :id`,
            {
                id: req.params.id
            });
            gameReview.featureDescriptions = tempDescriptionsArr;
            gameReview.featureImages = tempImagesArr;
            gameReview.publishDate = tempReviewDate;
            console.log(tempDescriptionsArr);
            console.log(tempImagesArr);
            console.log(gameReview);
            res.json(gameReview);
    }
    catch(err){
        console.error(err);
    }
});

module.exports = router;
