const express = require('express');
const router = express.Router();
const User = require('../../Models/User');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken')
const config = require('config');

router.post('/' , async (req , res) => {
   //console.log(req.body);
   try {
    const {email , password , name } = req.body
   let user = await User.findOne({email});
   
   //if user found
   if(user) {
       return res.status(301).json({msg:"User Already Exists"})
   }
   
   //if not found
   user = new User({
       email,
       password,
       name
   });

   //hash password
   const salt = await bcrypt.genSalt(10);

   const hash = await bcrypt.hash(password , salt);

   user.password= hash;
   
   await user.save();

   console.log(user)

   const payload = {
       user : {
           id : user._id
       }
   }

    jwt.sign(payload , config.get('JWT_SECRET') , {expiresIn : 3600000} , (err , token) => {
       if(err) throw err;
      res.json({token})
   })
   
   } catch (err) {
       console.log(err.message)
      return res.status(501).send('Server Error')
   }

})

module.exports = router