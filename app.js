const express = require('express');
const app = express();
port = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.use('/static', express.static('public'));

const data = require('./data.json');


app.get('/', (req, res, next) => {
  res.locals.projects = data.projects;
  res.render('index.pug');
});

app.get('/about', (req, res) => {
  res.render('about.pug');
});

app.get('/project/:id', (req, res) => {
  res.locals.project_name = data.projects[req.params.id - 1].project_name;
  res.locals.description = data.projects[req.params.id - 1].description;
  res.locals.technologies = data.projects[req.params.id - 1].technologies;
  res.locals.live_link = data.projects[req.params.id - 1].live_link;
  res.locals.github_link = data.projects[req.params.id - 1].github_link;
  res.locals.image_urls = data.projects[req.params.id - 1].image_urls;
  res.render('project.pug');
});

//Error handler for non-existent routes
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//Error handler for server errors
app.use((err, req, res, next) => {
  err.message = err.message || 'Oops! It looks like something went wrong on the server.';
  err.status = err.status || 500;
  res.status(err.status).render('error.pug', { err });
  console.log("Error handler called: Status " + err.status);
});

app.listen(port, () => {
  console.log(`app.js listening on port ${port}`);
});

