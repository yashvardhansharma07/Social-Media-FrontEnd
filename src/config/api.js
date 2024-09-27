import axios from "axios"

//export const API_BASE_URL="http://localhost:5454";
export const API_BASE_URL="https://connectingmysphere-production.up.railway.app"


export const api=axios.create({
  baseURL:API_BASE_URL,
  headers:{
    "Authorization":`Bearer ${localStorage.getItem("jwt")}`,
    "Content-Type":"application/json"
  }
})
