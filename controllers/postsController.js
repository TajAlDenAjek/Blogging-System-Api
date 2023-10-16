const { StatusCodes } = require('http-status-codes');
const path=require('path');
const User=require(path.join(__dirname,'..','models','User.js'));
const Post=require(path.join(__dirname,'..','models','Post.js'));
const { BadRequestError, NotFoundError,UnauthenticatedError } = require('../errors');


// create new post method
const createPost=async(req,res)=>
{
    try {
        // create the post with request data in the body
        const newPost=new Post(req.body);
        // save in the data base
        const savePost=await newPost.save();
        // responding with json data of the post
        res.status(200).json(savePost);
    } catch (error) {
        res.status(500).json(error);
    }
}


// update post method
const updatePost=async(req,res)=>
{
    try {
        // find the post in data base by id 
        const post=await Post.findById(req.params.id);
        // user own this post
        if(post.username===req.body.username)
        {
            try {
                // edit the data in data base
                const updatePost=await Post.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
                //responding with new data
                res.status(200).json(updatePost);
            } catch (error) {
                res.status(500).json(error);
            }
        }
        else
        {
            return res.status(401).json({msg:"You can not update a post that is not yours"})
        }
    } catch (error) {
        res.status(500).json(error);
    }
}


// delete post method
const deletePost=async(req,res)=>
{
    try {
        // finding the post by id in the data base
        const post=await Post.findById(req.params.id);
        // post belongs to the user
        if(post.username===req.body.username)
        {
            try {
                // delete in the data base
                await post.delete();
                // responding with status code 200 success
                res.status(200).json({msg:"post has been deleted successfuly..."});
            } catch (error) {
                res.status(500).json(error);
            }
        }
        else
        {
            return res.status(401).json({msg:"You can not delete a post that is not yours"})
        }
    } catch (error) {
        res.status(500).json(error);
    }
}


// get single post method
const getPost=async(req,res)=>
{
    try {
        // finding the post in the data base by id
        const post= await Post.findById(req.params.id);
        // responding with java script object notation data
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
}


// get all posts method
const gettAllPosts=async(req,res)=>
{
    // checking for searching in the query
    const username=req.query.user;
    const catName=req.query.cat;
    try {
        // filtering the search and finding in the data base
        let posts;
        if(username)
        {
            posts=await Post.find({username});
        }
        else if(catName)
        {
            posts=await Post.find(
                {
                    categories:{
                        $in:{catName}
                    }  
                }
            );
        }
        else
        {
            posts=await Post.find();
        }
        // reponding with data ordered 
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error);
    }
}


module.exports=
{
    createPost,
    deletePost,
    getPost,
    gettAllPosts,
    updatePost
};