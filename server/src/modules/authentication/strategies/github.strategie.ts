import passport from "passport";
var GitHubStrategy = require("passport-github2").Strategy;

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "/api/auth/github/callback",
    },
    function (
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
