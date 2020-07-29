const express = require('express');
const path = require('path');
const connect = require('./config/db')
const exphbs = require('express-handlebars');
const Passportjs = require('./config/passport')
const passport = require('passport');
const session = require('express-session')
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session)
const methodOverride = require('method-override');

const app = express();

// Passport

app.use(express.urlencoded({extended:false}))
app.use(express.json())

// Helpers
const {formatDate, ifEquals} = require('./helpers/hbs')

//method override
app.use(methodOverride('_method'))



//Handlebars setting
app.engine('.hbs', exphbs({helpers:{
    formatDate,
    ifEquals,
},defaultLayout:'main',extname:'.hbs'}))
app.set('view engine', '.hbs')

// Session
app.use(
    session({
        secret:'shaxriyor',
        resave:false,
        saveUninitialized:false,
        cookie:null,
        store: new MongoStore({mongooseConnection:mongoose.connection})
    })
)
app.use(passport.initialize());
app.use(passport.session());
// Static files
app.use(express.static(path.join(__dirname, '/Static')))

//Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/notes', require('./routes/notes'))
app.get("*", (req, res)=>{
    // res.send('Error')
    res.render('404', {layout: false})
})





const port = process.env.PORT ||3000
app.listen(port, ()=>{
    console.log('Server is running', port)
})