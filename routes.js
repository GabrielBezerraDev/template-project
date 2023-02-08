const express = require('express')
const homeControllers = require('./src/controllers/homeControllers')
const route = express.Router()
const loginController = require('./src/controllers/loginController')
const cadastroController = require('./src/controllers/cadastroController')

route.get('/home/:userId/homePage/', homeControllers.newPage)
route.get('/home/:userId/homePage/createContato', homeControllers.creating)
route.get('/home/:userId/homePage/createContato/logout', homeControllers.logout)
route.get('/home/:userId/', homeControllers.edit)
route.get('/home/:userId/homePage/logout', homeControllers.logout)
route.get('/home/:userId/createContato', homeControllers.creating)
route.post('/home/:userId/createContato/criado/', homeControllers.create)
route.get('/:userId/criado/:createId/', homeControllers.edit)
route.get('/:userId/criado/:createId/createContato', homeControllers.creating)
route.get('/:userId/criado/:createId/logout', homeControllers.logout)
route.get("/:userId/criado/:createId/:contatoId/update", homeControllers.updateContato)
route.get("/:userId/criado/:createId/:contatoId/delete", homeControllers.deleteContato)

route.get('/cadastro/', loginController.index)
route.post('/cadastro/register', loginController.register)

route.get('/login/', cadastroController.logar)
route.post('/login/enter', cadastroController.entrar)


module.exports = route