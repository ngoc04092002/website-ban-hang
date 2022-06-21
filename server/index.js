const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const DB = require('./config/DB');
const db = require('./models');
const router = require('./routes/index');
// const verifyJWT = require('./middlewares/verifyJWT');

require('dotenv').config({ path: path.resolve(__dirname + '/.env') });

DB.connect();
var sess = {
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 259200000,
    },
};

app.use(
    cors({
        credentials: true,
        origin: process.env.PATH_CLIENT,
        methods: 'GET,POST,PUT,DELETE',
    }),
);
app.use(cookieParser());
app.use(session(sess));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use(verifyJWT());
app.use(helmet());

router(app);
app.get('/heroku ', (req, res) => {
    res.send('heroku');
});

const PORT = 5000 || process.env.PORT;
db.sequelize
    .sync()
    .then(() => {
        app.listen(PORT, () => console.log('server is running on port ' + PORT));
    })
    .catch((e) => console.log('connect fail'));
