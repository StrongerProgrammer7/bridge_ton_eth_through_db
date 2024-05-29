-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Май 29 2024 г., 10:43
-- Версия сервера: 8.0.30
-- Версия PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `InteratctionDoctor_Patient`
--
CREATE DATABASE IF NOT EXISTS `InteratctionDoctor_Patient` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `InteratctionDoctor_Patient`;

-- --------------------------------------------------------

--
-- Структура таблицы `Category_doctor`
--

DROP TABLE IF EXISTS `Category_doctor`;
CREATE TABLE `Category_doctor` (
  `category` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Очистить таблицу перед добавлением данных `Category_doctor`
--

TRUNCATE TABLE `Category_doctor`;
--
-- Дамп данных таблицы `Category_doctor`
--

INSERT INTO `Category_doctor` (`category`) VALUES
('вторая'),
('высшая'),
('первая');

-- --------------------------------------------------------

--
-- Структура таблицы `City`
--

DROP TABLE IF EXISTS `City`;
CREATE TABLE `City` (
  `id` int NOT NULL,
  `region` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `city` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `post_index` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Очистить таблицу перед добавлением данных `City`
--

TRUNCATE TABLE `City`;
--
-- Дамп данных таблицы `City`
--

INSERT INTO `City` (`id`, `region`, `city`, `post_index`) VALUES
(1, 'Краснодарский край', 'Краснодар', 350000),
(2, 'Москва', 'Москва', 123000),
(3, 'Московская область', 'Красногорск', 123456);

-- --------------------------------------------------------

--
-- Структура таблицы `Classification`
--

DROP TABLE IF EXISTS `Classification`;
CREATE TABLE `Classification` (
  `classification` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Очистить таблицу перед добавлением данных `Classification`
--

TRUNCATE TABLE `Classification`;
--
-- Дамп данных таблицы `Classification`
--

INSERT INTO `Classification` (`classification`) VALUES
('местные болезни'),
('общие болезни'),
('травмы'),
('эпидемические болезни');

-- --------------------------------------------------------

--
-- Структура таблицы `Contacts_doc`
--

DROP TABLE IF EXISTS `Contacts_doc`;
CREATE TABLE `Contacts_doc` (
  `id` int NOT NULL,
  `office_phone` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `office_mail` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Очистить таблицу перед добавлением данных `Contacts_doc`
--

TRUNCATE TABLE `Contacts_doc`;
--
-- Дамп данных таблицы `Contacts_doc`
--

INSERT INTO `Contacts_doc` (`id`, `office_phone`, `office_mail`) VALUES
(1, '555-25-35', 'krasHospital@mail.ru'),
(2, '456-65-65', 'moscowHost@hosmo.ru');

-- --------------------------------------------------------

--
-- Структура таблицы `Diseased`
--

DROP TABLE IF EXISTS `Diseased`;
CREATE TABLE `Diseased` (
  `id` int NOT NULL,
  `classification` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name_ill` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `treatment` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Очистить таблицу перед добавлением данных `Diseased`
--

TRUNCATE TABLE `Diseased`;
--
-- Дамп данных таблицы `Diseased`
--

INSERT INTO `Diseased` (`id`, `classification`, `name_ill`, `treatment`) VALUES
(4, 'местные болезни', 'ОРВИ', 'Таблетки'),
(5, 'общие болезни', 'ОРВИ,кашель', 'Таблетки 2'),
(6, 'местные болезни', 'кашель', 'Сироп'),
(7, 'местные болезни', 'ОРВИ,кашель', 'Таблетки и сироп'),
(41, 'местные болезни', 'ОРВИ', 'Таблетки,Сироп'),
(42, 'местные болезни', 'простуда', 'Таблетки'),
(43, 'местные болезни', 'кашель', 'Сироп'),
(44, 'местные болезни', 'кашель', 'Сироп'),
(45, 'общие болезни', 'кашель', 'Сироп'),
(46, 'местные болезни', 'ОРВИ', 'Сироп'),
(47, 'общие болезни', 'ОРВИ', 'Таблетки'),
(48, 'травмы', 'ОРВИ,кашель', 'Таблетки'),
(49, 'местные болезни', 'простуда', 'Таблетки'),
(50, 'местные болезни', 'простуда', 'Таблетки'),
(51, 'травмы', 'ОРВИ', 'Таблетки'),
(52, 'травмы', 'ОРВИ', 'Таблетки'),
(53, 'травмы', 'ОРВИ', 'Таблетки'),
(54, 'травмы', 'ОРВИ,кашель', 'Таблетки'),
(55, 'местные болезни', 'простуда', 'Сироп'),
(56, 'эпидемические болезни', 'простуда', 'Сироп и таблетки'),
(57, 'травмы', 'ОРВИ', 'Сироп и таблетки'),
(58, 'травмы', 'ОРВИ', 'Сироп и таблетки'),
(59, 'травмы', 'ОРВИ,кашель', 'Тб'),
(60, 'эпидемические болезни', 'ОРВИ,кашель', 'Таблетки'),
(61, 'эпидемические болезни', 'ОРВИ,кашель', 'Таблетки'),
(62, 'травмы', 'ОРВИ,кашель', 'Таблеиуи'),
(63, 'травмы', 'ОРВИ,кашель', 'Таблеиуи'),
(64, 'травмы', 'ОРВИ,кашель', 'Таблеиуи'),
(65, 'травмы', 'простуда', 'Таблеиуи'),
(66, 'травмы', 'простуда', 'Пол'),
(67, 'эпидемические болезни', 'ОРВИ,кашель', 'Сироп'),
(68, 'эпидемические болезни', 'простуда', 'Таблетки'),
(69, 'эпидемические болезни', 'простуда', 'Таблетки'),
(70, 'эпидемические болезни', 'простуда', 'Таблетки'),
(71, 'эпидемические болезни', 'простуда', 'Таблетки'),
(72, 'травмы', 'простуда', 'Бинты'),
(73, 'общие болезни', 'ОРВИ,кашель', 'Попуас'),
(74, 'травмы', 'ОРВИ', 'Таблетки, сироп, укол'),
(75, 'общие болезни', 'простуда', 'Сироп, таблетки'),
(76, 'травмы', 'ОРВИ,кашель', 'Чай с лимоном');

-- --------------------------------------------------------

--
-- Структура таблицы `Doctor`
--

DROP TABLE IF EXISTS `Doctor`;
CREATE TABLE `Doctor` (
  `id` int NOT NULL,
  `contacts_id` int NOT NULL,
  `hospital_id` int NOT NULL,
  `category` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `profession` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `surname` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `lastname` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `mail` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `account_wallet` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name_wallet` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `account_contract` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password_test` varchar(59) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Delete after test'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Очистить таблицу перед добавлением данных `Doctor`
--

TRUNCATE TABLE `Doctor`;
--
-- Дамп данных таблицы `Doctor`
--

INSERT INTO `Doctor` (`id`, `contacts_id`, `hospital_id`, `category`, `profession`, `surname`, `name`, `lastname`, `phone`, `mail`, `account_wallet`, `name_wallet`, `account_contract`, `password`, `password_test`) VALUES
(50, 2, 1, 'первая', 'АНЕСТЕЗИОЛОГ-РЕАНИМАТОЛОГ', 'Gilberg', 'Gold', NULL, NULL, NULL, '0xf902031a076d77d2f651639d017449c1abaee9a5', NULL, NULL, 'pass1', NULL),
(51, 1, 1, 'первая', 'ГИНЕКОЛОГ', 'Martin', 'Mort', NULL, NULL, 'sw82@mail.ru', '0x88c0b0db901028e7234ca4c3d9fa29d7dd45bbe7', NULL, NULL, 'pass2', NULL),
(52, 1, 2, 'высшая', 'ОНКОЛОГ', 'Sort', 'Cob', NULL, NULL, NULL, '0x367c24cab9453d9f4bf34ce5f1c0c1b4f73b55ab', NULL, NULL, 'pass3', NULL),
(54, 2, 1, 'вторая', 'ДЕЗИНФЕКЦИОНИСТ', 'Kiol', 'Gjta', NULL, NULL, NULL, '0xf3a613168ff438e52308ee69110e845b21f20f27', NULL, NULL, 'pass4', NULL),
(55, 2, 2, 'вторая', 'ТРАВМАТОЛОГ', 'Kolt', 'Sfrae', NULL, NULL, NULL, '0xc537ecceb6d2f7fccde75db3dc96c325a23a8573', NULL, NULL, 'pass5', NULL),
(56, 1, 2, 'первая', 'ТЕРАПЕВТ', 'Kiol', 'Qeer', NULL, NULL, NULL, '0x4346161f372fe92b58824f219fd696000bf329a9', NULL, NULL, 'pass6', NULL),
(57, 1, 2, 'первая', 'ЭПИДЕМИОЛОГ', 'Uyt', 'Ghj', NULL, NULL, NULL, '0x21887da3ea5692e973af2a1d516b11113ef002de', 'ETH', NULL, 'pass7', NULL),
(59, 2, 2, 'первая', 'ОНКОЛОГ', 'FA', 'ER', 'SS', NULL, NULL, '0x55551', 'ETH', NULL, 'pass12', NULL),
(65, 1, 1, 'высшая', 'ТЕРАПЕВТ', 'Гласов', 'Александр', '', '+79995685225', 'doc@mail.ru', '0x9014f82e4bbeae8a15b5a04365dba68016248355', 'ETH', NULL, '$2b$10$hMSwBG98BvK/iz6au55m5ezczU2abWFNPyqFxXjTt8Xw230V5KiEy', NULL),
(66, 2, 2, 'первая', 'ТЕРАПЕВТ', 'Калкин', 'Максим', 'Попов', '+79995685225', 'Pik@mail.ru', '0x60ce5c24198b7e1e3945071153a38e2ea1bc60a9', 'ETH', NULL, '$2b$10$oU60NAd1y3JaxCvPmgRgIOk0InfcSa0HxFtUtixicviFXEIQTJ8dG', NULL),
(67, 1, 1, 'высшая', 'АНЕСТЕЗИОЛОГ-РЕАНИМАТОЛОГ', 'Стью', 'Голан', '', '+78545685225', 'doctor@mail.ru', '0xed0eb96960a6875d918b830c6fb35c86bfd20d7d', 'ETH', '0xeae20D578cEb7eeF66c4174f35986CCbA18B5133', '$2b$10$SFDtBaTVPoxn5GdaFAHEguR6OFaRsjr/68ig91OWDWqPjak1X.jJG', '+JwfM8b^BC*jIK'),
(68, 2, 2, 'высшая', 'ГИНЕКОЛОГ', 'Стью', 'Врачебка', '', '+78545685225', 'docmai78l@mail.ru', '0xc7fd17050f515225a8b88ee9502da11614129d4a', 'ETH', '0xB9252926E6aE85551594448881a0502b60153f65', '$2b$10$utXvLWKZVjn1z41vRjOMpePyPY3V45h8dhNp5zoyJgGVEEA3tTnuC', '+JwfM8b^BC*jIK'),
(69, 1, 1, 'вторая', 'ТЕРАПЕВТ', 'Рыбка', 'Олег', '', '+79545685225', 'maTONl@mail.ru', '0:01341eb1bdeded53e93a49449adaa4c601d16291488f1d61700dfc0a5e9c29d3', 'TON', 'EQAiROUIm2Gw86gFhFD7urLpn9fLa1P4TtJiUUV5FpIHGwJW', '$2b$10$DfFfP4G0bercYHHQ0eInB.id31Ie8b86cba3HW5kEzQqDyREaO73m', '+JwfM8b^BC*jIK'),
(70, 2, 2, 'первая', 'ТРАВМАТОЛОГ', 'Бош', 'Валера', 'Алексеевич', '+79145685225', 'doctorETH@gmail.com', '0x5123399a62e529b3aafce9e5f9ba885d5fd94aa8', 'ETH', '0x8e71c87D1599A158e71e817A6729f0E5601d2670', '$2b$10$Wvfgnh8mZJTA2tkBZMI9XuNid0pim3Busq4/9krTjLgUDWUYvBmyC', '+JwfM8b^BC*jIK');

-- --------------------------------------------------------

--
-- Структура таблицы `Hospital`
--

DROP TABLE IF EXISTS `Hospital`;
CREATE TABLE `Hospital` (
  `id` int NOT NULL,
  `city_id` int NOT NULL,
  `hospital` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `number_hospital` int NOT NULL DEFAULT '123',
  `hospital_phone` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Очистить таблицу перед добавлением данных `Hospital`
--

TRUNCATE TABLE `Hospital`;
--
-- Дамп данных таблицы `Hospital`
--

INSERT INTO `Hospital` (`id`, `city_id`, `hospital`, `number_hospital`, `hospital_phone`) VALUES
(1, 1, 'Городская больница ул Стасова', 56, '123-123'),
(2, 2, 'Городская центральная больница ул Москва 56', 1, '111-111');

-- --------------------------------------------------------

--
-- Структура таблицы `Name_ills`
--

DROP TABLE IF EXISTS `Name_ills`;
CREATE TABLE `Name_ills` (
  `name_ill` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Очистить таблицу перед добавлением данных `Name_ills`
--

TRUNCATE TABLE `Name_ills`;
--
-- Дамп данных таблицы `Name_ills`
--

INSERT INTO `Name_ills` (`name_ill`) VALUES
('кашель'),
('ОРВИ'),
('ОРВИ,кашель'),
('простуда');

-- --------------------------------------------------------

--
-- Структура таблицы `Patient`
--

DROP TABLE IF EXISTS `Patient`;
CREATE TABLE `Patient` (
  `id` int NOT NULL,
  `city_id` int NOT NULL,
  `surname` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `lastname` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `mail` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `account_wallet` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `isPartInformation_hidden` int UNSIGNED NOT NULL DEFAULT '1',
  `address_of_residence` int NOT NULL,
  `insurance_policy` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `datebirthd` date NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `list_doctors_have_access` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'List doctors, enum across '','' for array',
  `name_wallet` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `account_contract` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password_test` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Очистить таблицу перед добавлением данных `Patient`
--

TRUNCATE TABLE `Patient`;
--
-- Дамп данных таблицы `Patient`
--

INSERT INTO `Patient` (`id`, `city_id`, `surname`, `name`, `lastname`, `phone`, `mail`, `account_wallet`, `isPartInformation_hidden`, `address_of_residence`, `insurance_policy`, `datebirthd`, `password`, `list_doctors_have_access`, `name_wallet`, `account_contract`, `password_test`) VALUES
(1, 1, 'Ju', 'Lop', NULL, NULL, NULL, '0x367c24cab9453d9f4bf34ce5f1c0c1b4f73b55ab', 1, 1, NULL, '2023-04-19', 'pass1', NULL, NULL, NULL, NULL),
(2, 2, 'Juyt', 'Fgew', NULL, NULL, NULL, '0x21887da3ea5692e973af2a1d516b11113ef002de', 1, 2, NULL, '2023-04-04', 'pass2', NULL, NULL, NULL, NULL),
(3, 3, 'Kiuh', 'Jhds', 'Dsdssa', NULL, NULL, '0x4346161f372fe92b58824f219fd696000bf329a9', 1, 1, NULL, '2023-04-20', 'pass3', NULL, NULL, NULL, NULL),
(4, 2, 'Khq', 'Sasd', NULL, NULL, NULL, '0xf902031a076d77d2f651639d017449c1abaee9a5', 1, 2, NULL, '2023-04-13', 'pass4', NULL, NULL, NULL, NULL),
(5, 1, 'Ert', 'Sfg', NULL, NULL, NULL, '0x88c0b0db901028e7234ca4c3d9fa29d7dd45bbe7', 1, 1, NULL, '2014-04-08', 'pass5', NULL, NULL, NULL, NULL),
(6, 2, 'Mos', 'Ert', NULL, NULL, NULL, '0x94636b841820598a0dac1ea61214e08d0e453767', 1, 3, NULL, '2023-04-21', 'pass6', NULL, NULL, NULL, NULL),
(41, 3, 'Melon', 'Charle', '', '+77771741865', 'Hous@gmail.com', '0x2f21680d002ea2e87fc6e53478de46cefb56284a', 1, 3, '195-1586-649-649', '1999-06-22', '$2b$10$6efW8RZtG1B7aIf0HrQHjeiuFb/UXbDiOowHm/uDURJ/7m.mQRnji', NULL, 'ETH', NULL, NULL),
(46, 1, 'Falcon', 'Meat', '', '+79995685225', 'pocht@mail.ru', '0xa24b719612dababf3630f0ffbb71c775d48a4fd3', 1, 1, '195-1586-649-649', '1999-06-22', '$2b$10$shOFh7p.fSBoBGMfytwcCuck8TtTt5NjqAsXoACJK7FutQiZ6Zphq', '61', 'ETH', NULL, NULL),
(50, 1, 'Михов', 'Алексей', 'Михайлович', '+79995685225', 'gmail@mail.ru', '0xccd07dcb831f96a8c08fba89e0b051f2bfe2e317', 1, 2, '195-1586-649-649', '1999-06-22', '$2b$10$QMFgj9JiWHvkTdlSF3c.yeAe5eHgvgE0w5ClIALRqebyMz/PDmLGK', ',65', 'ETH', NULL, NULL),
(51, 3, 'Пупов', 'Никита', 'Куков', '+79995685225', 'kukov@mail.ru', '0xe09e86786933616de393d6ec231cf8dc7fdfe332', 1, 3, '195-1586-649-649', '1999-06-22', '$2b$10$ZnZRKfPNyfV5mhxPKnawduC16nNiwqW37W96tipjPUz5Muj1wukLy', '66', 'ETH', NULL, NULL),
(54, 3, 'Falcon', 'Bob', '', '+79995685225', 'ma11il@mail.ru', '0x9bbf392e0ce37a4a8205dec4b287b8e82f3a38a9', 1, 3, '195-1586-649-649', '1999-06-22', '$2b$10$8sPYl6mLczyXUEKAuGfOWe52rjvPb.YGcUfvmk98nQxDAHkMLA9cC', NULL, 'ETH', '0xF9F4AB0f53ade4F1478B124e86C0A960C5eC115b', '+JwfM8b*4x3^^BC*jIK'),
(56, 2, 'Диланский', 'Максимка', '', '+78545685225', 'ma11i78l@mail.ru', '0x532a55e2fa0f0ba737d941003f9fd2af714514e2', 1, 1, '196-1586-649-649', '1999-06-22', '$2b$10$/Pgf.wPAP6ZHk0EdAM.0AubcQByeQyLSLj/KayWzOxD/8yNTNSUDO', '67', 'ETH', '0xeae20D578cEb7eeF66c4174f35986CCbA18B5133', '+JwfM8b^BC*jIK'),
(57, 2, 'Джон', 'Буш', '', '+78545685225', 'mt11itsai78l@mail.ru', '0xf04ae155d5c545b1ae0cb972c388badb3829c8b6', 1, 1, '196-1586-649-649', '1999-06-08', '$2b$10$WNNieMkXAUq8g515Ys/kqeDioVvq4vXDdfHZk0JoJKEn4lGT8opZO', '68', 'ETH', '0xB9252926E6aE85551594448881a0502b60153f65', '+JwfM8b^BC*jIK'),
(58, 2, 'Александр', 'Макгонагал', '', '+78545685225', 'patientTON@mail.ru', '0:f8edcd9634dc8ba9254f4b4fb1e838808d6c7513307f155ab049385829e23615', 1, 1, '196-1586-649-649', '1999-06-22', '$2b$10$ZxcrIcPH3QyfE/xSAuSF4uBghNd1KoqZDWLrjvt5ZjjBTHUa6OW2m', ',69,70', 'TON', 'EQDjZ0TLwjUSWUcNEhjY51GQAQ75iIf04E_Jyae4juMQj7MD', '+JwfM8b^BC*jIK'),
(59, 1, 'Поттер', 'Алексей', '', '+79555685225', 'eth78l@mail.ru', '0x6dd776b94c19ff3866420c1cb2fd23c747b81255', 1, 1, '196-1586-649-649', '1999-06-10', '$2b$10$GxMBBCC/g3Xpe3Iy6ZbkyuB/07ON4vUPacqVzBZ6EzB.PdOfZ62nC', ',', 'ETH', '0x8e71c87D1599A158e71e817A6729f0E5601d2670', '+JwfM8b^BC*jIK');

-- --------------------------------------------------------

--
-- Структура таблицы `Profession`
--

DROP TABLE IF EXISTS `Profession`;
CREATE TABLE `Profession` (
  `profession` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Очистить таблицу перед добавлением данных `Profession`
--

TRUNCATE TABLE `Profession`;
--
-- Дамп данных таблицы `Profession`
--

INSERT INTO `Profession` (`profession`) VALUES
('АНЕСТЕЗИОЛОГ-РЕАНИМАТОЛОГ'),
('ГИНЕКОЛОГ'),
('ДЕЗИНФЕКЦИОНИСТ'),
('ОНКОЛОГ'),
('ТЕРАПЕВТ'),
('ТРАВМАТОЛОГ'),
('ЭПИДЕМИОЛОГ');

-- --------------------------------------------------------

--
-- Структура таблицы `Records`
--

DROP TABLE IF EXISTS `Records`;
CREATE TABLE `Records` (
  `id` int NOT NULL,
  `id_patient` int NOT NULL,
  `id_doctor` int NOT NULL,
  `id_ill` int NOT NULL,
  `date_ill` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_cured` datetime DEFAULT NULL,
  `status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'ill'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Очистить таблицу перед добавлением данных `Records`
--

TRUNCATE TABLE `Records`;
--
-- Дамп данных таблицы `Records`
--

INSERT INTO `Records` (`id`, `id_patient`, `id_doctor`, `id_ill`, `date_ill`, `date_cured`, `status`) VALUES
(7, 46, 55, 4, '2023-03-31 21:00:00', '2023-05-04 12:58:00', 'Cured'),
(8, 46, 51, 6, '2023-04-01 04:00:00', NULL, 'ill'),
(9, 3, 55, 7, '2023-04-01 17:32:30', NULL, 'ill'),
(10, 5, 54, 7, '2023-04-04 17:32:43', NULL, 'ill'),
(30, 50, 65, 41, '2023-05-11 12:58:00', '2023-06-09 18:59:00', 'Cured'),
(31, 50, 65, 42, '2023-05-18 19:28:00', NULL, 'ill'),
(35, 51, 66, 46, '2023-05-03 19:51:00', NULL, 'ill'),
(36, 51, 66, 47, '2023-05-11 19:56:00', NULL, 'ill'),
(38, 56, 67, 43, '2023-05-11 07:56:00', '2024-01-17 20:34:00', 'Cured'),
(62, 56, 67, 72, '2024-01-17 20:53:00', NULL, 'ill'),
(63, 57, 68, 73, '2024-01-15 13:39:00', NULL, 'ill'),
(64, 58, 69, 74, '2024-04-04 16:03:00', NULL, 'ill'),
(65, 59, 69, 75, '2024-04-05 09:50:00', NULL, 'ill'),
(66, 58, 70, 76, '2024-04-02 12:19:00', '2024-04-12 15:53:00', 'Cured');

-- --------------------------------------------------------

--
-- Структура таблицы `Region`
--

DROP TABLE IF EXISTS `Region`;
CREATE TABLE `Region` (
  `region` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `numer_region` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Очистить таблицу перед добавлением данных `Region`
--

TRUNCATE TABLE `Region`;
--
-- Дамп данных таблицы `Region`
--

INSERT INTO `Region` (`region`, `numer_region`) VALUES
('Краснодарский край', 123),
('Москва', 99),
('Московская область', 56);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `Category_doctor`
--
ALTER TABLE `Category_doctor`
  ADD PRIMARY KEY (`category`);

--
-- Индексы таблицы `City`
--
ALTER TABLE `City`
  ADD PRIMARY KEY (`id`),
  ADD KEY `region_city` (`region`);

--
-- Индексы таблицы `Classification`
--
ALTER TABLE `Classification`
  ADD PRIMARY KEY (`classification`);

--
-- Индексы таблицы `Contacts_doc`
--
ALTER TABLE `Contacts_doc`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `Diseased`
--
ALTER TABLE `Diseased`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ill_classification` (`classification`),
  ADD KEY `ind_name_ill` (`name_ill`);

--
-- Индексы таблицы `Doctor`
--
ALTER TABLE `Doctor`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `account_eth` (`account_wallet`),
  ADD KEY `doctor_category` (`category`),
  ADD KEY `doctor_profession` (`profession`),
  ADD KEY `doctor_contacts` (`contacts_id`),
  ADD KEY `doctor_hospital` (`hospital_id`);

--
-- Индексы таблицы `Hospital`
--
ALTER TABLE `Hospital`
  ADD PRIMARY KEY (`id`),
  ADD KEY `hospital_city` (`city_id`);

--
-- Индексы таблицы `Name_ills`
--
ALTER TABLE `Name_ills`
  ADD PRIMARY KEY (`name_ill`);

--
-- Индексы таблицы `Patient`
--
ALTER TABLE `Patient`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `account_eth` (`account_wallet`),
  ADD KEY `insurancy_polic` (`insurance_policy`),
  ADD KEY `patient_residency` (`city_id`);

--
-- Индексы таблицы `Profession`
--
ALTER TABLE `Profession`
  ADD PRIMARY KEY (`profession`);

--
-- Индексы таблицы `Records`
--
ALTER TABLE `Records`
  ADD PRIMARY KEY (`id`),
  ADD KEY `records_ill` (`id_ill`),
  ADD KEY `records_doctors` (`id_doctor`),
  ADD KEY `records_patients` (`id_patient`);

--
-- Индексы таблицы `Region`
--
ALTER TABLE `Region`
  ADD PRIMARY KEY (`region`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `City`
--
ALTER TABLE `City`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `Contacts_doc`
--
ALTER TABLE `Contacts_doc`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `Diseased`
--
ALTER TABLE `Diseased`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT для таблицы `Doctor`
--
ALTER TABLE `Doctor`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT для таблицы `Hospital`
--
ALTER TABLE `Hospital`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `Patient`
--
ALTER TABLE `Patient`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT для таблицы `Records`
--
ALTER TABLE `Records`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `City`
--
ALTER TABLE `City`
  ADD CONSTRAINT `region_city` FOREIGN KEY (`region`) REFERENCES `Region` (`region`) ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `Diseased`
--
ALTER TABLE `Diseased`
  ADD CONSTRAINT `diseased_name_ill` FOREIGN KEY (`name_ill`) REFERENCES `Name_ills` (`name_ill`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `ill_classification` FOREIGN KEY (`classification`) REFERENCES `Classification` (`classification`) ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `Doctor`
--
ALTER TABLE `Doctor`
  ADD CONSTRAINT `doctor_category` FOREIGN KEY (`category`) REFERENCES `Category_doctor` (`category`) ON UPDATE CASCADE,
  ADD CONSTRAINT `doctor_contacts` FOREIGN KEY (`contacts_id`) REFERENCES `Contacts_doc` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `doctor_hospital` FOREIGN KEY (`hospital_id`) REFERENCES `Hospital` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `doctor_profession` FOREIGN KEY (`profession`) REFERENCES `Profession` (`profession`) ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `Hospital`
--
ALTER TABLE `Hospital`
  ADD CONSTRAINT `hospital_city` FOREIGN KEY (`city_id`) REFERENCES `City` (`id`) ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `Patient`
--
ALTER TABLE `Patient`
  ADD CONSTRAINT `patient_city` FOREIGN KEY (`city_id`) REFERENCES `City` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `patient_residency` FOREIGN KEY (`city_id`) REFERENCES `City` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `Records`
--
ALTER TABLE `Records`
  ADD CONSTRAINT `records_doctors` FOREIGN KEY (`id_doctor`) REFERENCES `Doctor` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `records_ill` FOREIGN KEY (`id_ill`) REFERENCES `Diseased` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `records_patients` FOREIGN KEY (`id_patient`) REFERENCES `Patient` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
