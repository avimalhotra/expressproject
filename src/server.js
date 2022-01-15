require("dotenv").config();
const express=require("express");
const path=require("path");
const nunjucks=require("nunjucks");
const app=express();
const db=require("./dao");
const Car=require('./models/car');

app.use(express.static(path.resolve(__dirname,'public')));

// configure
nunjucks.configure(path.resolve(__dirname,'public'),{
    express:app,
    autoscape:true,
    noCache:false,
    watch:true
}); 

app.get("/",(req,res)=>{
     Car.find({},(err,data)=>{
          if(err){
               res.render('home.html',{title:"Hello Express", error:err});
          }
          else{ 
               res.render('home.html',{title:"Hello Express", data:data});
          }
      });
    
});
app.get("/contact",(req,res)=>{
     res.render('contact.html',{title:"Contact Page"});
 });

app.get("/**",(req,res)=>{
     res.status(404).render('error.html',{title:"404 Error"});
 });
 
app.listen(process.env.PORT,()=>{
    console.log(`http://127.0.0.1:${process.env.PORT}`);
})
