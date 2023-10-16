const path=require('path');
const User=require(path.join(__dirname,'..','models','User'));
const Post=require(path.join(__dirname,'..','models','Post'));
const bcrypt=require('bcryptjs');


//updating user info
const editUser=async(req,res)=>
{
    // the user himself only can edit his/her info
    if(req.body.userId===req.params.id)
    {
        if(req.body.password)
        {
            // updating the password and hash it for more security 
            const salt=await bcrypt.genSalt(10);
            const hashedPass=await bcrypt.hash(req.body.password,salt);
            req.body.password=hashedPass;
        }
        try{
            // finding the old user in the data base to update the posts with the new name
            let oldUser=await User.findById(req.params.id);
            oldUser=oldUser.username;
            // update the new username 
            const updatedUser=await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
            //update the posts with the old user name to the new username
            await Post.updateMany({username:oldUser},{$set:{username:updatedUser.username}});
            //responding
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    else
    {
        res.status(401).json({msg:'you can update only your account'})
    }
}


// delete user and all the posts related to him
const deleteUser=async(req,res)=>
{
    // only user can delete his/her account
    if(req.body.userId===req.params.id)
    {
        try{
            const user=await User.findById(req.params.id);
            try {
                // delete posts 
                await Post.deleteMany({username:user.username});
                // delete user 
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json({msg:"user has been deleted"})
            } catch (error) {
                res.status(500).json(error);
            }
        } catch (error) {
            res.status(404).json({msg:"user not found"});
        }
    }
    else
    {
        res.status(401).json({msg:'you can delete only your account'})
    }
}


// get single user information 
const getUser=async(req,res)=>
{
    try {
        // getting from the data base
        const user=await User.findById(req.params.id);
        // returning all info with no password
        const {password,...others}=user._doc;
        //responding
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error);
    }
}


//for testing  get all the users in the data base
const getThem=async(req,res)=>
{
    try {
        // find every user with no conditions 
        const users=await User.find({});
        // responding 
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
}


module.exports={editUser,deleteUser,getUser,getThem};