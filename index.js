const express =require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const Chat=require("./models/chat.js");
const methodOverride =require("method-override");

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}));    //to parse data
app.use(methodOverride("_method"));



main()
    .then(() =>{
        console.log("connection sucessful");
    })
    .catch(err => console.log(err));

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");

}

app.get("/",(req,res)=>{
    res.send("root is working");
});

app.get("/chats",async (req,res)=>{
    let chats=await Chat.find();
    console.log(chats);
    res.render("index.ejs",{chats});
});

app.get("/chats/new",(req,res)=>{
    
    res.render("new.ejs");
});

//Create Route
app.post("/chats",(req,res)=>{
    let {from , msg, to}=req.body;
    let newChat= new Chat({
        from:from,
        msg:msg,
        to:to,
        createdAt:new Date(),
    });
    newChat.save().then(res =>{
        console.log("Chat saved");
    })
    .catch((err) => {
        console.log(err);
    })
    res.send("Working post new Chat");
});


//Edit route
app.get("/chats/:id/edit",async  (req,res) => {
    let {id}=req.params;
    let chat=await Chat.findById(id);
    res.render("edit.ejs",{chat});
})

//Update Route
app.put("/chats/:id",async(req,res)=>{
    let {id} =req.params;
    let {msg:newMsg}=req.body;
    let updatedChat=await Chat.findByIdAndUpdate(id,{msg:newMsg},{runValidators:true,new:true});
    res.redirect("/chats"); 
})

//Delete route
app.delete("/chats/:id",async (req,res) => {
    let {id} =req.params;
    let chatToBeDeleted=await Chat.findByIdAndDelete(id);
    res.redirect("/chats");

})
app.listen(8080, ()=>{
    console.log("server listening on port 8080");
});