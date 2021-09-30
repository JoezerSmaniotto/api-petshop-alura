class ValorNaoSuportado extends Error {
    constructor(contentType){
        // Como preciso alterar o alterar as propriedade da classe, passo o this.name 
        super(`O tipo de conteúdo ${contentType} não é suportado`)
        this.name = "ValorNaoSuportado"
        this.idErro = 3
    }
}

module.exports = ValorNaoSuportado