const express = require("express");
const bcrypt = require("bcryptjs");
const connection = require('./db')
const jwt = require("jsonwebtoken")
const app = express();
const port = 3000;
const {login} = require('./login')
const { answer, questionAnswer } = require("./answer");
const { getQuestion, postQuestion, oneQuestion } = require("./question");



// Middleware to parse JSON
app.use(express.json());

const saltRounds = 10;
connection.query(
  `CREATE TABLE IF NOT EXISTS  evangadi_form.users (
    username VARCHAR(255) NOT NULL,
   firstname TEXT NOT NULL,
    email VARCHAR(255) NOT NULL,
    userid INT NOT NULL AUTO_INCREMENT,
    lastname VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (userid),
) ENGINE = InnoDB;`,
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("created");
    }
  }
);
connection.query(`CREATE TABLE IF NOT EXISTS  evangadi_from.question_table (
    question_title VARCHAR(255) NOT NULL,
    question_description TEXT NOT NULL,
    email VARCHAR(255) NOT NULL,
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id),
    FOREIGN KEY (email) REFERENCES usertable (email) ON DELETE CASCADE
) ENGINE = InnoDB;`, (err,result)=>{
    if(err){
        console.log(err)
    }else{
        console.log("created")
    }
})
connection.query(`CREATE TABLE IF NOT EXISTS  evangadi_from.answer_table(
    id INT NOT NULL AUTO_INCREMENT,
    answer VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    question_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (email) REFERENCES usertable (email) ,
    FOREIGN KEY (question_id) REFERENCES question_table (id) ON DELETE CASCADE
 ) ENGINE = InnoDB;`
    , (err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log("created")
        }
    });

// Basic route
app.post('/api/register',async (req,res)=>{
    const {username, first_name,last_name, email, password} = req.body
    if(!username || !first_name || !last_name || !email || !password){
       return res.status(400).send({ error: "bad request" });
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    connection.query(`select * from usertable where username = ?`, [username],(err,result)=>{
        if(err){
            console.log(err)
            res.status(501).send({error:err})
        }else{
            if (result.length === 0) {
              connection.query(
                `insert into usertable (username, first_name, last_name, email, password) values(?,?,?,?,?)`,
                [username, first_name, last_name, email, hashedPassword],
                (err, result) => {
                  if (err) {
                    console.log(err);
                  } else {
                    res.status(201).send({ success: "accounted created" });
                  }
                }
              );
            } else {
              res.status(400).send({ error: "username taken" });
            }
           
        }
    })
    // if(username && first_name && last_name && email && password){ 
    // }
})
app.post("/api/login",login)
app.post("/api/answer", answer);
app.get("/api/question", getQuestion)
app.post("/api/question",postQuestion)
app.get('/api/question/:question_id', oneQuestion)
app.get('/api/answer/:question_id', questionAnswer)


// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

