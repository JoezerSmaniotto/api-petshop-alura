class DadosNaoFornecidos extends Error{
    constructor(){
        super("Não foram fornecidos dados para atualizar!")
        // Como preciso alterar o alterar as propriedade da classe, passo o this.name ...
        this.name= 'DadosNaoFornecidos'
        this.idErro = 2
    }
}

module.exports = DadosNaoFornecidos