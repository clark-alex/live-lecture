require('dotenv').config()
const express = require('express')
    , session = require('express-session')
    , massive = require('massive')
    , bodyParser = require('body-parser')
    , questions_ctrl = require('./questions_ctrl')
    , checkUserSession = require('./middleware/checkForUserSession')
    , authCtrl = require('./controllers/authController')
    , apiCtrl = require('./controllers/apiController')

const app = express()
app.use(bodyParser.json())

const {
    CONNECTION_STRING,
    SERVER_PORT,
    SESSION_SECRET
} = process.env

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(checkUserSession)

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`))
})

// ====== auth endpoints =====
app.post('/auth/login', authCtrl.loginUser)
app.post('/auth/register', authCtrl.registerUser)
app.get('/auth/logout', authCtrl.logout) 

// ====== api endpoints ======
app.get('/api/getUser', apiCtrl.getCurrentUser)
app.get('/api/userLectures', apiCtrl.getUserLectures)



