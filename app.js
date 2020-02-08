var express=require('express');
var app=express();
var bodyParser=require("body-parser");
var mongoose=require('mongoose');

mongoose.connect("mongodb://localhost/BlogApp");
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

var blogSchema=new mongoose.Schema({
    title:String,
    image:String,
    body:String,
    created: {type:Date , default:Date.now()}

});
var Blog=mongoose.model("Blog",blogSchema);

    // Blog.create({
    //     title: "Test Blog",
    //     image: "https://images.unsplash.com/photo-1524435974157-2014a7e8a61c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
    //     body: "Hello this is a blog post"
    // });
app.get("/",function(req,res){
    res.redirect("/blogs");
})
app.get("/blogs",function(req,res){
    Blog.find({},function(err,blogs){
        if(err){
            console.log(err);
        }
        else{
            res.render("index",{blogs:blogs});
        }
    });
});





app.listen(3000,function(){
    console.log("server is running!!");
});