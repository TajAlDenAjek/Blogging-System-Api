const express=require('express');
const router=express.Router();
const path=require('path');
const {
        createPost,
        deletePost,
        getPost,
        updatePost,
        gettAllPosts
}=require(path.join(__dirname,'..','controllers','postsController.js'));


// post and get router 
router.route('/').post(createPost).get(gettAllPosts);


// get and delete and update by ID params
router.route('/:id').get(getPost).delete(deletePost).put(updatePost);


module.exports=router;