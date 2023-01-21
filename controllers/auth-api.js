const db = require('../util/db');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const signup = (req, res) => {
    const user = req.body;
    bcrypt.hash(user.password, 10, function(err, hash) {
        user.password = hash;
        db("users").insert(user).returning("*")
        .then((resp) => {
          console.log(resp);
          res.send({
            success: true,
            message: 'User registered successfully',
            data: resp[0]
          });
        }).catch(err => {
          console.log(err);
          res.status(400).json({
            message: "unable to create user"
          });
        });
      });
  }
  
  const login = (req, res) => {
    console.log('this is id ', req.body)
      db.select("*").from("users")
        .where("email", "=", req.body.email)
        .returning("*").then( async user => {
          console.log('came in???? ', process.env.TOKEN_KEY)
          console.log(user)
          const token = jwt.sign(
            { userid: user[0].id, email:user[0].email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
          console.log(token)
          const result = await bcrypt.compare(req.body.password, user[0].password);
          if (result) {
            // password is valid
            delete user[0].password
            // res.headers.token = token;
            res.append('Authorization', token);
            res.append('Access-Control-Expose-Headers', '*')
            res.append('Access-Control-Allow-Headers', '*')
            res.json({
              success: true,
              data: user[0]
            });
          } else {
            res.json({
              success: false,
              message: "Password incorrect"
            });
          }
          
        }).catch(err =>{
          res.json({
            success: false,
            message: "User not found"
          });
        })
  };

  module.exports = {
    signup,
    login
  }