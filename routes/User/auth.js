const express = require('express');
const router = express.Router();
const User = require('../../Models/User');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken')
const config = require('config');
const passport = require('passport');
const auth = require('../../middleware/auth');
require('../../passport/passport')

router.post('/' , async (req , res) => {
   try {

    const {email , password } = req.body;

    let user = await User.findOne({email});

    if(!user) {
        return res.status(401).json({msg: "Email Not Exists"})
    }

    const isMatch = await bcrypt.compare(password , user.password);

     if(!isMatch) {
        return res.status(400).json({msg:"Invalid Details"});
    }

    const payload = {
        user : {
            id : user._id
        }
    }

    jwt.sign(payload , config.get('JWT_SECRET') , {expiresIn : 360000} ,  (err , token) => {
        if(err) throw err;
        res.json({token})
    })

   


       
   } catch (err) {
       console.log(err.message);
       return res.status(501).send('server error')
   }
})

router.get('/user', auth , async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

    if(!user) {
        return res.status(401).json({msg:"User not found"});
    }
   
    res.json(user)
    } catch (err) {
        console.log(err.message);
        return res.status(500).send('server error')
    }

})

// router.get('/google', passport.authenticate('google', { scope: ['profile' , 'email'] }));

// router.get('/google/callback', 
//   passport.authenticate('google', { failureRedirect: '/' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/test');
//   });

module.exports = router