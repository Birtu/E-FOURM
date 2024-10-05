const { error } = require('console');
const connection = require('./db')
// import bcrypt from "bcryptjs";
// import { connection } from "./db.js";



const getQuestion = (req, res) => {
    connection.query(`select * from question_table`, (err,result)=>{
        if(err){
            return res.status(401).send({error: err})
        }else{
            return res.status(200).send(result)
        }
    })
};



const postQuestion = (req,res) => {
    const {question_description, question_title, email} = req.body
    if(!question_description || !question_title || !email){
        return res.status(500).send({error: "requirement not fulfilled"})
    }
    connection.query(`insert into question_table (question_description, question_title, email) values (?,?,?)`, [question_description,question_title,email],(err,result)=>{
        if(err){
            return res.status(401).send({error: err})
        }else{
            return res.status(201).send({success: "question created"})
        }
    })
}





const oneQuestion = (req,res) => {
    const {question_id} = req.params
    if(!question_id){
        return res.status(400).send({error: "request not fulfilled"})
    }
    connection.query(`select * from question_table where id = ? `, [question_id], (err,result)=>{
        if(err){
            return  res.status(400).send({error: err})
        }else{
            if(result.length === 0){
                return res.status(400).send({error: "incorrect question id"} )
            }
            return res.status(200).send(result)
        }
    })
}







module.exports = { getQuestion, postQuestion, oneQuestion };
// export { getQuestion, postQuestion, oneQuestion };