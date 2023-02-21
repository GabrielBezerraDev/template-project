//teste 32442
require('dotenv').config();

const path = require('path')
const express = require('express')
const routes = require('./routes')
const mongoose = require('mongoose');
const csrf = require('csurf')
const app = express()
const session = require('express-session')
const { csrfMiddleware } = require('./src/middlewares/middleware')
const {middlewareGlobal} = require('./src/middlewares/middleware')
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const helmet = require('helmet');

mongoose.set('strictQuery', true)
mongoose.connect(process.env.CONNECTIONSTRING).then(() => {
    app.emit('pronto')
}).catch(e => console.log(e))


app.use(helmet())

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({
    secret: 'akasdfj0út23453456+54qt23qv  qwf qwer qwer qewr asdasdasda a6()',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true
    }
  });
app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname,'src','views'))
app.set('view engine','ejs')

app.use(csrf())

app.use(middlewareGlobal)
app.use(csrfMiddleware)
app.use(routes)

app.listen(3000, () => {
    console.log('rondando porta 3000');
    console.log('http://localhost:3000');
})