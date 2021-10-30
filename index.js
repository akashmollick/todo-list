//dependencies
const express = require('express');
const app=express();
const mongoose=require('mongoose');
const ejs = require('ejs');






//load the model
const todoSchema=require('./models/todo-model');

const port = 3000;





//connection with mongoose
mongoose.connect('mongodb://localhost/todo-list',
 {
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
.then(()=>{
    console.log('server is connected');
}

).catch(error=>{
    console.log(error)
});



//middleware
// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:false}));
app.use(express.json());




//routing start
app.get('/',async(req,res)=>{
    //get the todo
    const todos= await todoSchema.find().sort('-date'); 
    res.render("index",{todos})

});

app.get('/:id/delete',async(req,res)=>{
    //get the todo
    const todo= await todoSchema.findByIdAndDelete(req.params.id); 
    res.redirect('/');

});
app.post('/',async(req,res)=>{
    const text= req.body.text.trim();
    if(text===''){
        return res.redirect('/');
    }
    const newTodo= new todoSchema({
        text
    });
    await newTodo.save();
    res.redirect('/');
});





// connection to server
app.listen(port,()=>{
    console.log(`server is running at port ${port}`);

});