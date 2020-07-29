const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose');
const keys = require('./keys')
const passport = require('passport');
const User = require('../models/User')

passport.serializeUser((user, done)=>{
    done(null,user.id)
})
passport.deserializeUser((id,done)=>{
    User.findById(id).then(user=>{
        done(null, user)
    }).catch(er=>{
        console.log('error', er)
    })
})


passport.use(
    new GoogleStrategy({
        clientID:keys.google.clientID,
        clientSecret:keys.google.clientSecret,
        callbackURL:'/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done)=>{
        //callback function
        // console.log(profile)
        User.findOne({googleID:profile.id}).then(user=>{
            if(user){
                console.log('USer exists!!!')
            
                done(null, user)
            }else{
                const user = new User({
                    googleID:profile.id,
                    displayName:profile.displayName,
                    firstName:profile.name.givenName,
                    lastName:profile.name.familyName,
                    image:profile.photos[0].value,
                    email:profile.emails[0].value,
                })
                user.save().then(user=>{
                    console.log('Saved!',user)
                    done(null, user)

                }).catch(er=>{
                    console.log('Error')
                })
            }
        })

    })
)

