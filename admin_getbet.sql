-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 15, 2025 at 05:13 AM
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
  `session_id` varchar(255) NOT NULL,
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `data`, `expires`) VALUES
('-issZh5SxIi2SubsIVoGEvw3fwXOlbzB', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T06:01:37.366Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"}}', 1770962497),
('-jaWdqygWpqqoc1zWl5C0Ow_cPAsPO9V', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T16:50:02.568Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"}}', 1770915003),
('-pinxB3TgP7W6SqrRgRK5LlJ8H5X29Nr', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:55:57.082Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770911757),
('-_hjof9_mHh-HUVU78gXGFlZWSxNmmnJ', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T16:50:57.660Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"}}', 1770915058),
('0M7BgRKBl1OVydOk8S_KUwcFIHGblbP0', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T03:05:00.163Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771124700),
('0t-GhO5mSUPzJManT9oRzFW0q8joeK7H', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T14:45:57.080Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770907557),
('1joZHF7GiWrbtnreUf6vVpMY9vI4oUWL', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T06:39:32.205Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"userSessionData\":{\"id\":\"3213213-efgfd-435245\",\"name\":\"Mayank Dobriyal\",\"profile_url\":\"avatar-2\",\"role\":1,\"phone_number\":\"7017935899\",\"wallet_balance\":93820,\"sub_admin\":\"{\\\"id\\\": null, \\\"name\\\": null, \\\"profile_picture\\\": null, \\\"role\\\": null, \\\"phone_number\\\": null}\"}}', 1770964772),
('1lN8UVlq2D1RWJtLj2P4tOCQHj73z9jo', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:48:22.051Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770911302),
('21upLAd3L_RLjXSrSK-J4aTLphXoD8iR', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:40:48.691Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770910849),
('2EUm29p4w7N4o5sAjdS34Gbh3yAl6SrY', '{\"cookie\":{\"originalMaxAge\":31535999999,\"expires\":\"2026-02-12T16:57:24.986Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"userSessionData\":{\"id\":\"3213213-efgfd-435245\",\"name\":\"Mayank Dobriyal\",\"profile_url\":\"avatar-2\",\"role\":1,\"phone_number\":\"7017935899\",\"wallet_balance\":93820,\"sub_admin\":\"{\\\"id\\\": null, \\\"name\\\": null, \\\"profile_picture\\\": null, \\\"role\\\": null, \\\"phone_number\\\": null}\"}}', 1770915445),
('2Kbz1Tx7v0z8tEZmDBrwAILwQnkv5br0', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:48:31.568Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1,\"userSessionData\":{\"id\":\"3213213-efgfd-435245\",\"name\":\"Mayank Dobriyal\",\"profile_url\":\"avatar-2\",\"role\":1,\"phone_number\":\"7017935899\",\"wallet_balance\":93820,\"sub_admin\":\"{\\\"id\\\": null, \\\"name\\\": null, \\\"profile_picture\\\": null, \\\"role\\\": null, \\\"phone_number\\\": null}\"}}', 1770911312),
('2ntmFHQGfJqDGhHLaiKIkUZLTPytL7FN', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T06:28:08.622Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"testcookie\":\"test-coolie--------------------test\"}', 1770964089),
('30trFQTmqggwa0xNbPjLSpMiVQ_YR5YU', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T06:23:46.008Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"testcookie\":\"test-coolie--------------------test\"}', 1770963826),
('3DaC8p_8TxEf4v4-N0Y_uyIb2lri1Ic6', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T14:37:26.175Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"userSessionData\":{\"id\":\"3213213-efgfd-435245\",\"name\":\"Mayank Dobriyal\",\"profile_url\":\"avatar-2\",\"role\":1,\"phone_number\":\"7017935899\",\"wallet_balance\":93820,\"sub_admin\":\"{\\\"id\\\": null, \\\"name\\\": null, \\\"profile_picture\\\": null, \\\"role\\\": null, \\\"phone_number\\\": null}\"}}', 1770907046),
('427BtTkcWHe4dNfLEsEsGsOw_vU7ZvVv', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:29:15.179Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770910155),
('4AkTJzZlaur-aRW3ImI_u_stRxLpgqnP', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:40:30.230Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770910830),
('4DWfuElPiTIBm9qdejj-pwJUpF8tncBL', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T06:10:44.124Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"testcookie\":\"test-coolie--------------------test\"}', 1770963044),
('4RxzQlFEX1GCDpmmbDTgNoqp_Z_BrAV3', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T06:24:45.134Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"testcookie\":\"test-coolie--------------------test\"}', 1770963885),
('5DHO1qVUDNnA5Crs227Cm_N-bX8UsG_Z', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T14:31:59.563Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"userSessionData\":{\"id\":\"3213213-efgfd-435245\",\"name\":\"Mayank Dobriyal\",\"profile_url\":\"avatar-2\",\"role\":1,\"phone_number\":\"7017935899\",\"wallet_balance\":93820,\"sub_admin\":\"{\\\"id\\\": null, \\\"name\\\": null, \\\"profile_picture\\\": null, \\\"role\\\": null, \\\"phone_number\\\": null}\"}}', 1770906719),
('5xxeD2YolrPcskUKz5ZoT1HLbqbp50t4', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T02:51:39.044Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771123899),
('6LpUaqGFKE4baWzm-65OqmOi1mBTJ8Ao', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T07:09:01.710Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"testcookie\":\"test-coolie--------------------test\"}', 1770966542),
('6oi3dgJRzTYrhdT7YW-os94uEOfCjRnT', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T03:01:33.561Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771124494),
('6qckHhr6WRrcW-fr1PPWnDrn1b_dQGKK', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T03:01:33.565Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771124494),
('716YJym-b8bzICHLe5Dm1Ube0833W2n9', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T06:32:00.238Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"testcookie\":\"test-coolie--------------------test\"}', 1770964320),
('7BsriCMNdnLNNCRxVo2Gjb4x5AeIapVy', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:52:35.967Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770911556),
('7dZQRS2Utx_uDd3QGCcDw-0L5n9YV8bV', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T07:06:21.937Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"testcookie\":\"test-coolie--------------------test\"}', 1770966382),
('7HHuiKc5FKZhy5FGJNkqBiwrw3QIfRMR', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T16:53:42.658Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', 1770915223),
('9h0zPVPzgpxL5evfY3qc71jzH7bHwtD1', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:52:41.345Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770911561),
('9KFrfIkUf2k9b8nHIVfZYaVoK269iLGy', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T07:09:14.258Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userSessionData\":{\"id\":\"3213213-efgfd-435245\",\"name\":\"Mayank Dobriyal\",\"profile_url\":\"avatar-2\",\"role\":1,\"phone_number\":\"7017935899\",\"wallet_balance\":93820,\"sub_admin\":\"{\\\"id\\\": null, \\\"name\\\": null, \\\"profile_picture\\\": null, \\\"role\\\": null, \\\"phone_number\\\": null}\"}}', 1770966554),
('A9dfYsyLgkJBv4hC8fsbcPdy5g1PISJC', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T06:28:08.625Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"testcookie\":\"test-coolie--------------------test\"}', 1770964089),
('AjgF59EBwgrlMswyYsq4kzBXOGjMCrrj', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:51:19.410Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770911479),
('AMvNzRIKKW2oyPkiM-fT1abXbrBZwOhR', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T16:50:57.656Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"}}', 1770915058),
('bbBS9TidMqw8h2U_1_av2-AB_E7bE22a', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:48:04.528Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770911285),
('C8f3n6gnKOhn-evDeyM6RwxF9eUbRDgL', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T03:23:36.609Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771125817),
('chP9TsR2R5_AuLENhz7nFxuZMXRBV-PB', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:48:31.743Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770911312),
('cVT8gXytEzCIHnx3w2EQypSeuWJmtmGE', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T03:04:07.237Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771124647),
('cxynxmUarHrRSO0rE6fDg2JrfHE4ZLyK', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:51:19.230Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1,\"userSessionData\":{\"id\":\"3213213-efgfd-435245\",\"name\":\"Mayank Dobriyal\",\"profile_url\":\"avatar-2\",\"role\":1,\"phone_number\":\"7017935899\",\"wallet_balance\":93820,\"sub_admin\":\"{\\\"id\\\": null, \\\"name\\\": null, \\\"profile_picture\\\": null, \\\"role\\\": null, \\\"phone_number\\\": null}\"}}', 1770911479),
('D9FzhoGras9td5pikio2Fa-WdvZh8ttT', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T06:39:32.411Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"}}', 1770964772),
('dA27YfbIBE5lvB6kS1eOxO93Pce1QIN0', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T05:57:05.862Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"userSessionData\":{\"id\":\"3213213-efgfd-435245\",\"name\":\"Mayank Dobriyal\",\"profile_url\":\"avatar-2\",\"role\":1,\"phone_number\":\"7017935899\",\"wallet_balance\":93820,\"sub_admin\":\"{\\\"id\\\": null, \\\"name\\\": null, \\\"profile_picture\\\": null, \\\"role\\\": null, \\\"phone_number\\\": null}\"}}', 1770962226),
('dbCdF8BtMQSQUuCPPD9HqKYgiVcUojyf', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T03:23:36.608Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771125817),
('DeQaq8jj3UqXyb7COXPNEoSUGsR1cd-_', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T06:28:49.656Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"testcookie\":\"test-coolie--------------------test\"}', 1770964130),
('dIaNhwASyPGaV48A4KUg87BVZ8T0fgVx', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:40:48.513Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1,\"userSessionData\":{\"id\":\"3213213-efgfd-435245\",\"name\":\"Mayank Dobriyal\",\"profile_url\":\"avatar-2\",\"role\":1,\"phone_number\":\"7017935899\",\"wallet_balance\":93820,\"sub_admin\":\"{\\\"id\\\": null, \\\"name\\\": null, \\\"profile_picture\\\": null, \\\"role\\\": null, \\\"phone_number\\\": null}\"}}', 1770910849),
('DIGKWVcqgo1afu7ivDNQFxrywYoHetLx', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:33:47.312Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770910427),
('djnUx6X7DVG-ADLStNjSM0wo1IGnO0a2', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T16:50:02.592Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"}}', 1770915003),
('dn23Q8xtMdb8wpcZ2Y1lBsI7B7oBd3Zi', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T14:46:21.808Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770907582),
('DOH74mWeCRysQm4LOL_Gw6T9KEgPcJFu', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:48:04.530Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770911285),
('DPxftI1KZX1gvst69WnvAuH7aEIh_boq', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T16:04:09.787Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userSessionData\":{\"id\":\"3213213-efgfd-435245\",\"name\":\"Mayank Dobriyal\",\"profile_url\":\"avatar-2\",\"role\":1,\"phone_number\":\"7017935899\",\"wallet_balance\":93820,\"sub_admin\":\"{\\\"id\\\": null, \\\"name\\\": null, \\\"profile_picture\\\": null, \\\"role\\\": null, \\\"phone_number\\\": null}\"}}', 1770912250),
('DZ9QwyDwrffbLto-pCTnudlBTTClL3ii', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:51:19.408Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770911479),
('D_OaguB9Vn3McLCOXDvpz2zzwKhuoKbB', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:33:47.314Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770910427),
('e51uRu9_BKfaDHPYFp78bP545uEFajn7', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T16:56:41.877Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"}}', 1770915402),
('E8Q5aoHTz5ubE55QRhyZwk8ihlUen1jk', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:48:31.741Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770911312),
('EjqodxLDAz3pEaxK8MpNlm_qYm4F2Kaf', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T02:55:07.972Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771124108),
('elvO6oN7h6PWZGhoJ1ilFFG-XacCIWtz', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T03:26:09.721Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771125970),
('euxmWj-AU-XUgbm6ejcu8DIo8t1aitWC', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:50:55.349Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770911455),
('fIAg42QJaDnWspMrs6__FRHrFgnEBTdg', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:50:55.345Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770911455),
('fIPuPE5N7IiZWPedJ4Vtrpvc1jLwDSmx', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T14:46:21.835Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770907582),
('FM3NhfYo4HsqjSrRK6WhvOexlSiimx3j', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T16:57:25.167Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"}}', 1770915445),
('FnIvMh6yoSsx9A3izcm1O2UmFM7NqpkH', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T03:27:03.445Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771126023),
('FTbrhA_TVsphERF1vnu8kELLceVWk8DI', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T16:52:35.619Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', 1770915156),
('ftswXS5B9VpuR7Oc4Pi_l6gf6hFYGGsi', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T06:39:32.408Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"}}', 1770964772),
('gK9xw-lrYCHfKg01vSiFVP5pKF2K8-zF', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T06:32:21.142Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"testcookie\":\"test-coolie--------------------test\"}', 1770964341),
('GL4e1NCNSJ2M8ftodJqcLCxz0ZqV2x1s', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T06:39:21.579Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"}}', 1770964762),
('Gp8reo3Hkpy0w0Cdsc3o-phadZys8QSr', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T16:53:42.666Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', 1770915223),
('gu4iSXEjkhZGV0kZRFbcinu7EbtNyUkR', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T06:28:49.652Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"testcookie\":\"test-coolie--------------------test\"}', 1770964130),
('icWRDmuo8rAze_Z-D2JT9PUsG9coUCWw', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T16:57:07.806Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"}}', 1770915428),
('ignAC8h8fmS5RdBqv_AjHyl08fw8KDSe', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:51:02.346Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770911462),
('IMwkqyAJ4CjVOOJDTMsTptu1atz11i4l', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T06:20:01.255Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"testcookie\":\"test-coolie--------------------test\"}', 1770963601),
('Iz-YT0zxH6KLlcgIscIjWJbKl93VAWss', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T03:26:09.717Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771125970),
('jBglQa30FpQo1Y0WyCNmyVwoijlumgoV', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T03:18:19.799Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771125500),
('JFfeAJY3Jt6ymCkOfy93LXvQC5gOLkh_', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T03:05:00.159Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771124700),
('JKGHmAWkmNlhQpUt1YLmIwbe3kle6R12', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:40:48.697Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770910849),
('k9C9k77BveouwgTJzxEPl4JdAwVxlQQH', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T06:10:44.129Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"testcookie\":\"test-coolie--------------------test\"}', 1770963044),
('kJmZyNfm4qeOHOwtXmmG-z1KBUmuu9bZ', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T16:57:25.165Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"}}', 1770915445),
('kMEi6IbtUDj-nNG5K03RxVJvsRzOevTK', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:52:43.421Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770911563),
('KxUTn8DB4lIUsjSrMe6zTai2xGe6oXaW', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T06:32:00.240Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"testcookie\":\"test-coolie--------------------test\"}', 1770964320),
('KXuv3BAQ20Dfgsqf6Wmub1QTpx3CurDK', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:40:48.693Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770910849),
('lNiSjWkYQv8vHVEX6oljefgiQwPMA2O7', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T16:56:41.873Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"}}', 1770915402),
('lOFHq5bFX3Fiu46QrjRhf9QAUybBbCDS', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T16:08:34.092Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userSessionData\":{\"id\":\"3213213-efgfd-435245\",\"name\":\"Mayank Dobriyal\",\"profile_url\":\"avatar-2\",\"role\":1,\"phone_number\":\"7017935899\",\"wallet_balance\":93820,\"sub_admin\":\"{\\\"id\\\": null, \\\"name\\\": null, \\\"profile_picture\\\": null, \\\"role\\\": null, \\\"phone_number\\\": null}\"}}', 1770912514),
('LSgXuTBj7CIDoZ4Xe4lBrm3lgwRinog7', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T06:07:06.451Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"}}', 1770962826),
('lSHQbQJjsGvBoIOy9ljjcaC9-sp_ylNn', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T03:11:56.809Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771125117),
('LVHJpDQzs1iTySY2aQE4ip08q0JP-WQd', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T03:27:03.439Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771126023),
('mMddRCc89x4X1HIXOs1EStthtkfZlmlE', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T03:16:41.885Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771125402),
('MyEt1AZf5pJFgKiqGdrSr_6bF8cazP_v', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T14:46:21.804Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770907582),
('nErMn0LaaxyZ9tQVgpaJX6CbwlqzSXTr', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T14:46:21.810Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770907582),
('nKyfCuQ8brzzThEHrR_5jEO5Bd2BgZOt', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T06:23:46.009Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"testcookie\":\"test-coolie--------------------test\"}', 1770963826),
('nSGQJTUAXt22avqry8HmAraEA2yYccn5', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T16:47:57.032Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"userSessionData\":{\"id\":\"3213213-efgfd-435245\",\"name\":\"Mayank Dobriyal\",\"profile_url\":\"avatar-2\",\"role\":1,\"phone_number\":\"7017935899\",\"wallet_balance\":93820,\"sub_admin\":\"{\\\"id\\\": null, \\\"name\\\": null, \\\"profile_picture\\\": null, \\\"role\\\": null, \\\"phone_number\\\": null}\"}}', 1770914877),
('nUI9wVJsOG730NBDEAQlgylWFGPMavxY', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T06:32:21.139Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"testcookie\":\"test-coolie--------------------test\"}', 1770964341),
('NXdoPxoqx-5WntuwVqd7BUpDjy_jkH6T', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T06:24:45.132Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"testcookie\":\"test-coolie--------------------test\"}', 1770963885),
('o0AOdvLtCAD4J9mBNKIcaLr4Q5s9nC09', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T07:09:01.720Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"testcookie\":\"test-coolie--------------------test\"}', 1770966542),
('o9wD46ziovkPeUNPZVxB1rEy4bGfNV0o', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:48:31.751Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770911312),
('oM7TcpIaPWX29z1_OquvJhxmzX6hpSvL', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T06:39:32.406Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"}}', 1770964772),
('oYDkdGb2QthOgYE8A4tXFW6kbaKzpLXg', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T03:04:57.679Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771124698),
('PGRGGuECucfx0bjB8cfX9T7j5C07e4Qz', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T06:01:37.363Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"}}', 1770962497),
('PKeCF2wSJQod7KPjQDNcPUd8OPgn-6zc', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:48:13.742Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770911294),
('pvMVh_b7oNBZeomxqF0TvEXyRYCSLESo', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:29:15.184Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770910155),
('R7Tmdu6cgfaewgeRnXXPXY8gzKt6j6Ag', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:48:31.745Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770911312),
('r7vd72jkuyF1YCaJSBprZ4L0vbecUx7n', '{\"cookie\":{\"originalMaxAge\":31535999999,\"expires\":\"2026-02-15T03:16:41.880Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771125402),
('Rb-2vjV_LQ_hdx1OZ7znK1KHaXYZIppc', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T16:57:25.157Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"}}', 1770915445),
('RH5WYykR13wsKhvu9MwXu6qv2BS7ReHF', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T02:55:07.966Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771124108),
('rJcZxU0pdS3UrY2sxPh1UJQrvXeO__Rm', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T14:45:50.263Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770907550),
('rZe5Pd5KWeEEI3KVgqLpeaSArbX6Ckqq', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:33:18.926Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770910399),
('S-0BB62KhAtdaSSj33oTt2Q_GOwTikYx', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T03:18:19.804Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771125500),
('sPu1q2k3omuBf84Tq3gbGk8546XRN0-F', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:33:47.311Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770910427),
('srzWjHWnHJfK65OXUHWCh0uAhCepXkyq', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T03:04:07.241Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771124647),
('TcFPq9td9Rx5KWd7njVv8Tjyll0nqjK9', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T14:46:21.616Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1,\"userSessionData\":{\"id\":\"3213213-efgfd-435245\",\"name\":\"Mayank Dobriyal\",\"profile_url\":\"avatar-2\",\"role\":1,\"phone_number\":\"7017935899\",\"wallet_balance\":93820,\"sub_admin\":\"{\\\"id\\\": null, \\\"name\\\": null, \\\"profile_picture\\\": null, \\\"role\\\": null, \\\"phone_number\\\": null}\"}}', 1770907581),
('TCz-Mcp_kDDKp9KiP_AEYZ_7hxPoFtdF', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:51:19.412Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770911479),
('TMstDGJL5V3WkndnLgJPSQcVdlIOwzx9', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:33:47.142Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1,\"userSessionData\":{\"id\":\"3213213-efgfd-435245\",\"name\":\"Mayank Dobriyal\",\"profile_url\":\"avatar-2\",\"role\":1,\"phone_number\":\"7017935899\",\"wallet_balance\":93820,\"sub_admin\":\"{\\\"id\\\": null, \\\"name\\\": null, \\\"profile_picture\\\": null, \\\"role\\\": null, \\\"phone_number\\\": null}\"}}', 1770910427),
('tXljMg79TYTDp4v__C22s6qTs4tzrVDH', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T06:39:32.403Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"}}', 1770964772),
('tznYBUilHffBkeNc-T0qjDVWKviF_gV8', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:33:47.306Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770910427),
('u2ytWRa1TywLYhrf0-2UziBzl-IA49iv', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:40:30.235Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770910830),
('u4PxTs-cEYD2WP1UynFhBt0fmjsQayO3', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T16:15:26.415Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"None\"},\"userSessionData\":{\"id\":\"3213213-efgfd-435245\",\"name\":\"Mayank Dobriyal\",\"profile_url\":\"avatar-2\",\"role\":1,\"phone_number\":\"7017935899\",\"wallet_balance\":93820,\"sub_admin\":\"{\\\"id\\\": null, \\\"name\\\": null, \\\"profile_picture\\\": null, \\\"role\\\": null, \\\"phone_number\\\": null}\"}}', 1770912926),
('UaltIbK32MamnunBDmI7GKxef1dgiEjb', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T06:07:06.455Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"}}', 1770962826),
('uPskdrQ2E3UAoVnLfW2yItQKDCkBo8MK', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T14:35:55.891Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"userSessionData\":{\"id\":\"3213213-efgfd-435245\",\"name\":\"Mayank Dobriyal\",\"profile_url\":\"avatar-2\",\"role\":1,\"phone_number\":\"7017935899\",\"wallet_balance\":93820,\"sub_admin\":\"{\\\"id\\\": null, \\\"name\\\": null, \\\"profile_picture\\\": null, \\\"role\\\": null, \\\"phone_number\\\": null}\"}}', 1770906956),
('uwgPE8x7JuW6aBwkGPXFL5wMksYLH6HR', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T16:57:25.162Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"}}', 1770915445),
('uXGsGk74Nz-DN8m5cQ307ICpSvhcMauD', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T16:11:02.289Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userSessionData\":{\"id\":\"3213213-efgfd-435245\",\"name\":\"Mayank Dobriyal\",\"profile_url\":\"avatar-2\",\"role\":1,\"phone_number\":\"7017935899\",\"wallet_balance\":93820,\"sub_admin\":\"{\\\"id\\\": null, \\\"name\\\": null, \\\"profile_picture\\\": null, \\\"role\\\": null, \\\"phone_number\\\": null}\"}}', 1770912662),
('v6G5VtVOgkLWyxZoaNhRf2zwfHJrmOse', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T03:02:27.072Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771124547),
('VJrxQOws5oWuHH4XkJUc4w-20XtwUDrD', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:54:15.804Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770911656),
('vUiYlHaZ7sNaR265-tKmGvdYsoeWHOwc', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T02:51:39.042Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771123899),
('VwmiknbTXafqY-t5ia2RixDTYS3CGdN2', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:33:38.174Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770910418),
('Wf5ty20Lt4o1fUgamVidRvkRzfPhhU6e', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:40:48.694Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770910849),
('WgeAQl-S3i3SdIFgXTWhk1lWx5UnFii-', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T03:11:56.807Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771125117),
('Wpfg34kLVlUiWTkAZQqS4f7zLcErs0WX', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:54:23.397Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770911663),
('WYyVQiHTsB0z1Xy5x36VBJgruQ3qpTqo', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T07:06:21.932Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"testcookie\":\"test-coolie--------------------test\"}', 1770966382),
('x8ujLrp9LoSBGnys4JXWXX4M6VSDg22t', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T03:09:45.557Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771124986),
('xCanUVcBfs06UZnutAA4P0PnFMKvVobH', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T16:52:35.615Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', 1770915156),
('XChbD8WJ0CpqQOi3OtqPwzrBl8cDrApu', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:40:38.111Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770910838),
('yztZCJxjqEG5uklud-9yxiWd_sAvDBAe', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T06:20:01.258Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"testcookie\":\"test-coolie--------------------test\"}', 1770963601),
('z4H3J3cvpO46jVx_dnybJ5BEnxH765rw', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T03:02:27.068Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771124547),
('ZPVg1OZCtjwvy8rq4sA0wNllKU0DQrTK', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T07:04:07.876Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"userSessionData\":{\"id\":\"3213213-efgfd-435245\",\"name\":\"Mayank Dobriyal\",\"profile_url\":\"avatar-2\",\"role\":1,\"phone_number\":\"7017935899\",\"wallet_balance\":93820,\"sub_admin\":\"{\\\"id\\\": null, \\\"name\\\": null, \\\"profile_picture\\\": null, \\\"role\\\": null, \\\"phone_number\\\": null}\"}}', 1770966247),
('ZVEDSTF9PSSw8jWBR7VpdRIYRGiW1_AW', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:51:19.405Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770911479),
('zXL2j2BSOlpXKkTJyZtG2-6HH9Ymy-6E', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T03:09:45.561Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771124986),
('_Qsv1kUaT_8yzTgwXp_q1KEWcljEoz7r', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T14:45:50.266Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770907550);

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
  ADD PRIMARY KEY (`session_id`);

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
