-- Revert googlekeep:notes from pg

BEGIN;

DROP TABLE notes;

COMMIT;
