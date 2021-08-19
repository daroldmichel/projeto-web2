const express = require('express');
const jwt = require('jsonwebtoken');
const controllerPessoa = require('../controllers/controllerPessoa');
const controllerVeiculo = require('../controllers/controllerVeiculo');
const controllerEstacionamento = require('../controllers/controllerEstacionamento');
const controllerOcorrencia = require('../controllers/controllerOcorrencia');
const controllerAPI = require('../controllers/controllerAPI');
const route = express.Router();

module.exports = route;

function verifyJWT(req, res, next){
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'Token não informado.' });

    jwt.verify(token, 'BicoDePato', function(err, decoded) {
        if (err) return res.status(500).json({ auth: false, message: 'Falha ao autenticar Token.' });
        req.userId = decoded.id;
        next();
    });
}

//Home
route.get("/home",function(req,res) {
    res.render('home');
});

//Controller Usuario

//Usuario - Login e Recuperação de Senha
route.get("/",controllerPessoa.getLogin);
route.get("/login",controllerPessoa.getLogin);
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
route.post("/veiculoPlaca",controllerVeiculo.getByPlaca);

//Estacionamento - CRUD
route.get("/estacionamentoCreate",controllerEstacionamento.getCreate);
route.post("/estacionamentoCreate",controllerEstacionamento.postCreate);
route.get("/estacionamentoList",controllerEstacionamento.getList);
route.get("/estacionamentoEdit/:id",controllerEstacionamento.getEdit);
route.post("/estacionamentoEdit",controllerEstacionamento.postEdit);
route.get("/estacionamentoDelete/:id",controllerEstacionamento.getDelete);

//Ocorrencia - CRUD
route.get("/ocorrenciaCreate",controllerOcorrencia.getCreate);
route.post("/ocorrenciaCreate",controllerOcorrencia.postCreate);
route.get("/ocorrenciaList",controllerOcorrencia.getList);
route.get("/ocorrenciaEdit/:id",controllerOcorrencia.getEdit);
route.post("/ocorrenciaEdit",controllerOcorrencia.postEdit);
route.get("/ocorrenciaDelete/:id",controllerOcorrencia.getDelete);

//ControllerAPI
route.get("/api/login",controllerAPI.getLogin);
route.get("/api/pessoa", verifyJWT, controllerAPI.getPessoa);
route.put("/api/pessoa", verifyJWT, controllerAPI.postPessoa);
route.get("/api/ocorrencias", verifyJWT, controllerAPI.getOcorrencia);
