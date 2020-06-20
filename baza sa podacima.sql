/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

DROP DATABASE IF EXISTS `aplikacija`;
CREATE DATABASE IF NOT EXISTS `aplikacija` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `aplikacija`;

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `admin_id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL DEFAULT '0',
  `password_hash` varchar(128) NOT NULL DEFAULT '0',
  `name` varchar(128) NOT NULL DEFAULT '0',
  `surname` varchar(128) NOT NULL DEFAULT '0',
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `uq_admin_username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `admin`;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` (`admin_id`, `username`, `password_hash`, `name`, `surname`) VALUES
	(1, 'admin1', 'AF105A1B093BB041911DE15270D9C8F6579973C0BFABA10CF0AE3E176910FE24726227BD25B6B5E01F861A08338CD3620D1145CA177BC1810A6B57D4192EC924', 'Milan', 'Mitic'),
	(2, 'admin2', 'khbcasbciuvic', 'Marko', 'Markovic'),
	(3, 'pperic', 'A6748CE10B52373F93B31E8F1625B802B9389519F5E54533F9789930E2194C5845C783982F778E4B5D5B27C6459C88479FC9627591EBF051B1F2E6C62B1DBB90', '0', '0'),
	(4, 'admin3', 'asdf', 'Milijana', 'Miladinovic'),
	(5, 'admin', '7FCF4BA391C48784EDDE599889D6E3F1E47A27DB36ECC050CC92F259BFAC38AFAD2C68A1AE804D77075E8FB722503F3ECA2B2C1006EE6F6C7B7628CB45FFFD1D', '0', '0'),
	(8, 'admin5', '7FCF4BA391C48784EDDE599889D6E3F1E47A27DB36ECC050CC92F259BFAC38AFAD2C68A1AE804D77075E8FB722503F3ECA2B2C1006EE6F6C7B7628CB45FFFD1D', '0', '0'),
	(11, 'admin6', '7FCF4BA391C48784EDDE599889D6E3F1E47A27DB36ECC050CC92F259BFAC38AFAD2C68A1AE804D77075E8FB722503F3ECA2B2C1006EE6F6C7B7628CB45FFFD1D', '0', '0');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;

DROP TABLE IF EXISTS `admin_token`;
CREATE TABLE IF NOT EXISTS `admin_token` (
  `admin_token_id` int unsigned NOT NULL AUTO_INCREMENT,
  `admin_id` int unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `token` text NOT NULL,
  `expires_at` datetime NOT NULL,
  `is_valid` tinyint(1) unsigned zerofill NOT NULL DEFAULT '1',
  PRIMARY KEY (`admin_token_id`),
  KEY `fk_admin_token_admin_id` (`admin_id`),
  CONSTRAINT `fk_admin_token_admin_id` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`admin_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `admin_token`;
/*!40000 ALTER TABLE `admin_token` DISABLE KEYS */;
INSERT INTO `admin_token` (`admin_token_id`, `admin_id`, `created_at`, `token`, `expires_at`, `is_valid`) VALUES
	(1, 8, '2020-06-17 18:48:10', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTUwOTA4OTAuMDAyLCJpcCI6Ijo6MSIsInVhIjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzgwLjAuMzk4Ny44NyBTYWZhcmkvNTM3LjM2IiwiaWF0IjoxNTkyNDEyNDkwfQ.-JBEfwX1mgtoM77qJjmjCj5R43TK1SUA80eRdVFITB0', '2020-07-18 16:48:10', 1),
	(2, 8, '2020-06-17 20:47:35', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTUwOTgwNTUuNDI5LCJpcCI6Ijo6MSIsInVhIjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzgzLjAuNDEwMy45NyBTYWZhcmkvNTM3LjM2IEVkZy84My4wLjQ3OC41MCIsImlhdCI6MTU5MjQxOTY1NX0.cKuWtsSWdsf0DEmQqumd3E5MzvYVs5V86XyBl5xXjpM', '2020-07-18 18:47:35', 1),
	(3, 8, '2020-06-18 12:39:56', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTUxNTUxOTUuODEsImlwIjoiOjoxIiwidWEiOiJNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvODMuMC40MTAzLjk3IFNhZmFyaS81MzcuMzYgRWRnLzgzLjAuNDc4LjUwIiwiaWF0IjoxNTkyNDc2Nzk1fQ.bIxYKGve07cnF78gt8PGAL04LWWQAJoic4bGtctuepU', '2020-07-19 10:39:55', 1),
	(4, 8, '2020-06-18 22:28:35', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTUxOTA1MTUuNzY4LCJpcCI6Ijo6MSIsInVhIjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzgzLjAuNDEwMy45NyBTYWZhcmkvNTM3LjM2IEVkZy84My4wLjQ3OC41MCIsImlhdCI6MTU5MjUxMjExNX0.P5HzoBqZLggxkWsSf6K_r2oT8Lm3MEL9PA9z47yvbUU', '2020-07-19 20:28:35', 1),
	(5, 8, '2020-06-18 22:33:51', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTUxOTA4MzEuMDEyLCJpcCI6Ijo6MSIsInVhIjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzgzLjAuNDEwMy45NyBTYWZhcmkvNTM3LjM2IEVkZy84My4wLjQ3OC41MCIsImlhdCI6MTU5MjUxMjQzMX0.OkTuT2krVnsBE2ixCNDn4nms98P90t6bEc5BoW1J2dE', '2020-07-19 20:33:51', 1),
	(6, 8, '2020-06-18 22:35:13', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTUxOTA5MTMuMTQ0LCJpcCI6Ijo6MSIsInVhIjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzgzLjAuNDEwMy45NyBTYWZhcmkvNTM3LjM2IEVkZy84My4wLjQ3OC41MCIsImlhdCI6MTU5MjUxMjUxM30.8LZvuTjb4MTOjMjRZzjMdLDL7Smc7OuGZ-6nR2BP9Xw', '2020-07-19 20:35:13', 1),
	(7, 8, '2020-06-19 15:59:39', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTUyNTM1NzkuMjcsImlwIjoiOjoxIiwidWEiOiJNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvODMuMC40MTAzLjEwNiBTYWZhcmkvNTM3LjM2IEVkZy84My4wLjQ3OC41NCIsImlhdCI6MTU5MjU3NTE3OX0.O2HwkZLC6wpmX94M9cPNDDxf1mQYJ9uQcPWcR4BCes0', '2020-07-20 13:59:39', 1),
	(8, 8, '2020-06-19 18:22:55', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTUyNjIxNzQuNjEzLCJpcCI6Ijo6MSIsInVhIjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzgzLjAuNDEwMy4xMDYgU2FmYXJpLzUzNy4zNiBFZGcvODMuMC40NzguNTQiLCJpYXQiOjE1OTI1ODM3NzR9.jbtRwe5n4cwtsVB8RGGSdbfXNGHv-GSIa1iVaoCbP68', '2020-07-20 16:22:54', 1),
	(9, 8, '2020-06-19 18:22:55', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTUyNjIxNzUuMjUzLCJpcCI6Ijo6MSIsInVhIjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzgzLjAuNDEwMy4xMDYgU2FmYXJpLzUzNy4zNiBFZGcvODMuMC40NzguNTQiLCJpYXQiOjE1OTI1ODM3NzV9.NZsOxGZrIUAVBiAa-Fw-e24fdyef2kJSydxLQbmufM8', '2020-07-20 16:22:55', 1),
	(10, 8, '2020-06-19 20:06:08', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTUyNjgzNjcuOTYsImlwIjoiOjoxIiwidWEiOiJNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvODMuMC40MTAzLjEwNiBTYWZhcmkvNTM3LjM2IEVkZy84My4wLjQ3OC41NCIsImlhdCI6MTU5MjU4OTk2N30.B561LGjra5H0VSTGhYWdRXzGoSW-p2QLQkHSW8jctac', '2020-07-20 18:06:07', 1),
	(11, 8, '2020-06-19 20:12:27', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTUyNjg3NDcuOTYzLCJpcCI6Ijo6MSIsInVhIjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzgzLjAuNDEwMy4xMDYgU2FmYXJpLzUzNy4zNiBFZGcvODMuMC40NzguNTQiLCJpYXQiOjE1OTI1OTAzNDd9.Maj7ZQMsO-rsgXI-vvj-fEow4bdht0hKAKcjcxPkboE', '2020-07-20 18:12:27', 1);
/*!40000 ALTER TABLE `admin_token` ENABLE KEYS */;

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `category_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '0',
  `image_path` varchar(255) NOT NULL DEFAULT '0',
  `parent__category_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`category_id`),
  KEY `fk_category_parent__category_id` (`parent__category_id`),
  CONSTRAINT `fk_category_parent__category_id` FOREIGN KEY (`parent__category_id`) REFERENCES `category` (`category_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `category`;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` (`category_id`, `name`, `image_path`, `parent__category_id`) VALUES
	(1, 'Hrana', 'assets/hrana.jpeg', NULL),
	(3, 'Mleko', 'assets/mleko.jpg', 5),
	(4, 'Pavlaka', 'assets/pavlaka.jpg', 5),
	(5, 'Mlecniproizvodi', 'assets/mlecniproizvodi.jpg', 1),
	(6, 'Hemija ', 'assets/hemija.jpg', NULL),
	(7, 'Detrdzenti', 'assets/detrdzenti.jpg', 6),
	(8, '0', '0', NULL),
	(9, 'asdf', '0', NULL),
	(10, 'asdf2', '0', NULL);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;

DROP TABLE IF EXISTS `gallery`;
CREATE TABLE IF NOT EXISTS `gallery` (
  `gallery_id` int unsigned NOT NULL AUTO_INCREMENT,
  `image_path` varchar(128) NOT NULL,
  `description` varchar(128) NOT NULL,
  `is_visible` bit(1) DEFAULT b'1',
  PRIMARY KEY (`gallery_id`),
  UNIQUE KEY `uq_gallery_image_path` (`image_path`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `gallery`;
/*!40000 ALTER TABLE `gallery` DISABLE KEYS */;
INSERT INTO `gallery` (`gallery_id`, `image_path`, `description`, `is_visible`) VALUES
	(1, 'C:\\Users\\Milijana\\Desktop\\Projekat\\storage\\photos', 'Slika mleka', b'1');
/*!40000 ALTER TABLE `gallery` ENABLE KEYS */;

DROP TABLE IF EXISTS `inbox`;
CREATE TABLE IF NOT EXISTS `inbox` (
  `inbox_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '',
  `mail` varchar(128) NOT NULL DEFAULT '',
  `message` text NOT NULL,
  PRIMARY KEY (`inbox_id`),
  UNIQUE KEY `uq_inbox_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `inbox`;
/*!40000 ALTER TABLE `inbox` DISABLE KEYS */;
INSERT INTO `inbox` (`inbox_id`, `name`, `mail`, `message`) VALUES
	(1, 'poruka1', 'neki tekst', 'Neki malo duzi tekst'),
	(2, 'poruka2', 'neka druga poruka', 'Neki dugacak tekst');
/*!40000 ALTER TABLE `inbox` ENABLE KEYS */;

DROP TABLE IF EXISTS `news`;
CREATE TABLE IF NOT EXISTS `news` (
  `news_id` int unsigned NOT NULL AUTO_INCREMENT,
  `caption` int NOT NULL DEFAULT '0',
  `text` text NOT NULL,
  `picture` varchar(128) NOT NULL DEFAULT '',
  `admin_id` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`news_id`),
  KEY `fk_news_admin_id` (`admin_id`),
  CONSTRAINT `fk_news_admin_id` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`admin_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `news`;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` (`news_id`, `caption`, `text`, `picture`, `admin_id`) VALUES
	(3, 1, 'kugciu', '2020524-7537411282-slika-mleko.jpg', 1);
/*!40000 ALTER TABLE `news` ENABLE KEYS */;

DROP TABLE IF EXISTS `photo`;
CREATE TABLE IF NOT EXISTS `photo` (
  `photo_id` int unsigned NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL DEFAULT '0',
  `image_path` varchar(255) NOT NULL DEFAULT '0',
  `product_id` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`photo_id`),
  KEY `fk_photo_product_id` (`product_id`),
  CONSTRAINT `fk_photo_product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `photo`;
/*!40000 ALTER TABLE `photo` DISABLE KEYS */;
INSERT INTO `photo` (`photo_id`, `description`, `image_path`, `product_id`) VALUES
	(3, '0', '2020524-7537411282-slika-mleko.jpg', 2),
	(4, '0', '2020530-5888254523-slika-mleko.jpg', 2);
/*!40000 ALTER TABLE `photo` ENABLE KEYS */;

DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `product_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '0',
  `description` varchar(255) NOT NULL DEFAULT '0',
  `category_id` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`product_id`),
  KEY `fk_product_category_id` (`category_id`),
  CONSTRAINT `fk_product_category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `product`;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` (`product_id`, `name`, `description`, `category_id`) VALUES
	(1, 'Jogurt', 'mlecni', 5),
	(2, 'Marmelada', 'neka marmelada', 3),
	(14, 'Proizvod 1', 'neki opis', 1);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;

DROP TABLE IF EXISTS `product_price`;
CREATE TABLE IF NOT EXISTS `product_price` (
  `product_price_id` int unsigned NOT NULL AUTO_INCREMENT,
  `price` decimal(10,2) NOT NULL DEFAULT '0.00',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `product_id` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`product_price_id`),
  KEY `fk_product_price_product_id` (`product_id`),
  CONSTRAINT `fk_product_price_product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `product_price`;
/*!40000 ALTER TABLE `product_price` DISABLE KEYS */;
INSERT INTO `product_price` (`product_price_id`, `price`, `created_at`, `product_id`) VALUES
	(1, 100.00, '2020-05-22 19:22:13', 2),
	(2, 1000.00, '2020-05-22 19:41:00', 1),
	(4, 250.00, '2020-05-22 19:25:00', 2),
	(6, 1000000.00, '2020-05-22 20:36:14', 2),
	(9, 0.00, '2020-05-22 22:04:27', 2),
	(10, 0.00, '2020-05-22 22:10:08', 2),
	(11, 0.00, '2020-05-22 22:10:33', 2),
	(12, 0.00, '2020-05-22 22:15:23', 2),
	(13, 0.00, '2020-05-22 22:19:43', 2),
	(14, 0.00, '2020-05-22 22:19:52', 2),
	(15, 0.00, '2020-05-22 22:21:53', 2),
	(16, 201.00, '2020-05-22 22:27:58', 2),
	(17, 201.00, '2020-05-22 22:28:58', 2),
	(18, 201.00, '2020-05-22 23:02:47', 2),
	(19, 10.05, '2020-05-24 13:32:38', 14);
/*!40000 ALTER TABLE `product_price` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
