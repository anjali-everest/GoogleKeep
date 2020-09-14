-- Verify googlekeep:notes on pg

BEGIN;

SELECT id, title, content
  FROM notes;

ROLLBACK;
