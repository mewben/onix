
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
CREATE TABLE roles (
	id serial,
	uuid varchar(36) NOT NULL,
	name varchar(150) NOT NULL,
	description varchar(200) NULL,
	created_at timestamp(6) WITH TIME ZONE NOT NULL DEFAULT NOW(),
	created_by int NOT NULL,
	updated_at timestamp(6) WITH TIME ZONE NOT NULL DEFAULT NOW(),
	updated_by int NOT NULL,

	PRIMARY KEY (id),
	UNIQUE (name),

	FOREIGN KEY (created_by) REFERENCES users (id) ON DELETE RESTRICT,
	FOREIGN KEY (updated_by) REFERENCES users (id) ON DELETE RESTRICT
);

CREATE INDEX ON roles (name);

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back

