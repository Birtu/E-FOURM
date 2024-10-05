const connection = require('./db')
const answer = (req,res) => {
    const {answer,question_id,email} = req.body
    if(!answer || !question_id || !email){
        return res.status(401).send({error: 'requirement not fulfilled'})
    }
    connection.query(
      `insert into answer_table (answer,  email, question_id) values (?,?,?)`,
      [answer, email, question_id],
      (err, result) => {
        if (err) {
          return res.status(501).send({ error: err });
        } else {
          return res.status(201).send({ success: "answer created" });
        }
      }
    );

}


const questionAnswer = (req,res) => {
     const { question_id } = req.params;
     if (!question_id) {
       return res.status(400).send({ error: "request not fulfilled" });
     }
     connection.query(`select * from answer_table where question_id = ?`, [question_id],(err,result)=> {
        if(err) return res.status(400).send({error : err})
        else{
    return res.status(200).send({result})
        }
     })
}







module.exports = {answer, questionAnswer};
