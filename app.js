const express=require("express");
const session=require("express-session");
require("dotenv").config();
const passport=require("passport");
const path=require("path");
require("./passportGithub")
require("./passportGoogle")

const port=process.env.PORT;

const app=express();
app.use("/assets",express.static('uploads'));
app.set("view engine","ejs");

app.use(session({
    secret:process.env.SESSION,
    resave:false,
    saveUninitialized:false,
    cookie:{secure:false}
}));

app.use(passport.initialize())
app.use(passport.session())

app.get("/auth",(req,res)=>{
res.render("pages/login")
});
app.get("/dashboard", (req, res) => {
    if (req.isAuthenticated()) {
       // console.log(req.user)
        res.render(path.join(__dirname,"views","pages" ,"dashboard.ejs"), {
            user: req.user
        });
    } else {
        res.redirect("/auth");
    }
});



app.get("/auth/github",passport.authenticate("github",{scope:["profile"]}));
app.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}))

app.get("/auth/github/callback",passport.authenticate("github",{failureRedirect:"/auth"}),(req,res)=>{
res.redirect("/dashboard")
})
app.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/auth" }), (req, res) => {
    res.redirect("/dashboard");
});


    app.post("/logout",(req,res)=>{
        req.logout(function(err){
            if(err){
                console.log(err)
            }
           res.redirect("/auth")
        })
    })
app.listen(port,(req,res)=>{
    console.log(`Listening to the port ${port}`)
})