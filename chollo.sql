/*
 Navicat Premium Data Transfer

 Source Server         : Mysql
 Source Server Type    : MySQL
 Source Server Version : 100428
 Source Host           : localhost:3306
 Source Schema         : chollo

 Target Server Type    : MySQL
 Target Server Version : 100428
 File Encoding         : 65001

 Date: 23/08/2023 09:36:43
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for activity
-- ----------------------------
DROP TABLE IF EXISTS `activity`;
CREATE TABLE `activity`  (
  `id` int(4) NOT NULL,
  `user_id` int(4) NOT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `point` int(4) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of activity
-- ----------------------------

-- ----------------------------
-- Table structure for blog
-- ----------------------------
DROP TABLE IF EXISTS `blog`;
CREATE TABLE `blog`  (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `html` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 30 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of blog
-- ----------------------------
INSERT INTO `blog` VALUES (10, '<h1>Hello Everyone</h1>This is blog, Do you want to see image<img src=\'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339\'>');
INSERT INTO `blog` VALUES (11, '<h1>Hello Everyone</h1>This is blog, Do you want to see image<img src=\'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339\'>');
INSERT INTO `blog` VALUES (12, '<h1>Hello Everyone</h1>This is blog, Do you want to see image<img src=\'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339\'>');
INSERT INTO `blog` VALUES (13, '<h1>Hello Everyone</h1>This is blog, Do you want to see image<img src=\'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339\'>');
INSERT INTO `blog` VALUES (14, '<h1>Hello Everyone</h1>This is blog, Do you want to see image<img src=\'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339\'>');
INSERT INTO `blog` VALUES (15, '<h1>Hello Everyone</h1>This is blog, Do you want to see image<img src=\'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339\'>');
INSERT INTO `blog` VALUES (16, '<h1>Hello Everyone</h1>This is blog, Do you want to see image<img src=\'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339\'>');
INSERT INTO `blog` VALUES (17, '<h1>Hello Everyone</h1>This is blog, Do you want to see image<img src=\'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339\'>');
INSERT INTO `blog` VALUES (18, '<h1>Hello Everyone</h1>This is blog, Do you want to see image<img src=\'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339\'>');
INSERT INTO `blog` VALUES (19, '<h1>Hello Everyone</h1>This is blog, Do you want to see image<img src=\'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339\'>');
INSERT INTO `blog` VALUES (20, '<h1>Hello Everyone</h1>This is blog, Do you want to see image<img src=\'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339\'>');
INSERT INTO `blog` VALUES (21, '<h1>Hello Everyone</h1>This is blog, Do you want to see image<img src=\'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339\'>');
INSERT INTO `blog` VALUES (22, '<h1>Hello Everyone</h1>This is blog, Do you want to see image<img src=\'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339\'>');
INSERT INTO `blog` VALUES (23, '<h1>Hello Everyone</h1>This is blog, Do you want to see image<img src=\'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339\'>');
INSERT INTO `blog` VALUES (24, '<h1>Hello Everyone</h1>This is blog, Do you want to see image<img src=\'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339\'>');
INSERT INTO `blog` VALUES (25, '<h1>Hello Everyone</h1>This is blog, Do you want to see image<img src=\'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339\'>');
INSERT INTO `blog` VALUES (26, '<h1>Hello Everyone</h1>This is blog, Do you want to see image<img src=\'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339\'>');
INSERT INTO `blog` VALUES (27, '<h1>Hello Everyone</h1>This is blog, Do you want to see image<img src=\'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339\'>');
INSERT INTO `blog` VALUES (28, '<h1>Hello Everyone</h1>This is blog, Do you want to see image<img src=\'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339\'>');
INSERT INTO `blog` VALUES (29, '<h1>Hello Everyone</h1>This is blog, Do you want to see image<img src=\'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339\'>');

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `parent_id` int(4) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 36 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (1, 'babies and children', '123', -1);
INSERT INTO `category` VALUES (2, 'Feeding bottle', '123', 1);
INSERT INTO `category` VALUES (3, 'Dr Brown\'s', '123', 2);
INSERT INTO `category` VALUES (4, 'Philips Avent Babybottles', '123', 2);
INSERT INTO `category` VALUES (5, 'Difrax', '123', 2);
INSERT INTO `category` VALUES (6, 'free layettes', '123', 1);
INSERT INTO `category` VALUES (7, 'Strollers and strollers', '123', 1);
INSERT INTO `category` VALUES (8, 'bugaboo', '123', 7);
INSERT INTO `category` VALUES (9, 'Chicco buggy', '123', 7);
INSERT INTO `category` VALUES (10, 'Toys', '123', 1);
INSERT INTO `category` VALUES (11, 'Cards and board games', '123', 10);
INSERT INTO `category` VALUES (12, 'Fisher-Price', '123', 10);
INSERT INTO `category` VALUES (13, 'Funko Pop!', '123', 10);
INSERT INTO `category` VALUES (14, 'hot wheels', '123', 10);
INSERT INTO `category` VALUES (15, 'Block & Building Toys', '123', 10);
INSERT INTO `category` VALUES (16, 'outdoor toys', '123', 10);
INSERT INTO `category` VALUES (17, 'LOL Surprise', '123', 10);
INSERT INTO `category` VALUES (18, 'dolls', '123', 10);
INSERT INTO `category` VALUES (19, 'Food and drink', '123', -1);
INSERT INTO `category` VALUES (20, 'Feeding', '123', 19);
INSERT INTO `category` VALUES (21, 'Chocolate', '123', 19);
INSERT INTO `category` VALUES (22, 'food at home', '123', 19);
INSERT INTO `category` VALUES (23, 'Sport Nutrition', '123', 19);
INSERT INTO `category` VALUES (24, 'Restaurants', '123', 19);
INSERT INTO `category` VALUES (25, 'electronics', '123', -1);
INSERT INTO `category` VALUES (26, 'data storage', '123', 25);
INSERT INTO `category` VALUES (27, 'Audio & HiFi', '123', 25);
INSERT INTO `category` VALUES (28, 'power banks', '123', 25);
INSERT INTO `category` VALUES (29, 'batteries', '123', 25);
INSERT INTO `category` VALUES (30, 'Free', '123', -1);
INSERT INTO `category` VALUES (31, 'raffles', '123', 30);
INSERT INTO `category` VALUES (32, 'Home', '123', -1);
INSERT INTO `category` VALUES (33, 'Garden', '123', 32);
INSERT INTO `category` VALUES (34, 'Furniture', '123', 32);
INSERT INTO `category` VALUES (35, 'Home applicances', '123', 32);

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `sender_id` int(4) NOT NULL,
  `dest_id` int(4) NOT NULL,
  `blog_id` int(4) NOT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `date` date NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 29 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES (3, 1, 15, 10, 'deal', NULL);
INSERT INTO `comment` VALUES (4, 1, 16, 10, 'deal', NULL);
INSERT INTO `comment` VALUES (5, 1, 17, 10, 'deal', NULL);
INSERT INTO `comment` VALUES (6, 1, 18, 10, 'deal', NULL);
INSERT INTO `comment` VALUES (7, 1, 19, 10, 'deal', NULL);
INSERT INTO `comment` VALUES (8, 1, 20, 10, 'deal', NULL);
INSERT INTO `comment` VALUES (9, 1, 21, 10, 'deal', NULL);
INSERT INTO `comment` VALUES (10, 1, 22, 10, 'deal', NULL);
INSERT INTO `comment` VALUES (11, 1, 23, 10, 'deal', NULL);
INSERT INTO `comment` VALUES (12, 1, 24, 10, 'deal', NULL);
INSERT INTO `comment` VALUES (13, 1, 25, 10, 'deal', NULL);
INSERT INTO `comment` VALUES (14, 1, 26, 10, 'deal', NULL);
INSERT INTO `comment` VALUES (15, 1, 27, 10, 'deal', NULL);
INSERT INTO `comment` VALUES (16, 1, 28, 10, 'deal', NULL);
INSERT INTO `comment` VALUES (17, 1, 29, 10, 'deal', NULL);
INSERT INTO `comment` VALUES (18, 1, 30, 10, 'deal', NULL);
INSERT INTO `comment` VALUES (19, 2, 15, 10, 'deal', NULL);
INSERT INTO `comment` VALUES (20, 2, 18, 10, 'deal', NULL);
INSERT INTO `comment` VALUES (21, 2, 21, 10, 'deal', NULL);
INSERT INTO `comment` VALUES (22, 2, 24, 10, 'deal', NULL);
INSERT INTO `comment` VALUES (23, 2, 27, 10, 'deal', NULL);
INSERT INTO `comment` VALUES (24, 2, 31, 10, 'deal', NULL);
INSERT INTO `comment` VALUES (25, 2, 33, 10, 'deal', NULL);
INSERT INTO `comment` VALUES (26, 2, 36, 10, 'deal', NULL);
INSERT INTO `comment` VALUES (27, 2, 38, 10, 'deal', NULL);
INSERT INTO `comment` VALUES (28, 2, 41, 10, 'deal', NULL);

-- ----------------------------
-- Table structure for deal
-- ----------------------------
DROP TABLE IF EXISTS `deal`;
CREATE TABLE `deal`  (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `price` decimal(10, 2) NULL DEFAULT NULL,
  `retail_price` decimal(10, 2) NULL DEFAULT NULL,
  `type` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `discount` int(4) NULL DEFAULT NULL,
  `store_id` int(4) NOT NULL,
  `deal_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `image_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `user_id` int(4) NOT NULL,
  `category_id` int(4) NULL DEFAULT NULL,
  `status` int(2) NOT NULL,
  `uploaded_date` date NOT NULL,
  `expires` date NOT NULL,
  `price_ship` int(4) NOT NULL,
  `start_date` date NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 64 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of deal
-- ----------------------------
INSERT INTO `deal` VALUES (15, 'lkea gift card of 50$ for only 43.11 in Eneba', 'Ikea gift card of €50 for only €43.11 in Eneba\nIdeal to arry all your favorite products with the best discounts Be sure to apply this promotional code before completing your purchase.', 43.11, 50.00, 'price', NULL, 3, 'https://www.amazon.es/deal/13545001', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 1, 11, 1, '2023-08-20', '2024-01-10', 0, NULL);
INSERT INTO `deal` VALUES (16, 'lkea gift card of 50$ for only 43.11 in Eneba', 'Ikea gift card of €50 for only €43.11 in Eneba\nIdeal to arry all your favorite products with the best discounts Be sure to apply this promotional code before completing your purchase.', 43.11, 50.00, 'discount_percent', 15, 3, 'https://www.amazon.es/deal/13545001', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 1, 12, 1, '2023-08-20', '2024-01-10', 0, NULL);
INSERT INTO `deal` VALUES (17, 'lkea gift card of 50$ for only 43.11 in Eneba', 'Ikea gift card of €50 for only €43.11 in Eneba\nIdeal to arry all your favorite products with the best discounts Be sure to apply this promotional code before completing your purchase.', 43.11, 50.00, 'free', NULL, 3, 'https://www.amazon.es/deal/13545001', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 1, 13, 1, '2023-08-20', '2024-01-10', 0, NULL);
INSERT INTO `deal` VALUES (18, 'lkea gift card of 50$ for only 43.11 in Eneba', 'Ikea gift card of €50 for only €43.11 in Eneba\nIdeal to arry all your favorite products with the best discounts Be sure to apply this promotional code before completing your purchase.', 43.11, 50.00, 'discount_percent', 20, 3, 'https://www.amazon.es/deal/13545001', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 1, 14, 1, '2023-08-20', '2024-01-10', 0, NULL);
INSERT INTO `deal` VALUES (19, 'lkea gift card of 50$ for only 43.11 in Eneba', 'Ikea gift card of €50 for only €43.11 in Eneba\nIdeal to arry all your favorite products with the best discounts Be sure to apply this promotional code before completing your purchase.', 43.11, 50.00, 'price', NULL, 4, 'https://www.amazon.es/deal/13545001', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 1, 15, 1, '2023-08-20', '2024-01-10', 0, NULL);
INSERT INTO `deal` VALUES (20, 'lkea gift card of 50$ for only 43.11 in Eneba', 'Ikea gift card of €50 for only €43.11 in Eneba\nIdeal to arry all your favorite products with the best discounts Be sure to apply this promotional code before completing your purchase.', 43.11, 50.00, 'discount_percent', 15, 4, 'https://www.amazon.es/deal/13545001', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 1, 16, 1, '2023-08-20', '2024-01-10', 0, NULL);
INSERT INTO `deal` VALUES (21, 'lkea gift card of 50$ for only 43.11 in Eneba', 'Ikea gift card of €50 for only €43.11 in Eneba\nIdeal to arry all your favorite products with the best discounts Be sure to apply this promotional code before completing your purchase.', 43.11, 50.00, 'price', NULL, 4, 'https://www.amazon.es/deal/13545001', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 1, 17, 1, '2023-08-20', '2024-01-10', 0, NULL);
INSERT INTO `deal` VALUES (22, 'lkea gift card of 50$ for only 43.11 in Eneba', 'Ikea gift card of €50 for only €43.11 in Eneba\nIdeal to arry all your favorite products with the best discounts Be sure to apply this promotional code before completing your purchase.', 43.11, 50.00, 'discount_fixed', 23, 4, 'https://www.amazon.es/deal/13545001', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 1, 18, 1, '2023-08-20', '2024-01-10', 0, NULL);
INSERT INTO `deal` VALUES (23, 'lkea gift card of 50$ for only 43.11 in Eneba', 'Ikea gift card of €50 for only €43.11 in Eneba\nIdeal to arry all your favorite products with the best discounts Be sure to apply this promotional code before completing your purchase.', 43.11, 50.00, 'free', NULL, 5, 'https://www.amazon.es/deal/13545001', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 1, 20, 1, '2023-08-20', '2024-01-10', 0, NULL);
INSERT INTO `deal` VALUES (24, 'lkea gift card of 50$ for only 43.11 in Eneba', 'Ikea gift card of €50 for only €43.11 in Eneba\nIdeal to arry all your favorite products with the best discounts Be sure to apply this promotional code before completing your purchase.', 43.11, 50.00, 'discount_fixed', 15, 5, 'https://www.amazon.es/deal/13545001', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 1, 20, 1, '2023-08-20', '2024-01-10', 0, NULL);
INSERT INTO `deal` VALUES (25, 'lkea gift card of 50$ for only 43.11 in Eneba', 'Ikea gift card of €50 for only €43.11 in Eneba\nIdeal to arry all your favorite products with the best discounts Be sure to apply this promotional code before completing your purchase.', 43.11, 50.00, 'price', NULL, 5, 'https://www.amazon.es/deal/13545001', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 2, 11, 1, '2023-08-20', '2024-01-10', 0, NULL);
INSERT INTO `deal` VALUES (26, 'lkea gift card of 50$ for only 43.11 in Eneba', 'Ikea gift card of €50 for only €43.11 in Eneba\nIdeal to arry all your favorite products with the best discounts Be sure to apply this promotional code before completing your purchase.', 43.11, 50.00, 'discount_fixed', 15, 5, 'https://www.amazon.es/deal/13545001', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 2, 12, 1, '2023-08-20', '2024-01-10', 0, NULL);
INSERT INTO `deal` VALUES (27, 'lkea gift card of 50$ for only 43.11 in Eneba', 'Ikea gift card of €50 for only €43.11 in Eneba\nIdeal to arry all your favorite products with the best discounts Be sure to apply this promotional code before completing your purchase.', 43.11, 50.00, 'price', NULL, 6, 'https://www.amazon.es/deal/13545001', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 2, 13, 1, '2023-08-20', '2024-01-10', 0, NULL);
INSERT INTO `deal` VALUES (28, 'lkea gift card of 50$ for only 43.11 in Eneba', 'Ikea gift card of €50 for only €43.11 in Eneba\nIdeal to arry all your favorite products with the best discounts Be sure to apply this promotional code before completing your purchase.', 43.11, 50.00, 'discount_percent', 54, 6, 'https://www.amazon.es/deal/13545001', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 2, 14, 1, '2023-08-20', '2024-01-10', 0, NULL);
INSERT INTO `deal` VALUES (29, 'lkea gift card of 50$ for only 43.11 in Eneba', 'Ikea gift card of €50 for only €43.11 in Eneba\nIdeal to arry all your favorite products with the best discounts Be sure to apply this promotional code before completing your purchase.', 43.11, 50.00, 'price', NULL, 6, 'https://www.amazon.es/deal/13545001', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 2, 12, 1, '2023-08-20', '2024-01-10', 0, NULL);
INSERT INTO `deal` VALUES (30, 'lkea gift card of 50$ for only 43.11 in Eneba', 'Ikea gift card of €50 for only €43.11 in Eneba\nIdeal to arry all your favorite products with the best discounts Be sure to apply this promotional code before completing your purchase.', 43.11, 50.00, 'discount_percent', 15, 7, 'https://www.amazon.es/deal/13545001', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 2, 12, 1, '2023-08-20', '2024-01-10', 0, NULL);
INSERT INTO `deal` VALUES (31, 'lkea gift card of 50$ for only 43.11 in Eneba', 'Ikea gift card of €50 for only €43.11 in Eneba\nIdeal to arry all your favorite products with the best discounts Be sure to apply this promotional code before completing your purchase.', 43.11, 50.00, 'price', NULL, 8, 'https://www.amazon.es/deal/13545001', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 2, 12, 1, '2023-08-20', '2024-01-10', 0, NULL);
INSERT INTO `deal` VALUES (32, 'lkea gift card of 50$ for only 43.11 in Eneba', 'Ikea gift card of €50 for only €43.11 in Eneba\nIdeal to arry all your favorite products with the best discounts Be sure to apply this promotional code before completing your purchase.', 43.11, 50.00, 'discount_fixed', 21, 8, 'https://www.amazon.es/deal/13545001', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 2, 13, 1, '2023-08-19', '2024-01-10', 0, NULL);
INSERT INTO `deal` VALUES (33, 'lkea gift card of 50$ for only 43.11 in Eneba', 'Ikea gift card of €50 for only €43.11 in Eneba\nIdeal to arry all your favorite products with the best discounts Be sure to apply this promotional code before completing your purchase.', 43.11, 50.00, 'free', NULL, 8, 'https://www.amazon.es/deal/13545001', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 2, 14, 1, '2023-08-20', '2024-01-10', 0, NULL);
INSERT INTO `deal` VALUES (34, 'lkea gift card of 50$ for only 43.11 in Eneba', 'Ikea gift card of €50 for only €43.11 in Eneba\nIdeal to arry all your favorite products with the best discounts Be sure to apply this promotional code before completing your purchase.', 43.11, 50.00, 'discount_percent', 54, 8, 'https://www.amazon.es/deal/13545001', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 2, 14, 1, '2023-08-20', '2024-01-10', 0, NULL);
INSERT INTO `deal` VALUES (35, 'lkea gift card of 50$ for only 43.11 in Eneba', 'Ikea gift card of €50 for only €43.11 in Eneba\nIdeal to arry all your favorite products with the best discounts Be sure to apply this promotional code before completing your purchase.', 43.11, 50.00, 'price', NULL, 8, 'https://www.amazon.es/deal/13545001', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 2, 15, 1, '2023-08-20', '2024-01-10', 0, NULL);
INSERT INTO `deal` VALUES (36, 'lkea gift card of 50$ for only 43.11 in Eneba', 'Ikea gift card of €50 for only €43.11 in Eneba\nIdeal to arry all your favorite products with the best discounts Be sure to apply this promotional code before completing your purchase.', 43.11, 50.00, 'discount_fixed', 21, 8, 'https://www.amazon.es/deal/13545001', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 2, 16, 1, '2023-08-20', '2024-01-10', 0, NULL);
INSERT INTO `deal` VALUES (37, 'lkea gift card of 50$ for only 43.11 in Eneba', 'Ikea gift card of €50 for only €43.11 in Eneba\nIdeal to arry all your favorite products with the best discounts Be sure to apply this promotional code before completing your purchase.', 43.11, 50.00, 'free', NULL, 9, 'https://www.amazon.es/deal/13545001', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 2, 16, 1, '2023-08-20', '2024-01-10', 0, NULL);
INSERT INTO `deal` VALUES (38, 'lkea gift card of 50$ for only 43.11 in Eneba', 'Ikea gift card of €50 for only €43.11 in Eneba\nIdeal to arry all your favorite products with the best discounts Be sure to apply this promotional code before completing your purchase.', 43.11, 50.00, 'discount_percent', 11, 9, 'https://www.amazon.es/deal/13545001', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 2, 17, 1, '2023-08-20', '2024-01-10', 0, NULL);
INSERT INTO `deal` VALUES (39, 'lkea gift card of 50$ for only 43.11 in Eneba', 'Ikea gift card of €50 for only €43.11 in Eneba\nIdeal to arry all your favorite products with the best discounts Be sure to apply this promotional code before completing your purchase.', 43.11, 50.00, 'price', NULL, 9, 'https://www.amazon.es/deal/13545001', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 2, 18, 1, '2023-08-20', '2024-01-10', 0, NULL);
INSERT INTO `deal` VALUES (40, 'lkea gift card of 50$ for only 43.11 in Eneba', 'Ikea gift card of €50 for only €43.11 in Eneba\nIdeal to arry all your favorite products with the best discounts Be sure to apply this promotional code before completing your purchase.', 43.11, 50.00, 'discount_fixed', 77, 9, 'https://www.amazon.es/deal/13545001', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 2, 20, 1, '2023-08-20', '2024-01-10', 0, NULL);
INSERT INTO `deal` VALUES (41, 'lkea gift card of 50$ for only 43.11 in Eneba', 'Ikea gift card of €50 for only €43.11 in Eneba\nIdeal to arry all your favorite products with the best discounts Be sure to apply this promotional code before completing your purchase.', 43.11, 50.00, 'price', NULL, 9, 'https://www.amazon.es/deal/13545001', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 2, 21, 1, '2023-08-20', '2024-01-10', 0, NULL);
INSERT INTO `deal` VALUES (42, 'lkea gift card of 50$ for only 43.11 in Eneba', 'Ikea gift card of €50 for only €43.11 in Eneba\nIdeal to arry all your favorite products with the best discounts Be sure to apply this promotional code before completing your purchase.', 43.11, 50.00, 'discount_fixed', 65, 10, 'https://www.amazon.es/deal/13545001', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 2, 20, 1, '2023-08-20', '2024-01-10', 0, NULL);
INSERT INTO `deal` VALUES (43, 'lkea gift card of 50$ for only 43.11 in Eneba', 'Ikea gift card of €50 for only €43.11 in Eneba\nIdeal to arry all your favorite products with the best discounts Be sure to apply this promotional code before completing your purchase.', 43.11, 50.00, 'price', NULL, 11, 'https://www.amazon.es/deal/13545001', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 2, 20, 1, '2023-08-20', '2024-01-10', 0, NULL);
INSERT INTO `deal` VALUES (44, 'lkea gift card of 50$ for only 43.11 in Eneba', 'Ikea gift card of €50 for only €43.11 in Eneba\nIdeal to arry all your favorite products with the best discounts Be sure to apply this promotional code before completing your purchase.', 43.11, 50.00, 'discount_fixed', 45, 11, 'https://www.amazon.es/deal/13545001', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 2, 22, 1, '2023-08-20', '2024-01-10', 0, NULL);
INSERT INTO `deal` VALUES (45, 'lkea gift card of 50$ for only 43.11 in Eneba', 'Ikea gift card of €50 for only €43.11 in Eneba\nIdeal to arry all your favorite products with the best discounts Be sure to apply this promotional code before completing your purchase.', 43.11, 50.00, 'price', NULL, 11, 'https://www.amazon.es/deal/13545001', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 2, 23, 1, '2023-08-20', '2024-01-10', 0, NULL);
INSERT INTO `deal` VALUES (46, 'lkea gift card of 50$ for only 43.11 in Eneba', 'Ikea gift card of €50 for only €43.11 in Eneba\nIdeal to arry all your favorite products with the best discounts Be sure to apply this promotional code before completing your purchase.', 43.11, 50.00, 'free', NULL, 11, 'https://www.amazon.es/deal/13545001', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 2, 24, 1, '2023-08-20', '2024-01-10', 0, NULL);
INSERT INTO `deal` VALUES (47, 'lkea gift card of 50$ for only 43.11 in Eneba', 'Ikea gift card of €50 for only €43.11 in Eneba\nIdeal to arry all your favorite products with the best discounts Be sure to apply this promotional code before completing your purchase.', 43.11, 50.00, 'price', NULL, 12, 'https://www.amazon.es/deal/13545001', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 2, 24, 1, '2023-08-20', '2024-01-10', 0, NULL);
INSERT INTO `deal` VALUES (48, 'lkea gift card of 50$ for only 43.11 in Eneba', 'Ikea gift card of €50 for only €43.11 in Eneba\nIdeal to arry all your favorite products with the best discounts Be sure to apply this promotional code before completing your purchase.', 43.11, 50.00, 'free', NULL, 12, 'https://www.amazon.es/deal/13545001', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 2, 20, 1, '2023-08-20', '2024-01-10', 0, NULL);
INSERT INTO `deal` VALUES (49, 'lkea gift card of 50$ for only 43.11 in Eneba', 'Ikea gift card of €50 for only €43.11 in Eneba\nIdeal to arry all your favorite products with the best discounts Be sure to apply this promotional code before completing your purchase.', 43.11, 50.00, 'discount_percent', 68, 12, 'https://www.amazon.es/deal/13545001', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 2, 26, 1, '2023-08-20', '2024-01-10', 0, NULL);
INSERT INTO `deal` VALUES (50, 'lkea gift card of 50$ for only 43.11 in Eneba', 'Ikea gift card of €50 for only €43.11 in Eneba\nIdeal to arry all your favorite products with the best discounts Be sure to apply this promotional code before completing your purchase.', 43.11, 50.00, 'price', NULL, 13, 'https://www.amazon.es/deal/13545001', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 2, 26, 1, '2023-08-20', '2024-01-10', 0, NULL);
INSERT INTO `deal` VALUES (51, 'lkea gift card of 50$ for only 43.11 in Eneba', 'Ikea gift card of €50 for only €43.11 in Eneba\nIdeal to arry all your favorite products with the best discounts Be sure to apply this promotional code before completing your purchase.', 43.11, 50.00, 'free', NULL, 13, 'https://www.amazon.es/deal/13545001', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 2, 27, 1, '2023-08-20', '2024-01-10', 0, NULL);
INSERT INTO `deal` VALUES (52, 'lkea gift card of 50$ for only 43.11 in Eneba', 'Ikea gift card of €50 for only €43.11 in Eneba\nIdeal to arry all your favorite products with the best discounts Be sure to apply this promotional code before completing your purchase.', 43.11, 50.00, 'discount_percent', 65, 13, 'https://www.amazon.es/deal/13545001', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 2, 28, 1, '2023-08-20', '2024-01-10', 0, NULL);
INSERT INTO `deal` VALUES (53, 'lkea gift card of 50$ for only 43.11 in Eneba', 'Ikea gift card of €50 for only €43.11 in Eneba\nIdeal to arry all your favorite products with the best discounts Be sure to apply this promotional code before completing your purchase.', 43.11, 50.00, 'price', NULL, 14, 'https://www.amazon.es/deal/13545001', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 2, 28, 1, '2023-08-20', '2024-01-10', 0, NULL);
INSERT INTO `deal` VALUES (54, 'lkea gift card of 50$ for only 43.11 in Eneba', 'Ikea gift card of €50 for only €43.11 in Eneba\nIdeal to arry all your favorite products with the best discounts Be sure to apply this promotional code before completing your purchase.', 43.11, 50.00, 'free', NULL, 15, 'https://www.amazon.es/deal/13545001', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 2, 29, 1, '2023-08-20', '2024-01-10', 0, NULL);
INSERT INTO `deal` VALUES (55, 'lkea gift card of 50$ for only 43.11 in Eneba', 'Ikea gift card of €50 for only €43.11 in Eneba\nIdeal to arry all your favorite products with the best discounts Be sure to apply this promotional code before completing your purchase.', 43.11, 50.00, 'price', NULL, 15, 'https://www.amazon.es/deal/13545001', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 2, 28, 1, '2023-08-20', '2024-01-10', 0, NULL);
INSERT INTO `deal` VALUES (56, 'lkea gift card of 50$ for only 43.11 in Eneba', 'Ikea gift card of €50 for only €43.11 in Eneba\nIdeal to arry all your favorite products with the best discounts Be sure to apply this promotional code before completing your purchase.', 43.11, 50.00, 'discount_percent', 35, 16, 'https://www.amazon.es/deal/13545001', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 2, 27, 1, '2023-08-20', '2024-01-10', 0, NULL);
INSERT INTO `deal` VALUES (57, 'lkea gift card of 50$ for only 43.11 in Eneba', 'Ikea gift card of €50 for only €43.11 in Eneba\nIdeal to arry all your favorite products with the best discounts Be sure to apply this promotional code before completing your purchase.', 43.11, 50.00, 'price', NULL, 16, 'https://www.amazon.es/deal/13545001', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 2, 28, 1, '2023-08-20', '2024-01-10', 0, NULL);
INSERT INTO `deal` VALUES (58, 'lkea gift card of 50$ for only 43.11 in Eneba', 'Ikea gift card of €50 for only €43.11 in Eneba\nIdeal to arry all your favorite products with the best discounts Be sure to apply this promotional code before completing your purchase.', 43.11, 50.00, 'free', NULL, 17, 'https://www.amazon.es/deal/13545001', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 2, 28, 1, '2023-08-20', '2024-01-10', 0, NULL);
INSERT INTO `deal` VALUES (59, 'lkea gift card of 50$ for only 43.11 in Eneba', 'Ikea gift card of €50 for only €43.11 in Eneba\nIdeal to arry all your favorite products with the best discounts Be sure to apply this promotional code before completing your purchase.', 43.11, 50.00, 'discount_fixed', 30, 17, 'https://www.amazon.es/deal/13545001', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 2, 33, 1, '2023-08-20', '2024-01-10', 0, NULL);
INSERT INTO `deal` VALUES (60, 'lkea gift card of 50$ for only 43.11 in Eneba', 'Ikea gift card of €50 for only €43.11 in Eneba\nIdeal to arry all your favorite products with the best discounts Be sure to apply this promotional code before completing your purchase.', 43.11, 50.00, 'price', NULL, 18, 'https://www.amazon.es/deal/13545001', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 2, 31, 1, '2023-08-20', '2024-01-10', 0, NULL);
INSERT INTO `deal` VALUES (61, 'lkea gift card of 50$ for only 43.11 in Eneba', 'Ikea gift card of €50 for only €43.11 in Eneba\nIdeal to arry all your favorite products with the best discounts Be sure to apply this promotional code before completing your purchase.', 43.11, 50.00, 'discount_percent', 10, 18, 'https://www.amazon.es/deal/13545001', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 2, 35, 1, '2023-08-20', '2024-01-10', 0, NULL);
INSERT INTO `deal` VALUES (62, 'lkea gift card of 50$ for only 43.11 in Eneba', 'Ikea gift card of €50 for only €43.11 in Eneba\nIdeal to arry all your favorite products with the best discounts Be sure to apply this promotional code before completing your purchase.', 43.11, 50.00, 'price', NULL, 18, 'https://www.amazon.es/deal/13545001', 'http://localhost:4000/api/resource/get/52137207342185989453714212780487592640271305331977584979429257140469797346163730988950938029889449312345466082070896914248819250407855524315629444634738679807197553463176992013178', 2, 35, 1, '2023-08-22', '2024-01-10', 0, NULL);
INSERT INTO `deal` VALUES (63, 'lkea gift card of 50$ for only 43.11 in Eneba', 'Ikea gift card of €50 for only €43.11 in Eneba\nIdeal to arry all your favorite products with the best discounts Be sure to apply this promotional code before completing your purchase.', 43.11, 50.00, 'price', NULL, 18, 'https://www.amazon.es/deal/13545001', 'http://localhost:4000/api/resource/get/52137207342185989453714212780487592640271305331977584979429257140469797346163730988950938029889449312345466082070896914248819250407855524315629444634738679807197553463176992013178', 2, 35, 1, '2023-08-22', '0000-00-00', 0, NULL);

-- ----------------------------
-- Table structure for likes
-- ----------------------------
DROP TABLE IF EXISTS `likes`;
CREATE TABLE `likes`  (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `user_id` int(4) NOT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `dest_id` int(4) NOT NULL,
  `is_like` int(4) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 29 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of likes
-- ----------------------------
INSERT INTO `likes` VALUES (7, 1, 'deal', 15, 1);
INSERT INTO `likes` VALUES (8, 2, 'deal', 15, 0);
INSERT INTO `likes` VALUES (9, 2, 'deal', 16, 0);
INSERT INTO `likes` VALUES (10, 2, 'deal', 17, 0);
INSERT INTO `likes` VALUES (11, 2, 'deal', 18, 0);
INSERT INTO `likes` VALUES (12, 2, 'deal', 19, 0);
INSERT INTO `likes` VALUES (13, 2, 'deal', 20, 0);
INSERT INTO `likes` VALUES (14, 2, 'deal', 21, 0);
INSERT INTO `likes` VALUES (15, 2, 'deal', 22, 0);
INSERT INTO `likes` VALUES (16, 1, 'deal', 22, 0);
INSERT INTO `likes` VALUES (17, 1, 'deal', 23, 0);
INSERT INTO `likes` VALUES (18, 2, 'deal', 23, 0);
INSERT INTO `likes` VALUES (19, 3, 'deal', 24, 0);
INSERT INTO `likes` VALUES (20, 1, 'deal', 24, 1);
INSERT INTO `likes` VALUES (21, 2, 'deal', 24, 1);
INSERT INTO `likes` VALUES (22, 1, 'deal', 25, 1);
INSERT INTO `likes` VALUES (23, 1, 'deal', 26, 1);
INSERT INTO `likes` VALUES (24, 2, 'deal', 26, 1);
INSERT INTO `likes` VALUES (25, 3, 'deal', 26, 0);
INSERT INTO `likes` VALUES (26, 3, 'deal', 27, 1);
INSERT INTO `likes` VALUES (27, 1, 'deal', 27, 1);
INSERT INTO `likes` VALUES (28, 2, 'deal', 27, 1);

-- ----------------------------
-- Table structure for notification
-- ----------------------------
DROP TABLE IF EXISTS `notification`;
CREATE TABLE `notification`  (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `user_id` int(4) NOT NULL,
  `is_read` int(1) NULL DEFAULT NULL,
  `date` date NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of notification
-- ----------------------------
INSERT INTO `notification` VALUES (5, 'NOTIFICATION CONTENT1', 1, 1, '2023-08-17');
INSERT INTO `notification` VALUES (6, 'NOTIFICATION CONTENT2', 1, 0, '2023-08-17');
INSERT INTO `notification` VALUES (7, 'NOTIFICATION CONTENT3', 1, 0, '2023-08-17');
INSERT INTO `notification` VALUES (8, 'NOTIFICATION CONTENT4', 1, 0, '2023-08-17');
INSERT INTO `notification` VALUES (9, 'NOTIFICATION CONTENT5', 1, 0, '2023-08-17');
INSERT INTO `notification` VALUES (10, 'NOTIFICATION CONTENT6', 1, 0, '2023-08-17');
INSERT INTO `notification` VALUES (11, 'NOTIFICATION CONTENT6', 2, 0, '2023-08-17');
INSERT INTO `notification` VALUES (12, 'NOTIFICATION CONTENT1', 2, 0, '2023-08-17');
INSERT INTO `notification` VALUES (13, 'NOTIFICATION CONTENT2', 2, 0, '2023-08-17');
INSERT INTO `notification` VALUES (14, 'NOTIFICATION CONTENT3', 2, 0, '2023-08-17');
INSERT INTO `notification` VALUES (15, 'NOTIFICATION CONTENT4', 2, 0, '2023-08-17');
INSERT INTO `notification` VALUES (16, 'NOTIFICATION CONTENT5', 2, 0, '2023-08-17');
INSERT INTO `notification` VALUES (17, 'NOTIFICATION CONTENT5', 3, 0, '2023-08-17');
INSERT INTO `notification` VALUES (18, 'NOTIFICATION CONTENT1', 3, 0, '2023-08-17');
INSERT INTO `notification` VALUES (19, 'NOTIFICATION CONTENT2', 3, 0, '2023-08-17');
INSERT INTO `notification` VALUES (20, 'NOTIFICATION CONTENT3', 3, 0, '2023-08-17');

-- ----------------------------
-- Table structure for review
-- ----------------------------
DROP TABLE IF EXISTS `review`;
CREATE TABLE `review`  (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `user_id` int(4) NOT NULL,
  `store_id` int(4) NOT NULL,
  `star` int(2) NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 23 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of review
-- ----------------------------
INSERT INTO `review` VALUES (5, 1, 3, 4, 'Description 1');
INSERT INTO `review` VALUES (6, 1, 3, 4, 'Description 1');
INSERT INTO `review` VALUES (7, 1, 4, 4, 'Good Store 1');
INSERT INTO `review` VALUES (8, 1, 5, 4, 'Good Store 1');
INSERT INTO `review` VALUES (9, 1, 6, 4, 'Good Store 1');
INSERT INTO `review` VALUES (10, 1, 7, 4, 'Good Store 1');
INSERT INTO `review` VALUES (11, 2, 7, 4, 'Good Store 1');
INSERT INTO `review` VALUES (12, 2, 3, 4, 'Good Store 1');
INSERT INTO `review` VALUES (13, 2, 4, 4, 'Good Store 1');
INSERT INTO `review` VALUES (14, 2, 5, 4, 'Good Store 1');
INSERT INTO `review` VALUES (15, 2, 8, 4, 'Good Store 1');
INSERT INTO `review` VALUES (16, 3, 8, 4, 'Good Store 1');
INSERT INTO `review` VALUES (17, 3, 9, 4, 'Good Store 1');
INSERT INTO `review` VALUES (18, 3, 10, 4, 'Good Store 1');
INSERT INTO `review` VALUES (19, 3, 11, 4, 'Good Store 1');
INSERT INTO `review` VALUES (20, 3, 12, 4, 'Good Store 1');
INSERT INTO `review` VALUES (21, 3, 13, 4, 'Good Store 1');
INSERT INTO `review` VALUES (22, 3, 14, 4, 'Good Store 1');

-- ----------------------------
-- Table structure for store
-- ----------------------------
DROP TABLE IF EXISTS `store`;
CREATE TABLE `store`  (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `info_html` int(4) NULL DEFAULT NULL,
  `tip_id` int(4) NULL DEFAULT NULL,
  `stories_id` int(4) NULL DEFAULT NULL,
  `about_id` int(4) NULL DEFAULT NULL,
  `faq_id` int(4) NULL DEFAULT NULL,
  `howto_id` int(4) NULL DEFAULT NULL,
  `didyou_id` int(4) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of store
-- ----------------------------
INSERT INTO `store` VALUES (3, 'adidas', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 10, 12, 13, 14, 15, 16, 17);
INSERT INTO `store` VALUES (4, 'AliExpress', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 12, 13, 23, 21, 11, 12, 23);
INSERT INTO `store` VALUES (5, 'Amazon', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 25, 12, 15, 11, 22, 21, 11);
INSERT INTO `store` VALUES (6, 'Manzana', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 25, 12, 15, 11, 22, 21, 11);
INSERT INTO `store` VALUES (7, 'Asos', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 25, 12, 15, 11, 22, 21, 11);
INSERT INTO `store` VALUES (8, 'catch it', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 25, 12, 15, 11, 22, 21, 11);
INSERT INTO `store` VALUES (9, 'Notices', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 25, 12, 15, 11, 22, 21, 11);
INSERT INTO `store` VALUES (10, 'banggood', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 25, 12, 15, 11, 22, 21, 11);
INSERT INTO `store` VALUES (11, 'booking', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 25, 12, 15, 11, 22, 21, 11);
INSERT INTO `store` VALUES (12, 'Burger King', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 25, 12, 15, 11, 22, 21, 11);
INSERT INTO `store` VALUES (13, 'Burger King at Home', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 25, 12, 15, 11, 22, 21, 11);
INSERT INTO `store` VALUES (14, 'AC', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 25, 12, 15, 11, 22, 21, 11);
INSERT INTO `store` VALUES (15, 'cabify', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 25, 12, 15, 11, 22, 21, 11);
INSERT INTO `store` VALUES (16, 'Carrefour', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 25, 12, 15, 11, 22, 21, 11);
INSERT INTO `store` VALUES (17, 'cheerz', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 25, 12, 15, 11, 22, 21, 11);
INSERT INTO `store` VALUES (18, 'Chinese', 'http://5.75.224.135:4000/api/resource/get/06644721280130035014128898721307837764739567056815316022876431325417812183779926218424705987505510960999276195847444259616377333103593831805719820507828382457502876093456617339', 25, 12, 15, 11, 22, 21, 11);
INSERT INTO `store` VALUES (19, 'Chinese', 'http://localhost:4000/api/resource/get/52137207342185989453714212780487592640271305331977584979429257140469797346163730988950938029889449312345466082070896914248819250407855524315629444634738679807197553463176992013178', 25, 12, 15, 11, 22, 21, 11);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `birthday` date NULL DEFAULT NULL,
  `role` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'customer',
  `code` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `status` int(2) NOT NULL DEFAULT 0,
  `point` int(6) NOT NULL DEFAULT 0,
  `level` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'daltonchua', 'daltonchua3@outlook.com', '$2a$10$AS9OnMOjAzTaUzdg6DZ93e1niyQXNv5nxhAMYyalOqjaEWkQPF1vi', NULL, 'customer', NULL, 1, 0, NULL);
INSERT INTO `user` VALUES (2, 'daltonchua', 'daltonchua2@outlook.com', '$2a$10$AS9OnMOjAzTaUzdg6DZ93e1niyQXNv5nxhAMYyalOqjaEWkQPF1vi', NULL, 'customer', NULL, 1, 0, NULL);
INSERT INTO `user` VALUES (3, 'daltonchua', 'daltonchu1a@outlook.com', '$2a$10$AS9OnMOjAzTaUzdg6DZ93e1niyQXNv5nxhAMYyalOqjaEWkQPF1vi', NULL, 'customer', NULL, 1, 0, NULL);
INSERT INTO `user` VALUES (15, 'daltonchua2', 'daltonchua@outlook.com', '$2a$10$qRXC2PbdsJY/rpy4nQeequaPfseE4J6TKgAVMT/KU.HlfWsSxPPqe', NULL, 'customer', NULL, 1, 0, NULL);

SET FOREIGN_KEY_CHECKS = 1;
