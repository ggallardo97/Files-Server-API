require('dotenv').config();
const express    = require('express');
const session    = require('express-session');
const fileUpload = require('express-fileupload');
const morgan     = require('morgan');
const cors       = require('cors');
const fs         = require('fs');
const mongoose   = require('mongoose');
const path       = require('path');
const users      = require('./routes/users');
const files      = require('./routes/files');
const authJwt    = require('./helpers/jwt');
const errorHandler = require('./helpers/errorHandler');
const app        = express();
const port       = process.env.PORT || 3000;
const dbconn     = process.env.CONNECTION_DB;
const api        = process.env.API_URL;

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

//Middlewares
app.use(cors());
app.use(express.json());
app.use(session({
    secret: 'MusicSquare',
    resave: true,
    saveUninitialized: true
}));
app.use(express.urlencoded({extended : true}));
app.use(morgan('tiny', { stream: accessLogStream }));
app.use(authJwt);
app.use(errorHandler);
app.use(fileUpload());
app.use(`${api}/users`, users);
app.use(`${api}/files`, files);
app.use(express.static(__dirname + '/uploadedFiles'));

//DB connection
mongoose.connect(dbconn)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Cannot connect to MongoDB: ' + err));

//Server
app.listen(port, () => {
    console.log('Server listening on port: ' + port);
});