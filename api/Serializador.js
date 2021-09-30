const ValorNaoSuportado = require('./erros/ValorNaoSuportado')

class Serializador {
    json(dados){
        return JSON.stringify(dados)
    }

    serializar(dados){
        if(this.contentType === 'application/json'){
            return this.json(
                this.filtrar(dados)
            )
        }

        throw new ValorNaoSuportado(this.contentType) 
    }

    filtrarObjeto(dados){
        const novoObjeto = {}
      
        this.camposPubicos.forEach((campo)=> {
            if(dados.hasOwnProperty(campo)){
                novoObjeto[campo] = dados[campo]
            }
        })

        return  novoObjeto
    }

    filtrar (dados){
        if(Array.isArray(dados)){
            dados = dados.map(item => {
               return this.filtrarObjeto(item)
            })

        }else{
            dados = this.filtrarObjeto(dados)
        }

        return dados
    }
}

class SerializadorFornecedor extends Serializador {
    constructor (contentType) {
        super()
        this.contentType = contentType
        this.camposPubicos = ['id','empresa','categoria']
    }
}

// Em vez de exportar a classe direto, iremos exportar um OBJ.
// Assim iremos exportar uma lista com os formatos aceitos
module.exports = {
    Serializador: Serializador,
    SerializadorFornecedor: SerializadorFornecedor,
    formatosAceitos: ['application/json']
}