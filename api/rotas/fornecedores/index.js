// O "roteador" esta fazendo o msm que o app, pois recebe uma instancia do express
const roteador = require('express').Router() // Ira agrupar as rotas e irá esportar.
const TabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require('./Fornecedor')
const SerializadorFornecedor = require('../../Serializador').SerializadorFornecedor

roteador.get('/', async (requisicao, resposta) => {
    // como estamos trabalhando com as serviços, externos estamos trabalhando async e await
    const resultados = await TabelaFornecedor.listar()
    resposta.status(200)
    const serializador = new SerializadorFornecedor(
        resposta.getHeader('Content-Type')
    )
    resposta.send(
        serializador.serializar(resultados) 
    )
    //JSON.stringify(resultados)
})

roteador.post('/', async (requisicao, resposta, proximo) => {
    // como estamos trabalhando com as serviços, externos estamos trabalhando async e await
   
    try{
        const dadosRecebidos = requisicao.body;
        const fornecedor = new Fornecedor(dadosRecebidos)
        await fornecedor.criar()
        resposta.status(201)
        const serializador = new SerializadorFornecedor(
            resposta.getHeader('Content-Type')
        )
        resposta.send(
            serializador.serializar(fornecedor) 
        )
        // JSON.stringify(fornecedor)
            
    }catch(erro){
        proximo(erro)
    }
})


roteador.get('/:idFornecedor', async (requisicao, resposta, proximo) => {
    try{
        const id = requisicao.params.idFornecedor;
        const fornecedor = new Fornecedor({id:id})
        await fornecedor.carregar()
        resposta.status(200)
        const serializador = new SerializadorFornecedor(
            resposta.getHeader('Content-Type')
        )
        resposta.send(
            serializador.serializar(fornecedor) 
        )
        // JSON.stringify(fornecedor)

    }catch(erro){
        proximo(erro)
    }
    
})


roteador.put('/:idFornecedor', async (requisicao, resposta, proximo) => {
    try{
        const id = requisicao.params.idFornecedor;
        const dadosRecebidos = requisicao.body;
        const dados = Object.assign({},dadosRecebidos, {id:id} )
        const fornecedor = new Fornecedor(dados)
        await fornecedor.atualizar()// 
        resposta.status(204) // Sucesso, sem conteúdo na resposta.
        resposta.end()
        

    }catch(erro){
        proximo(erro)
    }
     
})

roteador.delete('/:idFornecedor', async (requisicao, resposta, proximo) => {
    try{
        const id = requisicao.params.idFornecedor;
        const fornecedor = new Fornecedor({id:id})
        await fornecedor.carregar()
        await fornecedor.remover()
        resposta.status(204) // Sucesso, sem conteúdo na resposta.
        resposta.end()
    
    }catch(erro){
       proximo(erro)
    }
    
})

module.exports = roteador