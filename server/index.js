// imports
import express from "express";
import { Link,Station } from "./Stations.js";
import { AllLinks, AllStations,GetLink,GetStation,AuthUser, SelectRandomStations, } from "./dao.js";
import passport from "passport"
import LocalStrategy from "passport-local"
import session from "express-session";
// init express
const app = new express();
const port = 3001;
//middleware
app.use(express.json());
app.use(session({
  secret: "Sto gia facendo un impresa!",
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(function verify(username,password,callback){
  AuthUser(username,password).then((user)=>{
    if(!user)return callback(null,false,{
      message:"incorrect username and/or password"
    });
    return callback(null,user)
  }).catch(err => callback(err))
}))
const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({error: "Not authorized"});
}

passport.serializeUser((user,callback)=>{
  callback(null,{username:user.username})
})
passport.deserializeUser((user,callback)=>{
  callback(null,user)
})
// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

app.get("/api/Stations",async (req,res)=>{
  try {
    let result
    if(!req.query.station) result = await AllStations()
    else result = await GetStation(new Station(req.query.station))
    res.json(result)
  } catch(err) {
    res.status(500).json({error: err.message})
  }
})

app.get("/api/Links",async (req,res)=>{
  try {
    let result
    if(!(req.query.from && req.query.to)) result = await AllLinks()
    else result = await GetLink(new Link(req.query.from,req.query.to))
    res.json(result)
  } catch(err) {
    res.status(500).json({error: err.message})
  }
})

app.get("/api/RandomStations",isLoggedIn, async (req,res)=>{
  let result = await SelectRandomStations()
  res.json(result)
})
//post methods
app.post("/api/sessions", passport.authenticate("local"), function(req, res) {
  return res.status(201).json(req.user);
});
