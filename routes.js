//teste
const express = require('express')
const homeControllers = require('./src/controllers/homeControllers')
const route = express.Router()
const loginController = require('./src/controllers/loginController')
const cadastroController = require('./src/controllers/cadastroController')

route.get('/home/:userId/homePage/', homeControllers.newPage)
route.get('/home/:userId/homePage/createContato/', homeControllers.creating)
route.get('/home/:createId/:userId/', homeControllers.edit)
route.get('/home/:createId/:userId/createContato/', homeControllers.creating)
route.get("/home/:userId/:contatoId/update", homeControllers.updateContato)
route.get("/:userId/:createId/:contatoId/update", homeControllers.creating)
route.get("/home/:userId/:contatoId/delete", homeControllers.deleteContato)
route.post('/home/:userId/createContato/criado/', homeControllers.create)
route.post('/:userId/:createId/:contatoId/modificar/', homeControllers.modify)
route.get('/:userId/criado/:createId/', homeControllers.edit)
route.get('/:userId/criado/:createId/createContato/', homeControllers.creating)
route.get("/:userId/:contatoId/:createId/delete", homeControllers.deleteContato)
route.get('/logout/' , homeControllers.logout)

route.get('/cadastro/', loginController.index)
route.post('/cadastro/register', loginController.register)

route.get('/', cadastroController.logar)
route.post('/login/enter', cadastroController.entrar)


module.exports = route