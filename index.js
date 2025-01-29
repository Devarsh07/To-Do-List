const express = require("express");
const app = express();
const Path = require("path");
const fs = require("fs");
//const path = require("path");
//setting the middleware parsing
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//setting the use of view engine for the view pages:
app.set("view engine","ejs");

//for using the static files in the view :
app.use(express.static(Path.join(__dirname,"public")));
const PORT = 3000;

app.get('/',function(req,res){
    fs.readdir(`./files`,function(err,files){
        res.render("index",{files:files});
    });
})

app.post('/create',function(req,res){
    // console.log(req.body);
    fs.writeFile(`./files/${req.body.titles}.txt`,req.body.Details,function(err){
        res.redirect("/");
    });
    // console.log(req.body.titles);
    // console.log(req.body);
})
app.get('/file/:filename',function(req,res){
    fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,data){
        //console.log(data);
        const title = req.params.filename;
        res.render("task",{data:data,title:title});
    })
})
app.get('/deletefile/:filename',function(req,res){
    fs.unlink(`./files/${req.params.filename}`,function(err){
        if(err){
            return res.status(500).send("Error deleting file.");
        }
        else{
            res.redirect("/");
        }
    })
})

// app.get('/deletefile/:filename', function (req, res) {
//     const filePath = `./files/${req.params.filename}`;

//     fs.unlink(filePath, function (err) {
//         if (err) {
//             if (err.code === "ENOENT") {
//                 return res.status(404).send("File not found.");
//             }
//             return res.status(500).send("Error deleting file.");
//         }
//         res.redirect("/");
//     });
// });


app.listen(PORT,function(){
    console.log(`Server is listen on ${PORT}:`);
})