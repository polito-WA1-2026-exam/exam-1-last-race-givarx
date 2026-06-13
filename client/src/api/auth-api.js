const URL = "http://localhost:3001"

const LoginUser= async (username,password)=>{
    const body = {
        username:username,
        password:password
    }
    const result = await fetch(URL+"/api/sessions/login",{method:"POST",headers: { "Content-Type": "application/json"},body:JSON.stringify(body),credentials: 'include'})
    if(result.ok){
        const data = await result.json()
        return data
    }
    else return {error:"login error"}
}

//logout
const LogoutUser = async ()=>{
    const result = await fetch(URL+"/api/sessions/current/logout",{method:"DELETE",headers: { "Content-Type": "application/json"},credentials: 'include'})
    if(result.ok){
        return true
    }
    return false
   
}



export {LoginUser,LogoutUser}