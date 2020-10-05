const express = require('express');
const http = require('http');
const es6Renderer = require('express-es6-template-engine');
const hostname = '127.0.0.1';
const port = 3000;
const data = require('./db');

const app = express();

app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html')

const server = http.createServer(app);

app.get('/', (req, res) => {
    res.render('home', { 
        locals: {
            globalvariable: 'GOOD LORD IT WORKS'
        },
        partials: {
            head: 'partials/head'
        }
    })
})

app.get('/about', (req, res) => {
    res.send("<p>The purpose of this page is to ensure that I understand Node.js and Express.js terms by creating a database of my favorite poets and creatively using that data.</p>")
})

app.get('/poets/', (req, res) => {
   res.render('poet-list', {
       locals: {
           data: data,
       }
   })
})

app.get('/poets/:name', (req, res) => {
    const { name } = req.params;
    const thisPoet = data.find(element => {
        if(element.name == name){
            return true;
        }
        return false;
    })
    if(!thisPoet){
        res.status(404);
        res.send("I haven't added that poet yet!")
    }
    res.render('poet', {
        locals: {
            isPoet: thisPoet
        }
    });
})

server.listen(port, hostname, () => {
    console.log(`The server is running at http://${hostname}:${port}/`)
})