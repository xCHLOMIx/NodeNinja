const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res)=>{
    console.log('Worked');

    res.setHeader('Content-Type', 'text/html');
    let path = './Views/';
    switch(req.url){
        case '/': 
        path += 'index.html';
        break;

        case '/about':
        path += 'about.html';
        break;

        default:
        path += 'notfound.html';
    }
    fs.readFile(path, (err, data)=>{
        if(err){
            console.log(err);
            res.end();
        }
        else{
            res.end(data);
        }
    })
});

server.listen(3000, 'localhost', ()=>{
    console.log('Checking tuu!');
})
