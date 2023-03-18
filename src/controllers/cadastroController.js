const Acessar = require('../models/loginModel')
const Contato = require('../models/createModel')

exports.logar = (req,res) => {
    console.log('chegou');
    console.log('Essa session está como: '+req.session);
    const pop = 0;
    res.render('login',{pop})
}

exports.entrar = async (req,res) => {
    const acessar = new Acessar(req.body)
    await acessar.checkUser()
    if(acessar.errors.length > 0){
        req.flash('errors', acessar.errors);
        req.session.save(function(){
            return res.redirect('/login/')
        })
        return
    }
    const contato = new Contato()
    let dados = await contato.existUser(acessar.user._id)
    console.log('existem '+dados);
    if(dados.length === 0){
    console.log(dados);
    req.session.save(function(){
         res.redirect(`/home/${acessar.user._id}/homePage/`)
    })  
    return
    }
    req.flash('success', 'Você entrou no sistema');
    console.log(acessar.user._id);
    req.session.save(function(){
    const createId = 'first'
        return res.redirect(`/home/${createId}/${acessar.user._id}/`)
    })
}