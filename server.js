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

const { ObjectId } = require('mongodb');

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
    db.collection('counter').findOne({name : 'totalCounter'}, function(err, result){

        var totalCount = result.counter;
        db.collection('post').insertOne( { 
            _id : (totalCount + 1), 
            title : req.body.title, 
            content: req.body.content,
            date : req.body.date,
            writer: req.body.writer 
        } , (err,result) => {
            if(err) {
                console.log(err)
            }
            db.collection('counter').updateOne( {name : 'totalCounter' } , { $inc : { counter : 1 } } , function(에러, 결과){
                res.send({
                    _id: totalCount + 1
                });
            })
        });
    });
});

app.delete('/delete', function(req, res){
    req.body._id = parseInt(req.body._id)
    const targetId = req.body._id;
    db.collection('post').deleteOne(req.body, function(err, result){
        console.log('삭제완료')
    })
    res.send({
        targetId,
    });
});

app.put('/modify', function(req, res){
    req.body._id = parseInt(req.body._id);
    db.collection('post').updateOne( 
        {_id : req.body._id}, 
        {$set : 
            { 
                title : req.body.title, 
                content: req.body.content,
            }
        }, function(){
        res.send("수정완료");
    });
});

app.post('/login', function(req, res){
    db.collection('member').findOne({mail: req.body.mail},function(err,result) {
        if(result) {
            const mail = result.mail;
            const userId = result._id;
            const token = jwt.sign({
                userId,
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

app.post('/chat', function(req, res){
    let data = {
        title : `${ObjectId(req.body.userId)} 채팅방`,
        owner: ObjectId(req.body.userId),
        target : ObjectId('6268c6ecc45a69b8d4fe481f'),
        date : new Date()
    }
    db.collection('chat').findOne({owner : ObjectId(req.body.userId)},function(err,result) {
        if(!result) {
            db.collection('chat').insertOne(data).then(function(result2){
                res.send('방만듦');
            });
        } else {
            let roomId = String(result._id); 
            db.collection('message').find({parent: roomId}).toArray()
            .then(result2 => {
                res.send([{roomId : roomId},result2]);
            })
        }
    })
});

app.get('/message/:id', function(req, res){
    res.writeHead(200, {
        "Connection": "keep-alive",
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
    });
    let id = req.params.id
    id = String(id.substring(1));
    db.collection('message').find({userid: id}).toArray()
    .then(result => {
        res.write('event: test\n');
        res.write(`data: ${JSON.stringify(result)}\n\n`);
    })
});

app.post('/message', function(req, res){
    let data = {
        parent : req.body.parent,
        userid : req.body.userid,
        content : req.body.content,
        date : new Date(),
    }
    db.collection('message').insertOne(data)
    .then(result => {
        res.send(result);
    })
}); 



app.get('*', function (요청, 응답) {
    응답.sendFile(path.join(__dirname, '/testapp/build/index.html'));
});

