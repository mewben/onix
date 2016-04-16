
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
CREATE TABLE refresh_tokens (
	id SERIAL,
	user_id int NOT NULL,
	token varchar(254) NOT NULL,
	expires timestamp(6) WITH TIME ZONE NULL,

	PRIMARY KEY (id),
	UNIQUE (token)
);

CREATE INDEX ON refresh_tokens (user_id);

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
-- DROP TABLE km_refresh_tokens;
