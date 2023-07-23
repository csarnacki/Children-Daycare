const path = require('path');
const express = require('express');
const routes = require('./controllers');
//const session = require('express-session');
//const exphbs = require('express-handlebars');

const sequelize = require('./config/connect');

const app = express();
const PORT = process.env.PORT || 3001;

//app.use(session());

//app.engine('handlebars', hbs.engine);
//app.set('view-engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.listen(PORT, () => {
    console.log(`The server is now running on port ${PORT}`);
});