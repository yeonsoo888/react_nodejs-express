const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;

const http = require('http').createServer(app);

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

const jwt = require("jsonwebtoken");

app.use(session({secret : 'secretCode', resave : true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session()); 


app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
    origin: true,  
    credentials: true, // 크로스 도메인 허용
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
}));
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
    db.collection('post').insertOne({
        title : req.body.title, 
        content: req.body.content,
        date : req.body.date,
        writer: req.body.writer
    },(err,result) => {
        if(err) {
            console.log(err)
        }
        res.send(result);

    });
});

app.post('/login', function(req, res){
    db.collection('member').findOne({mail: req.body.mail},function(err,result) {
        if(result) {
            const mail = req.body.mail;
            const token = jwt.sign({
                mail,
            }, "scretCode", {
                expiresIn: '1m', // 1분
                issuer: '토큰발급자',
            });
            res.send(token);
        } else {
            res.status(500).send('Something broke!');
        }
    });
});

app.get('*', function (요청, 응답) {
    응답.sendFile(path.join(__dirname, '/testapp/build/index.html'));
});

