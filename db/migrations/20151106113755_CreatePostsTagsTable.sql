
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
CREATE TABLE posts_tags (
	id serial,
	post_id int NOT NULL,
	tag_id int NOT NULL,
	sort_order int NOT NULL DEFAULT 0,

	PRIMARY KEY (id),
	UNIQUE (post_id, tag_id),
	FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE,
	FOREIGN KEY (tag_id) REFERENCES tags (id) ON DELETE CASCADE
);

CREATE INDEX ON posts_tags (post_id);
CREATE INDEX ON posts_tags (tag_id);
CREATE INDEX ON posts_tags (sort_order);

-- +goose Down
-- SQL section 'Down' is executed when thi s migration is rolled back

