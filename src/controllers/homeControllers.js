const Contato = require('../models/createModel')

exports.newPage = (req, res) => {
    let dados = null
    const user = req.session
    res.render('index', {dados})
}

exports.logout = (req, res) => {
    req.session.destroy()
    res.redirect('/login/')
    return  
}

exports.creating = (req, res) => {
    if(!req.session) return console.log('vc precisa está logado');
    const userId = req.params.userId
    res.render('createContato', {userId})
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

exports.edit = async (req,res) => {
    const contato = new Contato()
    let dados = await contato.existUser(req.params.userId)
    if(!dados) return 
    console.log(dados);
    dados = dados.map((dados) => {
        return dados = {
            nome: dados.nome,
            sobrenome: dados.sobrenome,
            email: dados.email,
            numero: dados.numero,
            contatoId: dados.contatoId
        }
    })
    console.log(dados);
    res.render('index', {dados})
    return
}

exports.updateContato = async (req,res) => {
    
}

// const contato = new Contato()
// await contato.updateContato(req.params.contatoId)


exports.deleteContato = async (req,res) => {
    const contato = new Contato()
    console.log(req.params.contatoId);
    await contato.deletandoContato(req.params.contatoId)
    res.redirect(`/:${req.params.userId}/criado/${req.params.crea}/`)
}
