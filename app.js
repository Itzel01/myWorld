const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();
const methodOverride = require('method-override');

const blogRouter = require('./routers/blogRouter');
const userRouter = require('./routers/userRouter');
const postRouter = require('./routers/postRouter');


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

app.use('/', (req, res, next) => {
    console.log(req.method, req.url)
    next()
})

app.use('/blogs', blogRouter)
app.use('/users', userRouter)
app.use('/posts', postRouter)

app.listen(PORT, () => {console.log(`Server starting on port ${PORT}`)});