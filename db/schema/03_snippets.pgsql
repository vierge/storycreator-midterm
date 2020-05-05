-- snippets table! (remaned from contributions in the ERD)
-- THIS IS A JOIN TABLE

-- Q's to A: should we create a sub_id for the order of snippets in a story?

DROP TABLE IF EXISTS snippets CASCADE;
CREATE TABLE snippets (
  id SERIAL PRIMARY KEY NOT NULL,
  story_id INTEGER REFERENCES stories(id),
  user_id INTEGER REFERENCES users(id),
  date_created TIMESTAMP NOT NULL DEFAULT Now(),
  vote_count INTEGER NOT NULL DEFAULT 0,
  date_accepted TIMESTAMP,
  contents TEXT
);

