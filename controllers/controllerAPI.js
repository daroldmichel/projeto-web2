const Livro = require('../models/models_nosql/livro');
const mongoose = require('mongoose');

module.exports = {
    async getLivros(req, res) {
        const livros = await Livro.find();
        if(!livros) return res.status(204).send("Nenhum livro encontrado");
        return res.json({ "data": { "status": "success", livros } });
    },
    async getLivroById(req, res) {
        const {id} = req.params;
        if (!mongoose.Types.ObjectId.isValid(id) ) return res.status(204).send("Nenhum livro encontrado com esse ID");
        const livro = await Livro.findById(id).then((livro) => {
            if(!livro) return res.status(204).send("Nenhum livro encontrado com esse ID");
            return res.json({"data": {"status": "success", livro}});
        });
    },
    async postLivro(req, res) {
        const {nome, autor, editor, genero, numpag} = req.body;
        const livro = new Livro({nome, autor, editor, genero, numpag});
          await livro.save().then((livro) => {
                return res.json({"data": {"status": "success", livro } });
          });
    },
    async putLivro(req, res) {
        const id = req.params.id
        if (!mongoose.Types.ObjectId.isValid(id) ) return res.status(204).send("Nenhum livro encontrado com esse ID");
        await Livro.findOneAndUpdate({_id: {$in: id}}, req.body).then((livro) => {
            if(!livro) return res.status(204).send("Nenhum livro encontrado com esse ID");
            return res.json({"data": {"status": "success", livro}});
        });
    },
    async deleteLivro(req, res) {
        const id = req.params.id
        if (!mongoose.Types.ObjectId.isValid(id) ) return res.status(204).send("Nenhum livro encontrado com esse ID");
        await Livro.findOneAndRemove({_id: {$in: id}}).then((livro) => {
            if(!livro) return res.status(204).send("Nenhum livro encontrado com esse ID");
            return res.json({"data": {"status": "success", livro}});
    });
}

}
