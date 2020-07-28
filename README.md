# Jobly

Jobly is a full-stack mock job-search application in which users can login, view companies/jobs, and apply to open positions. Global state is managed with React Context and the backend features a RESTful API with token-based authentication. Integration tests are written with Jest and SuperTest.

Utilizes: React, React Context, Node, Express, JSON Web Tokens, Bcrypt, Jest, SuperTest, PostgreSQL.

Live demo: https://jobly-react-app.herokuapp.com/

Create a new account or login using the following information:

* Username: test
* Password: password

## Getting Started
To clone the repository run the following command:

```
git clone https://github.com/paigegodfrey/jobly.git
createdb jobly
psql jobly < data.sql
```

Start the backend server:

```
cd backend/
npm install
nodemon
```

Run the frontend:

```
cd frontend/
npm install
npm start
```

This was pair programming project, with collaborator: https://github.com/sairina
