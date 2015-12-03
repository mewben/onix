
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
CREATE TABLE users (
	id serial,
	uuid varchar(36) NOT NULL,
	name varchar(150) NOT NULL,
	slug varchar(150) NOT NULL,
	email varchar(254) NOT NULL,
	password varchar(60) NOT NULL,
	image varchar(254) NULL,
	cover varchar(254) NULL,
	bio varchar(254) NULL,
	website varchar(254) NULL,
	location varchar(254) NULL,
	status varchar(150) NOT NULL DEFAULT 'active',
	language varchar(6) NOT NULL DEFAULT 'en_US',
	meta_title varchar(150) NULL,
	meta_description varchar(200) NULL,
	last_login timestamp(6) WITH TIME ZONE NULL,
	created_at timestamp(6) WITH TIME ZONE NOT NULL DEFAULT NOW(),
	created_by int NULL,
	updated_at timestamp(6) WITH TIME ZONE NOT NULL DEFAULT NOW(),
	updated_by int NULL,

	PRIMARY KEY (id),
	UNIQUE (slug),
	UNIQUE (email),
	FOREIGN KEY (created_by) REFERENCES users (id) ON DELETE RESTRICT,
	FOREIGN KEY (updated_by) REFERENCES users (id) ON DELETE RESTRICT
);

CREATE INDEX ON users (slug);
CREATE INDEX ON users (email);
CREATE INDEX ON users (status) WHERE status = 'active';


INSERT INTO users (
	uuid,
	name,
	slug,
	email,
	password
) VALUES (
	'4857d65d-15af-4fc2-be28-209447c71f78',
	'Melvin Soldia',
	'mewben',
	'melvinsoldia@gmail.com',
	'$2a$10$JLiXfYkmX7L1kRLuuAAth.7.QN5G18e9pl8BZpeOxTVbuijhQ6Hs6'
);
-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
