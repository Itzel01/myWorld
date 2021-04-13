DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS blogs CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS playlists CASCADE;
DROP TABLE IF EXISTS bookmarks CASCADE;

-- CREATE TABLE users
CREATE TABLE users (id SERIAL PRIMARY KEY, user_name TEXT, email TEXT, encypted_password CHAR(60));

-- INSERT some data into users
INSERT INTO users (user_name, email, encypted_password) VALUES
	('Olivia', 'olivia@gmail.com', '1234'),
	('Jarrit', 'Jarrit@outlook.com', '12345'),
	('Itzel', 'Itzel@twitch.com', '123456');
	
-- CREATE TABLE blogs
CREATE TABLE blogs (id SERIAL PRIMARY KEY, title TEXT, blog_content TEXT, created_at TIMESTAMP WITH TIME ZONE, user_id INT REFERENCES users(id));

-- INSERT some data into blogs
INSERT INTO blogs (user_id, title, blog_content, created_at) VALUES
	(1, 'Ten Reasons Why People Love Anything ', 'content', now()),
	(2, 'Why Is Ice Cream Considered Underrated?', 'content', now()),
	(3, 'Things You Did not Know About Soda', 'content', now()),
	(1, 'You Will Never Believe These Bizarre Truth Of Video Games', 'content', now()),
	(2, 'The best about Javascript', 'content', now()),
	(3, 'Why every loves a good CSS joke', 'content', now());

-- CREATE TABLE posts
CREATE TABLE posts (id SERIAL PRIMARY KEY, post_content TEXT, created_at TIMESTAMP WITH TIME ZONE, user_id INT REFERENCES users(id));

-- INSERT some data into posts
INSERT INTO posts (user_id, post_content, created_at) VALUES
	(1,  'content', now()),
	(2,  'content', now()),
	(3,  'content', now()),
	(1,  'content', now()),
	(2,  'content', now()),
	(3,  'content', now());
	
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