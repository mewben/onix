
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
CREATE TABLE settings (
	id serial,
	key varchar(150) NOT NULL CHECK(key <> ''),
	value text NOT NULL DEFAULT '',

	created_at timestamp(6) WITH TIME ZONE NOT NULL DEFAULT NOW(),
	updated_at timestamp(6) WITH TIME ZONE NOT NULL DEFAULT NOW(),
	updated_by int NOT NULL DEFAULT 0,

	PRIMARY KEY (id),
	UNIQUE (key)
);

CREATE INDEX ON settings (key);

INSERT INTO settings (
	key,
	value
) VALUES (
	'admin_signingkey',
	'evdzpwadminsing'
), (
	'admin_jwt_exp',
	'5'
), (
	'admin_session',
	'30'
), (
	'site',
	`{
		"site_title": "Onix Blog",
		"site_tagline": "A simple Blogging Platform",
		"site_description": "Free blog using Go",
		"site_address": "http://localhost:1310/",
		"site_language": "en",
		"site_privacy": "public",
		"site_enable_comment": "1",
		"site_menu": "<a href='/'>Home</a>"
	}`
);

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
