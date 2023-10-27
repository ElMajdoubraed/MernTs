import { Request } from "express";
import passport from "passport";
var GoogleStrategy = require("passport-google-oauth2").Strategy;

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
      passReqToCallback: true,
    },
    function (
      request: Request,
      accessToken: string,
      refreshToken: string,
      profile: Object,
      done: Function
    ) {
      console.log(profile);
      return done(null, profile);
    }
  )
);

passport.serializeUser(function (user: any, done: Function) {
  done(null, user);
});

passport.deserializeUser(function (user: any, done: Function) {
  done(null, user);
});
