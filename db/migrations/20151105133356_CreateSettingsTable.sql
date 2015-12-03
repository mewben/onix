
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
CREATE TABLE settings (
	id serial,
	uuid varchar(36) NOT NULL,
	key varchar(150) NOT NULL,
	value text NULL,
	type varchar(150) NOT NULL DEFAULT 'core',
	created_at timestamp(6) WITH TIME ZONE NOT NULL DEFAULT NOW(),
	created_by int NOT NULL,
	updated_at timestamp(6) WITH TIME ZONE NOT NULL DEFAULT NOW(),
	updated_by int NOT NULL,

	PRIMARY KEY (id),
	UNIQUE (key),

	FOREIGN KEY (created_by) REFERENCES users (id) ON DELETE RESTRICT,
	FOREIGN KEY (updated_by) REFERENCES users (id) ON DELETE RESTRICT
);

CREATE INDEX ON settings (key);

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back

