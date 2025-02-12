-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 12, 2025 at 04:14 AM
-- Server version: 10.5.26-MariaDB
-- PHP Version: 8.3.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `admin_getbet`
--

-- --------------------------------------------------------

--
-- Table structure for table `app_user`
--

CREATE TABLE `app_user` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) NOT NULL,
  `profile_url` varchar(255) DEFAULT NULL,
  `otp` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `sub_admin` varchar(255) DEFAULT NULL,
  `wallet_balance` int(11) DEFAULT NULL,
  `role` smallint(6) DEFAULT 3,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `game_balance` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `app_user`
--

INSERT INTO `app_user` (`id`, `name`, `phone_number`, `profile_url`, `otp`, `password`, `sub_admin`, `wallet_balance`, `role`, `created_at`, `game_balance`) VALUES
('132te13-ef65gfd-gffgfgs', 'Neeraj Payal', '9876543210', 'avatar-6', '1234', NULL, '3213213-efgfd-435245', 127121, 3, '2024-12-22 13:43:52', 19800),
('23349-4baeb0f4-d0a546ec', 'krishna', '7830717827', 'avatar-3', NULL, NULL, '324qwe-536uyrt-546jhgj', 0, 1, '2024-12-26 14:06:58', 0),
('272199-476b63ff-10f5e15c', 'krishna', '8976543210', 'avatar-3', NULL, NULL, '324qwe-536uyrt-546jhgj', 0, 3, '2024-12-26 14:16:40', 0),
('3213213-efgfd-435245', 'Mayank Dobriyal', '7017935899', 'avatar-2', '1234', NULL, '', 93820, 1, '2024-12-22 13:43:52', 0),
('324qwe-536uyrt-546jhgj', 'Sumit', '9615150000', 'avatar-4', '1234', NULL, NULL, 155340, 1, '2024-12-22 13:43:52', 40000),
('347343-c64c783a-e08ce0c2', 'krishna', '9458320945', 'avatar-3', NULL, NULL, '324qwe-536uyrt-546jhgj', 0, 3, '2024-12-27 16:14:52', 0),
('435324-rtthyfgh-ljkhersf', 'Amit Negi', '7123456780', 'avatar-6', '1234', NULL, '3213213-efgfd-435245', 114000, 3, '2024-12-22 13:43:52', 5000),
('45486yhgf-gfhgfudf-ykhjgj', 'Nirmal Gaur', '8123456780', 'avatar-5', '1234', NULL, '3213213-efgfd-435245', 110000, 3, '2024-12-22 13:43:52', 6000),
('542155-e04d3e2e-7978d1d0', 'krishna', '7830717789', 'avatar-3', NULL, NULL, '324qwe-536uyrt-546jhgj', 0, 3, '2024-12-25 16:18:01', 0),
('672389-775bab30-5a7099a8', 'Krishna bhatti', '7830717727', 'avatar-3', NULL, NULL, '324qwe-536uyrt-546jhgj', 170000, 1, '2024-12-25 13:48:12', 40000),
('errsae92-5435345-gfgfg', 'Manmohan', '9123456780', 'avatar-2', '1234', NULL, '3213213-efgfd-435245', 19000, 3, '2024-12-22 13:43:52', 0);

-- --------------------------------------------------------

--
-- Table structure for table `betting_active_users`
--

CREATE TABLE `betting_active_users` (
  `id` int(11) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `status` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `betting_percentage`
--

CREATE TABLE `betting_percentage` (
  `id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `deposit_history_id` int(11) NOT NULL,
  `status` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `betting_percentage`
--

INSERT INTO `betting_percentage` (`id`, `amount`, `user_id`, `created_at`, `deposit_history_id`, `status`) VALUES
(24, 10, '132te13-ef65gfd-gffgfgs', '2025-01-19 04:40:36', 3, 1),
(25, 200, '3213213-efgfd-435245', '2025-01-19 08:29:49', 4, 0),
(26, 6, '3213213-efgfd-435245', '2025-01-19 09:02:16', 5, 0),
(27, 80, '3213213-efgfd-435245', '2025-01-19 09:02:26', 6, 0),
(28, 12, '3213213-efgfd-435245', '2025-01-19 09:02:35', 7, 0),
(29, 5, '3213213-efgfd-435245', '2025-01-19 09:02:44', 8, 0),
(30, 5, '3213213-efgfd-435245', '2025-01-19 09:02:53', 9, 0),
(31, 6, '3213213-efgfd-435245', '2025-01-19 09:03:02', 10, 0),
(32, 9, '3213213-efgfd-435245', '2025-01-19 09:03:12', 11, 0),
(33, 10, '3213213-efgfd-435245', '2025-01-19 09:03:21', 12, 0),
(34, 30, '3213213-efgfd-435245', '2025-01-19 09:03:35', 13, 0),
(35, 7, '3213213-efgfd-435245', '2025-01-19 09:03:44', 14, 0),
(36, 3, '3213213-efgfd-435245', '2025-01-19 09:03:53', 15, 0),
(37, 12, '3213213-efgfd-435245', '2025-01-19 09:04:04', 16, 0),
(38, 8, '3213213-efgfd-435245', '2025-01-19 09:04:11', 17, 0),
(39, 10, '672389-775bab30-5a7099a8', '2025-01-19 16:37:05', 18, 0),
(40, 100, '3213213-efgfd-435245', '2025-01-31 04:46:50', 19, 0);

-- --------------------------------------------------------

--
-- Table structure for table `bet_prediction_history`
--

CREATE TABLE `bet_prediction_history` (
  `id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `bet_id` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `option_name` varchar(255) DEFAULT NULL,
  `game_type` varchar(255) DEFAULT NULL,
  `min` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `betting_active_users_id` int(11) DEFAULT NULL,
  `game_result_id` int(11) NOT NULL,
  `win_status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bet_prediction_history`
--

INSERT INTO `bet_prediction_history` (`id`, `amount`, `user_id`, `bet_id`, `created_at`, `option_name`, `game_type`, `min`, `status`, `betting_active_users_id`, `game_result_id`, `win_status`) VALUES
(29, 200, '132te13-ef65gfd-gffgfgs', '20250119100010437', '2025-01-19 07:16:01', 'SMALL', 'win_go', 1, 0, 62, 3, 1),
(30, 200, '3213213-efgfd-435245', '20250119100010437', '2025-01-19 07:16:01', 'BIG', 'win_go', 1, 0, 61, 3, 0),
(31, 200, '672389-775bab30-5a7099a8', '20250119100010437', '2025-01-19 07:16:01', 'BIG', 'win_go', 1, 0, 61, 3, 0);

-- --------------------------------------------------------

--
-- Table structure for table `deposit_history`
--

CREATE TABLE `deposit_history` (
  `id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `sub_admin_id` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` smallint(6) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `deposit_history`
--

INSERT INTO `deposit_history` (`id`, `amount`, `user_id`, `sub_admin_id`, `created_at`, `status`) VALUES
(3, 990, '132te13-ef65gfd-gffgfgs', '3213213-efgfd-435245', '2025-01-19 04:40:35', 1),
(4, 19800, '3213213-efgfd-435245', '324qwe-536uyrt-546jhgj', '2025-01-19 08:29:49', 0),
(5, 594, '3213213-efgfd-435245', '324qwe-536uyrt-546jhgj', '2025-01-19 09:02:16', 0),
(6, 7920, '3213213-efgfd-435245', '324qwe-536uyrt-546jhgj', '2025-01-19 09:02:26', 0),
(7, 1220, '3213213-efgfd-435245', '324qwe-536uyrt-546jhgj', '2025-01-19 09:02:34', 0),
(8, 535, '3213213-efgfd-435245', '324qwe-536uyrt-546jhgj', '2025-01-19 09:02:44', 0),
(9, 452, '3213213-efgfd-435245', '324qwe-536uyrt-546jhgj', '2025-01-19 09:02:53', 0),
(10, 594, '3213213-efgfd-435245', '324qwe-536uyrt-546jhgj', '2025-01-19 09:03:02', 0),
(11, 891, '3213213-efgfd-435245', '324qwe-536uyrt-546jhgj', '2025-01-19 09:03:12', 0),
(12, 990, '3213213-efgfd-435245', '324qwe-536uyrt-546jhgj', '2025-01-19 09:03:21', 0),
(13, 2970, '3213213-efgfd-435245', '324qwe-536uyrt-546jhgj', '2025-01-19 09:03:35', 0),
(14, 643, '3213213-efgfd-435245', '324qwe-536uyrt-546jhgj', '2025-01-19 09:03:43', 0),
(15, 297, '3213213-efgfd-435245', '324qwe-536uyrt-546jhgj', '2025-01-19 09:03:53', 0),
(16, 1188, '3213213-efgfd-435245', '324qwe-536uyrt-546jhgj', '2025-01-19 09:04:03', 0),
(17, 781, '3213213-efgfd-435245', '324qwe-536uyrt-546jhgj', '2025-01-19 09:04:11', 0),
(18, 990, '672389-775bab30-5a7099a8', '324qwe-536uyrt-546jhgj', '2025-01-19 16:37:05', 0),
(19, 9900, '3213213-efgfd-435245', '', '2025-01-31 04:46:50', 0);

-- --------------------------------------------------------

--
-- Table structure for table `game_result`
--

CREATE TABLE `game_result` (
  `id` int(11) NOT NULL,
  `game_type` varchar(255) NOT NULL,
  `result` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_by` varchar(255) DEFAULT NULL,
  `game_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `game_result`
--

INSERT INTO `game_result` (`id`, `game_type`, `result`, `created_at`, `updated_by`, `game_id`) VALUES
(1, 'win_go', 'BIG', '2025-01-19 07:06:00', '3213213-efgfd-435245', '20250119100010427'),
(2, 'win_go', 'BIG', '2025-01-19 07:11:00', '132te13-ef65gfd-gffgfgs', '20250119100010432'),
(3, 'win_go', 'SMALL', '2025-01-19 07:16:00', '132te13-ef65gfd-gffgfgs', '20250119100010437');

-- --------------------------------------------------------

--
-- Table structure for table `passcode_request`
--

CREATE TABLE `passcode_request` (
  `id` int(11) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `count` int(11) NOT NULL,
  `status` smallint(6) NOT NULL DEFAULT 0,
  `updated_by` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `passcode_request`
--

INSERT INTO `passcode_request` (`id`, `user_id`, `created_at`, `count`, `status`, `updated_by`) VALUES
(1, '3213213-efgfd-435245', '2025-01-25 04:00:26', 3, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `pass_code`
--

CREATE TABLE `pass_code` (
  `id` int(11) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `code` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `created_by` varchar(255) DEFAULT '1',
  `allot_to` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `pass_code`
--

INSERT INTO `pass_code` (`id`, `user_id`, `code`, `created_at`, `created_by`, `allot_to`) VALUES
(11, '3213213-efgfd-435245', 216562, '2025-01-25 06:07:10', '3213213-efgfd-435245', NULL),
(12, '3213213-efgfd-435245', 367123, '2025-01-25 06:07:10', '3213213-efgfd-435245', NULL),
(13, '3213213-efgfd-435245', 505662, '2025-01-25 06:07:10', '3213213-efgfd-435245', NULL),
(14, '3213213-efgfd-435245', 356599, '2025-01-25 06:07:10', '3213213-efgfd-435245', NULL),
(15, '3213213-efgfd-435245', 718186, '2025-01-25 06:07:10', '3213213-efgfd-435245', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `sid` varchar(255) NOT NULL,
  `sess` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`sess`)),
  `expire` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`sid`, `sess`, `expire`) VALUES
('FApvZegG8hJv_tEOUuVJSN32vQhD1H30', '{\"cookie\": {\"path\": \"/\", \"secure\": true, \"expires\": \"2026-01-18T05:47:46.922Z\", \"httpOnly\": true, \"sameSite\": \"none\", \"originalMaxAge\": 31536000000}, \"userSessionData\": {\"id\": \"3213213-efgfd-435245\", \"name\": \"Mayank Dobriyal\", \"role\": 2, \"sub_admin\": {\"id\": \"324qwe-536uyrt-546jhgj\", \"name\": \"Sumit Rajput\", \"role\": 1, \"phone_number\": \"1111111111\", \"profile_picture\": \"avatar-4\"}, \"profile_url\": \"avatar-1\", \"phone_number\": \"7017935899\", \"wallet_balance\": 100000}}', '2026-01-20 12:30:19'),
('L6l1vyMimrKKy0_tk9MSeVcQkSs8cQdk', '{\"cookie\": {\"path\": \"/\", \"secure\": true, \"expires\": \"2026-01-25T03:12:28.458Z\", \"httpOnly\": true, \"sameSite\": \"none\", \"originalMaxAge\": 31536000000}, \"userSessionData\": {\"id\": \"3213213-efgfd-435245\", \"name\": \"Mayank Dobriyal\", \"role\": 2, \"sub_admin\": {\"id\": null, \"name\": null, \"role\": null, \"phone_number\": null, \"profile_picture\": null}, \"profile_url\": \"avatar-2\", \"phone_number\": \"7017935899\", \"wallet_balance\": 68820}}', '2026-01-26 09:09:38'),
('yyTu-cNi-MNoEsCjiyy1GGwwL3NSJsWw', '{\"cookie\": {\"path\": \"/\", \"secure\": true, \"expires\": \"2026-01-18T05:36:47.062Z\", \"httpOnly\": true, \"sameSite\": \"none\", \"originalMaxAge\": 31536000000}, \"userSessionData\": {\"id\": \"3213213-efgfd-435245\", \"name\": \"Mayank Dobriyal\", \"role\": 2, \"sub_admin\": {\"id\": \"324qwe-536uyrt-546jhgj\", \"name\": \"Sumit Rajput\", \"role\": 1, \"phone_number\": \"1111111111\", \"profile_picture\": \"avatar-4\"}, \"profile_url\": \"avatar-1\", \"phone_number\": \"7017935899\", \"wallet_balance\": 100000}}', '2026-01-18 05:36:50');

-- --------------------------------------------------------

--
-- Table structure for table `user_transaction_history`
--

CREATE TABLE `user_transaction_history` (
  `id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_transaction_history`
--

INSERT INTO `user_transaction_history` (`id`, `amount`, `user_id`, `type`, `created_at`) VALUES
(1, 10, '3213213-efgfd-435245', 'game_percentage_deduct', '2025-01-04 08:15:47'),
(2, 550, '3213213-efgfd-435245', 'game_play_deduct', '2025-01-05 05:44:26'),
(3, 550, '132te13-ef65gfd-gffgfgs', 'game_play_deduct', '2025-01-05 05:44:26'),
(4, 100, '3213213-efgfd-435245', 'game_play_deduct', '2025-01-05 08:07:22'),
(5, 100, '132te13-ef65gfd-gffgfgs', 'game_play_deduct', '2025-01-05 08:07:22'),
(6, 300, '3213213-efgfd-435245', 'game_play_deduct', '2025-01-05 08:20:26'),
(7, 300, '132te13-ef65gfd-gffgfgs', 'game_play_deduct', '2025-01-05 08:20:26'),
(8, 2150, '3213213-efgfd-435245', 'game_play_deduct', '2025-01-05 08:42:25'),
(9, 2150, '132te13-ef65gfd-gffgfgs', 'game_play_deduct', '2025-01-05 08:42:25'),
(10, 700, '3213213-efgfd-435245', 'game_play_deduct', '2025-01-05 08:50:22'),
(11, 700, '132te13-ef65gfd-gffgfgs', 'game_play_deduct', '2025-01-05 08:50:22'),
(12, 450, '3213213-efgfd-435245', 'game_play_deduct', '2025-01-05 09:38:40'),
(13, 450, '132te13-ef65gfd-gffgfgs', 'game_play_deduct', '2025-01-05 09:38:40'),
(14, 400, '3213213-efgfd-435245', 'game_play_deduct', '2025-01-05 09:45:05'),
(15, 400, '132te13-ef65gfd-gffgfgs', 'game_play_deduct', '2025-01-05 09:45:05'),
(16, 1250, '3213213-efgfd-435245', 'game_play_deduct', '2025-01-05 10:01:22'),
(17, 1250, '132te13-ef65gfd-gffgfgs', 'game_play_deduct', '2025-01-05 10:01:22'),
(18, 4250, '3213213-efgfd-435245', 'game_play_deduct', '2025-01-05 10:17:00'),
(19, 4250, '132te13-ef65gfd-gffgfgs', 'game_play_deduct', '2025-01-05 10:17:00'),
(20, 450, '3213213-efgfd-435245', 'game_play_deduct', '2025-01-05 10:25:00'),
(21, 450, '132te13-ef65gfd-gffgfgs', 'game_play_deduct', '2025-01-05 10:25:00'),
(22, 200, '132te13-ef65gfd-gffgfgs', 'game_play_deduct', '2025-01-05 10:34:00'),
(23, 200, '3213213-efgfd-435245', 'game_play_deduct', '2025-01-05 10:34:00'),
(24, 13, '672389-775bab30-5a7099a8', 'wallet_to_game_wallet_transfer', '2025-01-11 06:26:22'),
(25, 0, '672389-775bab30-5a7099a8', 'game_percentage_deduct', '2025-01-11 06:26:22'),
(26, 10, '672389-775bab30-5a7099a8', 'wallet_to_game_wallet_transfer', '2025-01-11 06:27:41'),
(27, 0, '672389-775bab30-5a7099a8', 'game_percentage_deduct', '2025-01-11 06:27:42'),
(28, 5, '672389-775bab30-5a7099a8', 'wallet_to_game_wallet_transfer', '2025-01-11 06:31:43'),
(29, 0, '672389-775bab30-5a7099a8', 'game_percentage_deduct', '2025-01-11 06:31:44'),
(30, 10, '672389-775bab30-5a7099a8', 'wallet_to_game_wallet_transfer', '2025-01-11 06:45:59'),
(31, 0, '672389-775bab30-5a7099a8', 'game_percentage_deduct', '2025-01-11 06:45:59');

-- --------------------------------------------------------

--
-- Table structure for table `withdrawal_history`
--

CREATE TABLE `withdrawal_history` (
  `id` int(11) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `sub_admin_id` varchar(255) NOT NULL,
  `amount` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `withdrawal_history`
--

INSERT INTO `withdrawal_history` (`id`, `user_id`, `sub_admin_id`, `amount`, `status`, `created_at`) VALUES
(1, '132te13-ef65gfd-gffgfgs', '3213213-efgfd-435245', 1000, 1, '2025-01-18 08:23:41'),
(2, '132te13-ef65gfd-gffgfgs', '3213213-efgfd-435245', 1000, 1, '2025-01-18 08:24:19'),
(3, '3213213-efgfd-435245', '324qwe-536uyrt-546jhgj', 1230, 0, '2025-01-18 12:02:53'),
(4, '3213213-efgfd-435245', '324qwe-536uyrt-546jhgj', 1423, 0, '2025-01-18 12:09:06');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `app_user`
--
ALTER TABLE `app_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `app_user_phone_number_key` (`phone_number`);

--
-- Indexes for table `betting_active_users`
--
ALTER TABLE `betting_active_users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `betting_percentage`
--
ALTER TABLE `betting_percentage`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bet_prediction_history`
--
ALTER TABLE `bet_prediction_history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `deposit_history`
--
ALTER TABLE `deposit_history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `game_result`
--
ALTER TABLE `game_result`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `passcode_request`
--
ALTER TABLE `passcode_request`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pass_code`
--
ALTER TABLE `pass_code`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`sid`);

--
-- Indexes for table `user_transaction_history`
--
ALTER TABLE `user_transaction_history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `withdrawal_history`
--
ALTER TABLE `withdrawal_history`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `betting_active_users`
--
ALTER TABLE `betting_active_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `betting_percentage`
--
ALTER TABLE `betting_percentage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `bet_prediction_history`
--
ALTER TABLE `bet_prediction_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `deposit_history`
--
ALTER TABLE `deposit_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `game_result`
--
ALTER TABLE `game_result`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `passcode_request`
--
ALTER TABLE `passcode_request`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `pass_code`
--
ALTER TABLE `pass_code`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `user_transaction_history`
--
ALTER TABLE `user_transaction_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96;

--
-- AUTO_INCREMENT for table `withdrawal_history`
--
ALTER TABLE `withdrawal_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
