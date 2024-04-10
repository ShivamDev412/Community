// @ts-ignore
import passport from "passport";
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
import {
  addUserWithGoogleId,
  getUserByGoogleId,
} from "../database/UserQueries";
import db from "../database/db.config";

const GoogleMiddleware = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        passReqToCallback: true,
      },
      async (
        request: any,
        accessToken: any,
        refreshToken: any,
        profile: any,
        cb: any
      ) => {
        const defaultUser = {
          email: profile.email,
          name: `${profile.given_name} ${profile.family_name}`,
          image: profile.photos[0].value.replace("s96-c", "s400-c"),
          google_id: profile.id,
        };
        try {
          const existingUser = await db.user.findFirst({
            where: {
              google_id: profile.id,
            }
          })
          if (!existingUser) {
            const newUser = await db.user.create({
              data: {
                name: defaultUser.name,
                email: defaultUser.email,
                image: defaultUser.image,
                google_id: defaultUser.google_id
              }
            })
            return cb(null, newUser);
          } else {
            return cb(null, existingUser);
          }
        } catch (error) {
          return cb(error, null);
        }
      }
    )
  );
  passport.serializeUser((user: any, done: any) => done(null, user));
  passport.deserializeUser((user: any, done: any) => done(null, user));
};
const GithubMiddleware = () => {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
      },
      async (
        request: any,
        accessToken: any,
        refreshToken: any,
        profile: any,
        cb: any
      ) => {
        console.log(profile);
        const defaultUser = {
          email: profile.email,
          name: `${profile.given_name} ${profile.family_name}`,
          image: profile.photos[0].value,
          google_id: profile.id,
        };
        try {
          // const existingUser = await getUserByGoogleId(profile.id);
          // console.log("existingUser", existingUser);
          // if (!existingUser) {
          //   await addUserWithGoogleId(
          //     defaultUser.name,
          //     defaultUser.email,
          //     defaultUser.image,
          //     defaultUser.google_id
          //   );
          //   return cb(null, defaultUser);
          // } else {
          //   console.log("existingUser", existingUser);
          //   return cb(null, existingUser);
          // }
        } catch (error) {
          return cb(error, null);
        }
      }
    )
  );
};
const FacebookMiddleware = () => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      },
      async (
        request: any,
        accessToken: any,
        refreshToken: any,
        profile: any,
        cb: any
      ) => {
        console.log(profile);
        const defaultUser = {
          email: profile.email,
          name: `${profile.given_name} ${profile.family_name}`,
          image: profile.photos[0].value,
          google_id: profile.id,
        };
        try {
          // const existingUser = await getUserByGoogleId(profile.id);
          // console.log("existingUser", existingUser);
          // if (!existingUser) {
          //   await addUserWithGoogleId(
          //     defaultUser.name,
          //     defaultUser.email,
          //     defaultUser.image,
          //     defaultUser.google_id
          //   );
          //   return cb(null, defaultUser);
          // } else {
          //   console.log("existingUser", existingUser);
          //   return cb(null, existingUser);
          // }
        } catch (error) {
          return cb(error, null);
        }
      }
    )
  );
  passport.serializeUser((user: any, done: any) => {
    console.log("serializeUser", user);
    done(null, user);
  });

  passport.deserializeUser((user: any, done: any) => {
    console.log("deserializeUser", user);
    done(null, user);
  });
};
export { GoogleMiddleware, GithubMiddleware, FacebookMiddleware };
