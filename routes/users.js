const path=require('path');
const router=require('express').Router();
const {editUser,deleteUser,getUser,getThem}=require(path.join(__dirname,'..','controllers','editUser.js'))


// get method for getting all users 
router.route('/').get(getThem);


// handling the user (edit,delete,get)
router.route('/:id').put(editUser).delete(deleteUser).get(getUser);


module.exports=router;