const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@avi.j3vc0.mongodb.net/cars?retryWrites=true&w=majority');

const db=mongoose.connection;
db.on('error', function (err) { throw err }); 
db.once('open', function callback() {
   console.log('connected!');
   //db.close();
});