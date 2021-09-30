//AQUI é onde cria as tabela, pasando as definições do modelo  e do codigo  

const ModeloTabela = require('../rotas/fornecedores/ModeloTabelaFornecedor')

ModeloTabela
    .sync()
    .then(() => console.log('Tabela criada com sucesso'))
    .catch(console.log)
// Para conseguir criar as informações dentro do banco de dados, temos que sincronizar,
// por isso criamos ModeloTabela.sync() vai sincronicar as configurações, mas como retornam
// irei tratar a promessa usando o then, em caso de erro ele vai apresentar no catch