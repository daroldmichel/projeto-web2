const db = require('../config/db_sequelize');

/*db.sequelize.sync({force: true}).then(() => {
    console.log('{ force: true }');
});*/

module.exports = {
    async getLogin(req,res){
        res.render('pessoa/login',{layout: 'noMenu.handlebars'});
    },
    async getLogout(req,res){
        req.session.destroy();
        res.redirect('/');
    },
    async postLogin(req,res){
        db.Pessoa.findAll({ where: {email: req.body.email, senha: req.body.senha}}
        ). then (pessoas => {
            if (pessoas.length > 0){
                req.session.email = req.body.email;
                req.session.tipo = pessoas[0].tipo;
                res.render('home');
            }
            else
                res.redirect('/');
        });
    },
    async getCreate(req, res) {
        res.render('pessoa/pessoaCreate');
    },
    async postCreate(req, res) {
        if (req.body.tipo == 1 ) {
            db.Pessoa.create({
                nome:req.body.nome,
                telefone:req.body.telefone,
                email:req.body.email,
                senha:req.body.senha,
                tipo:req.body.tipo,
            });
        }else if(req.body.tipo == 2){
            db.Pessoa.create({
                nome:req.body.nome,
                telefone:req.body.telefone,
                email:req.body.email,
                senha:req.body.senha,
                tipo:req.body.tipo,
                ramal:req.body.ramal,
                sala:req.body.sala,
                cargo:req.body.cargo,
                ra:req.body.ra,
            });
        }
        else if(req.body.tipo == 3){
            db.Pessoa.create({
                nome:req.body.nome,
                telefone:req.body.telefone,
                email:req.body.email,
                senha:req.body.senha,
                tipo:req.body.tipo,
                ra:req.body.ra,
                curso:req.body.curso,
            });
        }
        else if(req.body.tipo == 4){
            db.Pessoa.create({
                nome:req.body.nome,
                telefone:req.body.telefone,
                email:req.body.email,
                senha:req.body.senha,
                tipo:req.body.tipo,
                cpf:req.body.cpf,
            });
        }
        res.redirect('/home');
    },
    async getList(req, res) {
        db.Pessoa.findAll().then (pessoas => {
            res.render('pessoa/pessoaList', {pessoas: pessoas.map(pessoas => pessoas.toJSON())});
        });
    },
    async getEdit(req, res) {
        db.Pessoa.findOne({where: {id: req.params.id}}).then((pessoas)=>{
            res.render('pessoa/pessoaEdit', {pessoas:pessoas.toJSON()});
        });
    },
    async postEdit(req, res) {
        db.Pessoa.update(req.body, {where: {id: req.body.id}}).then((pessoas)=>{
            res.redirect('/pessoaList');
        });
    },
    async getDelete(req, res) {
        db.Pessoa.destroy({where: {id: req.params.id}}).then((pessoas)=>{
            console.log('Pessoa deletada: ' + pessoas)
            res.redirect('/pessoaList');
        });
    }
}
