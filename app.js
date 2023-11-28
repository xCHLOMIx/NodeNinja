const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended:true }));
app.use(express.static('Styles'));

mongoose.connect('mongodb://localhost:27017/BlogNinja')
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err))
app.get('/', (req,res) => {
    res.redirect('/all-blogs')
});
app.get('/about', (req,res) => {
    res.render('about', { title: 'About'});
});
app.get('/create', (req,res) =>{
    res.render('create', { title: 'Create Blog'});
});
app.post('/blog', async (req,res) => {
    const blog = new Blog(req.body)

    return await blog.save()
        .then((result) =>{
            res.redirect('/all-blogs')
        })
})
app.get('/all-blogs', (req,res) =>{
    Blog.find()
        .then((result) => {
            res.render('index', {title: 'All Blogs', blogs: result})
        })
})
app.get('/blogs/:id', (req,res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) =>{
            res.render('details', { blog: result, title: 'Details'})
        })
        .catch((err) =>{
            console.log(err)
        });
})
app.use((req,res)=>{
    res.render('404', { title: '404'});
});