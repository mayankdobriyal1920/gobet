-- --------------------------------------------------------
-- Host:                         178.16.138.111
-- Server version:               8.4.2 - Source distribution
-- Server OS:                    Linux
-- HeidiSQL Version:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table getbet.betting_active_users
CREATE TABLE IF NOT EXISTS `betting_active_users` (
  `id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` int DEFAULT '1' COMMENT '1 - Success\r\n2 - Ready\r\n3 - Waiting\r\n4 - Expired',
  `is_test_user` smallint NOT NULL DEFAULT '0',
  `betting_platform_id` int DEFAULT '1',
  `betting_game_session_id` int DEFAULT '1',
  `Column 8` int DEFAULT NULL,
  `is_online` int DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table getbet.betting_active_users: ~54 rows (approximately)
INSERT INTO `betting_active_users` (`id`, `user_id`, `created_at`, `status`, `is_test_user`, `betting_platform_id`, `betting_game_session_id`, `Column 8`, `is_online`) VALUES
	('8lAvzc1Y-S24lvoSx-D62LUivL', '230010-dc5de65b-dc36548e', '2025-06-30 16:49:52', 3, 0, 1, 1, NULL, 0),
	('eu1Uyzxd-KVwBe82y-HLbyYAQJ', '188212-eb6f0000-c5fb6554', '2025-07-05 04:08:13', 1, 0, 1, 1, NULL, 0),
	('qokf6Fzh-D4X9JIyp-dy3Olgnb', '324qwe-536uyrt-546jhgj', '2025-03-20 16:19:29', 3, 0, NULL, 21, NULL, 1),
	('UDHO5NOJ-qOEiAR98-YgF2tlFM', '132te13-ef65gfd-gffgfgs', '2025-03-20 15:31:06', 3, 0, 1, 32, NULL, 0),
	('wqe12-dfrwt-34fs1', '45486yhgf-gfhgfudf-ykhjg1', '2025-02-17 08:51:39', 1, 1, 1, 1, NULL, 1),
	('wqe12-dfrwt-34fs10', '45486yhgf-gfhgfudf-ykhjg10', '2025-02-17 08:51:39', 1, 1, 1, 1, NULL, 1),
	('wqe12-dfrwt-34fs11', '45486yhgf-gfhgfudf-ykhjg11', '2025-02-17 08:51:39', 1, 1, 1, 1, NULL, 1),
	('wqe12-dfrwt-34fs12', '45486yhgf-gfhgfudf-ykhjg12', '2025-02-17 08:51:39', 1, 1, 1, 1, NULL, 1),
	('wqe12-dfrwt-34fs13', '45486yhgf-gfhgfudf-ykhjg13', '2025-02-17 08:51:39', 1, 1, 1, 1, NULL, 1),
	('wqe12-dfrwt-34fs14', '45486yhgf-gfhgfudf-ykhjg14', '2025-02-17 08:51:39', 1, 1, 1, 1, NULL, 1),
	('wqe12-dfrwt-34fs15', '45486yhgf-gfhgfudf-ykhjg15', '2025-02-17 08:51:39', 1, 1, 1, 1, NULL, 1),
	('wqe12-dfrwt-34fs16', '45486yhgf-gfhgfudf-ykhjg16', '2025-02-17 08:51:39', 1, 1, 1, 1, NULL, 1),
	('wqe12-dfrwt-34fs17', '45486yhgf-gfhgfudf-ykhjg17', '2025-02-17 08:51:39', 1, 1, 1, 1, NULL, 1),
	('wqe12-dfrwt-34fs18', '45486yhgf-gfhgfudf-ykhjg18', '2025-02-17 08:51:39', 1, 1, 1, 1, NULL, 1),
	('wqe12-dfrwt-34fs19', '45486yhgf-gfhgfudf-ykhjg19', '2025-02-17 08:51:39', 1, 1, 1, 1, NULL, 1),
	('wqe12-dfrwt-34fs2', '45486yhgf-gfhgfudf-ykhjg2', '2025-02-17 08:51:39', 1, 1, 1, 1, NULL, 1),
	('wqe12-dfrwt-34fs20', '45486yhgf-gfhgfudf-ykhjg20', '2025-02-17 08:51:39', 1, 1, 1, 1, NULL, 1),
	('wqe12-dfrwt-34fs21', '45486yhgf-gfhgfudf-ykhjg21', '2025-02-17 08:51:39', 1, 1, 1, 1, NULL, 1),
	('wqe12-dfrwt-34fs22', '45486yhgf-gfhgfudf-ykhjg22', '2025-02-17 08:51:39', 1, 1, 1, 1, NULL, 1),
	('wqe12-dfrwt-34fs23', '45486yhgf-gfhgfudf-ykhjg23', '2025-02-17 08:51:39', 1, 1, 1, 1, NULL, 1),
	('wqe12-dfrwt-34fs24', '45486yhgf-gfhgfudf-ykhjg24', '2025-02-17 08:51:39', 1, 1, 1, 1, NULL, 1),
	('wqe12-dfrwt-34fs25', '45486yhgf-gfhgfudf-ykhjg25', '2025-02-17 08:51:39', 1, 1, 1, 1, NULL, 1),
	('wqe12-dfrwt-34fs26', '45486yhgf-gfhgfudf-ykhjg26', '2025-02-17 08:51:39', 1, 1, 1, 1, NULL, 1),
	('wqe12-dfrwt-34fs27', '45486yhgf-gfhgfudf-ykhjg27', '2025-02-17 08:51:39', 1, 1, 1, 1, NULL, 1),
	('wqe12-dfrwt-34fs28', '45486yhgf-gfhgfudf-ykhjg28', '2025-02-17 08:51:39', 1, 1, 1, 1, NULL, 1),
	('wqe12-dfrwt-34fs29', '45486yhgf-gfhgfudf-ykhjg29', '2025-02-17 08:51:39', 1, 1, 1, 1, NULL, 1),
	('wqe12-dfrwt-34fs3', '45486yhgf-gfhgfudf-ykhjg3', '2025-02-17 08:51:39', 1, 1, 1, 1, NULL, 1),
	('wqe12-dfrwt-34fs30', '45486yhgf-gfhgfudf-ykhjg30', '2025-02-17 08:51:39', 1, 1, 1, 1, NULL, 1),
	('wqe12-dfrwt-34fs31', '45486yhgf-gfhgfudf-ykhjg31', '2025-02-17 08:51:39', 1, 1, 1, 1, NULL, 1),
	('wqe12-dfrwt-34fs32', '45486yhgf-gfhgfudf-ykhjg32', '2025-02-17 08:51:39', 1, 1, 1, 1, NULL, 1),
	('wqe12-dfrwt-34fs33', '45486yhgf-gfhgfudf-ykhjg33', '2025-02-17 08:51:39', 1, 1, 1, 1, NULL, 1),
	('wqe12-dfrwt-34fs34', '45486yhgf-gfhgfudf-ykhjg34', '2025-02-17 08:51:39', 1, 1, 1, 1, NULL, 1),
	('wqe12-dfrwt-34fs35', '45486yhgf-gfhgfudf-ykhjg35', '2025-02-17 08:51:39', 1, 1, 1, 1, NULL, 1),
	('wqe12-dfrwt-34fs36', '45486yhgf-gfhgfudf-ykhjg36', '2025-02-17 08:51:39', 1, 1, 1, 1, NULL, 1),
	('wqe12-dfrwt-34fs37', '45486yhgf-gfhgfudf-ykhjg37', '2025-02-17 08:51:39', 1, 1, 1, 1, NULL, 1),
	('wqe12-dfrwt-34fs38', '45486yhgf-gfhgfudf-ykhjg38', '2025-02-17 08:51:39', 1, 1, 1, 1, NULL, 1),
	('wqe12-dfrwt-34fs39', '45486yhgf-gfhgfudf-ykhjg39', '2025-02-17 08:51:39', 1, 1, 1, 1, NULL, 1),
	('wqe12-dfrwt-34fs4', '45486yhgf-gfhgfudf-ykhjg4', '2025-02-17 08:51:39', 1, 1, 1, 1, NULL, 1),
	('wqe12-dfrwt-34fs40', '45486yhgf-gfhgfudf-ykhjg40', '2025-02-17 08:51:39', 1, 1, 1, 1, NULL, 1),
	('wqe12-dfrwt-34fs41', '45486yhgf-gfhgfudf-ykhjg41', '2025-02-17 08:51:39', 1, 1, 1, 1, NULL, 1),
	('wqe12-dfrwt-34fs42', '45486yhgf-gfhgfudf-ykhjg42', '2025-02-17 08:51:39', 1, 1, 1, 1, NULL, 1),
	('wqe12-dfrwt-34fs43', '45486yhgf-gfhgfudf-ykhjg43', '2025-02-17 08:51:39', 1, 1, 1, 1, NULL, 1),
	('wqe12-dfrwt-34fs44', '45486yhgf-gfhgfudf-ykhjg44', '2025-02-17 08:51:39', 1, 1, 1, 1, NULL, 1),
	('wqe12-dfrwt-34fs45', '45486yhgf-gfhgfudf-ykhjg45', '2025-02-17 08:51:39', 1, 1, 1, 1, NULL, 1),
	('wqe12-dfrwt-34fs46', '45486yhgf-gfhgfudf-ykhjg46', '2025-02-17 08:51:39', 1, 1, 1, 1, NULL, 1),
	('wqe12-dfrwt-34fs47', '45486yhgf-gfhgfudf-ykhjg47', '2025-02-17 08:51:39', 1, 1, 1, 1, NULL, 1),
	('wqe12-dfrwt-34fs48', '45486yhgf-gfhgfudf-ykhjg48', '2025-02-17 08:51:39', 1, 1, 1, 1, NULL, 1),
	('wqe12-dfrwt-34fs49', '45486yhgf-gfhgfudf-ykhjg49', '2025-02-17 08:51:39', 1, 1, 1, 1, NULL, 1),
	('wqe12-dfrwt-34fs5', '45486yhgf-gfhgfudf-ykhjg5', '2025-02-17 08:51:39', 1, 1, 1, 1, NULL, 1),
	('wqe12-dfrwt-34fs50', '45486yhgf-gfhgfudf-ykhjg50', '2025-02-17 08:51:39', 1, 1, 1, 1, NULL, 1),
	('wqe12-dfrwt-34fs6', '45486yhgf-gfhgfudf-ykhjg6', '2025-02-17 08:51:39', 1, 1, 1, 1, NULL, 1),
	('wqe12-dfrwt-34fs7', '45486yhgf-gfhgfudf-ykhjg7', '2025-02-17 08:51:39', 1, 1, 1, 1, NULL, 1),
	('wqe12-dfrwt-34fs8', '45486yhgf-gfhgfudf-ykhjg8', '2025-02-17 08:51:39', 1, 1, 1, 1, NULL, 1),
	('wqe12-dfrwt-34fs9', '45486yhgf-gfhgfudf-ykhjg9', '2025-02-17 08:51:39', 1, 1, 1, 1, NULL, 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
