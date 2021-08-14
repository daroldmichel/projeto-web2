const Livro = require('../models/models_nosql/livro');

module.exports = {
    async getCreate(req, res) {
        res.render('livro/livroCreate');
    },
    async postCreate(req, res) {
        const {nome, autor, editor, genero, numpag} = req.body;
        const livro = new Livro({nome, autor, editor, genero, numpag});
            await livro.save();
            res.redirect('/home');
        res.redirect('/home');
    },
    async getList(req, res) {
        Livro.find().then((livros) => {
            res.render('livro/livroList', { livros: livros.map(livros => livros.toJSON())});
        });
    },
    async getEdit(req, res) {
        await Livro.findOne({_id:req.params.id}).then((livros)=>{
            res.render('livro/livroEdit', {livros:livros.toJSON()});
        });
    },
    async postEdit(req, res) {
        await Livro.findOneAndUpdate({_id:req.body._id}, req.body);
        res.redirect('/livroList');
    },
    async getDelete(req, res) {
        await Livro.findOneAndRemove({_id:req.params.id});
        res.redirect('/livroList');
    }
}
