const router=require('express').Router();
const path=require('path');
const {addCategory,getAllCategories}=require(path.join(__dirname,'..','controllers','categoriesController.js'));


// post and get router for categories (need to implemente in the client side)
router.route('/').post(addCategory).get(getAllCategories);


module.exports=router;