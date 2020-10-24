DROP TABLE if exists loc;

CREATE TABLE loc (
  search_query VARCHAR(255),
  formatted_query VARCHAR(255),
  latitude VARCHAR(255),
  longitude VARCHAR(255)
);

DROP TABLE if exists weather;

CREATE TABLE weather (
  id SERIAL PRIMARY KEY,
  forecast VARCHAR(255),
  timing VARCHAR(255)
);

DROP TABLE if exists hiking;

CREATE TABLE hiking (
  names VARCHAR(255),
  loc VARCHAR(255),
  leng VARCHAR(255),
  stars VARCHAR(255),
  starVotes VARCHAR(255),
  summary VARCHAR(255),
  trail_url VARCHAR(255),
  conditions VARCHAR(255),
  conditionsDate VARCHAR(255),
  conditionsTime VARCHAR(255)
);