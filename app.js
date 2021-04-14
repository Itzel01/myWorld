const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();
const methodOverride = require('method-override');
const session = require('express-session')

const registerRouter = require('./routers/registerRouter')
const loginRouter = require('./routers/loginRouter')
const blogRouter = require('./routers/blogRouter');
const userRouter = require('./routers/userRouter');
const postRouter = require('./routers/postRouter');


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

app.use(session({
    secret: 'wowwowwow',
    resave: false,
    saveUninitialized: false,
    name: 'Not a real Cookie1'
}))

app.use('/', (req, res, next) => {
    console.log(req.method, req.url)
    next()
})

app.get('/', (req, res) => {
    res.redirect('/login')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/register', (req, res) => {
    res.render('register')
})

// app.get("/users", (req, res) => {
//     let {user} = req.session
//     if(user) {
//       res.render("users", {user})
//     } else {
//       res.redirect("/login")
//     }
// });

app.use('/login', loginRouter)
app.use('/register', registerRouter)
app.use('/blogs', blogRouter)
app.use('/users', userRouter)

app.use('/posts', postRouter)

app.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/login')
})

app.listen(PORT, () => {console.log(`Server starting on port ${PORT}, click here (http://127.0.0.1:${PORT}/)`)});