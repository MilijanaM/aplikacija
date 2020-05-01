-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               10.4.11-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for aplikacija
CREATE DATABASE IF NOT EXISTS `aplikacija` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `aplikacija`;

-- Dumping structure for table aplikacija.admin
CREATE TABLE IF NOT EXISTS `admin` (
  `admin_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL DEFAULT '0',
  `password_hash` varchar(128) NOT NULL DEFAULT '0',
  `name` varchar(128) NOT NULL DEFAULT '0',
  `surname` varchar(128) NOT NULL DEFAULT '0',
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `uq_admin_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table aplikacija.category
CREATE TABLE IF NOT EXISTS `category` (
  `category_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '0',
  `image_path` varchar(255) NOT NULL DEFAULT '0',
  `parent__category_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`category_id`),
  KEY `fk_category_parent__category_id` (`parent__category_id`),
  CONSTRAINT `fk_category_parent__category_id` FOREIGN KEY (`parent__category_id`) REFERENCES `category` (`category_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table aplikacija.gallery
CREATE TABLE IF NOT EXISTS `gallery` (
  `gallery_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `image_path` varchar(128) NOT NULL,
  `description` varchar(128) NOT NULL,
  `is_visible` bit(1) DEFAULT b'1',
  PRIMARY KEY (`gallery_id`),
  UNIQUE KEY `uq_gallery_image_path` (`image_path`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table aplikacija.inbox
CREATE TABLE IF NOT EXISTS `inbox` (
  `inbox_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '',
  `mail` varchar(128) NOT NULL DEFAULT '',
  `message` text NOT NULL,
  PRIMARY KEY (`inbox_id`),
  UNIQUE KEY `uq_inbox_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table aplikacija.news
CREATE TABLE IF NOT EXISTS `news` (
  `news_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `caption` int(50) NOT NULL DEFAULT 0,
  `text` text NOT NULL,
  `picture` varchar(128) NOT NULL DEFAULT '',
  `admin_id` int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`news_id`),
  KEY `fk_news_admin_id` (`admin_id`),
  CONSTRAINT `fk_news_admin_id` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`admin_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table aplikacija.photo
CREATE TABLE IF NOT EXISTS `photo` (
  `photo_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL DEFAULT '0',
  `image_path` varchar(255) NOT NULL DEFAULT '0',
  `product_id` int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`photo_id`),
  KEY `fk_photo_product_id` (`product_id`),
  CONSTRAINT `fk_photo_product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table aplikacija.product
CREATE TABLE IF NOT EXISTS `product` (
  `product_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '0',
  `description` varchar(255) NOT NULL DEFAULT '0',
  `category_id` int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`product_id`),
  KEY `fk_product_category_id` (`category_id`),
  CONSTRAINT `fk_product_category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table aplikacija.product_price
CREATE TABLE IF NOT EXISTS `product_price` (
  `product_price_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `product_id` int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`product_price_id`),
  KEY `fk_product_price_product_id` (`product_id`),
  CONSTRAINT `fk_product_price_product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
