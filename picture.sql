/*
 Navicat Premium Data Transfer

 Source Server         : 47.103.89.196
 Source Server Type    : MySQL
 Source Server Version : 80027
 Source Host           : 47.103.89.196:3306
 Source Schema         : picture

 Target Server Type    : MySQL
 Target Server Version : 80027
 File Encoding         : 65001

 Date: 22/06/2022 22:36:04
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `user_id` bigint DEFAULT NULL,
  `img_id` bigint DEFAULT NULL,
  `content` text COLLATE utf8_bin,
  `create_time` bigint DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `status` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

-- ----------------------------
-- Records of comments
-- ----------------------------
BEGIN;
INSERT INTO `comments` VALUES (3, 2, 'eee', 1655905275096, 1, 1);
INSERT INTO `comments` VALUES (3, 2, 'ewqe ', 1655905277750, 2, 1);
INSERT INTO `comments` VALUES (3, 2, 'eqwe ', 1655905279560, 3, 1);
INSERT INTO `comments` VALUES (3, 1, 'eqw ', 1655905285863, 4, 1);
INSERT INTO `comments` VALUES (3, 2, 'eeeeee', 1655905295076, 5, 1);
INSERT INTO `comments` VALUES (3, 2, 'ewqewq', 1655905309440, 6, 1);
INSERT INTO `comments` VALUES (3, 1, 'eee', 1655905334685, 7, 1);
INSERT INTO `comments` VALUES (3, 2, '11', 1655905385464, 8, NULL);
INSERT INTO `comments` VALUES (3, 2, '1', 1655905482402, 9, 1);
INSERT INTO `comments` VALUES (3, 2, '11', 1655905484336, 10, 1);
INSERT INTO `comments` VALUES (3, 2, '11', 1655905486406, 11, 1);
INSERT INTO `comments` VALUES (3, 2, '1', 1655905487796, 12, 1);
INSERT INTO `comments` VALUES (3, 2, '1', 1655905489182, 13, 1);
INSERT INTO `comments` VALUES (3, 2, '1', 1655905491268, 14, 1);
INSERT INTO `comments` VALUES (3, 2, '1', 1655905546184, 15, 1);
INSERT INTO `comments` VALUES (1, 4, '222', 1655905614949, 16, 1);
INSERT INTO `comments` VALUES (1, 4, '222', 1655905616611, 17, 1);
INSERT INTO `comments` VALUES (1, 4, '22', 1655905618476, 18, 1);
INSERT INTO `comments` VALUES (3, 10, '222', 1655908479385, 19, 1);
INSERT INTO `comments` VALUES (3, 10, '222', 1655908482235, 20, 1);
INSERT INTO `comments` VALUES (3, 10, '222', 1655908484118, 21, 1);
INSERT INTO `comments` VALUES (3, 10, '22', 1655908485938, 22, 1);
COMMIT;

-- ----------------------------
-- Table structure for imgs
-- ----------------------------
DROP TABLE IF EXISTS `imgs`;
CREATE TABLE `imgs` (
  `description` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `imgurl` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `open` tinyint DEFAULT NULL,
  `kind` int DEFAULT NULL,
  `create_time` bigint DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  `status` int DEFAULT NULL,
  `type` int DEFAULT NULL,
  `isok` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

-- ----------------------------
-- Records of imgs
-- ----------------------------
BEGIN;
INSERT INTO `imgs` VALUES ('w w w', 'af5e92066a4b091de86c5b5c94cb4472.png', 1, 1, 1655904981871, 1, 3, 1, 1, 1);
INSERT INTO `imgs` VALUES ('w w', '358e63ade14956ed831d0266b68fddfd.png', 1, 1, 1655905025355, 2, 3, 1, 1, 1);
INSERT INTO `imgs` VALUES ('r', '37f25865934a172bb0a968fc36bbfcb6.png', 1, 2, 1655905077368, 3, 3, 1, 1, 1);
INSERT INTO `imgs` VALUES ('22', '4aeb042c02b89c3a6389e0ffe4bd4f19.png', 1, 0, 1655905607735, 4, 1, 1, 1, 0);
INSERT INTO `imgs` VALUES ('www', 'd88676c0f7df2dc99fab3ee61a48d942.png', 1, 1, 1655906232810, 5, 1, 1, 1, 0);
INSERT INTO `imgs` VALUES ('22', '5581d204321b0d9b0044c20bf5c6791a.png', 1, 0, 1655906682242, 6, 1, 1, 1, 0);
INSERT INTO `imgs` VALUES ('11', '0fffaf411f834700ec1f7ddc6c7b989a.png', 1, 2, 1655907031783, 7, 1, 1, 0, 1);
INSERT INTO `imgs` VALUES ('2e2323', '449ae1ade605482e77975f4e242820d4.jpg', 1, 0, 1655907509304, 8, 1, 1, 0, 1);
INSERT INTO `imgs` VALUES ('ee42344', '018f5c67f978767e6d42fce797e897f8.jpg', 1, 0, 1655907841713, 9, 1, 1, 0, 1);
INSERT INTO `imgs` VALUES ('222323', '936b65770e9de44b83869ca90f97897e.png', 1, 0, 1655908432360, 10, 1, 1, 0, 1);
COMMIT;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `username` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `create_time` bigint DEFAULT NULL,
  `type` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `last_time` bigint DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
INSERT INTO `users` VALUES ('wrr', 'e10adc3949ba59abbe56e057f20f883e', 1655904106783, '0', 1, 1655908419583, '707edb2979fc50f287975aa6b30694a2.png');
INSERT INTO `users` VALUES ('wrr123', 'e10adc3949ba59abbe56e057f20f883e', 1655904157551, '0', 2, 1655904455484, NULL);
INSERT INTO `users` VALUES ('rr', 'e10adc3949ba59abbe56e057f20f883e', 1655904474353, '1', 3, 1655908461200, '561e293e9bb9d5b2716346084daf32a5.jpeg');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
