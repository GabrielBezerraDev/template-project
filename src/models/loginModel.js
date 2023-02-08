const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')

const LoginSchema = new mongoose.Schema({
    email: {type: String, required: true},
    usuario: {type: String, required: true},
    senha: {type: String, required: true},
    confirmarSenha: {type: String, required: true},
})

const LoginModel = mongoose.model('Login', LoginSchema)
class Login{
    constructor(body){
        this.body = body
        this.errors = []
        this.user = null
    }

async validando(){
   this.cleanUp()
   this.email()
   this.usuario()
   this.senha() 
   this.confirmarSenha()
   console.log(this.errors);
   this.body = {
    email: this.body.email,
    usuario: this.body.usuario,
    senha: this.body.senha,
    confirmarSenha: this.body.confirmarSenha 
}
   console.log(this.body);
   if(this.errors.length > 0) return
    const salt = bcryptjs.genSaltSync();
    this.body.senha = bcryptjs.hashSync(this.body.senha, salt)
    this.body.confirmarSenha = bcryptjs.hashSync(this.body.confirmarSenha, salt)
    this.user = await LoginModel.create(this.body)
}

cleanUp(){
    for( let keys in this.body){
        if(typeof this.body[keys] !== 'string'){
            this.body[keys] === ''
        }
    }
}

email(){
    let regex = /@yahoo\.com|@gmail\.com|@Outlook\.com/
    if(!this.body.email) return this.errors.push('O campo "email" é obrigatório')
    if(!this.body.email.match(regex)) this.errors.push('Email inválido')
}

usuario(){
    if(!this.body.usuario) return this.errors.push('O campo "usuário" é obrigatório')
    if(this.body.usuario.length < 6 || this.body.usuario.length > 16) this.errors.push('O usuário tem que ter entre 6 e 16 caracteres')
}

senha(){
    if(!this.body.senha) return this.errors.push('O campo "senha" é obrigatório')
    if(this.body.senha.length < 6 || this.body.senha.length > 16) this.errors.push('A senha tem que ter entre 6 e 16 caracteres')
}

confirmarSenha(){
    if(!this.body.confirmarSenha) return this.errors.push('O campo "confirmar senha" é obrigatório')
    if(this.body.senha !== this.body.confirmarSenha) this.errors.push('As senhas precisam ser iguais')
}

async checkUser(){
    this.user = await LoginModel.findOne({email: this.body.email});
    if(!this.user) return this.errors.push('Usuário inexistente')
    if(!this.body.senha) return this.errors.push('Senha inválida')
    if(!bcryptjs.compareSync(this.body.senha, this.user.senha)){
        this.errors.push('Senha inváida')
        this.user = null
        return
    }
}
}

module.exports = Login