const TabelaFornecedor = require('./TabelaFornecedor')
const CampoInvalido = require('../../erros/CampoInvalido')
const DadosNaoFornecidos = require('../../erros/DadosNaoFornecidos')

class Fornecedor {
    // para conseguir pegar os dado na hora de instancia e classe, e assimilar a nossa instancia
    // temos que usar o metodo contrustor, este metodo irá constriuir a nossa classe, nesta caso
    // estamos recebendo como parametro um obj com os dados do Fornecedor o qual estou desestrurando
    constructor({id,empresa, email, categoria, dataCriacao, dataAtualizacao, versao}){
        this.id = id
        this.empresa = empresa
        this.email = email
        this.categoria = categoria
        this.dataCriacao = dataCriacao
        this.dataAtualizacao = dataAtualizacao
        this.versao = versao
    }

    async criar(){ // inserindo um fornecedor no banco de dados 
        this.validar()
        const resultado = await TabelaFornecedor.inserir({
            empresa: this.empresa,
            email: this.email,
            categoria: this.categoria,
        })
 
        // com o resultado apos sido salvo no banco, tenho que pegar o retorno e 
        // colocar na instancia da classe que foi criada
        this.id = resultado.id
        this.dataCriacao = resultado.dataCriacao
        this.dataAtualizacao = resultado.dataAtualizacao
        this.versao = resultado.versao
    }

    async carregar(){ // listar um fornecedor no banco de dados 
        const encontrado = await TabelaFornecedor.pegarPorId(this.id)
        this.empresa = encontrado.empresa
        this.email = encontrado.email
        this.categoria= encontrado.categoria
        this.dataCriacao = encontrado.dataCriacao
        this.dataAtualizacao = encontrado.dataAtualizacao
        this.versao = encontrado.versao
    }

    async atualizar(){ 
        await TabelaFornecedor.pegarPorId(this.id)
        const campos = ['empresa', 'email', 'categoria']
        const dadosParaAtualizar = {}
        
        campos.forEach((campo)=>{
            const valor = this[campo]

            if(typeof valor  === 'string' && valor.length >0){
                dadosParaAtualizar[campo]= valor
            }
        })
 
        if(Object.keys(dadosParaAtualizar).length ===0){
            throw new DadosNaoFornecidos()
        }

        await TabelaFornecedor.atualizar(this.id, dadosParaAtualizar)
    
    }

    remover(){ 
        return TabelaFornecedor.remover(this.id)
    }

    validar(){ // Função que verifica que se o campos estão validos
        const campos = ['empresa','email', 'categoria'];

        campos.forEach(campo=>{
            const valor  = this[campo]

            if(typeof valor !== 'string' || valor.length ===0){
                //throw new Error(`O Campo ${campo} está inválido`)
                // A linha a cima faz o msm que a linha de baixo, no entanto 
                // Porem abaixo criei uma classe personalizada para emitir os erros.
                throw new CampoInvalido(campo)
            }
        })
    }
}


module.exports = Fornecedor