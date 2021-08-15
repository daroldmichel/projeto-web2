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
db.Ocorrencia = require('../models/ocorrencia.js')(sequelize, Sequelize);

db.Pessoa.hasMany(db.Veiculo);
db.Veiculo.belongsTo(db.Pessoa);

db.Veiculo.hasMany(db.Ocorrencia);
db.Ocorrencia.belongsTo(db.Veiculo);

db.Estacionamento.hasMany(db.Ocorrencia);
db.Ocorrencia.belongsTo(db.Estacionamento);

/*db.sequelize.sync({force: true}).then(() => {
    console.log('{ force: true }');
});*/
module.exports = db;

