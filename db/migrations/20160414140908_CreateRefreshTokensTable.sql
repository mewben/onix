
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
CREATE TABLE refresh_tokens (
	id serial,
	user_id int NOT NULL,
	token varchar(254) NOT NULL CHECK(token <> ''),
	expires_in timestamp(6) WITH TIME ZONE NOT NULL DEFAULT NOW(),

	created_at timestamp(6) WITH TIME ZONE NOT NULL DEFAULT NOW(),

	PRIMARY KEY (id),
	UNIQUE (user_id),
	FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE INDEX ON refresh_tokens (user_id);
CREATE INDEX ON refresh_tokens (token);

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
