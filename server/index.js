// imports
import cors from "cors";
import express from "express";
import { Link,Station } from "./Stations.js";
import { AllLinks,GetRandomEvents, AllStations,GetLink,GetStation,AuthUser, SelectRandomStations, GetHighScores, UpdateRaceRecords} from "./dao.js";
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
//cors module
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
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

app.get("/api/Stations",isLoggedIn,async (req,res)=>{
  try {
    let result
    if(!req.query.station) result = await AllStations()
    else result = await GetStation(new Station(req.query.station))
    res.json(result)
  } catch(err) {
    res.status(500).json({error: err.message})
  }
})
app.get("/api/Links",isLoggedIn,async (req,res)=>{
  try {
    let result
    if(!(req.query.from && req.query.to)) result = await AllLinks()
    else result = await GetLink(new Link(req.query.from,req.query.to))
    res.status(200).json(result)
  } catch(err) {
    res.status(500).json({error: err.message})
  }
})

app.get("/api/RandomStations",isLoggedIn, async (req,res)=>{
  try{
    let result = await SelectRandomStations()
    res.json(result)
  } catch(err){
    res.status(500).json({error: err.message})
  }

})
app.get("/api/highscores",isLoggedIn,async (req,res)=>{
  let result = await GetHighScores()
  res.json(result)
})
app.get("/api/getRandomEvents",isLoggedIn,async(req,res)=>{
  try {
    const number = req.query.number ? Number(req.query.number) : undefined
    const result = await GetRandomEvents(number)
    res.json(result)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})
//logout
app.delete("/api/sessions/current/logout",(req,res)=>{
  req.logout(()=>{
    res.end();
  })
})
//post methods
//login
app.post("/api/sessions/login", passport.authenticate("local"), function(req, res) {
  return res.status(201).json(req.user);
});
app.post("/api/Register/Race",isLoggedIn,async (req,res)=>{
  try {
    await UpdateRaceRecords(req.user.username, req.body.score)
    res.status(201).json({ message: "Race recorded" })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})