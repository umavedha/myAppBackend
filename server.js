const { check, validationResult, param } = require('express-validator');
const bodyParser = require('body-parser')
const express = require('express');
const app = express();
const mysql = require("mysql");
 cors = require("cors");

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));


app.listen(3000, () => {
    console.log('port connected')
})




// var db = mysql.createConnection({

//     host: "localhost",
//     user: "umaDream",
//     password: "umaDream@#1234",
//     database: "tbluserdetailsDb"

// });
var db = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "Password@123",
    database: "angularcrud"

});

db.connect(function (err) {
    if (err) throw console.log("database is not connected")
    console.log("database is connected")
});

// post data
app.post('/addUserData',
// validation for posting data in database
// [
//  check('name').not().isEmpty().withMessage('name is required').isLength({min:2,max:25}).withMessage('name must have minimum 2 characters and mmaximum 25 characters'),
//  check('email').not().isEmpty().withMessage('email is required').isEmail().withMessage('please enter valid email id').isLength({max:255}).withMessage('email must contain maximum of 255 characters only'),
//  check('message').not().isEmpty().withMessage('message is required').isLength({max:255}).withMessage('message must contain maximum of 255 characters only') 
// ], 
(req,res) =>{

    // const error = validationResult(req);
    // if(!error.isEmpty()){
    //     return res.status(422).json({error:error.array()})
    // }
    console.log("hiii", req.body);

    var username = req.body.username;
    var email = req.body.email;
    // var message = req.body.message;

    console.log("hhh",username);


    var sql= "insert into userdetailstbl (username,email,isActive) VALUES (?,?,?)";
    var values = [username,email,true];
    console.log('sssss',sql,values);
    db.query(sql,values,function(err,result){
        if (err) {
            console.error(err.stack)
            return 
        }
        res.send(result)
        console.log("record is inserted");
        
    });
});



// get data
app.get('/getAllUsers',function(req,res){
console.log("sfsdfsfsdfsdfsss")
db.query('SELECT * FROM userdetailstbl where isActive = 1',(error,fields)=>{
if(error){
res.send("ERROR")
}
res.send(fields)
})
})
app.get('/getUserById', (req, res) => {
    console.log('hey',req.query)
    db.query('select * from userdetailstbl where id=?',[req.query.id], (error, fields) => {
        if (error) {
            console.error(error.stack)
        }
        res.send(fields)
    })
})

// to update or edit data from database
app.put('/updateUserDataById',
// validation for updating data form database
// [
// check('name').not().isEmpty().withMessage('name is required').isLength({min:2,max:25}).withMessage('name must have minimum 2 characters and mmaximum 25 characters'),
// check('email').not().isEmpty().withMessage('email is required').isEmail().withMessage('please enter valid email id').isLength({max:255}).withMessage('email must contain maximum of 255 characters only'),
// check('message').not().isEmpty().withMessage('message is required').isLength({max:255}).withMessage('message must contain maximum of 255 characters only'),
// param('id').not().isEmpty().withMessage('id is required').isInt().withMessage('id should be a integer')
// ] ,

function(req,res){
    // const error = validationResult(req);
    // if(!error.isEmpty()){
    //     return res.status(422).json({error:error.array()})
    // }
    var primaryId = req.query.id;
    // console.log(req.body,'----');
    var updateData = [req.body.username,req.body.email,primaryId]
    var sql = "update userdetailstbl set username=?,email=? where id =?"
    console.log("cacdffffffffff",primaryId);
    db.query(sql,updateData,(error,response)=>{
        if (error) throw error;
        db.query('select*from userdetailstbl',(error,result,fields)=>{
            if (error) throw error;
            res.send(result)
        });
    });
});
// to delete data
app.delete('/deleteUserById',
// validation for deleting data from database
// [
// param('id').not().isEmpty().withMessage('id is required').isInt().withMessage('id should be a integer')
// ],
function(req,res){
    // const error = validationResult(req);
    // if(!error.isEmpty()){
    //     return res.status(422).json({error:error.array()})
    // }
    var primaryId =req.query.id;
    var updateData=[false,primaryId];
    var sql ="update userdetailstbl set isActive=? where id=?"
    console.log('++++++',primaryId)
    db.query(sql,updateData,(error,response)=>{
        if (error) throw error;
        db.query('select * from userdetailstbl where isActive = 1', (err, fields) => {
            res.send(fields)
        })
    })
})










