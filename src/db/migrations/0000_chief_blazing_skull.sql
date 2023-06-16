CREATE TABLE `artworks` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`user_id` varchar(256) NOT NULL,
	`title` varchar(256) NOT NULL,
	`description` text NOT NULL,
	`feedback` boolean NOT NULL DEFAULT true,
	`created_at` timestamp NOT NULL DEFAULT (now()));

CREATE TABLE `comments` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`artwork_id` int NOT NULL,
	`user_id` int NOT NULL,
	`text` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`is_feedback` boolean NOT NULL DEFAULT false,
	`feedback_image_id` int,
	`feedback_image_x` decimal,
	`feedback_image_y` decimal);

CREATE TABLE `images` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`artwork_id` int NOT NULL,
	`key` varchar(256) NOT NULL,
	`width` int NOT NULL DEFAULT 0,
	`height` int NOT NULL DEFAULT 0,
	`is_thumbnail` boolean NOT NULL DEFAULT false);
