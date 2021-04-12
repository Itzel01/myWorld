const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();
const methodOverride = require('method-override');

const blogRouter = require('./routers/blogRouter');
const userRouter = require('./routers/userRouter');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

app.use('/blogs', blogRouter)
app.use('/users', userRouter)


app.listen(PORT, () => {console.log(`Server starting on port ${PORT}`)});