const db = require('../config/db_sequelize');

/*db.sequelize.sync({force: true}).then(() => {
    console.log('{ force: true }');
});*/

module.exports = {
        async getCreate(req, res) {
        res.render('veiculo/veiculoCreate');
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
        db.Veiculo.findOne({where: {id: req.params.id}}).then((veiculos)=>{
            res.render('veiculo/veiculoEdit', {veiculos:veiculos.toJSON()});
        });
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
    }
}
