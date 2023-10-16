const path=require('path');
const User=require(path.join(__dirname,'..','models','User.js'));
const bcrypt=require('bcryptjs');


// register logic
const register=async(req,res)=>
{
    try {
        // hashing the password 
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(req.body.password,salt);
        // creating new user
        const newUser=new User(
        {
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword
        });
        // saving user in the data base
        const user=await newUser.save();
        // respoding 
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
}


// login logic
const login=async(req,res)=>
{
    try {
        // looking for the user in the data base 
        const user=await User.findOne({username:req.body.username});
        // no user found 
        if(!user)
        {   
            return res.status(400).json({msg:"Wrong credentails"});
        }
        // checking the password 
        const validatePass=await bcrypt.compare(req.body.password,user.password);
        if(!validatePass)
        {
            return res.status(401).json({msg:'not authorized'});
        }
        //responding
        const{password,...others}=user._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error);
    }
}


module.exports=
{
    register,login
};