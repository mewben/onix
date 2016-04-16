
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
CREATE TABLE settings (
	id serial,
	key varchar(150) NOT NULL,
	value text NULL,
	created_at timestamp(6) WITH TIME ZONE NOT NULL DEFAULT NOW(),
	updated_at timestamp(6) WITH TIME ZONE NOT NULL DEFAULT NOW(),

	PRIMARY KEY (id),
	UNIQUE (key)
);

CREATE INDEX ON settings (key);

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back

