
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
CREATE TABLE tags (
	id serial,
	name varchar(250) NOT NULL CHECK(name <> ''),
	slug varchar(250) NOT NULL CHECK(slug <> ''),
	description varchar(200) NOT NULL DEFAULT '',
	image varchar(254) NOT NULL DEFAULT '',
	is_visible bool NOT NULL DEFAULT true,
	parent_id int NOT NULL DEFAULT 0,
	meta_title varchar(150) NOT NULL DEFAULT '',
	meta_description varchar(200) NOT NULL DEFAULT '',
	created_at timestamp(6) WITH TIME ZONE NOT NULL DEFAULT NOW(),
	updated_at timestamp(6) WITH TIME ZONE NOT NULL DEFAULT NOW(),

	PRIMARY KEY (id),
	UNIQUE (slug)
);

CREATE INDEX ON tags (slug);

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back

