
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
CREATE TABLE roles_users (
	id serial,
	role_id int NOT NULL,
	user_id int NOT NULL,

	PRIMARY KEY (id),
	UNIQUE (role_id, user_id),

	FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE RESTRICT,
	FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE RESTRICT
);

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back

