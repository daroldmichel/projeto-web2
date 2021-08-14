const express = require('express');
const controllerPessoa = require('../controllers/controllerPessoa');
const controllerVeiculo = require('../controllers/controllerVeiculo');
const controllerEstacionamento = require('../controllers/controllerEstacionamento');
const controllerLivro = require('../controllers/controllerLivro');
const controllerAPI = require('../controllers/controllerAPI');
const route = express.Router();

module.exports = route;

//Home
route.get("/home",function(req,res) {
    res.render('home');
});

//Controller Usuario

//Usuario - Login e Recuperação de Senha
route.get("/",controllerPessoa.getLogin);
route.post("/login",controllerPessoa.postLogin);
route.get("/logout",controllerPessoa.getLogout);

//Pessoa - CRUD
route.get("/pessoaCreate",controllerPessoa.getCreate);
route.post("/pessoaCreate",controllerPessoa.postCreate);
route.get("/pessoaList",controllerPessoa.getList);
route.get("/pessoaEdit/:id",controllerPessoa.getEdit);
route.post("/pessoaEdit",controllerPessoa.postEdit);
route.get("/pessoaDelete/:id",controllerPessoa.getDelete);

//Veiculo - CRUD
route.get("/veiculoCreate",controllerVeiculo.getCreate);
route.post("/veiculoCreate",controllerVeiculo.postCreate);
route.get("/veiculoList",controllerVeiculo.getList);
route.get("/veiculoEdit/:id",controllerVeiculo.getEdit);
route.post("/veiculoEdit",controllerVeiculo.postEdit);
route.get("/veiculoDelete/:id",controllerVeiculo.getDelete);

//Estacionamento - CRUD
route.get("/estacionamentoCreate",controllerEstacionamento.getCreate);
route.post("/estacionamentoCreate",controllerEstacionamento.postCreate);
route.get("/estacionamentoList",controllerEstacionamento.getList);
route.get("/estacionamentoEdit/:id",controllerEstacionamento.getEdit);
route.post("/estacionamentoEdit",controllerEstacionamento.postEdit);
route.get("/estacionamentoDelete/:id",controllerEstacionamento.getDelete);

//Controller Livro
//Livro-CRUD
route.get("/livroCreate",controllerLivro.getCreate);
route.post("/livroCreate",controllerLivro.postCreate);
route.get("/livroList",controllerLivro.getList);
route.get("/livroEdit/:id",controllerLivro.getEdit);
route.post("/livroEdit",controllerLivro.postEdit);
route.get("/livroDelete/:id",controllerLivro.getDelete);

//ControllerAPI
route.get("/api/livro/:id",controllerAPI.getLivroById);
route.get("/api/livros",controllerAPI.getLivros);
route.post("/api/livro",controllerAPI.postLivro);
route.put('/api/livro/:id',controllerAPI.putLivro);
route.delete('/api/livro/:id',controllerAPI.deleteLivro);
