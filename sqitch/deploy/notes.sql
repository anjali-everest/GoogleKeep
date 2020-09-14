-- Deploy googlekeep:notes to pg
-- requires: appschema

BEGIN;

CREATE TABLE notes (
    id  SERIAL PRIMARY KEY,
    title  VARCHAR(512),
    content VARCHAR(512)
);

COMMIT;
