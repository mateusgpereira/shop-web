-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Aug 15, 2022 at 12:36 PM
-- Server version: 8.0.30
-- PHP Version: 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shop_api`
--

-- --------------------------------------------------------

--
-- Table structure for table `hibernate_sequence`
--

CREATE TABLE `hibernate_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `hibernate_sequence`
--

INSERT INTO `hibernate_sequence` (`next_val`) VALUES
(6);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` bigint NOT NULL,
  `image_url` varchar(150) DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `price` double NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `image_url`, `name`, `price`) VALUES
(1, 'https://cdn.weasy.io/users/xiaomi/catalog/xiaomi12_pro_black_01.png', 'Smartphone XIAOMI 12 Pro', 949.99),
(2, 'https://www.worten.pt/i/b6172f5efbf3b97eb00da902533e4d00c0cbaf6f.jpg', 'XIAOMI 2S Air2', 79.9),
(3, 'https://static.fnac-static.com/multimedia/Images/PT/NR/0e/d9/76/7788814/1540-1.jpg', 'Smartwatch Xiaomi Mi Watch 2', 59.9),
(4, 'https://cdn.weasy.io/users/xiaomi/bundle_books.png', 'Book S XIAOMI 8Gb/256Gb', 799.99),
(5, 'https://cdn.weasy.io/users/xiaomi/xiaomi_pad5_front_view_cosmic_gray.png', 'Tablet XIAOMI Pad 5 6Gb/128Gb', 399.99);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
