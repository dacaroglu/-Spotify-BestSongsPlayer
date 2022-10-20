const passport = require('passport')
const spotifyStrategy = require('passport-spotify').Strategy
const localStrategy = require('passport-local').Strategy
const User = require('../models/User')
const bcrypt = require('bcrypt')
/*------------spotify OAuth passport --------------*/
passport.use(
    new spotifyStrategy(
        { 
        
        clientID: process.env.CLIENT_ID,
        clientSecret:process.env.CLIENT_SECRET,
        callbackURL:process.env.REDIRECT_URL
        },
    function(accessToken, refreshToken, profile, cb){
        console.log('access token is: '+accessToken)
        console.log('profile details are: '+profile)

        User.findOne({'userID': profile.id },function(err,user){
            
            if(err) {return cb(err)}
            if(user){
                // user.song=Song.findById(user._id)
                // Song.save(function(err){})
                user.accesstoken=accessToken
                user.save(function(err){return cb(null,user)})
                
            }
            else{
                const newUser = new User({
                    userID: profile.id,
                    userName:profile.username,
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    premium:profile.product=='premium'?true:false,
                    profileURl:profile.profileURL,
                    accesstoken:accessToken,
                 })
            newUser.save(function(err){
                if(err){return cb(err)}
                console.log(newUser);return cb(null,newUser)
                        })
        }
        })
     
    })
)
passport.use(new localStrategy({
    usernameField:'email',
    passwordField:'password'
},(username,password,done)=>{
        User.findOne({email:username},(err,user)=>{
            console.log('error occured. its not valid')
            if(err){
                console.log('error occured. its not valid')
                return done (err)}
            if(!user){
                console.log('error occured. its not valid')
                return done(null,false)}
                console.log('password hash is: ',password)
                console.log('user password is: ',user.password)
            bcrypt.compare(password, user.password, (err, isValid)=>{
                if(err){
                    console.log('error occured. its not valid')
                    return done(err)}
                if(!isValid){
                    console.log('error occured. its not valid')
                    return done(null,false)}
                    console.log('error occured. its not valid')
                    return done(null,user)
            })
        })
    }
    
))
passport.serializeUser(function(User,done){
    done(null,User._id)

})
passport.deserializeUser(function(id,done){
    User.findById(id, function(err,user){
        done(err,user)
    })
})
