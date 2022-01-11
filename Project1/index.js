const exp = require('constants');
const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./Members');

const app = express();


// HANDLEBARS MIDDLEWARE
// app.engine('handlebars', exphbs({defaultLayout: 'main'}));
// app.set('view engine', 'handlebars');

app.engine('handlebars', engine({ extname: '.handlebars', defaultLayout: "main"}));
app.set('view engine', 'handlebars');
app.set("views", "./views");

//homepage route
app.get('/', (req, res) => res.render('index', {
    title: 'Member App',
    members
}));

// const logger = (req, res, next) => {
//     console.log('bai bai, halow');
//     next();
// }

// INIT MIDDLEWARE
//app.use(logger);

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

// SET STATIC FOLDER
app.use(express.static(path.join(__dirname, 'public')));

// members api routes
app.use('/api/members', require('./routes/api/member'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
