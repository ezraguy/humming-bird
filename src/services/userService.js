import jwtDecode from 'jwt-decode';
import http from './httpService'
import { apiUrl } from '../config.json';



export function getJwt() {
    return localStorage.getItem("token");
}

export async function login(email, password) {

    //gets the user token 
    const { data } = await http.post(`${apiUrl}/auth`, { email, password })
    //saving the token in the local storage
    localStorage.setItem("token", data.token)
}

export function getCurrentUser() {
    // check if the token is valid
    try {
        const jwt = localStorage.getItem("token")
        return jwtDecode(jwt);
    } catch (err) {
        return null;
    }
}




export function logout() {
    localStorage.removeItem("token")
}

export default { getJwt, getCurrentUser, login, logout };