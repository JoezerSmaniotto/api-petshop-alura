class NaoEncontrado extends Error {  
    // Não encontrado exprends a classe Error nativa do node, 
    // pegando as informações de erro, e adicionando mais informa
    constructor(){
        // Como preciso alterar o alterar as propriedade da classe, passo o this.name ...
        super('Fornecedor não foi encontrado!')
        this.name = 'NãoEncontrado'
        this.idErro = 0
    }
}

module.exports = NaoEncontrado