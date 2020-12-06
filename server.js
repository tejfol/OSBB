if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');


const indexRouter = require('./routes/index')
const osbbRouter = require('./routes/osbb')
const residentsRouter = require('./routes/residents')
const newsRouter = require('./routes/news')
const contactsRouter = require('./routes/contacts')
const announcementsRouter = require('./routes/announcements')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

app.use(expressLayouts)
app.use(cookieParser());
app.use(session({
    secret: process.env.cookie_secret,
    resave: true,
    saveUninitialized: true,
    cookie : {
        maxAge:(1000 * 60 * 100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'))
app.use('/uploads', express.static('uploads'))
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: false
}))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))


app.use('/admin', indexRouter)
app.use('/osbb', osbbRouter)
app.use('/residents', residentsRouter)
app.use('/news', newsRouter)
app.use('/contacts', contactsRouter)
app.use('/announcements', announcementsRouter)

app.listen(process.env.PORT || 3000)
console.log("http://localhost:3000");