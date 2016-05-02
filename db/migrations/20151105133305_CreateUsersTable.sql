
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
CREATE TABLE users (
	id serial,
	username varchar(150) NOT NULL CHECK(username <> ''),
	password varchar(60) NOT NULL CHECK(password <> ''),
	name varchar(150) NOT NULL CHECK(name <> ''),
	slug varchar(150) NOT NULL CHECK(slug <> ''),
	email varchar(254) NOT NULL CHECK(email <> ''),
	role role_type NOT NULL DEFAULT 'author',
	image varchar(254) NOT NULL DEFAULT '',
	status varchar(150) NOT NULL DEFAULT 'active',
	location varchar(254) NOT NULL DEFAULT '',
	language varchar(6) NOT NULL DEFAULT 'en_US',
	cover varchar(254) NOT NULL DEFAULT '',
	bio varchar(254) NOT NULL DEFAULT '',
	website varchar(254) NOT NULL DEFAULT '',
	meta_title varchar(150) NOT NULL DEFAULT '',
	meta_description varchar(200) NOT NULL DEFAULT '',
	last_login timestamp(6) WITH TIME ZONE NULL,
	created_at timestamp(6) WITH TIME ZONE NOT NULL DEFAULT NOW(),
	updated_at timestamp(6) WITH TIME ZONE NOT NULL DEFAULT NOW(),
	meta jsonb NOT NULL DEFAULT '{}',

	PRIMARY KEY (id),
	UNIQUE (username),
	UNIQUE (slug),
	UNIQUE (email)
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
	role
) VALUES (
	'superadmin',
	'superadmin',
	'mewben',
	'test@test.com',
	'$2a$10$1XgKA63VuR/FN.xU2tJ/zOVbQREMDbCGtOx4gE3iUolMx0D4eJADe', -- pass
	'superadmin'
);
-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
