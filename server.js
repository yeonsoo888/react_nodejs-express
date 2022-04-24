const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const cors = require('cors');
const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;

const http = require('http').createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

let db;
MongoClient.connect('mongodb+srv://admin:qwer1234@cluster0.rtid5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',(에러,client)=>{
    
    if(에러) return console.log(에러);

    db = client.db('todoapp');
    http.listen(8080, function () {
        console.log('listening on 8080')
    }); 
})

app.use(express.static(path.join(__dirname, 'testapp/build')));

app.get('/', function (요청, 응답) {
    응답.sendFile(path.join(__dirname, '/testapp/build/index.html'));
});


app.get('/list',(req,res) => {
    db.collection("post").find().toArray((err,result) => {
        if(err) {return console.log(err)}
        res.send(result);
    });
});


app.post('/add', (req, res) => {
    console.log(req.body);
    db.collection('post').insertOne({title : req.body.title, date : req.body.date},(err,res) => {
        
    })
})

app.get('*', function (요청, 응답) {
    응답.sendFile(path.join(__dirname, '/testapp/build/index.html'));
});

