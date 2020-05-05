-- (over)write stories table
-- vscode treats CASCADE in line 4 as an error? note to investigate later


DROP TABLE IF EXISTS stories CASCADE;
CREATE TABLE stories (
  id SERIAL PRIMARY KEY NOT NULL,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  date_created TIMESTAMP NOT NULL DEFAULT Now(),
  date_completed TIMESTAMP,
  is_locked BOOLEAN DEFAULT false
);

