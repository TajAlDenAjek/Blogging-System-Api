const mongoose=require('mongoose');


//user schema structre 
const UserSchema=new mongoose.Schema(
{
    username:
    {
        type:String,
        required:[true,'please provide a username'],
        unique:true,
        minlength:5,
        maxlength:15
    },
    email:
    {
        type:String,
        required:[true,'please provide a email'],
        match: 
        [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ],
        unique:true,
    },
    password:
    {
        type:String,
        required:[true,'please provide a password'],
        minlength:6
    },
    profilePic:
    {
        type:String,
        default:""
    }
},{timestamps:true});

// UserSchema.pre('save', async function () {
//     const salt = await bcrypt.genSalt(10)
//     this.password = await bcrypt.hash(this.password, salt)
//   })
  
//   UserSchema.methods.createJWT = function () {
//     return jwt.sign(
//       { userId: this._id, name: this.name },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: process.env.JWT_LIFETIME,
//       }
//     )
//   }
  
//   UserSchema.methods.comparePassword = async function (canditatePassword) {
//     const isMatch = await bcrypt.compare(canditatePassword, this.password)
//     return isMatch
//   }

module.exports=mongoose.model('User',UserSchema);