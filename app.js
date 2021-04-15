const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();
const methodOverride = require('method-override');
const session = require('express-session')

const blogRouter = require('./routers/blogRouter');
const userRouter = require('./routers/userRouter');
const postRouter = require('./routers/postRouter');
const authRouter = require('./routers/authRouter');


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

app.get(["/explore", "/profile"], (req, res, next) => {
    let {user} = req.session
    if(user) {
      next()
    } else {
      res.redirect("/login")
    }
});

app.use('/', authRouter)
app.use('/blogs', blogRouter)
app.use('/users', userRouter)
app.use('/posts', postRouter)

app.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/login')
})

app.listen(PORT, () => {console.log(`Server starting on port ${PORT}, click here (http://127.0.0.1:${PORT}/)`)});