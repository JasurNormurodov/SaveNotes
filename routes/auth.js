const express = require('express');
const router = express.Router();
const passport = require('passport')

// Login  
// GET /auth/login
router.get('/login', (req,res)=>{
    res.send('login')
})

//Logout
// Get /auth/logout
router.get('/logout', (req,res)=>{
    req.logout();
    res.redirect('/')
})

// GET /auth/google
router.get('/google', passport.authenticate('google',{
    scope:['email','profile']
})
)

// GET /auth/google/callback
router.get('/google/callback', passport.authenticate('google',{
    failureRedirect:'/'}), (req, res)=>{
        
        res.redirect('/homepage')
       
        
    })



module.exports = router