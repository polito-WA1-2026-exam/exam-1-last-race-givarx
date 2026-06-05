//file used for db operations and object operation + utils
import sqlite3 from "sqlite3";
import { Link, Station, Dijkstra_finder,DUMP_LINK_LIST,DUMP_STATION_LIST } from "./Stations.js";
import crypto from "crypto";
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
        //i use sha256 for password encrypting for simplicity
        const hash = crypto.createHash('sha256').update(password).digest('hex');
        //sql injection, allows me to pass and switch ? character with thw values i want
        db.get(sql,[username],(err,row)=>{
            if(err) reject(err)
            else if(!row) resolve(false)
            else if(hash !== row.PASSWORD) resolve(false)
            else resolve({username:row.USERNAME})
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
export {AuthUser,AllLinks,AllStations,GetLink,GetStation,SelectRandomStations}