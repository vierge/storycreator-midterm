-- Users table seeds here
-- date_joined timestamps are gonna be a little weird

INSERT INTO users (username, password, email, display_name, is_active) VALUES
  ('vierge', 'angelc4t', 'marancholia@gmail.com', 'mara raine gray', DEFAULT),
  ('ariane', 'amazingpassword', 'ariane@gmail.com', 'Ariane The Dazzler', DEFAULT),
  ('whalesgood', 'ishmael123', 'melville.herman@gmail.com', 'Herman Melville', DEFAULT),
  ('meaningless-ecstasy', 'no3x1t', 'j.p.sartre@philosophy.com', 'Jean-Paul Sartre', false),
  ('muffin-maker', 'catgirls', 'meowmeowmeow@muffins.com', 'Cat Girl Enthusiast', DEFAULT),
  ('senpai', 'te4chm3', 'popular@school.net', 'Teach me, Senpai', DEFAULT);
