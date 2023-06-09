import React from "react";

const FirstPage = () => {
    let jsonObj = localStorage.getItem('access')
    const check = JSON.parse(jsonObj)['check'];
    if(!check){
        jsonObj = JSON.stringify({check: true})
        localStorage.setItem('access',jsonObj);
        window.location.reload(true)
    }
    return(
        <div className="py-5 px-[6.5pc]">                    
            <div className="text-center text-5xl py-20 leading-relaxed">
                The most popular free <span className="text-blue-400">time tracker</span> for teams
            </div>
        </div>
    )
}

export default FirstPage;