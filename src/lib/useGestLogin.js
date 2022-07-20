import { useState } from "react";

export { useGestLogin }

function useGestLogin() {
    const baseUrl = `http://localhost:3001/restaurateur`;
    const [isLogin,setLogState]=useState(false)

    return {
       login,
       logout,
       getToken,
       getState,
       isLogin
    }

    function getState() {
        if(localStorage.getItem("token")) setLogState(true)
        return isLogin
    }

    function logout() {      
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        setLogState(false)
    }

    function getToken() {
        return (localStorage.getItem("token"))
    }

    function login(mail,password) {
        const url = baseUrl + '/login'
        const request = new Request(url, {
            method: 'POST',
            body: JSON.stringify({ "mail":mail, "motdepasse":password }),
            headers: new Headers({ 'Content-Type': 'application/json' })
        });
        return fetch(request)
            .then((response) => {
                return response.json();
            })
            .then(({ token,userId,message }) => {
                localStorage.setItem("token", JSON.stringify(token));
                localStorage.setItem("userId", JSON.stringify(userId));
                setLogState(true)
                return {token:token,id:userId,message:message}    
            });
    }

}


