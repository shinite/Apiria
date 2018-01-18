const express = require('express')
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const employeeSchema = require('./model/employeeSchema')

app.listen(3000, () => console.log('Example app listening on port 3000!'))
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mongoose.createConnection('mongodb://localhost:27017/userdb',(err,database)=>{
  if(err){
    console.log("Not Able to connect to Database");
  }else {
    console.log("connection to database was sucessful");
  }
})

app.get('/getData',(req,res,next)=>{
  db.collection('employee').find({}).toArray(function(err, result) {
    if (err) throw err;
    res.json(result)
})
})

app.post('/fileUpload',  (req, res) => {
  var sent = true;
  req.body.forEach((data,index)=>{
    var employee = new employeeSchema(data);
      if (employee['name'] && employee['employeeId'] ){
          console.log(employee,"my");
          sent = true;
          db.collection('employee').find({employeeId: employee['employeeId']}).toArray(function(err, result) {
            if (err) throw err;
            if(result.length == 0){
                db.collection("employee").insert(employee, {upsert:true})
            }
        })
      }
      else {
        sent= false;
      }
  });
  res.send(sent)
});


app.put('/editData',(req,res,next)=>{
     db.collection("employee").remove({'employeeId': req.body.obj.employeeId}, function(err, obj) {
    if(err) {
      res.send(false)
    }
    else {
        db.collection("employee").insert(req.body.obj)
        res.send(true)
          }
       });

  })


app.delete('/deleteData',(req,res,next)=>{
  var myquery = req.body;
  db.collection("employee").remove(myquery, function(err, obj) {
    if (err) {
      console.log("errorr");
      res.send(false)
      throw err;
    }
    else{
      res.send(true)
    }
  });
})
