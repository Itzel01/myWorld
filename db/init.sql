DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS blogs CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS playlists CASCADE;

-- CREATE TABLE users
CREATE TABLE users (id SERIAL PRIMARY KEY, user_name TEXT, email TEXT, encypted_password CHAR(60));

-- INSERT some data into users
INSERT INTO users (user_name, email, encypted_password) VALUES
	('Olivia', 'olivia@gmail.com', '1234'),
	('Jarrit', 'Jarrit@outlook.com', '12345'),
	('Itzel', 'Itzel@twitch.com', '123456');
	
-- CREATE TABLE blogs
CREATE TABLE blogs (id SERIAL PRIMARY KEY, title TEXT, blog_content TEXT, user_id INT REFERENCES users(id));

-- INSERT some data into blogs
INSERT INTO blogs (user_id, title, blog_content) VALUES
	(1, 'Ten Reasons Why People Love Anything ', 'content'),
	(2, 'Why Is Ice Cream Considered Underrated?', 'content'),
	(3, 'Things You Did not Know About Soda', 'content'),
	(1, 'You Will Never Believe These Bizarre Truth Of Video Games', 'content'),
	(2, 'The best about Javascript', 'content'),
	(3, 'Why every loves a good CSS joke', 'content');

-- CREATE TABLE posts
CREATE TABLE posts (id SERIAL PRIMARY KEY, post_content TEXT, user_id INT REFERENCES users(id), likes INT, shares INT);

-- INSERT some data into posts
INSERT INTO posts (user_id, post_content, likes, shares) VALUES
	(1,  'content', 2, 5),
	(2,  'content', 6, 8),
	(3,  'content', 3, 2),
	(1,  'content', 6, 9),
	(2,  'content', 1, 5),
	(3,  'content', 9, 1);
	
-- CREATE TABLE playlists
CREATE TABLE playlists (id SERIAL PRIMARY KEY, user_id INT REFERENCES users(id), title TEXT,  artist TEXT, media_link TEXT);

-- INSERT some data into playlists
INSERT INTO playlists (user_id, title, artist, media_link) VALUES
	(1,  'Never', 'RA', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'),
	(2,  'Never', 'RA', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'),
	(3,  'Never', 'RA', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'),
	(1,  'Never', 'RA', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'),
	(2,  'Never', 'RA', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'),
	(3,  'Never', 'RA', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ');

CREATE TABLE bookmarks (userBookmarking Int REFERENCES users(id), bookmarkedBlog INT REFERENCES blogs(id));

INSERT INTO bookmarks (userBookmarking, bookmarkedBlog) VALUES (1,1);