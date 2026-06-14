//file used for db operations and object operation + utils
import sqlite3 from "sqlite3";
import { Link, Station, Dijkstra_finder,DUMP_LINK_LIST,DUMP_STATION_LIST } from "./Stations.js";
import crypto from "crypto";
import { resolve } from "dns";
const db = new sqlite3.Database("db.sqlite3",(err) => {if(err) throw err;});
const select_all_stations = " SELECT NAME FROM STATIONS "
const select_all_links = " SELECT * FROM LINKS"

async function AllStations(){
    return new Promise((resolve,reject)=>{
        db.all(select_all_stations,(err,rows)=>{
            if(err) reject(err)
                else{
                    resolve(rows.map((a)=>new Station(a.NAME)))
            }
        })
    })
}

async function AllLinks(){
    return new Promise((resolve,reject)=>{
        db.all(select_all_links,(err,rows)=>{
            if(err) reject(err)
                else{
                    resolve(rows.map((a)=>new Link(a.FROM,a.TO,a.COLOR)))
            }
        })
    })
}

async function SelectRandomStations(){
    //this algorithm is done assuming that there is at least one valid path
    //between two stations,
    //given the db population requirements of the task we are can guarantee that
    //because we have at least 4 lines, 4 stations per line and 1 exchange station per line
    const stations = await AllStations()
    const links = await AllLinks()
    let min_distance = 0
    let start = {}
    let end = {};
    while(min_distance<3){
        let randomIndex_1 = crypto.randomInt(0, stations.length)
        let randomIndex_2 = crypto.randomInt(0, stations.length)
        let min_distance = Dijkstra_finder(stations,links,stations[randomIndex_1],stations[randomIndex_2])
        if(min_distance>=3){
            start = stations[randomIndex_1]
            end = stations[randomIndex_2]
            return {
        "from": start,
        "to": end
        }
        
    }
        
    }
    
}

async function GetStation(station){
    let res = await AllStations()
    return res.find((s)=>{
        return s.name === station.name;
    }) || {}
}

async function GetLink(link){
    let res = await AllLinks()
    return res.find((l)=>{
        return l.from === link.from && l.to === link.to;
    }) || {}
}

//user ops
async function AuthUser(username,password){
    return new Promise((resolve,reject)=>{
        let sql = "SELECT * FROM USERS WHERE USERNAME = ?"
        //sql injection, allows me to pass and switch ? character with thw values i want
        db.get(sql,[username],(err,row)=>{
            if(err) reject(err)
            else {
                if(!row) resolve(false)
                else {
                    const salt = row.salt
                    crypto.scrypt(password,salt,32,(err,hashedpassword)=>{
                        if(err) reject(err)
                        if(!crypto.timingSafeEqual(Buffer.from(row.PASSWORD,'hex'),hashedpassword))
                            resolve(false)
                        else resolve({ username: row.USERNAME })
                    })
                }
        }
        })
    })
}
function GetHighScore(username){
    return new Promise((resolve,reject)=>{
        let sql = "SELECT MAX(SCORE) AS HIGHSCORE FROM RACES WHERE PLAYER = ?"
    db.get(sql,[username],(err,row)=>{
            if(err) reject(err)
            else{
                resolve({"highscore":row.HIGHSCORE})
            }
        })
    })
}

function GetHighScores(){
    return new Promise((resolve,reject)=>{
        let sql = "SELECT MAX(SCORE) AS HIGHSCORE, PLAYER FROM RACES GROUP BY PLAYER ORDER BY HIGHSCORE DESC"
    db.all(sql,(err,row)=>{
            if(err) reject(err)
            else{
                resolve(row.map((a)=>({"highscore":a.HIGHSCORE,player:a.PLAYER})))
            }
        })
    })
}
export function UpdateRaceRecords(username,score){
    return new Promise((resolve,reject)=>{
        let sql = "INSERT  INTO RACES (PLAYER, SCORE) VALUES (?,?)"
        db.run(sql, [username, score], function(err) {
            if(err) reject(err)
            else resolve({ id: this.lastID })
        })
    })
}
export function GetRandomEvents(number=1){
    return new Promise((resolve,reject)=>{
        let sql = "SELECT * FROM EVENTS"
        db.all(sql,(err,rows)=>{
            if(err) reject(err)
            else{
                let Event_set = []
                for(let i=0;i<number;i++){
                    let randint = crypto.randomInt(rows.length)
                    Event_set.push({"name": rows[randint].NAME, "buff":rows[randint].BUFF})
                }
                resolve(Event_set)
            }
        })
    })
}
let res = await AllStations()
console.log(res[1])
res = await AllLinks()
console.log(res[1])
console.log(await GetLink(DUMP_LINK_LIST[0]))
console.log (await GetStation(DUMP_STATION_LIST[1]))
console.log(await AuthUser("dummyuser","dummyuser12"))
console.log(await SelectRandomStations())
console.log(await GetHighScore("dummyuser"))
console.log(await GetRandomEvents())
export {AuthUser,AllLinks,AllStations,GetLink,GetStation,SelectRandomStations,GetHighScores}