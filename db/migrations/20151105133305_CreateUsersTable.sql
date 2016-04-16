
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
CREATE TABLE users (
	id serial,
	username varchar(150) NOT NULL CHECK(name <> ''),
	password varchar(60) NOT NULL,
	name varchar(150) NOT NULL CHECK(name <> ''),
	slug varchar(150) NOT NULL CHECK(slug <> ''),
	email varchar(254) NOT NULL CHECK(email <> ''),
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
	updated_at timestamp(6) WITH TIME ZONE NOT NULL DEFAULT NOW(),
	role_id int NOT NULL,
	meta jsonb NOT NULL DEFAULT '{}',

	PRIMARY KEY (id),
	UNIQUE (username),
	UNIQUE (slug),
	UNIQUE (email),

	FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE RESTRICT
);

CREATE INDEX ON users (slug);
CREATE INDEX ON users (email);
CREATE INDEX ON users (status) WHERE status = 'active';


INSERT INTO users (
	username,
	name,
	slug,
	email,
	password,
	role_id
) VALUES (
	'superadmin',
	'superadmin',
	'mewben',
	'test@test.com',
	'$2a$10$JLiXfYkmX7L1kRLuuAAth.7.QN5G18e9pl8BZpeOxTVbuijhQ6Hs6',
	1
);
-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
