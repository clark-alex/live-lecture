CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100),
    password VARCHAR(100),
    email VARCHAR(20),
);
CREATE TABLE lecture(
    lecture_id SERIAL PRIMARY KEY,
    instuctor_id INT REFERENCES users(user_id),
    lecture_name VARCHAR(50),
    date_created TIMESTAMP
)
CREATE TABLE registered_students(
    registered_students_id SERIAL PRIMARY KEY,
    lecture_id INT REFERENCES lecture(lecture_id),
    user_id INT REFERENCES  users(user_id)
)
CREATE TABLE questions(
    question_id SERIAL PRIMARY KEY,
    lecture_id INT REFERENCES lecture(lecture_id),
    question_title VARCHAR(50),
    question_time INT
);
CREATE TABLE comments(
    comment_id SERIAL PRIMARY KEY,
    question_id INT REFERENCES questions(question_id),
    user_id INT REFERENCES users(user_id),
    comment VARCHAR(500),
    votes INT
)
