-- FIRST VIEW returns all accepted snippets organized by story name, date of completion, and date of acceptance

SELECT users1.username AS story_owner,
stories.name AS story,
stories.date_created AS born_on,
stories.date_completed AS completed_on,
snippets.date_accepted AS snippet_accepted_date,
users2.username AS snippet_author,
stories.content_tags AS tags
FROM snippets
JOIN stories ON story_id = stories.id
JOIN users AS users1 ON owner_id = users1.id
JOIN users AS users2 ON user_id = users2.id
WHERE snippets.date_accepted IS NOT NULL-- THIS IS WHERE YOU FILTER RESULTS
ORDER BY story, completed_on DESC, born_on DESC, snippet_accepted_date ASC;


-- WHERE CLAUSES: TBD

