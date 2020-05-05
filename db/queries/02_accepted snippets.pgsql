-- GET all accepted snippets from all stories
-- Get the story owner's name and the author of each update
-- Get the time of each update
-- get the contents of each snippet
-- ORDER BY story,
-- then by date completed
-- then by date_created
-- then by snippet_accepted_date



SELECT users1.username AS story_owner,
stories.name AS story,
stories.date_created AS born_on,
stories.date_completed AS completed_on,
snippets.date_accepted AS snippet_accepted_date,
users2.username AS snippet_author
FROM snippets
JOIN stories ON story_id = stories.id
JOIN users AS users1 ON owner_id = users1.id
JOIN users AS users2 ON user_id = users2.id
WHERE snippets.date_accepted IS NOT NULL
ORDER BY story, completed_on DESC, born_on DESC, snippet_accepted_date ASC;
