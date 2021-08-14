const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Livro = Schema({
    nome: { type: String, required: true },
    autor: { type: String, required: true },
    editor: { type: String, required: true },
    genero: { type: String, required: true },
    numpag: { type: Number, required: true }
});

module.exports = mongoose.model("Livro", Livro)