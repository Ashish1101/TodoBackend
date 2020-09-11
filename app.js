const express = require('express');
const app = express();
const mongoDb = require('./config/db')
const passport = require('passport')
const cookieSession = require('cookie-session')
//require('./passport/passport')(passport);
const cors = require('cors')

//port
const PORT = process.env.PORT || 5000;

//passport
// app.use(passport.initialize());
// app.use(passport.session())

// app.use(cookieSession({
//   name: 'session',
//   keys: ['key1', 'key2']
// }))

app.use(cors())
//middleware
app.use(express.json());
app.use(express.urlencoded({extended : false}))
app.use('/register' , require('./routes/User/user'))
app.use('/auth' , require('./routes/User/auth'))
app.use('/tasks', require('./routes/task'))

//test route
app.get('/test' , (req , res) => {
    res.send('working')
})

app.get('/' , (req, res) => {
    res.send('home')
})

//database
mongoDb();




//listening to server
app.listen(PORT , () => console.log(`server is running on ${PORT}`))