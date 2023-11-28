import React from "react";

const Home = () =>{
    const user = localStorage.getItem('user');
    const parseData = JSON.parse(user)
    return(
        <>Welcom {parseData?.Email}!</>
    )
}

export default Home