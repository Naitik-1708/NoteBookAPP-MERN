const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const fecthuser = require('../middleware/fecthuser');


// route 1 :creating a tokenn in jwt to add sign in the backoff the token
const JWT_SCERET = "hellouserinapp";
// creating a user /api/auth/createuser
router.post('/createuser', [
  body('name', "ENter valid name").isLength({ min: 4 }),
  body('email', "ENter valid email").isEmail(),
  body('password', "password is to weak").isLength({ min: 5 })],
  async (req, res) => {
    // if there is a reeoes , return a bad request 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // check the email is alredy used with otheer user
      let user = await User.findOne({ email: req.body.email })
      if (user) {
        return res.status(400).json({ errors: "sorry Email is already registered." })
      }
      // hashing user password
      const salt = await bcrypt.genSalt(8);
      const hashpass = await bcrypt.hash(req.body.password, salt)



      // createt user and send the user data in  database
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashpass,
      })
      // create a token for sending user
      const data = {
        user: {
          id: user.id
        }
      }
      sucess = true;
      const authToken = jwt.sign(data, JWT_SCERET)
      res.json({ sucess , authToken })
    }
    // if internal databse error in app
    catch (error) {
      sucess = false;
      res.status(500).send( sucess ," some error occured ");
    }
  })


// route 2 :authenticate user to login
router.post('/login',
  body('email', "ENter valid email").isEmail(),
  body('password', "password is cannot short").exists(),
  async (req, res) => {
    // if there is a reeoes , return a bad request 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ error: " Enter the valid details that alerdy exists" })
      }
      const passwordcomapre = await bcrypt.compare(password, user.password);
      if (!passwordcomapre) {
        sucess = false;
        return res.status(400).json( {sucess , error: " Enter the valid details that alerdy exists"})
      }

      const data = {
        user: {
          id: user.id
        }
      }
      const authToken = jwt.sign(data, JWT_SCERET)
      sucess = true;
      res.json({ sucess ,  authToken })
    } catch (error) {
      res.status(500).send(" some error occured ");
    }
  });

// route 3 :get loggin user detail using : post "/api/auth/userdetail" login required
router.post('/userdetail', fecthuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    res.status(500).send(" some error occured ");
  }
})



module.exports = router