const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
// uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
const methodOverride = require("method-override")

//middlewares for parsing
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"))

app.use(express.static(path.join(__dirname,"public")));

//replacating database
let posts = [
    {
        id:uuidv4(),
        username:"apnacollege",
        content:"i love coding"
    },
    {
        id:uuidv4(),
        username:"ak",
        content:"i am ironamn"
    },
    {
        id:uuidv4(),
        username:"black panther",
        content:"i bommbeee! "
    },
]


//paths
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts})
})

//post route
//1 create new form and then from that from send req to backend

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
})
//accept the post request from the form
app.post("/posts",(req,res)=>{
    // console.log(req.body);
    let {username,content} = req.body;
    let id = uuidv4();
    posts.push({id,username,content});
    // res.send("post working !");
    res.redirect("/posts");
})

app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    console.log(id);
    let post = posts.find((p) =>id === p.id);
    console.log(post);
    res.render("show.ejs",{post});
    // res.send("request working !")
})

//update route(patch)

app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
})

app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs",{post});
})

//destroy route

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=> (id) !== p.id);
    res.redirect("/posts")
})


app.listen(port,()=>{
    console.log(`listening on port:${port}`);
})