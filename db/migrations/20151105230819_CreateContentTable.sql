
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
CREATE TABLE content (
	id serial,
	uuid varchar(36) NOT NULL,
	title varchar(150) NOT NULL,
	slug varchar(150) NOT NULL,
	body text NULL,
	image varchar(254) NULL,
	type varchar(150) NOT NULL DEFAULT 'post',
	status varchar(15) NOT NULL DEFAULT 'draft',
	featured bool NOT NULL DEFAULT false,
	language varchar(6) NOT NULL DEFAULT 'en_US',
	meta_title varchar(150) NULL,
	meta_description varchar(200) NULL,
	author_id int NOT NULL,
	created_at timestamp(6) WITH TIME ZONE NOT NULL DEFAULT NOW(),
	created_by int NOT NULL,
	updated_at timestamp(6) WITH TIME ZONE NOT NULL DEFAULT NOW(),
	updated_by int NOT NULL,
	published_at timestamp(6) WITH TIME ZONE NULL,
	published_by int NOT NULL,

	PRIMARY KEY (id),
	UNIQUE (slug),

	FOREIGN KEY (author_id) REFERENCES users (id) ON DELETE RESTRICT,
	FOREIGN KEY (created_by) REFERENCES users (id) ON DELETE RESTRICT,
	FOREIGN KEY (updated_by) REFERENCES users (id) ON DELETE RESTRICT,
	FOREIGN KEY (published_by) REFERENCES users (id) ON DELETE RESTRICT
);

CREATE INDEX ON content (slug);
CREATE INDEX ON content (type);

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back

