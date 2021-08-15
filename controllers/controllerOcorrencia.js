const db = require('../config/db_sequelize');

module.exports = {
        async getCreate(req, res) {
            var estacionamento;
            var veiculo;
            await db.Estacionamento.findAll().then (estacionamentos => {
               estacionamento = (estacionamentos.map(estacionamentos => estacionamentos.toJSON()));
            });
            await db.Veiculo.findAll().then (veiculos => {
                veiculo = veiculos.map(veiculos => veiculos.toJSON());
            });
            res.render('ocorrencia/ocorrenciaCreate', {estacionamentos: estacionamento, veiculos: veiculo});
    },
    async postCreate(req, res) {
        console.log(req.body.datahora);
        db.Ocorrencia.create({
            observacao:req.body.observacao,
            datahora:req.body.datahora,
            estacionamentoId:req.body.estacionamentoId,
            veiculoId:req.body.veiculoId,
        });
        res.redirect('/home');
    },
    async getList(req, res) {
        db.Ocorrencia.findAll({ include: ['veiculo', 'estacionamento']}).then (ocorrencias => {
            console.log(ocorrencias);
            res.render('ocorrencia/ocorrenciaList', {ocorrencias: ocorrencias.map(ocorrencias => ocorrencias.toJSON())});
        });
    },
    async getEdit(req, res) {
        var estacionamento;
        var veiculo;
        await db.Estacionamento.findAll().then (estacionamentos => {
            estacionamento = (estacionamentos.map(estacionamentos => estacionamentos.toJSON()));
        });
        await db.Veiculo.findAll().then (veiculos => {
            veiculo = veiculos.map(veiculos => veiculos.toJSON());
        });
        db.Ocorrencia.findOne({where: {id: req.params.id}}).then((ocorrencias)=>{
            res.render('ocorrencia/ocorrenciaEdit', {ocorrencias:ocorrencias.toJSON(), veiculos: veiculo, estacionamentos: estacionamento});
        });
    },
    async postEdit(req, res) {
        db.Ocorrencia.update(req.body, {where: {id: req.body.id}}).then((ocorrencias)=>{
            res.redirect('/ocorrenciaList');
        });
    },
    async getDelete(req, res) {
        db.Ocorrencia.destroy({where: {id: req.params.id}}).then((ocorrencias)=>{
            console.log('Ocorrencia deletada: ' + ocorrencias)
            res.redirect('/ocorrenciaList');
        });
    }
}
