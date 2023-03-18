import './css/index.css'
import 'core-js/stable'
import 'regenerator-runtime/runtime'

if(!localStorage.getItem("pop")) document.querySelector(".pop").setAttribute("style","display:flex;")
document.addEventListener("click", ({target}) => {
        if(target.id === "okay"){
            document.querySelector(".pop").setAttribute("style","display:none;")
            localStorage.setItem("pop", true)
            }
    }
)