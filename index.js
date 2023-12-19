const mysql = require('mysql')
const express = require('express')
var cors = require('cors')
var app = express()
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true

  }

))

app.use(express.json())
const port = process.env.PORT || 5000
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:'',
    database:'accredian_task'
})
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// add new user to database
app.post('/user', async (req, res) => {
    const user = req.body
    console.log(user)
   
    var sql = "INSERT INTO users (`name`, `email`, `password`) VALUES (?)"; 
    const values=[
       
        user.name,
        user.email,
        user.password
    ] ;
   
    db.query(sql, [values] ,(err, data)=> {
        if (err) return res.json(err);
       
        return res.json("record inserted");
      });
     
  })

//   get specific user
app.get('/users/:email/:password', async (req, res) => {
    const email = req.params.email;
    const password = req.params.password;
    console.log(email)
    console.log(password)
   
    var sql = "SELECT * FROM users WHERE email = (?)"; 
    
   
    db.query(sql, [email] ,(err, data)=> {
        if (err) return res.json(err);
        console.log(data[0].password)
       if(data[0].password===password){
        return res.json("found");
       }
        return res.json("User Credentials does not match");
      });
     
  })
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})