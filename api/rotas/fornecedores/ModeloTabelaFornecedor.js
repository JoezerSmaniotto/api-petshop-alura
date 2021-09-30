const Sequelize = require('sequelize')
const instancia = require('../../banco-de-dados')// instancia do banco de dados.

const colunas = {
    empresa: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    categoria: {
        type: Sequelize.ENUM('ração', 'brinquedos'),
        allowNull: false
    }
}

const opcoes = {
    freezeTableName: true,
    tableName: 'fornecedores', // nome da tabela no MySQL
    timestamps: true,
    createdAt: 'dataCriacao', // Estra alterando o nome das colunas para portguês, se não 
    updatedAt: 'dataAtualizacao', // apenas passaria o conteudo direto.
    version: 'versao'
}
                                //1º nome da tabela no codigo 2º  Colunas, 3º  Opções da tabela 
module.exports = instancia.define('fornecedor', colunas, opcoes)