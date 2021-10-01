const ValorNaoSuportado = require('./erros/ValorNaoSuportado')
const jsontoxml = require('jsontoxml')

class Serializador {
    json(dados){
        return JSON.stringify(dados)
    }

    xml(dados){
        let tag = this.tagSingular
        if(Array.isArray(dados)){
            tag = this.tagPlural
            dados = dados.map((item)=>{
                return {
                    [this.tagSingular]: item
                }
            })
        }
        return jsontoxml({[tag]:dados})
    }

    serializar(dados){

        dados = this.filtrar(dados)
        //Usa o contentType da instancia da classe, para validar o formato this.contentType
        if(this.contentType === 'application/json'){
            return this.json(dados)
        }
        if(this.contentType === 'application/xml'){
            return this.xml(dados)
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
    constructor (contentType, camposExtras) {
        super()
        this.contentType = contentType
        this.camposPubicos = ['id','empresa','categoria'].concat(camposExtras || [])
        this.tagSingular = 'fornecedor'
        this.tagPlural = 'fornecedores'
    }
}

class SerializadorErro extends Serializador{
    constructor(contentType, camposExtras){
        super()
        this.contentType = contentType
        this.camposPubicos = [
            'id',
            'mensagem'
        ].concat(camposExtras)
        this.tagSingular = 'erro'
        this.tagPlural = 'erros'
    }
}

// Em vez de exportar a classe direto, iremos exportar um OBJ.
// Assim iremos exportar uma lista com os formatos aceitos
module.exports = {
    Serializador: Serializador,
    SerializadorFornecedor: SerializadorFornecedor, 
    SerializadorErro:SerializadorErro,
    formatosAceitos: ['application/json', 'application/xml']
}