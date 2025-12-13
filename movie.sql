
/*user ja group on SQL:n omia sanoja niin
 pitää käyttää "" */

CREATE TABLE "user" (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(30) NOT NULL UNIQUE,
  email VARCHAR(60) NOT NULL UNIQUE,
  password VARCHAR(60) NOT NULL,
  pfp_url VARCHAR (500)
);

/*Lisäsin tämän, siinä on sekä elokuvien että sarjojen perustiedot
Eli entinen movie INT ja series INT on nyt content*/
CREATE TABLE content (
  content_id SERIAL PRIMARY KEY,
  tmdb_id VARCHAR(20) UNIQUE,
  title VARCHAR(100) NOT NULL,
  release_year INT,
  genre VARCHAR(50),
  description TEXT,
  poster_url VARCHAR(500),
  content_type VARCHAR(10) NOT NULL CHECK (content_type IN ('movie', 'series'))
);

CREATE TABLE movielist (
  list_id SERIAL PRIMARY KEY,
  list_name VARCHAR(30) NOT NULL,
  user_id INT REFERENCES "user"(user_id) ON DELETE CASCADE
);

/*Tämä mahdollistaa usean elokuvan/sarjan listassa*/
CREATE TABLE movielist_content (
    list_id INT NOT NULL REFERENCES movielist(list_id) ON DELETE CASCADE,
    content_id INT NOT NULL REFERENCES content(content_id) ON DELETE CASCADE,
    PRIMARY KEY (list_id, content_id)
);

CREATE TABLE favourites (
  favourites_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES "user"(user_id) ON DELETE CASCADE,
  content_id INT NOT NULL REFERENCES content(content_id) ON DELETE CASCADE,
  UNIQUE (user_id, content_id)
);

CREATE TABLE review (
  review_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES "user"(user_id) ON DELETE CASCADE,
  content_id INT NOT NULL REFERENCES content(content_id) ON DELETE CASCADE,
  review_date DATE DEFAULT CURRENT_DATE,
  review_text VARCHAR(1500),
  rating INT CHECK (rating BETWEEN 1 AND 10)
);

CREATE TABLE "group" (
  group_id SERIAL PRIMARY KEY,
  group_name VARCHAR(30) NOT NULL,
  groupicon_url VARCHAR(500),
  showtime_place VARCHAR(60),
  showtime_date DATE,
  service_provider VARCHAR(500)
  /* Käytä tätä group_content sijaan, jos haluaa, että ryhmässä on vain yksi content*/
  /*content_id INT REFERENCES content(content_id) ON DELETE SET NULL*/
);

CREATE TABLE group_content (
  group_id INT NOT NULL REFERENCES "group"(group_id) ON DELETE CASCADE,
  content_id INT NOT NULL REFERENCES content(content_id) ON DELETE CASCADE,
  PRIMARY KEY(group_id, content_id)
);

CREATE TABLE user_group (
  user_id INT NOT NULL REFERENCES "user"(user_id) ON DELETE CASCADE,
  group_id INT NOT NULL REFERENCES "group"(group_id) ON DELETE CASCADE,
  is_owner BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (user_id, group_id)
);

CREATE TABLE group_join_request(
  request_id SERIAL PRIMARY KEY,
  group_id INT NOT NULL REFERENCES "group"(group_id) ON DELETE CASCADE,
  user_id INT NOT NULL REFERENCES "user"(user_id) ON DELETE CASCADE,
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)