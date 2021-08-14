
module.exports = (sequelize, Sequelize) => {
    const Estacionamento = sequelize.define('estacionamento', {
        id: {
        type: Sequelize.INTEGER,
            autoIncrement: true, allowNull: false, primaryKey: true
        },
        descricao: {
            type: Sequelize.STRING, allowNull: false
        }
    });
    return Estacionamento;
}
