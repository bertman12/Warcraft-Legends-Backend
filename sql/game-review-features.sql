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


CREATE TABLE `review_features` (
  `review_id` int unsigned NOT NULL,
  `feature_subset_id` int unsigned NOT NULL AUTO_INCREMENT,
  `feature_image` varchar(255) DEFAULT NULL,
  `feature_description` varchar(255) DEFAULT NULL,
  KEY `feature_subset_id` (`feature_subset_id`) /*!80000 INVISIBLE */,
  KEY `review_id` (`review_id`),
  CONSTRAINT `review_features_ibfk_1` FOREIGN KEY (`review_id`) REFERENCES `game_reviews` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE DEFINER=`root`@`localhost` TRIGGER `review_features_AFTER_INSERT` AFTER INSERT ON `review_features` FOR EACH ROW BEGIN
	UPDATE review_features SET review_id  = 0 ;
END

CREATE DEFINER = CURRENT_USER TRIGGER `wc3-newsletter-db`.`review_features_AFTER_UPDATE` AFTER UPDATE ON `review_features` FOR EACH ROW
BEGIN
	DELETE FROM review_features WHERE feature_description = NULL;
END


-- CREATE TABLE `review_features` (
--   `id` int unsigned NOT NULL AUTO_INCREMENT,
--   `review_id` int unsigned NOT NULL, 
--   `feature_image` varchar(255) DEFAULT NULL,       
--   `feature_description` varchar(255) DEFAULT NULL, 
--   PRIMARY KEY(id),
--   INDEX (review_id), 
--   FOREIGN KEY (review_id)
--     REFERENCES game_reviews (id)
--     ON UPDATE CASCADE
--     ON DELETE CASCADE
-- ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;