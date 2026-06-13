import { Link,Station } from "../models/Stations";
const URL = "http://localhost:3001"

const GetStations = async ()=>{
    const result = await fetch(URL+"/api/Stations",{method:"GET",headers: { "Content-Type": "application/json"}, credentials: 'include'})
    if(result.ok){
        return result.json()
    }
    else{
        return {error:"internal server error"}
    }
}

const GetLinks = async ()=>{
    const result = await fetch(URL+"/api/Links",{method:"GET",headers: { "Content-Type": "application/json"}, credentials: 'include'})
    if(result.ok){
        return result.json()
    }
    else{
        return {error:"internal server error"}
    }
}
export {GetLinks,GetStations} 