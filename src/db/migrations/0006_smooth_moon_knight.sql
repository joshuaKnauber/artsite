CREATE TABLE `notifications` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`user_id` varchar(256) NOT NULL,
	`source_id` int NOT NULL,
	`source_type` varchar(256) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`is_read` boolean NOT NULL DEFAULT false);

CREATE INDEX `user_idx` ON `notifications` (`user_id`);