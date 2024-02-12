const passport=require("passport");
const GitHubStrategy=require("passport-github").Strategy

passport.use(new GitHubStrategy({
    clientID:process.env.GITHUB_ID,
    clientSecret:process.env.GITHUB_SECRET,
    callbackURL:process.env.GITHUB_CALLBACK
},function(accessToken,refreshToken,profile,cb){
  return cb(null,profile)
}));

passport.serializeUser(function(user,cb){
    return cb(null,user)
});

passport.deserializeUser(function(obj,cb){
    return cb(null,obj)
})