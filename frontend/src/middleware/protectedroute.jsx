import {  useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../context/authcont"

export default function ProtectedRoute({children,allow}){
    const {user}=useContext(AuthContext)

if(allow=="admin"){
    if(!user || user.role!="admin"){
        return <Navigate to="/login" />
    }
    return children

}
    console.log(user)
    if(!user){
        return <Navigate to="/login" />
    }
    return children
}