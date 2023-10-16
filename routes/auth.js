const express=require('express');
const router=express.Router();
const path=require('path');
const {register,login}=require(path.join('..','controllers','auth.js'));


// register controller
router.route('/register').post(register);


// login controller
router.route('/login').post(login);


module.exports=router;