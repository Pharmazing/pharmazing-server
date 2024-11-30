import express from "express";
import { ruruHTML } from "ruru/server";
import { schema } from "./src/graphql/schema.js";
import path from "path";
import { createYoga } from "graphql-yoga";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import passport from "passport";
import session from "express-session";
import cors from "cors";
import connectDB from "./src/db/config/config.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import admin from "firebase-admin";

admin.initializeApp({ projectId: "pharmazing-425018" });
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

//setup env variables
dotenv.config();

await connectDB();

const PORT = process.env.PORT || 5100;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `http://localhost:${PORT}/auth/google/callback`,
    },
    (_accessToken, _refreshToken, profile, cb) => {
      return cb(null, {
        id: "1",
        username: "foo@bar.baz",
        googleId: profile.id,
      });
    },
  ),
);

// function isValidToken(token) {
//   return typeof token === "string" ? token.includes("Bearer") : !!token;
// }

// function isAuthenticated(req, res, next) {
//   // console.log(req);
//   const proceed = isValidToken(req.headers.authorization);
//   //check here if the token is valid
//   // console.log(req.headers.authorization);
//   // i can chcek here for the requests that already have an access token and add the session or user to the request with a db call
//   return req.isAuthenticated() || proceed
//     ? next()
//     : res.redirect("/auth/google");
// }

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
// app.use(helmet());
app.use(
  session({
    secret: "sauce",
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.get("/auth/fail", (req, res) => {
  res.json({ loginFailed: true });
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] }),
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/fail" }),
  (req, res) => {
    res.redirect("/graphql");
  },
);

app.use("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (!err) {
      console.log("logged out");
      res.redirect("/graphql");
    }
  });
});

const gqlServer = createYoga({
  schema,
});
app.use;

app.use("/graphql", (req, res) => {
  req.setTimeout(500000);
  gqlServer(req, res);
});

app.use("/media", express.static(path.join(__dirname, "public")));

// Serve the GraphiQL IDE.
app.get("/ruru", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

// Start the server at port
app.listen(PORT);
console.log(`Running a GraphQL API server at http://localhost:${PORT}/graphql`);
