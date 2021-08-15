
module.exports = (sequelize, Sequelize) => {
    const Pessoa = sequelize.define('pessoa', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        nome: {
            type: Sequelize.STRING, allowNull: false
        },
        telefone: {
            type: Sequelize.STRING, allowNull: false
        },
        email: {
            type: Sequelize.STRING, allowNull: false
        },
        senha: {
            type: Sequelize.STRING, allowNull: false
        },
        tipo: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        ramal: {
            type: Sequelize.STRING
        },
        sala: {
            type: Sequelize.STRING
        },
        cargo: {
            type: Sequelize.STRING
        },
        ra: {
            type: Sequelize.STRING
        },
        curso: {
            type: Sequelize.STRING
        },
        cpf: {
            type: Sequelize.STRING
        }

    });


    return Pessoa;
}
