// O "roteador" esta fazendo o msm que o app, pois recebe uma instancia do express
const roteador = require('express').Router() // Ira agrupar as rotas e irá esportar.
const TabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require('./Fornecedor')

roteador.get('/', async (requisicao, resposta) => {
    // como estamos trabalhando com as serviços, externos estamos trabalhando async e await
    const resultados = await TabelaFornecedor.listar()
    resposta.status(200)
    resposta.send(
        JSON.stringify(resultados)
    )
})

roteador.post('/', async (requisicao, resposta, proximo) => {
    // como estamos trabalhando com as serviços, externos estamos trabalhando async e await
   
    try{
        const dadosRecebidos = requisicao.body;
        const forncedor = new Fornecedor(dadosRecebidos)
        await forncedor.criar()
        resposta.status(201)
        resposta.send(
            JSON.stringify(forncedor)
        )

    }catch(erro){
        proximo(erro)
    }
})


roteador.get('/:idFornecedor', async (requisicao, resposta, proximo) => {
    try{
        const id = requisicao.params.idFornecedor;
        const forncedor = new Fornecedor({id:id})
        await forncedor.carregar()
        resposta.status(200)
        resposta.send(
            JSON.stringify(forncedor)
        )

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
        resposta.status(204) // Sucesso, sem conteúdo na resposta.
        await fornecedor.atualizar()// 
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