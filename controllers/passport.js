import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";

import GitHubStrategy from "passport-github2";

import UserSocial from "../models/UserSocial.js";
import "dotenv/config";

const {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
} = process.env;

//Google
passport.use(
    new GoogleStrategy({
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:5000/api/auth/google/callback",
        },
        async(accessToken, refreshToken, profile, done) => {
            try {
                let user = await UserSocial.findOne({ googleId: profile.id });
                if (user) {
                    return done(null, user);
                } else {
                    const newUser = {
                        username: profile.displayName,
                        googleId: profile.id,
                        avatar: profile.photos[0].value,
                        email: profile.emails[0].value,
                    };
                    user = await UserSocial.create(newUser);
                    done(null, user);
                    console.log(profile);
                }
            } catch (error) {
                console.log(error);
            }
        }
    )
);

//Github
passport.use(
    new GitHubStrategy({
            clientID: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET,
            callbackURL: "http://localhost:5000/api/auth/github/callback",
        },
        async(accessToken, refreshToken, profile, done) => {
            try {
                let user = await UserSocial.findOne({ googleId: profile.id });
                if (user) {
                    return done(null, user);
                } else {
                    const newUser = {
                        username: profile.displayName,
                        googleId: profile.id,
                        avatar: profile.photos[0].value,
                    };
                    user = await UserSocial.create(newUser);
                    done(null, user);
                }
            } catch (error) {
                console.log(error);
            }
        }
    )
);

//After Login create UserId inside Session
passport.serializeUser(async(user, done) => {
    done(null, user);
});

//Find Session info using Session id
passport.deserializeUser(async(user, done) => {
    done(null, user);
});