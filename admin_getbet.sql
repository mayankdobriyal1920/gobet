-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 16, 2025 at 08:25 AM
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
('132te13-ef65gfd-gffgfgs', 'Neeraj Payal', '9876543210', 'avatar-6', '1234', NULL, '3213213-efgfd-435245', 127121, 1, '2024-12-22 13:43:52', 16750),
('23349-4baeb0f4-d0a546ec', 'krishna', '7830717827', 'avatar-3', NULL, NULL, '324qwe-536uyrt-546jhgj', 534432, 1, '2024-12-26 14:06:58', 34353),
('272199-476b63ff-10f5e15c', 'krishna', '8976543210', 'avatar-3', NULL, NULL, '324qwe-536uyrt-546jhgj', 0, 3, '2024-12-26 14:16:40', 0),
('3213213-efgfd-435245', 'Mayank Dobriyal', '7017935899', 'avatar-2', '1234', NULL, '', 85447, 1, '2024-12-22 13:43:52', 5000),
('324qwe-536uyrt-546jhgj', 'Sumit', '9615150000', 'avatar-4', '1234', NULL, NULL, 194340, 1, '2024-12-22 13:43:52', 0),
('347343-c64c783a-e08ce0c2', 'krishna', '9458320945', 'avatar-3', NULL, NULL, '324qwe-536uyrt-546jhgj', 0, 3, '2024-12-27 16:14:52', 0),
('435324-rtthyfgh-ljkhersf', 'Amit Negi', '7123456780', 'avatar-6', '1234', NULL, '3213213-efgfd-435245', 114000, 3, '2024-12-22 13:43:52', 5000),
('45486yhgf-gfhgfudf-ykhjgj', 'Nirmal Gaur', '8123456780', 'avatar-5', '1234', NULL, '3213213-efgfd-435245', 110000, 3, '2024-12-22 13:43:52', 6000),
('542155-e04d3e2e-7978d1d0', 'krishna', '7830717789', 'avatar-3', NULL, NULL, '324qwe-536uyrt-546jhgj', 0, 3, '2024-12-25 16:18:01', 0),
('672389-775bab30-5a7099a8', 'Krishna bhatti', '7830717727', 'avatar-3', NULL, NULL, '324qwe-536uyrt-546jhgj', 170000, 1, '2024-12-25 13:48:12', 40000),
('errsae92-5435345-gfgfg', 'Manmohan', '9123456780', 'avatar-2', '1234', NULL, '3213213-efgfd-435245', 190000, 2, '2024-12-22 13:43:52', 0);

-- --------------------------------------------------------

--
-- Table structure for table `betting_active_users`
--

CREATE TABLE `betting_active_users` (
  `id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `status` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `betting_active_users`
--

INSERT INTO `betting_active_users` (`id`, `user_id`, `created_at`, `status`) VALUES
('1TF67F4X-8DsWBXNs-O4C1bIpO', '132te13-ef65gfd-gffgfgs', '2025-02-16 06:40:09', 4),
('MFfRtLn7-rfEOZKxT-tjenCJZ8', '324qwe-536uyrt-546jhgj', '2025-02-16 08:17:15', 2),
('VLeXyYZz-kIHKtzJI-dC7IEO8x', '3213213-efgfd-435245', '2025-02-16 06:39:59', 4);

-- --------------------------------------------------------

--
-- Table structure for table `betting_percentage`
--

CREATE TABLE `betting_percentage` (
  `id` varchar(255) NOT NULL,
  `amount` int(11) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `deposit_history_id` varchar(255) NOT NULL,
  `status` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bet_prediction_history`
--

CREATE TABLE `bet_prediction_history` (
  `id` varchar(255) NOT NULL,
  `amount` int(11) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `bet_id` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `option_name` varchar(255) DEFAULT NULL,
  `game_type` varchar(255) DEFAULT NULL,
  `min` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `betting_active_users_id` varchar(255) DEFAULT NULL,
  `game_result_id` varchar(255) NOT NULL,
  `win_status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bet_prediction_history`
--

INSERT INTO `bet_prediction_history` (`id`, `amount`, `user_id`, `bet_id`, `created_at`, `option_name`, `game_type`, `min`, `status`, `betting_active_users_id`, `game_result_id`, `win_status`) VALUES
('5Uq0JZgU-6F7t1cjp-shArNZgm', 1900, '3213213-efgfd-435245', '20250216100010402', '2025-02-16 06:41:01', 'SMALL', 'win_go', 1, 0, 'VLeXyYZz-kIHKtzJI-dC7IEO8x', '4Lc4ozdx-lDnX32eN-jJH7F4Yp', NULL),
('A9CPDBCg-ADLQpb3M-2YoqBhEn', 1900, '132te13-ef65gfd-gffgfgs', '20250216100010402', '2025-02-16 06:41:01', 'BIG', 'win_go', 1, 0, '1TF67F4X-8DsWBXNs-O4C1bIpO', '4Lc4ozdx-lDnX32eN-jJH7F4Yp', NULL),
('g3l8Lxic-DZcntrYY-JXe7b5da', 1150, '3213213-efgfd-435245', '20250216100010394', '2025-02-16 06:33:01', 'SMALL', 'win_go', 1, 0, 'u4xvloCI-iyTas75I-3LqwvgWR', 'R3MCH3T9-ldw4DFxq-6xCB6ZHO', NULL),
('UJXAzCjp-jZz50ADy-i4DmFE4Y', 1150, '132te13-ef65gfd-gffgfgs', '20250216100010394', '2025-02-16 06:33:01', 'BIG', 'win_go', 1, 0, '2PhEYA5L-UEV2Ymr7-Bb3rGEAN', 'R3MCH3T9-ldw4DFxq-6xCB6ZHO', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `deposit_history`
--

CREATE TABLE `deposit_history` (
  `id` varchar(255) NOT NULL,
  `amount` int(11) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `sub_admin_id` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` smallint(6) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `game_result`
--

CREATE TABLE `game_result` (
  `id` varchar(255) NOT NULL,
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
('1', 'win_go', 'BIG', '2025-01-19 07:06:00', '3213213-efgfd-435245', '20250119100010427'),
('2', 'win_go', 'BIG', '2025-01-19 07:11:00', '132te13-ef65gfd-gffgfgs', '20250119100010432'),
('3', 'win_go', 'SMALL', '2025-01-19 07:16:00', '132te13-ef65gfd-gffgfgs', '20250119100010437'),
('3KIbfZmY-fT85gFeM-QQnAEaxR', 'win_go', 'SMALL', '2025-02-16 06:21:01', '132te13-ef65gfd-gffgfgs', '20250216100010382'),
('4Lc4ozdx-lDnX32eN-jJH7F4Yp', 'win_go', 'SMALL', '2025-02-16 06:41:01', '3213213-efgfd-435245', '20250216100010402'),
('QzOjIpa3-zDmw7RPW-xEO2QeEL', 'win_go', NULL, '2025-02-16 05:41:01', NULL, '20250216100010342'),
('R3MCH3T9-ldw4DFxq-6xCB6ZHO', 'win_go', 'BIG', '2025-02-16 06:33:01', '132te13-ef65gfd-gffgfgs', '20250216100010394'),
('yQAzFMlC-nFzOWngQ-1USNEG25', 'win_go', NULL, '2025-02-16 06:17:01', NULL, '20250216100010378');

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
(15, '3213213-efgfd-435245', 718186, '2025-01-25 06:07:10', '3213213-efgfd-435245', NULL),
(16, '3213213-efgfd-435245', 926846, '2025-02-15 11:12:01', '3213213-efgfd-435245', NULL),
(17, '3213213-efgfd-435245', 443085, '2025-02-15 11:12:01', '3213213-efgfd-435245', NULL),
(18, '3213213-efgfd-435245', 656060, '2025-02-15 11:12:01', '3213213-efgfd-435245', NULL),
(19, '3213213-efgfd-435245', 622213, '2025-02-15 11:12:01', '3213213-efgfd-435245', NULL),
(20, '3213213-efgfd-435245', 125994, '2025-02-15 11:12:01', '3213213-efgfd-435245', NULL);

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
('2E3W5EgtoGpwAF2NR9Gg9rO54m2c0Ws0', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T11:19:43.156Z\",\"secure\":false,\"httpOnly\":false,\"path\":\"/\",\"sameSite\":\"None\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771154383),
('2EUm29p4w7N4o5sAjdS34Gbh3yAl6SrY', '{\"cookie\":{\"originalMaxAge\":31535999999,\"expires\":\"2026-02-12T16:57:24.986Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"userSessionData\":{\"id\":\"3213213-efgfd-435245\",\"name\":\"Mayank Dobriyal\",\"profile_url\":\"avatar-2\",\"role\":1,\"phone_number\":\"7017935899\",\"wallet_balance\":93820,\"sub_admin\":\"{\\\"id\\\": null, \\\"name\\\": null, \\\"profile_picture\\\": null, \\\"role\\\": null, \\\"phone_number\\\": null}\"}}', 1770915445),
('2Kbz1Tx7v0z8tEZmDBrwAILwQnkv5br0', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:48:31.568Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1,\"userSessionData\":{\"id\":\"3213213-efgfd-435245\",\"name\":\"Mayank Dobriyal\",\"profile_url\":\"avatar-2\",\"role\":1,\"phone_number\":\"7017935899\",\"wallet_balance\":93820,\"sub_admin\":\"{\\\"id\\\": null, \\\"name\\\": null, \\\"profile_picture\\\": null, \\\"role\\\": null, \\\"phone_number\\\": null}\"}}', 1770911312),
('2ntmFHQGfJqDGhHLaiKIkUZLTPytL7FN', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T06:28:08.622Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"testcookie\":\"test-coolie--------------------test\"}', 1770964089),
('30trFQTmqggwa0xNbPjLSpMiVQ_YR5YU', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T06:23:46.008Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"testcookie\":\"test-coolie--------------------test\"}', 1770963826),
('393JKlWa-a4qvJVleLHh4hkAKbcOwhnO', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T11:06:42.014Z\",\"secure\":true,\"httpOnly\":false,\"path\":\"/\",\"sameSite\":\"None\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771153602),
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
('6yTL_kjtSc8kIey0cx_kBdUuA6vqXoEX', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T11:24:58.223Z\",\"secure\":true,\"httpOnly\":false,\"path\":\"/\",\"sameSite\":\"None\"},\"userSessionData\":{\"id\":\"3213213-efgfd-435245\",\"name\":\"Mayank Dobriyal 12\",\"profile_url\":\"avatar-2\",\"role\":1,\"phone_number\":\"7017935899\",\"wallet_balance\":81497,\"sub_admin\":\"{\\\"id\\\": null, \\\"name\\\": null, \\\"profile_picture\\\": null, \\\"role\\\": null, \\\"phone_number\\\": null}\"}}', 1771154698),
('716YJym-b8bzICHLe5Dm1Ube0833W2n9', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T06:32:00.238Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"testcookie\":\"test-coolie--------------------test\"}', 1770964320),
('7BsriCMNdnLNNCRxVo2Gjb4x5AeIapVy', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:52:35.967Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770911556),
('7dZQRS2Utx_uDd3QGCcDw-0L5n9YV8bV', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T07:06:21.937Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"testcookie\":\"test-coolie--------------------test\"}', 1770966382),
('7HHuiKc5FKZhy5FGJNkqBiwrw3QIfRMR', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T16:53:42.658Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', 1770915223),
('8Tn5ZfrgtwemB0ZVK98sYBldZE5JBY2r', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T11:19:43.158Z\",\"secure\":false,\"httpOnly\":false,\"path\":\"/\",\"sameSite\":\"None\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771154383),
('8YI1FQ8V2Bf9elyQhboInXE17I0KGC58', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T11:25:58.774Z\",\"secure\":true,\"httpOnly\":false,\"path\":\"/\",\"sameSite\":\"None\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771154759),
('9h0zPVPzgpxL5evfY3qc71jzH7bHwtD1', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:52:41.345Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770911561),
('9KFrfIkUf2k9b8nHIVfZYaVoK269iLGy', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T07:09:14.258Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userSessionData\":{\"id\":\"3213213-efgfd-435245\",\"name\":\"Mayank Dobriyal\",\"profile_url\":\"avatar-2\",\"role\":1,\"phone_number\":\"7017935899\",\"wallet_balance\":93820,\"sub_admin\":\"{\\\"id\\\": null, \\\"name\\\": null, \\\"profile_picture\\\": null, \\\"role\\\": null, \\\"phone_number\\\": null}\"}}', 1770966554),
('A9dfYsyLgkJBv4hC8fsbcPdy5g1PISJC', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T06:28:08.625Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"testcookie\":\"test-coolie--------------------test\"}', 1770964089),
('aajR22TMmNw2DZaoYCSCi3-jZjCpVmuW', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T11:29:27.545Z\",\"secure\":false,\"httpOnly\":false,\"path\":\"/\",\"sameSite\":\"None\"},\"userSessionData\":{\"id\":\"3213213-efgfd-435245\",\"name\":\"Mayank Dobriyal 12\",\"profile_url\":\"avatar-2\",\"role\":1,\"phone_number\":\"7017935899\",\"wallet_balance\":81497,\"sub_admin\":\"{\\\"id\\\": null, \\\"name\\\": null, \\\"profile_picture\\\": null, \\\"role\\\": null, \\\"phone_number\\\": null}\"}}', 1771154968),
('AjgF59EBwgrlMswyYsq4kzBXOGjMCrrj', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:51:19.410Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770911479),
('AMvNzRIKKW2oyPkiM-fT1abXbrBZwOhR', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T16:50:57.656Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"}}', 1770915058),
('AYie321tR3_LURBXyHbJ_hIvhPl-GwWn', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T11:06:16.341Z\",\"secure\":true,\"httpOnly\":false,\"path\":\"/\",\"sameSite\":\"None\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771153576),
('bbBS9TidMqw8h2U_1_av2-AB_E7bE22a', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:48:04.528Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770911285),
('BjHpFygb_ltXiKbcsCj0NLTNmiJ-BUcV', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T11:05:29.990Z\",\"secure\":false,\"httpOnly\":false,\"path\":\"/\",\"sameSite\":\"None\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771153530),
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
('DRVx6ye8gfDbmY6RLoG8y4lhrA4tsIDu', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T12:52:59.615Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"None\"},\"userSessionData\":{\"id\":\"3213213-efgfd-435245\",\"name\":\"Mayank Dobriyal 12\",\"profile_url\":\"avatar-2\",\"role\":1,\"phone_number\":\"7017935899\",\"wallet_balance\":81497,\"sub_admin\":\"{\\\"id\\\": null, \\\"name\\\": null, \\\"profile_picture\\\": null, \\\"role\\\": null, \\\"phone_number\\\": null}\"}}', 1771159980),
('DYQc007NdbEIJlyjoARpF8MPtbgtDTN3', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T11:24:13.687Z\",\"secure\":true,\"httpOnly\":false,\"path\":\"/\",\"sameSite\":\"None\"},\"userSessionData\":{\"id\":\"3213213-efgfd-435245\",\"name\":\"Mayank Dobriyal 12\",\"profile_url\":\"avatar-2\",\"role\":1,\"phone_number\":\"7017935899\",\"wallet_balance\":81497,\"sub_admin\":\"{\\\"id\\\": null, \\\"name\\\": null, \\\"profile_picture\\\": null, \\\"role\\\": null, \\\"phone_number\\\": null}\"}}', 1771154654),
('DZ9QwyDwrffbLto-pCTnudlBTTClL3ii', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:51:19.408Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770911479),
('D_OaguB9Vn3McLCOXDvpz2zzwKhuoKbB', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:33:47.314Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770910427),
('e51uRu9_BKfaDHPYFp78bP545uEFajn7', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T16:56:41.877Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"}}', 1770915402),
('E8Q5aoHTz5ubE55QRhyZwk8ihlUen1jk', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:48:31.741Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770911312),
('EH_yDMKoyxLkEp4PCmYHoCc3AXZhvzby', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T11:06:01.769Z\",\"secure\":false,\"httpOnly\":false,\"path\":\"/\",\"sameSite\":\"Lax\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771153562),
('EjqodxLDAz3pEaxK8MpNlm_qYm4F2Kaf', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T02:55:07.972Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771124108),
('EkSLfN6_kLVvWGiDZntUUlrmWmz9aJuL', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T11:37:31.693Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"Lax\"},\"userSessionData\":{\"id\":\"3213213-efgfd-435245\",\"name\":\"Mayank Dobriyal 12\",\"profile_url\":\"avatar-2\",\"role\":1,\"phone_number\":\"7017935899\",\"wallet_balance\":81497,\"sub_admin\":\"{\\\"id\\\": null, \\\"name\\\": null, \\\"profile_picture\\\": null, \\\"role\\\": null, \\\"phone_number\\\": null}\"}}', 1771155452),
('elvO6oN7h6PWZGhoJ1ilFFG-XacCIWtz', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T03:26:09.721Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771125970),
('EtSpXbAUiWqbsjN4sLAGNpmStluvYdPo', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T12:50:48.092Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"Lax\"},\"userSessionData\":{\"id\":\"3213213-efgfd-435245\",\"name\":\"Mayank Dobriyal 12\",\"profile_url\":\"avatar-2\",\"role\":1,\"phone_number\":\"7017935899\",\"wallet_balance\":81497,\"sub_admin\":\"{\\\"id\\\": null, \\\"name\\\": null, \\\"profile_picture\\\": null, \\\"role\\\": null, \\\"phone_number\\\": null}\"}}', 1771159848),
('euxmWj-AU-XUgbm6ejcu8DIo8t1aitWC', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:50:55.349Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770911455),
('fIAg42QJaDnWspMrs6__FRHrFgnEBTdg', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:50:55.345Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770911455),
('fIPuPE5N7IiZWPedJ4Vtrpvc1jLwDSmx', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T14:46:21.835Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770907582),
('FM3NhfYo4HsqjSrRK6WhvOexlSiimx3j', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T16:57:25.167Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"}}', 1770915445),
('FnIvMh6yoSsx9A3izcm1O2UmFM7NqpkH', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T03:27:03.445Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771126023),
('FTbrhA_TVsphERF1vnu8kELLceVWk8DI', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T16:52:35.619Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', 1770915156),
('ftswXS5B9VpuR7Oc4Pi_l6gf6hFYGGsi', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T06:39:32.408Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"}}', 1770964772),
('fUx1V5ujzbkY4LQi75z0KQA_kKPi_wE-', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T11:06:16.345Z\",\"secure\":true,\"httpOnly\":false,\"path\":\"/\",\"sameSite\":\"None\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771153576),
('gazNgrn2AvmPaVw5p7u9zTatbsXwAN8p', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T11:03:48.891Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771153429),
('gK9xw-lrYCHfKg01vSiFVP5pKF2K8-zF', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T06:32:21.142Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"testcookie\":\"test-coolie--------------------test\"}', 1770964341),
('GL4e1NCNSJ2M8ftodJqcLCxz0ZqV2x1s', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T06:39:21.579Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"}}', 1770964762),
('Gp8reo3Hkpy0w0Cdsc3o-phadZys8QSr', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T16:53:42.666Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', 1770915223),
('gu4iSXEjkhZGV0kZRFbcinu7EbtNyUkR', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T06:28:49.652Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"testcookie\":\"test-coolie--------------------test\"}', 1770964130),
('hCO3s_7ZnZY0A8197d81IKZzbVbvPcGM', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T11:22:17.570Z\",\"secure\":true,\"httpOnly\":false,\"path\":\"/\",\"sameSite\":\"None\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771154538),
('hOh_gsfPDIRZpWoYIwkqX6WU29BKAbrP', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T12:52:07.350Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"None\"},\"userSessionData\":{\"id\":\"3213213-efgfd-435245\",\"name\":\"Mayank Dobriyal 12\",\"profile_url\":\"avatar-2\",\"role\":1,\"phone_number\":\"7017935899\",\"wallet_balance\":81497,\"sub_admin\":\"{\\\"id\\\": null, \\\"name\\\": null, \\\"profile_picture\\\": null, \\\"role\\\": null, \\\"phone_number\\\": null}\"}}', 1771159927),
('icWRDmuo8rAze_Z-D2JT9PUsG9coUCWw', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T16:57:07.806Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"}}', 1770915428),
('iE4Jpw0KYLAKYpuWjCx7fkBCf51EzNo0', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T11:30:49.175Z\",\"secure\":false,\"httpOnly\":false,\"path\":\"/\",\"sameSite\":\"None\"},\"userSessionData\":{\"id\":\"3213213-efgfd-435245\",\"name\":\"Mayank Dobriyal 12\",\"profile_url\":\"avatar-2\",\"role\":1,\"phone_number\":\"7017935899\",\"wallet_balance\":81497,\"sub_admin\":\"{\\\"id\\\": null, \\\"name\\\": null, \\\"profile_picture\\\": null, \\\"role\\\": null, \\\"phone_number\\\": null}\"}}', 1771155049),
('ignAC8h8fmS5RdBqv_AjHyl08fw8KDSe', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:51:02.346Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770911462),
('igrSYHZQe0caaggT0qwKyYGKH2VoCCAt', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T12:33:36.309Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"None\"},\"userSessionData\":{\"id\":\"3213213-efgfd-435245\",\"name\":\"Mayank Dobriyal 12\",\"profile_url\":\"avatar-2\",\"role\":1,\"phone_number\":\"7017935899\",\"wallet_balance\":81497,\"sub_admin\":\"{\\\"id\\\": null, \\\"name\\\": null, \\\"profile_picture\\\": null, \\\"role\\\": null, \\\"phone_number\\\": null}\"}}', 1771158816),
('ILOM8V0_8G8lczhZIr2KpuSr4EGQ6mG2', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T11:07:26.855Z\",\"secure\":true,\"httpOnly\":false,\"path\":\"/\",\"sameSite\":\"None\"},\"userSessionData\":{\"id\":\"3213213-efgfd-435245\",\"name\":\"Mayank Dobriyal\",\"profile_url\":\"avatar-2\",\"role\":1,\"phone_number\":\"7017935899\",\"wallet_balance\":93820,\"sub_admin\":\"{\\\"id\\\": null, \\\"name\\\": null, \\\"profile_picture\\\": null, \\\"role\\\": null, \\\"phone_number\\\": null}\"}}', 1771153647),
('IMwkqyAJ4CjVOOJDTMsTptu1atz11i4l', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T06:20:01.255Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"testcookie\":\"test-coolie--------------------test\"}', 1770963601),
('iNfJKf6pCf9Z3KelKq44Ot2NpIOpDJ3w', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T11:26:52.578Z\",\"secure\":true,\"httpOnly\":false,\"path\":\"/\",\"sameSite\":\"Lax\"},\"userSessionData\":{\"id\":\"3213213-efgfd-435245\",\"name\":\"Mayank Dobriyal 12\",\"profile_url\":\"avatar-2\",\"role\":1,\"phone_number\":\"7017935899\",\"wallet_balance\":81497,\"sub_admin\":\"{\\\"id\\\": null, \\\"name\\\": null, \\\"profile_picture\\\": null, \\\"role\\\": null, \\\"phone_number\\\": null}\"}}', 1771154813),
('Iz-YT0zxH6KLlcgIscIjWJbKl93VAWss', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T03:26:09.717Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771125970),
('J8Bk96G7n99gA6szhG22mUhb13V9zkbw', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T11:05:44.173Z\",\"secure\":false,\"httpOnly\":false,\"path\":\"/\",\"sameSite\":\"None\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771153544),
('jBglQa30FpQo1Y0WyCNmyVwoijlumgoV', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T03:18:19.799Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771125500),
('JC7L1S68KvyNqmDe4ftfp3Ouj1RSzqFi', '{\"cookie\":{\"originalMaxAge\":31535999999,\"expires\":\"2026-02-16T06:51:17.920Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"userSessionData\":{\"id\":\"3213213-efgfd-435245\",\"name\":\"Mayank Dobriyal 12\",\"profile_url\":\"avatar-2\",\"role\":1,\"phone_number\":\"7017935899\",\"wallet_balance\":81497,\"sub_admin\":\"{\\\"id\\\": null, \\\"name\\\": null, \\\"profile_picture\\\": null, \\\"role\\\": null, \\\"phone_number\\\": null}\"}}', 1771230307),
('JFfeAJY3Jt6ymCkOfy93LXvQC5gOLkh_', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T03:05:00.159Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771124700),
('JKGHmAWkmNlhQpUt1YLmIwbe3kle6R12', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:40:48.697Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770910849),
('k9C9k77BveouwgTJzxEPl4JdAwVxlQQH', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T06:10:44.129Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"testcookie\":\"test-coolie--------------------test\"}', 1770963044),
('kaQFFCs1xqAoCI63f_ZDlr1qSnE6w1ub', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T11:22:38.389Z\",\"secure\":true,\"httpOnly\":false,\"path\":\"/\",\"sameSite\":\"None\"},\"userSessionData\":{\"id\":\"3213213-efgfd-435245\",\"name\":\"Mayank Dobriyal 12\",\"profile_url\":\"avatar-2\",\"role\":1,\"phone_number\":\"7017935899\",\"wallet_balance\":81497,\"sub_admin\":\"{\\\"id\\\": null, \\\"name\\\": null, \\\"profile_picture\\\": null, \\\"role\\\": null, \\\"phone_number\\\": null}\"}}', 1771154558),
('kbPJhsaOtJ3bQtriDc4Yqx3Jle6ot1SD', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T11:24:26.430Z\",\"secure\":true,\"httpOnly\":false,\"path\":\"/\",\"sameSite\":\"None\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771154666),
('kJmZyNfm4qeOHOwtXmmG-z1KBUmuu9bZ', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T16:57:25.165Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"}}', 1770915445),
('kMEi6IbtUDj-nNG5K03RxVJvsRzOevTK', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:52:43.421Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770911563),
('KpJ_xLZwYp5X4pNTTGevBkIw3nNIb57k', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T11:06:01.776Z\",\"secure\":false,\"httpOnly\":false,\"path\":\"/\",\"sameSite\":\"Lax\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771153562),
('KxNquypSTAH4eog_9RVXYQ-urz3DPV9N', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T11:08:18.257Z\",\"secure\":false,\"httpOnly\":false,\"path\":\"/\",\"sameSite\":\"Lax\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771153698),
('KxUTn8DB4lIUsjSrMe6zTai2xGe6oXaW', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T06:32:00.240Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"testcookie\":\"test-coolie--------------------test\"}', 1770964320),
('KXuv3BAQ20Dfgsqf6Wmub1QTpx3CurDK', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:40:48.693Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770910849),
('lBrLUF32pKJyNqkjRksuSMbYJ9IxHh3e', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-16T05:15:00.782Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"userSessionData\":{\"id\":\"132te13-ef65gfd-gffgfgs\",\"name\":\"Neeraj Payal\",\"profile_url\":\"avatar-6\",\"role\":3,\"phone_number\":\"9876543210\",\"wallet_balance\":127121,\"sub_admin\":\"{\\\"id\\\": \\\"3213213-efgfd-435245\\\", \\\"name\\\": \\\"Mayank Dobriyal 12\\\", \\\"profile_picture\\\": \\\"avatar-2\\\", \\\"role\\\": 1, \\\"phone_number\\\": \\\"7017935899\\\"}\"}}', 1771225498),
('lNiSjWkYQv8vHVEX6oljefgiQwPMA2O7', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T16:56:41.873Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"}}', 1770915402),
('lOFHq5bFX3Fiu46QrjRhf9QAUybBbCDS', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T16:08:34.092Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userSessionData\":{\"id\":\"3213213-efgfd-435245\",\"name\":\"Mayank Dobriyal\",\"profile_url\":\"avatar-2\",\"role\":1,\"phone_number\":\"7017935899\",\"wallet_balance\":93820,\"sub_admin\":\"{\\\"id\\\": null, \\\"name\\\": null, \\\"profile_picture\\\": null, \\\"role\\\": null, \\\"phone_number\\\": null}\"}}', 1770912514),
('LSgXuTBj7CIDoZ4Xe4lBrm3lgwRinog7', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T06:07:06.451Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"}}', 1770962826),
('lSHQbQJjsGvBoIOy9ljjcaC9-sp_ylNn', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T03:11:56.809Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771125117),
('LVHJpDQzs1iTySY2aQE4ip08q0JP-WQd', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T03:27:03.439Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771126023),
('MbPzRinB9e57fr597vcM7FywT8ez5gtH', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T11:23:56.041Z\",\"secure\":true,\"httpOnly\":false,\"path\":\"/\",\"sameSite\":\"None\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771154636),
('MimBzkQEoM36qcGhvvCS2buiaMNJNzDR', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T11:27:30.210Z\",\"secure\":false,\"httpOnly\":false,\"path\":\"/\",\"sameSite\":\"Lax\"},\"userSessionData\":{\"id\":\"3213213-efgfd-435245\",\"name\":\"Mayank Dobriyal 12\",\"profile_url\":\"avatar-2\",\"role\":1,\"phone_number\":\"7017935899\",\"wallet_balance\":81497,\"sub_admin\":\"{\\\"id\\\": null, \\\"name\\\": null, \\\"profile_picture\\\": null, \\\"role\\\": null, \\\"phone_number\\\": null}\"}}', 1771154850),
('mMddRCc89x4X1HIXOs1EStthtkfZlmlE', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T03:16:41.885Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771125402),
('MyEt1AZf5pJFgKiqGdrSr_6bF8cazP_v', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T14:46:21.804Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770907582),
('N1oSP_eTRzcwEq5TzbdBT4r0bqZU1lyr', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T11:20:07.002Z\",\"secure\":false,\"httpOnly\":false,\"path\":\"/\",\"sameSite\":\"None\"},\"userSessionData\":{\"id\":\"3213213-efgfd-435245\",\"name\":\"Mayank Dobriyal 12\",\"profile_url\":\"avatar-2\",\"role\":1,\"phone_number\":\"7017935899\",\"wallet_balance\":81497,\"sub_admin\":\"{\\\"id\\\": null, \\\"name\\\": null, \\\"profile_picture\\\": null, \\\"role\\\": null, \\\"phone_number\\\": null}\"}}', 1771154407),
('nErMn0LaaxyZ9tQVgpaJX6CbwlqzSXTr', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T14:46:21.810Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770907582),
('nKyfCuQ8brzzThEHrR_5jEO5Bd2BgZOt', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T06:23:46.009Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"testcookie\":\"test-coolie--------------------test\"}', 1770963826),
('nSGQJTUAXt22avqry8HmAraEA2yYccn5', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T16:47:57.032Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"userSessionData\":{\"id\":\"3213213-efgfd-435245\",\"name\":\"Mayank Dobriyal\",\"profile_url\":\"avatar-2\",\"role\":1,\"phone_number\":\"7017935899\",\"wallet_balance\":93820,\"sub_admin\":\"{\\\"id\\\": null, \\\"name\\\": null, \\\"profile_picture\\\": null, \\\"role\\\": null, \\\"phone_number\\\": null}\"}}', 1770914877),
('nUI9wVJsOG730NBDEAQlgylWFGPMavxY', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T06:32:21.139Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"testcookie\":\"test-coolie--------------------test\"}', 1770964341),
('NXdoPxoqx-5WntuwVqd7BUpDjy_jkH6T', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T06:24:45.132Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"testcookie\":\"test-coolie--------------------test\"}', 1770963885),
('o0AOdvLtCAD4J9mBNKIcaLr4Q5s9nC09', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T07:09:01.720Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"testcookie\":\"test-coolie--------------------test\"}', 1770966542),
('o9wD46ziovkPeUNPZVxB1rEy4bGfNV0o', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:48:31.751Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770911312),
('oM7TcpIaPWX29z1_OquvJhxmzX6hpSvL', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T06:39:32.406Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"}}', 1770964772),
('oYDkdGb2QthOgYE8A4tXFW6kbaKzpLXg', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T03:04:57.679Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771124698),
('P1vJcnTZwisRPCOBHXryNy8L12tH8Izx', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T11:08:18.252Z\",\"secure\":false,\"httpOnly\":false,\"path\":\"/\",\"sameSite\":\"Lax\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771153698),
('PGRGGuECucfx0bjB8cfX9T7j5C07e4Qz', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T06:01:37.363Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"}}', 1770962497),
('pJrXjSLHL8Y5yMVjzuTsEypdE5e9s1pM', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T11:05:29.986Z\",\"secure\":false,\"httpOnly\":false,\"path\":\"/\",\"sameSite\":\"None\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771153530),
('PKeCF2wSJQod7KPjQDNcPUd8OPgn-6zc', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:48:13.742Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770911294),
('PNwVsWOKjqs9qhS0b4qjh9AADCh15UfO', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T13:40:07.378Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"None\"},\"userSessionData\":{\"id\":\"3213213-efgfd-435245\",\"name\":\"Mayank Dobriyal 12\",\"profile_url\":\"avatar-2\",\"role\":1,\"phone_number\":\"7017935899\",\"wallet_balance\":81497,\"sub_admin\":\"{\\\"id\\\": null, \\\"name\\\": null, \\\"profile_picture\\\": null, \\\"role\\\": null, \\\"phone_number\\\": null}\"}}', 1771224122),
('pvMVh_b7oNBZeomxqF0TvEXyRYCSLESo', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:29:15.184Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770910155),
('R7Tmdu6cgfaewgeRnXXPXY8gzKt6j6Ag', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:48:31.745Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770911312),
('r7vd72jkuyF1YCaJSBprZ4L0vbecUx7n', '{\"cookie\":{\"originalMaxAge\":31535999999,\"expires\":\"2026-02-15T03:16:41.880Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771125402),
('Rb-2vjV_LQ_hdx1OZ7znK1KHaXYZIppc', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T16:57:25.157Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"}}', 1770915445),
('RH5WYykR13wsKhvu9MwXu6qv2BS7ReHF', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T02:55:07.966Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771124108),
('rik5Tpo-y3Z2mZEMsHqXAIFzALbO60KT', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T11:06:42.016Z\",\"secure\":true,\"httpOnly\":false,\"path\":\"/\",\"sameSite\":\"None\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771153602),
('rJcZxU0pdS3UrY2sxPh1UJQrvXeO__Rm', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T14:45:50.263Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770907550),
('rY_pNkZBFNR2dSYJUmEIc_xRaQ6PFAk9', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T13:30:52.165Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"None\"},\"userSessionData\":{\"id\":\"3213213-efgfd-435245\",\"name\":\"Mayank Dobriyal 12\",\"profile_url\":\"avatar-2\",\"role\":1,\"phone_number\":\"7017935899\",\"wallet_balance\":81497,\"sub_admin\":\"{\\\"id\\\": null, \\\"name\\\": null, \\\"profile_picture\\\": null, \\\"role\\\": null, \\\"phone_number\\\": null}\"}}', 1771162252),
('rZe5Pd5KWeEEI3KVgqLpeaSArbX6Ckqq', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:33:18.926Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770910399),
('S-0BB62KhAtdaSSj33oTt2Q_GOwTikYx', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T03:18:19.804Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771125500),
('slDvp21-CW51dYP-SR6iM3V1yF-WK84_', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T11:22:17.566Z\",\"secure\":true,\"httpOnly\":false,\"path\":\"/\",\"sameSite\":\"None\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771154538),
('sPu1q2k3omuBf84Tq3gbGk8546XRN0-F', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:33:47.311Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770910427),
('srzWjHWnHJfK65OXUHWCh0uAhCepXkyq', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T03:04:07.241Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771124647),
('sZ0n2W26-35b2ovTX-aiRGmp6AShDE1i', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-16T08:14:43.691Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"userSessionData\":{\"id\":\"324qwe-536uyrt-546jhgj\",\"name\":\"Sumit\",\"profile_url\":\"avatar-4\",\"role\":1,\"phone_number\":\"9615150000\",\"wallet_balance\":155340,\"sub_admin\":\"{\\\"id\\\": null, \\\"name\\\": null, \\\"profile_picture\\\": null, \\\"role\\\": null, \\\"phone_number\\\": null}\"}}', 1771230184),
('TcFPq9td9Rx5KWd7njVv8Tjyll0nqjK9', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T14:46:21.616Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1,\"userSessionData\":{\"id\":\"3213213-efgfd-435245\",\"name\":\"Mayank Dobriyal\",\"profile_url\":\"avatar-2\",\"role\":1,\"phone_number\":\"7017935899\",\"wallet_balance\":93820,\"sub_admin\":\"{\\\"id\\\": null, \\\"name\\\": null, \\\"profile_picture\\\": null, \\\"role\\\": null, \\\"phone_number\\\": null}\"}}', 1770907581),
('TCz-Mcp_kDDKp9KiP_AEYZ_7hxPoFtdF', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:51:19.412Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770911479),
('TMstDGJL5V3WkndnLgJPSQcVdlIOwzx9', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:33:47.142Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1,\"userSessionData\":{\"id\":\"3213213-efgfd-435245\",\"name\":\"Mayank Dobriyal\",\"profile_url\":\"avatar-2\",\"role\":1,\"phone_number\":\"7017935899\",\"wallet_balance\":93820,\"sub_admin\":\"{\\\"id\\\": null, \\\"name\\\": null, \\\"profile_picture\\\": null, \\\"role\\\": null, \\\"phone_number\\\": null}\"}}', 1770910427),
('tXljMg79TYTDp4v__C22s6qTs4tzrVDH', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T06:39:32.403Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"}}', 1770964772),
('tznYBUilHffBkeNc-T0qjDVWKviF_gV8', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:33:47.306Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770910427),
('u2ytWRa1TywLYhrf0-2UziBzl-IA49iv', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:40:30.235Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770910830),
('u4PxTs-cEYD2WP1UynFhBt0fmjsQayO3', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T16:15:26.415Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"None\"},\"userSessionData\":{\"id\":\"3213213-efgfd-435245\",\"name\":\"Mayank Dobriyal\",\"profile_url\":\"avatar-2\",\"role\":1,\"phone_number\":\"7017935899\",\"wallet_balance\":93820,\"sub_admin\":\"{\\\"id\\\": null, \\\"name\\\": null, \\\"profile_picture\\\": null, \\\"role\\\": null, \\\"phone_number\\\": null}\"}}', 1770912926),
('u8lgfAlLpPPkt5RSuZd88xIuyvT9xFmY', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T12:37:52.659Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"Lax\"},\"userSessionData\":{\"id\":\"3213213-efgfd-435245\",\"name\":\"Mayank Dobriyal 12\",\"profile_url\":\"avatar-2\",\"role\":1,\"phone_number\":\"7017935899\",\"wallet_balance\":81497,\"sub_admin\":\"{\\\"id\\\": null, \\\"name\\\": null, \\\"profile_picture\\\": null, \\\"role\\\": null, \\\"phone_number\\\": null}\"}}', 1771159073),
('UaltIbK32MamnunBDmI7GKxef1dgiEjb', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T06:07:06.455Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"}}', 1770962826),
('uL2HOueaBo07aQjT5-hWqSLXp32qx3mz', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T11:23:08.231Z\",\"secure\":true,\"httpOnly\":false,\"path\":\"/\",\"sameSite\":\"None\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771154588),
('uPskdrQ2E3UAoVnLfW2yItQKDCkBo8MK', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T14:35:55.891Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"userSessionData\":{\"id\":\"3213213-efgfd-435245\",\"name\":\"Mayank Dobriyal\",\"profile_url\":\"avatar-2\",\"role\":1,\"phone_number\":\"7017935899\",\"wallet_balance\":93820,\"sub_admin\":\"{\\\"id\\\": null, \\\"name\\\": null, \\\"profile_picture\\\": null, \\\"role\\\": null, \\\"phone_number\\\": null}\"}}', 1770906956),
('uwgPE8x7JuW6aBwkGPXFL5wMksYLH6HR', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T16:57:25.162Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"}}', 1770915445),
('uXGsGk74Nz-DN8m5cQ307ICpSvhcMauD', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T16:11:02.289Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userSessionData\":{\"id\":\"3213213-efgfd-435245\",\"name\":\"Mayank Dobriyal\",\"profile_url\":\"avatar-2\",\"role\":1,\"phone_number\":\"7017935899\",\"wallet_balance\":93820,\"sub_admin\":\"{\\\"id\\\": null, \\\"name\\\": null, \\\"profile_picture\\\": null, \\\"role\\\": null, \\\"phone_number\\\": null}\"}}', 1770912662),
('v6G5VtVOgkLWyxZoaNhRf2zwfHJrmOse', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T03:02:27.072Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771124547),
('VJrxQOws5oWuHH4XkJUc4w-20XtwUDrD', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:54:15.804Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770911656),
('vUiYlHaZ7sNaR265-tKmGvdYsoeWHOwc', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T02:51:39.042Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771123899),
('VwmiknbTXafqY-t5ia2RixDTYS3CGdN2', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:33:38.174Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770910418),
('W6ozbz8OEkHp7V1przG0BxJPaZ3Mkv1t', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T11:05:44.176Z\",\"secure\":false,\"httpOnly\":false,\"path\":\"/\",\"sameSite\":\"None\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771153544),
('Wf5ty20Lt4o1fUgamVidRvkRzfPhhU6e', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:40:48.694Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770910849),
('WgeAQl-S3i3SdIFgXTWhk1lWx5UnFii-', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T03:11:56.807Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771125117),
('Wpfg34kLVlUiWTkAZQqS4f7zLcErs0WX', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:54:23.397Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770911663);
INSERT INTO `sessions` (`session_id`, `data`, `expires`) VALUES
('WYyVQiHTsB0z1Xy5x36VBJgruQ3qpTqo', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T07:06:21.932Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"testcookie\":\"test-coolie--------------------test\"}', 1770966382),
('x8ujLrp9LoSBGnys4JXWXX4M6VSDg22t', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T03:09:45.557Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771124986),
('xCanUVcBfs06UZnutAA4P0PnFMKvVobH', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T16:52:35.615Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', 1770915156),
('XChbD8WJ0CpqQOi3OtqPwzrBl8cDrApu', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:40:38.111Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770910838),
('xEWz0lGDY-Zdqx1iFlbxOsKo5O8WRZA9', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T11:03:48.893Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771153429),
('Xs3uS4zZJUpPtizVXmMCEDb4vhtFzVAv', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T11:23:08.227Z\",\"secure\":true,\"httpOnly\":false,\"path\":\"/\",\"sameSite\":\"None\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771154588),
('xxNMmJd4saV0dRQ4nneI7d2pPG8TyAvI', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T11:44:16.835Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"userSessionData\":{\"id\":\"3213213-efgfd-435245\",\"name\":\"Mayank Dobriyal 12\",\"profile_url\":\"avatar-2\",\"role\":1,\"phone_number\":\"7017935899\",\"wallet_balance\":81497,\"sub_admin\":\"{\\\"id\\\": null, \\\"name\\\": null, \\\"profile_picture\\\": null, \\\"role\\\": null, \\\"phone_number\\\": null}\"}}', 1771155857),
('yztZCJxjqEG5uklud-9yxiWd_sAvDBAe', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T06:20:01.258Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"testcookie\":\"test-coolie--------------------test\"}', 1770963601),
('z4H3J3cvpO46jVx_dnybJ5BEnxH765rw', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T03:02:27.068Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771124547),
('ZNp5L3p1VWgJQ5_5JOiAEAM8Iq4uVZX1', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T13:32:53.125Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"None\"},\"userSessionData\":{\"id\":\"3213213-efgfd-435245\",\"name\":\"Mayank Dobriyal 12\",\"profile_url\":\"avatar-2\",\"role\":1,\"phone_number\":\"7017935899\",\"wallet_balance\":81497,\"sub_admin\":\"{\\\"id\\\": null, \\\"name\\\": null, \\\"profile_picture\\\": null, \\\"role\\\": null, \\\"phone_number\\\": null}\"}}', 1771162373),
('ZPVg1OZCtjwvy8rq4sA0wNllKU0DQrTK', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-13T07:04:07.876Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"userSessionData\":{\"id\":\"3213213-efgfd-435245\",\"name\":\"Mayank Dobriyal\",\"profile_url\":\"avatar-2\",\"role\":1,\"phone_number\":\"7017935899\",\"wallet_balance\":93820,\"sub_admin\":\"{\\\"id\\\": null, \\\"name\\\": null, \\\"profile_picture\\\": null, \\\"role\\\": null, \\\"phone_number\\\": null}\"}}', 1770966247),
('ZVEDSTF9PSSw8jWBR7VpdRIYRGiW1_AW', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T15:51:19.405Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770911479),
('zXL2j2BSOlpXKkTJyZtG2-6HH9Ymy-6E', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-15T03:09:45.561Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"testcookie\":\"test-coolie--------------------test\"}', 1771124986),
('_Qsv1kUaT_8yzTgwXp_q1KEWcljEoz7r', '{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-02-12T14:45:50.266Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"views\":1}', 1770907550);

-- --------------------------------------------------------

--
-- Table structure for table `user_transaction_history`
--

CREATE TABLE `user_transaction_history` (
  `id` varchar(255) NOT NULL,
  `amount` int(11) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_transaction_history`
--

INSERT INTO `user_transaction_history` (`id`, `amount`, `user_id`, `type`, `created_at`) VALUES
('1', 10, '3213213-efgfd-435245', 'game_percentage_deduct', '2025-01-04 08:15:47'),
('10', 700, '3213213-efgfd-435245', 'game_play_deduct', '2025-01-05 08:50:22'),
('11', 700, '132te13-ef65gfd-gffgfgs', 'game_play_deduct', '2025-01-05 08:50:22'),
('12', 450, '3213213-efgfd-435245', 'game_play_deduct', '2025-01-05 09:38:40'),
('13', 450, '132te13-ef65gfd-gffgfgs', 'game_play_deduct', '2025-01-05 09:38:40'),
('14', 400, '3213213-efgfd-435245', 'game_play_deduct', '2025-01-05 09:45:05'),
('15', 400, '132te13-ef65gfd-gffgfgs', 'game_play_deduct', '2025-01-05 09:45:05'),
('16', 1250, '3213213-efgfd-435245', 'game_play_deduct', '2025-01-05 10:01:22'),
('17', 1250, '132te13-ef65gfd-gffgfgs', 'game_play_deduct', '2025-01-05 10:01:22'),
('18', 4250, '3213213-efgfd-435245', 'game_play_deduct', '2025-01-05 10:17:00'),
('19', 4250, '132te13-ef65gfd-gffgfgs', 'game_play_deduct', '2025-01-05 10:17:00'),
('2', 550, '3213213-efgfd-435245', 'game_play_deduct', '2025-01-05 05:44:26'),
('20', 450, '3213213-efgfd-435245', 'game_play_deduct', '2025-01-05 10:25:00'),
('21', 450, '132te13-ef65gfd-gffgfgs', 'game_play_deduct', '2025-01-05 10:25:00'),
('22', 200, '132te13-ef65gfd-gffgfgs', 'game_play_deduct', '2025-01-05 10:34:00'),
('23', 200, '3213213-efgfd-435245', 'game_play_deduct', '2025-01-05 10:34:00'),
('24', 13, '672389-775bab30-5a7099a8', 'wallet_to_game_wallet_transfer', '2025-01-11 06:26:22'),
('25', 0, '672389-775bab30-5a7099a8', 'game_percentage_deduct', '2025-01-11 06:26:22'),
('26', 10, '672389-775bab30-5a7099a8', 'wallet_to_game_wallet_transfer', '2025-01-11 06:27:41'),
('27', 0, '672389-775bab30-5a7099a8', 'game_percentage_deduct', '2025-01-11 06:27:42'),
('28', 5, '672389-775bab30-5a7099a8', 'wallet_to_game_wallet_transfer', '2025-01-11 06:31:43'),
('29', 0, '672389-775bab30-5a7099a8', 'game_percentage_deduct', '2025-01-11 06:31:44'),
('3', 550, '132te13-ef65gfd-gffgfgs', 'game_play_deduct', '2025-01-05 05:44:26'),
('30', 10, '672389-775bab30-5a7099a8', 'wallet_to_game_wallet_transfer', '2025-01-11 06:45:59'),
('31', 0, '672389-775bab30-5a7099a8', 'game_percentage_deduct', '2025-01-11 06:45:59'),
('4', 100, '3213213-efgfd-435245', 'game_play_deduct', '2025-01-05 08:07:22'),
('4RjgNxGN-Kk1fqTuM-Wx5RuAIc', 1150, '3213213-efgfd-435245', 'game_play_deduct', '2025-02-16 06:33:01'),
('5', 100, '132te13-ef65gfd-gffgfgs', 'game_play_deduct', '2025-01-05 08:07:22'),
('5HPcTzL1-Mx8HFvmm-Xy6miHRv', 850, '132te13-ef65gfd-gffgfgs', 'game_play_deduct', '2025-02-16 06:21:01'),
('6', 300, '3213213-efgfd-435245', 'game_play_deduct', '2025-01-05 08:20:26'),
('7', 300, '132te13-ef65gfd-gffgfgs', 'game_play_deduct', '2025-01-05 08:20:26'),
('8', 2150, '3213213-efgfd-435245', 'game_play_deduct', '2025-01-05 08:42:25'),
('9', 2150, '132te13-ef65gfd-gffgfgs', 'game_play_deduct', '2025-01-05 08:42:25'),
('96', 12000, '3213213-efgfd-435245', 'wallet_to_game_wallet_transfer', '2025-02-15 11:10:21'),
('97', 12, '3213213-efgfd-435245', 'game_percentage_deduct', '2025-02-15 11:12:16'),
('BXIjF6fD-8YRjBzx1-a490S9fm', 5000, '3213213-efgfd-435245', 'wallet_to_game_wallet_transfer', '2025-02-16 08:22:58'),
('EtsVWalF-J9RjACW5-GSiVtLb0', 1150, '132te13-ef65gfd-gffgfgs', 'game_play_deduct', '2025-02-16 06:33:01'),
('JtqG34MR-OmisWpcz-o1amvS5t', 1900, '3213213-efgfd-435245', 'game_play_deduct', '2025-02-16 06:41:01'),
('TXMqjkyC-28ejejpv-NiUAHV65', 2000, '324qwe-536uyrt-546jhgj', 'wallet_to_game_wallet_transfer', '2025-02-16 08:22:58'),
('WXkSsSiN-UF5X1T1z-NSJnh0Hv', 850, '3213213-efgfd-435245', 'game_play_deduct', '2025-02-16 06:21:01'),
('ynk45olt-T5ifhwVr-A5t5VUW7', 95340, '324qwe-536uyrt-546jhgj', 'wallet_to_game_wallet_transfer', '2025-02-16 08:20:55'),
('ZFroCsj5-MquW0otz-OO7NCMQm', 1900, '132te13-ef65gfd-gffgfgs', 'game_play_deduct', '2025-02-16 06:41:01');

-- --------------------------------------------------------

--
-- Table structure for table `withdrawal_history`
--

CREATE TABLE `withdrawal_history` (
  `id` varchar(255) NOT NULL,
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
('1', '132te13-ef65gfd-gffgfgs', '3213213-efgfd-435245', 1000, 1, '2025-01-18 08:23:41'),
('2', '132te13-ef65gfd-gffgfgs', '3213213-efgfd-435245', 1000, 1, '2025-01-18 08:24:19'),
('3', '3213213-efgfd-435245', '324qwe-536uyrt-546jhgj', 1230, 0, '2025-01-18 12:02:53'),
('4', '3213213-efgfd-435245', '324qwe-536uyrt-546jhgj', 1423, 0, '2025-01-18 12:09:06'),
('5', '3213213-efgfd-435245', '', 323, 0, '2025-02-15 11:12:32');

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
-- AUTO_INCREMENT for table `passcode_request`
--
ALTER TABLE `passcode_request`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `pass_code`
--
ALTER TABLE `pass_code`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
