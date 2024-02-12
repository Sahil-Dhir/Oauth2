const passport=require("passport");
const GoogleStrategy=require("passport-google-oauth20").Strategy

passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_ID,
    clientSecret:process.env.GOOGLE_SECRET,
    callbackURL:process.env.GOOGLE_CALLBACK,
},function(accessToken,refreshToken,profile,cb){
return cb(null,profile);
}));

passport.serializeUser(function(user,cb){
    return cb(null,user)
});

passport.deserializeUser(function(obj,cb){
    return cb(null,obj)
})