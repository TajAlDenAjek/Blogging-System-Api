const mongoose=require('mongoose');


//category schema structre
const CategorySchema=new mongoose.Schema(
{
    name:
    {
        type:String,
        required:[true,'please provide a type name to the category']
    }

},{timestamps:true});


module.exports=mongoose.model('Category',CategorySchema);