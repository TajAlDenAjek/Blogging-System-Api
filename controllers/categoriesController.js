const path=require('path');
const Category=require(path.join(__dirname,'..','models','Category.js'));


// create new category method
const addCategory=async(req,res)=>
{
    try {
        // create category information
        const newCategory=new Category(req.body);
        // save category in the data base
        const savedCat=await newCategory.save();
        // responding with data json
        res.status(200).json(savedCat);
    } catch (error) {
        res.status(500).json(error);
    }
}


// get all categories method
const getAllCategories=async(req,res)=>
{
    try {
        // search in the data base 
        const cats=await Category.find(); 
        // responding
        res.status(200).json(cats);
    } catch (error) {
        res.status(500).json(error);
    }
}


module.exports=
{
    addCategory,
    getAllCategories
};