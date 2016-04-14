
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
CREATE TABLE sites (
	id int NOT NULL, -- randomly generated
	name varchar(250) NOT NULL, -- title of the site
	description varchar(250) NULL, -- tagline or description of the site
	url varchar(255) NOT NULL, -- full url of the site
	lang varchar(5) NOT NULL DEFAULT 'en',
	visible boolean NOT NULL DEFAULT true,
	meta jsonb NULL,

	PRIMARY KEY (id),
	UNIQUE (url)
);

CREATE INDEX ON sites (visible) WHERE visible = 't';

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back

