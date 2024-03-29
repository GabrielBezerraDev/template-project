const Contato = require('../models/createModel')

exports.newPage = (req, res) => {
    let dados = null
    let createId = null
    res.render('index', {dados,createId})
}

exports.logout = (req, res) => {
    req.session.destroy()
    res.redirect('/')
    return  
}

exports.creating = (req, res) => {
    if(!req.session) return console.log('vc precisa está logado');
    const userId = req.params.userId
    const createId = req.params.createId
    const contatoId = req.params.contatoId 
    console.log(userId, createId, contatoId);
    res.render('createContato', {userId, createId, contatoId})
}

exports.create = async (req,res) => {
    let Id = '1234567890qwertyuiopasdfghjklçzxcvbnm'
    let contatoId = ''
    for (let i = 0; i < Id.length; i++){
         let charset = Math.floor(Math.random()*Id.length)
        contatoId += Id[charset]
        charset = ''
    }
    const contato = new Contato(req.body, req.params.userId, contatoId)
    await contato.criando()

    if(contato.errors.length > 0) {
        req.flash('errors', contato.errors);
        req.session.save(() => res.redirect('back'))
        return
    }
    req.flash('success', 'Contato registrado');
    req.session.save(() => res.redirect(`/${req.params.userId}/criado/${contato.contatoUser._id}/`))
    return
}

exports.modify = async (req,res) => {
    const contato = new Contato()
    console.log(req.body);
    await  contato.updateContato(req.params.contatoId, req.body)
    req.session.save(() => res.redirect(`/${req.params.userId}/criado/${req.params.createId}/`))
    return
}

exports.edit = async (req,res) => {
    const contato = new Contato()
    let dados = await contato.existUser(req.params.userId)
    const userId = req.params.userId
    const createId = req.params.createId
    console.log(dados);
    if(dados.length === 0) return
    dados = dados.map((dados) => {
        return dados = {
            nome: dados.nome,
            sobrenome: dados.sobrenome,
            email: dados.email,
            numero: dados.numero,
            contatoId: dados.contatoId
        }
    })
    res.render('index', {dados, userId, createId})
    return
}

exports.updateContato =  (req,res) => {
    console.log('esse middleware está funcionando')
    req.session.save(() => res.redirect(`${req.url}/createContato`))

}

exports.deleteContato = async (req,res) => {
    const contato = new Contato()
    await contato.deletandoContato(req.params.contatoId)
    let dados = await contato.existUser(req.params.userId)
    if(dados.length === 0) return res.redirect(`/home/${req.params.userId}/homePage/`)
    res.redirect(`/${req.params.userId}/criado/${req.params.createId}/`)
    return
}
