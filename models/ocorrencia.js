
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
            type: Sequelize.DATE, allowNull: false
        }
    });

    return Ocorrencia;
}
