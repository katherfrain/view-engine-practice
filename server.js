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
        }
    })
})

app.get('/about', (req, res) => {
    res.send("<p>The purpose of this page is to ensure that I understand Node.js and Express.js terms by creating a database of my favorite poets and creatively using that data.</p>")
})

app.get('/poets/', (req, res) => {
    let poets = ""; 
    for(let x = 0; x < data.length; x++){
        var poet = data[x];
        poets += `<li><a href="/poets/${poet.name}">${poet.name}</a></li>`
    }
    res.send(`<ul>
    ${poets}
    </ul>`)
})
app.get('/poets/:name', (req, res) => {
    const { name } = req.params;
    const isPoet = data.find(element => {
        if(element.name == name){
            return true;
        }
        return false;
    })
    if(!isPoet){
        res.status(404);
        res.send("I haven't added that poet yet!")
    }
    res.send(`<Ah, one of my favorite poets: <br> 
    <h1>${isPoet.name} </h1><br>
    <p>was born in ${isPoet.born}. Their best work to date is <a href=${isPoet.bestref}>${isPoet.best}.</a><br>
    Would I AVOID reading this work to children? ${isPoet.cw}`);
})

server.listen(port, hostname, () => {
    console.log(`The server is running at http://${hostname}:${port}/`)
})