
module.exports = (sequelize, Sequelize) => {
    const Veiculo = sequelize.define('veiculo', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        tipo: {
            type: Sequelize.STRING, allowNull: false
        },
        modelo: {
            type: Sequelize.STRING, allowNull: false
        },
        fabricante: {
            type: Sequelize.STRING, allowNull: false
        },
        placa: {
            type: Sequelize.STRING, allowNull: false
        },
        cor: {
            type: Sequelize.STRING, allowNull: false
        }
    });

    return Veiculo;
}
