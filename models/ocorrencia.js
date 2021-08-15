const dateFormat = require('dateformat');

module.exports = (sequelize, Sequelize) => {
    const Ocorrencia = sequelize.define('ocorrencia', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        observacao: {
            type: Sequelize.STRING
        },
        datahora: {
            type: Sequelize.DATE, allowNull: false,
            get() {
                return dateFormat(this.getDataValue('datahora'), "yyyy-mm-dd") + 'T' +  dateFormat(this.getDataValue('datahora'), "hh:MM:ss");
            }
        }
    });

    return Ocorrencia;
}
