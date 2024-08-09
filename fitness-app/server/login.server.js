const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


/*  PC
    user:"root",
    host:"localhost",
    password:"password",
    database:"fitnessapp"

    MAC
    user:"root",
    host:"localhost",
    password:"password",
    database:"workout_app"
*/ 
const db = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"password",
    database:"workout_app"
});

//Login and Register
app.post("/register", (req, res) => {
    
    const email = req.body.email;
    const password = req.body.password;
    
    db.query(
        "INSERT INTO users (email, password) VALUES (?,?)",
        [email, password],
        (err,result) => {
            console.log(err);
        }
    );
});

app.post("/login", (req,res) => {
    
    const email = req.body.email;
    const password = req.body.password;

    db.query(
        "SELECT * FROM users WHERE email = ? AND password = ?",
        [email, password],
        (err,result) => {
            if(err){
                res.send({err:err});
                console.log(err);
            }else if(result){
                res.send(result);
                console.log(result);
            }else{
                res.send({message:"Wrong Combination"});
                console.log("ERROR");
            }
        }
    );  
});

//userPage
app.post("/userPage", (req,res) => {
    
    const uid = req.body.uid;

    db.query(
        `SELECT * FROM users WHERE uid = ${uid}`,
        [uid],
        (err,result) => {
            if(err){
                res.send({err:err});
                console.log(err);
            }else if(result){
                res.send(result);
                console.log(result);
            }else{
                res.send({message:"Wrong Combination"});
                console.log("ERROR");
            }
        }
    );  
});

app.post("/createSession", (req,res) => {
    db.query(
        "SELECT * FROM exercises",
        (err, result) => {
            if(err){
                res.send({err:err});
                console.log(err);
            }else if(result){
                res.send(result);
                console.log(result);
            }else{
                res.send({message:"No Exercises"});
                console.log("ERR");
            }
        }
    );
});

app.post("/submitTemplate", (req,res) => {
    const uid = req.body.uid;
    const session_JSON = JSON.stringify(req.body.sessionJSON);
    console.log(session_JSON);
    //console.log("RECEIVED, " + session_JSON);
    db.query("INSERT INTO routine (uid, routineJSON) VALUES (?,?)",
        [uid, session_JSON],
        (err,result) => {
            console.log(err);
        });
});

app.post("/displaySessions", (req,res) => {
    db.query(
        "SELECT * FROM routine",
        (err, result) => {
            if(err){
                res.send({err:err});
                console.log(err);
            }else if(result){
                res.send(result);
                console.log(result);
            }else{
                res.send({message:"No Routines"});
                console.log("ERR");
            }
        }
    );
})

app.listen(3001, () => {
    console.log("running");
});
