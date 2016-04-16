
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
CREATE TABLE roles (
	id serial,
	name varchar(150) NOT NULL CHECK(name <> ''),
	description varchar(200) NULL,
	created_at timestamp(6) WITH TIME ZONE NOT NULL DEFAULT NOW(),
	updated_at timestamp(6) WITH TIME ZONE NOT NULL DEFAULT NOW(),

	PRIMARY KEY (id),
	UNIQUE (name)
);

CREATE INDEX ON roles (name);

INSERT INTO roles (
	name
) VALUES (
	'Super Administrator'
);

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back

