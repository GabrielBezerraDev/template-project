import './css/index.css'
import 'core-js/stable'
import 'regenerator-runtime/runtime'

document.addEventListener('click', ({target}) =>{
    if(target.classList.contains('logar') || target.classList.contains('cadastrar')){
        const tela = document.querySelector(`.${target.classList}-usuario`)
        if(!tela.classList.contains('mostrar')){
            document.querySelector('.mostrar').style = 'display: none;'
            document.querySelector('.mostrar').classList.remove('mostrar')
            tela.classList.add('mostrar')
            tela.style = 'display:flex;' 
        }
}})