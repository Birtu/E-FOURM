const connection = require("./db");
const bcrypt = require("bcryptjs");
// import bcrypt from "bcryptjs";
// import { connection } from "./db.js";

const login = async (req, res) => {
  const { email, password } = req.body;
  connection.query(
    `select * from usertable where email = ?`,
    [email],
    async (err, result) => {
      if (err) {
        console.log(err);
        return;
      } else {
        if (result.length === 0) {
          return res.status(401).send({ error: "email not found" });
        } else {
        //     console.log(result[0].password)
          const correct = await bcrypt.compare(password,result[0].password)
          if(correct){
            return res.status(200).send({successful: "correct password"})
          }else{
            return res.status(401).send({error: "invalid password"})
          }
        }
      }
    }
  );
};
module.exports = { login };
// export {login}
