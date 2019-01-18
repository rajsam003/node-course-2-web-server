const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
//middleware
app.use(express.static(__dirname + '/public'));

app.use((req, res, next ) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err)=> {
        if(err) {
            console.log('Unable to append to server.log');
        }
    })
    next();
});

// app.use((req, res, next) => {
//     res.render('maintainance.hbs');
// });

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('kathiSollu', (text) => {
    return text.toUpperCase();
});

app.get('/', (req,res)=>{
    // //res.send(<h1>Hello World</h1>);
    // res.send({
    //     name: 'Sam',
    //     age: 24
    // });
    res.render('home.hbs',{
        pageTitle: 'About Sam Page',
        mairu: 'Poda mairu'
    })
});

app.get('/bad', (req,res)=>{
res.send({
    errorMessage: '404 ERROR'
    });
});

app.get('/about', (req,res)=> {
    res.render('about.hbs',{
        pageTitle: 'About Sam Page'
    });
});

app.get('/projects', (req,res)=> {
    res.render('projects.hbs',{
        pageTitle: 'Projects'
    });
});

app.listen(port, ()=> {
    console.log('Server is up in ' + port);
});
//Changes testing