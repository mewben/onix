
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
CREATE TABLE posts (
	id serial,
	title varchar(250) NOT NULL CHECK(title <> ''),
	subtitle varchar(250) NULL,
	slug varchar(150) NOT NULL CHECK(slug <> ''),
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

CREATE INDEX ON posts (slug);
CREATE INDEX ON posts (status);

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back

