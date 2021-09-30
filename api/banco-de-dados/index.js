const Sequelize = require('sequelize') // usamos para se comunicar com o banco de dados
const config = require('config')

//vamos criar uma instancia do Sequelize para usar em outras arquivos
const instancia = new Sequelize(
    // configurações do banco da dados
    config.get('mysql.banco-de-dados'),
    config.get('mysql.usuario'),
    config.get('mysql.senha'),
    // Aqui passo um OBJ para passar outras configurações da conexão. 
    {
        host: config.get('mysql.host'),
        dialect: 'mysql'
    }
)
// Vamos exportar uma conexao com banco de dados
module.exports = instancia