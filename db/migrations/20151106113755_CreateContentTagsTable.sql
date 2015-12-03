
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
CREATE TABLE content_tags (
	id serial,
	content_id int NOT NULL,
	tag_id int NOT NULL,
	sort_order int NOT NULL DEFAULT 0,

	PRIMARY KEY (id),
	UNIQUE (content_id, tag_id),
	FOREIGN KEY (content_id) REFERENCES content (id) ON DELETE CASCADE,
	FOREIGN KEY (tag_id) REFERENCES tags (id) ON DELETE CASCADE
);

CREATE INDEX ON content_tags (sort_order);

-- +goose Down
-- SQL section 'Down' is executed when thi s migration is rolled back

