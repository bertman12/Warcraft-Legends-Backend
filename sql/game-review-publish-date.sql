CREATE TABLE `review_publish_date` (
  `review_id` int unsigned NOT NULL, 
  `date_id` int unsigned NOT NULL AUTO_INCREMENT,
  `month` varchar(255) DEFAULT NULL,
  `day` int unsigned NOT NULL,
  `year` int unsigned NOT NULL,
  INDEX (date_id),
  INDEX (review_id),
  FOREIGN KEY (review_id)
    REFERENCES game_reviews (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `review_publish_date` (
  `review_id` int unsigned NOT NULL,
  `date_id` int unsigned NOT NULL AUTO_INCREMENT,
  `month` varchar(255) DEFAULT NULL,
  `day` int unsigned NOT NULL,
  `year` int unsigned NOT NULL,
  KEY `date_id` (`date_id`),
  KEY `review_id` (`review_id`),
  CONSTRAINT `review_publish_date_ibfk_1` FOREIGN KEY (`review_id`) REFERENCES `game_reviews` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci