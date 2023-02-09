const mongoose = require('mongoose')

const CreateSchema = new mongoose.Schema({
    nome: {type: String, required: true, default: ''},
    sobrenome: {type: String, required: false, default: ''},
    email: {type: String, required: false, default: ''},
    numero: {type: String, required: false},
    userId: {type: String, required: true},
    data: {type: Date, require:true, default: Date.now()},
    contatoId: {type: String, require: true}
})

const CreateModel = mongoose.model('Create', CreateSchema)

class Contato{
    constructor(body, userId, contatoId){
        this.userId = userId
        this.body = body
        this.contatoUser = null
        this.errors = []
        this.contatoId = contatoId
    }

async criando(){
this.validando()
if(this.errors.length > 0) return 
this.body.userId = this.userId
this.body.contatoId = this.contatoId
this.contatoUser = await CreateModel.create(this.body)
}    

validando(){
    if(!this.body.nome) return this.errors.push('O campo nome é obrigatório')
    if(!this.body.email && !this.body.numero) return this.errors.push('É necessário haver um contato')
}

async existUser(id){
    const user = await CreateModel.find({userId: id});
    return user 
}

async deletandoContato(id){
   return await CreateModel.findOneAndDelete({contatoId: id})
}

async updateContato(id, novoObjeto){
    return await CreateModel.findOneAndUpdate({contatoId: id}, {nome: novoObjeto.nome, sobrenome: novoObjeto.sobrenome, email: novoObjeto.email, numero: novoObjeto.numero}, { new: true})
}
}

module.exports = Contato