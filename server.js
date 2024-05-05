const express = require('express')
const mongoose = require('mongoose')
const article = require('./models/article')
const articlesRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express();



mongoose.connect('mongodb+srv://root:root@cluster0.aocimtk.mongodb.net/')
.then(()=>{
    console.log('connected to mongoDB');
});

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))

app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
    const articles = await article.find().sort({ createdAt: 'desc' })
    res.render('articles/index', { articles: articles });
})


app.use('/articles', articlesRouter)

app.listen(3000)