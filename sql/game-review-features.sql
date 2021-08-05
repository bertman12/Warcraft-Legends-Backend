CREATE TABLE `review_features` (
  `review_id` int unsigned NOT NULL, 
  `feature_subset_id` int unsigned NOT NULL AUTO_INCREMENT,
  `feature_image` varchar(255) DEFAULT NULL,       
  `feature_description` varchar(255) DEFAULT NULL,
  INDEX (feature_subset_id),
  INDEX (review_id), 
  FOREIGN KEY (review_id)
    REFERENCES game_reviews (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
