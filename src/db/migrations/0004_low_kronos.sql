DROP INDEX `artwork_idx` ON `images`;
CREATE INDEX `artwork_idx` ON `images` (`artwork_id`);