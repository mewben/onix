
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
CREATE TYPE role_type AS enum (
	'superadmin',
	'admin',
	'author',
	'provider',
	'subscriber'
);


-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back

