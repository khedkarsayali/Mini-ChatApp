const mongoose=require("mongoose");
const Chat=require("./models/chat.js");


main()
    .then(() =>{
        console.log("connection sucessful");
    })
    .catch(err => console.log(err));

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");

}


let allChats=[
    {
    from : "Sayali",
    to : "Sejal",
    msg : "Hello Hii",
    createdAt: new Date()
    },
    {
        from : "SSK",
        to : "Sayali",
        msg : "Ich bin SSK",
        createdAt: new Date()
    },
    {
        from : "George",
        to : "Sayali",
        msg : "Du bis nett",
        createdAt: new Date()
    },
    {
        from : "Sayali",
        to : "George",
        msg : "Danke !!",
        createdAt: new Date()
    },
];

Chat.insertMany(allChats);


