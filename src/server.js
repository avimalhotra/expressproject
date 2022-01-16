require("dotenv").config();
const express=require("express");
const path=require("path");
const nunjucks=require("nunjucks");
const app=express();
const mongoose=require('mongoose');
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
app.get("/add",(req,res)=>{
     res.render('add.html',{title:"Add car"});
 });

 app.get("/addcar",(req,res)=>{
     let carname=new Car({_id:new mongoose.Types.ObjectId(), name:req.query.name, power:req.query.power, torque:req.query.torque})

      carname.save( (err, data)=> {
          if (err){
              console.log(err); 
             }
          else{
              console.log(data.name + " saved to collection."); 
             }
        });
      
     res.render('add.html',{title:"Car Added"});
 });

 app.get("/car/:id",(req,res)=>{
     let id=req.params.id;
     //res.status(200).send('viewcar.html');
     //res.render('viewcar.html',{title:id.name});
     Car.find({name:id},(err,data)=>{
          if(err){
               res.render('home.html',{title:"Hello Express", error:err});
          }
          else{ 
               res.render('viewcar.html',{title:data.name, data:data});
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
