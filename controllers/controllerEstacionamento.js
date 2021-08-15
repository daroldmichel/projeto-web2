const db = require('../config/db_sequelize');

module.exports = {
        async getCreate(req, res) {
        res.render('estacionamento/estacionamentoCreate');
    },
    async postCreate(req, res) {
        db.Estacionamento.create({
            descricao:req.body.descricao,
        });
        res.redirect('/home');
    },
    async getList(req, res) {
        db.Estacionamento.findAll().then (estacionamentos => {
            res.render('estacionamento/estacionamentoList', {estacionamentos: estacionamentos.map(estacionamentos => estacionamentos.toJSON())});
        });
    },
    async getEdit(req, res) {
        db.Estacionamento.findOne({where: {id: req.params.id}}).then((estacionamentos)=>{
            res.render('estacionamento/estacionamentoEdit', {estacionamentos:estacionamentos.toJSON()});
        });
    },
    async postEdit(req, res) {
        db.Estacionamento.update(req.body, {where: {id: req.body.id}}).then((estacionamentos)=>{
            res.redirect('/estacionamentoList');
        });
    },
    async getDelete(req, res) {
        db.Estacionamento.destroy({where: {id: req.params.id}}).then((estacionamentos)=>{
            console.log('Estacionamentos deletado: ' + estacionamentos)
            res.redirect('/estacionamentoList');
        });
    }
}
