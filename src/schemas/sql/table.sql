create table users (
	id serial not null primary key,
	username text unique not null,
	password text unique not null,
	first_name text NOT NULL,
	last_name text not null,
    refresh_token text
);

