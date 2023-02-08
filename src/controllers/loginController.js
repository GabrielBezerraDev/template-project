const Login = require('../../src/models/loginModel')

exports.index = (req, res) => {
    res.render('cadastro')
}

exports.register = async (req, res) => {
 try{  
    const login = new Login(req.body)
    await login.validando()

    if(login.errors.length > 0) {
        req.flash('errors', login.errors)
        req.session.save(function(){
            return res.redirect('/cadastro/')
        })
        return
    }
    req.flash('success','Seu usuário foi criado com sucesso')
    req.session.save(function(){
        return res.redirect('/cadastro/')
    })}
catch{
    console.log('Algo deu errado');
}
}

