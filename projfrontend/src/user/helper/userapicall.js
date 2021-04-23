
import API from "../../backend"

export const GetUser = (userId,token) => {
    return fetch(`${API}/user/${userId}`,{
        method:"GET",
        Authorization : `Bearer ${token}`
    }).then(respone =>{
        console.log(respone)
        return respone.json()
    })
    .catch(err => console.log(err))
}

export const UpdateUser=(user,userId,token)=>{
    return fetch(`${API}/user/${userId}`,{
        method:"PUT",
        headers:{
            Accept : "application/json",
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
        },
        body:JSON.stringify(user)
    })
    .then(
        respone =>{
            return respone.json()
        }
    )
    .catch(err=>console.log(err))
}