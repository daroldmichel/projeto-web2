const Sequelize = require('sequelize');

const sequelize = new Sequelize('projeto', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres'
  });

var db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Pessoa = require('../models/pessoa.js')(sequelize, Sequelize);
db.Veiculo = require('../models/veiculo.js')(sequelize, Sequelize);
db.Estacionamento = require('../models/estacionamento.js')(sequelize, Sequelize);
module.exports = db;

