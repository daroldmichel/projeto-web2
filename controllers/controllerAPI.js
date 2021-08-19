const db = require("../config/db_sequelize");
const jwt = require('jsonwebtoken');

module.exports = {
    async getLogin(req, res) {
        //esse teste abaixo deve ser feito no seu banco de dados
        if (req.body.email || req.body.senha){
            db.Pessoa.findOne({where: {email: req.body.email, senha: req.body.senha}}).then((pessoas)=>{
                if (pessoas){
                    const id = pessoas.id;
                    const token = jwt.sign({ id }, 'BicoDePato', {
                        expiresIn: 900 // expires in 15min
                    });
                    return res.json({ auth: true, id: id, token: token });
                }else{
                    res.status(500).json({message: 'Login inválido!'});
                }
            });
        }else{
            res.status(404).json({message: 'Por gentileza envie os campos: email e senha !'});
        }

    },
    async getPessoa(req, res) {
        db.Pessoa.findOne({where: {id: req.userId}}).then((pessoas)=>{
            if(pessoas){
                res.status(200).json(pessoas.toJSON());
            }
        });
    },
    async postPessoa(req, res) {
        db.Pessoa.update(req.body, {where: {id: req.userId}}).then((pessoas)=>{
            res.status(200).json(req.body);
        });
    },
    async getOcorrencia(req, res) {
        var veics = [];
        await db.Veiculo.findAll({where: {pessoaId: req.userId}}).then (veiculos => {
            veiculos.map(veiculos => veics.push(veiculos.toJSON()));
        });
        var ocorrencs =  [];
        console.log(veics)
        for (const veiculo of veics) {
            await db.Ocorrencia.findAll({where: {veiculoId: veiculo.id}}).then (ocorrencias => {
                ocorrencias.map(ocorrencias => ocorrencs.push(ocorrencias.toJSON()));
            });
        }
        res.status(200).json(ocorrencs);
       }
}
