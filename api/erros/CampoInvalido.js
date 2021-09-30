class CampoInvalido extends Error {
    constructor(campo){
        const mensagem = `O Campo ${campo} está inválido`
        super(mensagem)
        // Como preciso alterar o alterar as propriedade da classe, passo o this.name ...
        this.name = "CampoInvalido",
        this.idErro = 1
    }   
}

module.exports =  CampoInvalido