const db = require('../config/db_sequelize');

module.exports = {
        async getCreate(req, res) {
            var pessoa;
            await db.Pessoa.findAll().then (pessoas => {
                pessoa = pessoas.map(pessoas => pessoas.toJSON());
            });
        res.render('veiculo/veiculoCreate', {pessoas:pessoa});
    },
    async postCreate(req, res) {
        db.Veiculo.create({
            tipo:req.body.tipo,
            modelo:req.body.modelo,
            fabricante:req.body.fabricante,
            placa:req.body.placa,
            cor:req.body.cor,
        });
        res.redirect('/home');
    },
    async getList(req, res) {
        db.Veiculo.findAll({ include: 'pessoa' }).then (veiculos => {
            console.log(veiculos);
            res.render('veiculo/veiculoList', {veiculos: veiculos.map(veiculos => veiculos.toJSON())});
        });
    },
    async getEdit(req, res) {
        var pessoa;
        if (parseInt(req.params.id) > 0 ){
            await db.Pessoa.findAll().then (pessoas => {
                pessoa = pessoas.map(pessoas => pessoas.toJSON());
            });
            db.Veiculo.findOne({where: {id: req.params.id}}).then((veiculos)=>{
                res.render('veiculo/veiculoEdit', {veiculos:veiculos.toJSON(), pessoas: pessoa});
            });
        }else{
            res.redirect( "/" + req.params.id);
        }

    },
    async postEdit(req, res) {
        db.Veiculo.update(req.body, {where: {id: req.body.id}}).then((veiculos)=>{
            res.redirect('/veiculoList');
        });
    },
    async getDelete(req, res) {
        db.Veiculo.destroy({where: {id: req.params.id}}).then((veiculos)=>{
            console.log('Veiculo deletado: ' + veiculos)
            res.redirect('/veiculoList');
        });
    },
    async getByPlaca(req, res) {
        db.Veiculo.findOne({ where: {placa: req.body.placa}, include: 'pessoa' }).then (veiculos => {
            res.render('veiculo/veiculoListByPlaca', {veiculos:veiculos.toJSON()});
        });
    },
}
