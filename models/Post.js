const mongoose=require('mongoose');


// post schema structre
const PostSchema=new mongoose.Schema(
{
    title:
    {
        type:String,
        required:[true,'please add a title'],
        unique:true
    },
    desc:
    {
        type:String,
        required:[true,'please add a description'],
    },
    photo:
    {
        type:String,
        default:"",
    },
    username:
    {
        type:String,
        required:[true,'please add a username'],
    },
    categories:
    {
        type:Array,
        required:false
    },
    created_at:
    {
        type:Date,
        default:Date.now()
    }

},{timestapms:true})


module.exports=mongoose.model('Post',PostSchema);