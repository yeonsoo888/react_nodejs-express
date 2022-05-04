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
    db.collection('post').insertOne({title : req.body.title, date : req.body.date},(err,res) => {
        if(err) console.log(err);
    });
});

app.post('/login', function(req, res){
    db.collection('member').findOne({mail: req.body.mail},function(err,result) {
        const id = 'yeonsoo';
        const nick = 'yeon';

        const token = jwt.sign({
            id,
            nick,
        }, "scretCode", {
            expiresIn: '1m', // 1분
            issuer: '토큰발급자',
        });
        // res.send(result);
        console.log(token);
    });
    // console.log("ok");
});
/* 
app.post('/login', passport.authenticate('local', {failureRedirect : '/fail'}), function(req, res){
    db.collection('member').findOne({mail: req.body.mail},function(err,result) {
        res.send(result);
    });
    console.log(req.user);
    console.log("ok");
});

passport.use(new LocalStrategy({
    usernameField: 'mail',
    passwordField: 'pw',
    session: true,
    passReqToCallback: false,
}, function (입력한메일, 입력한비번, done) {
    // console.log(입력한메일 + "," + 입력한비번);
    db.collection('member').findOne({ mail: 입력한메일 }, function (에러, 결과) {
        if (에러) return done(에러)
    
        if (!결과) return done(null, false, { message: '존재하지않는 아이디요' })
        if (입력한비번 == 결과.pw) {
            return done(null, 결과)
        } else {
            return done(null, false, { message: '비번틀렸어요' })
        }
    })
}));

passport.serializeUser(function (user, done) {
    done(null, user.mail);
});

passport.deserializeUser(function (아이디, done) {
    done(null, {});
}); 
*/
app.get('*', function (요청, 응답) {
    응답.sendFile(path.join(__dirname, '/testapp/build/index.html'));
});

