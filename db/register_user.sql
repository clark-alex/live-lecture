INSERT INTO users 
(username, password, email, status)
VALUES
($1,$2,$3,$4);
SELECT * FROM users
WHERE username = $1

