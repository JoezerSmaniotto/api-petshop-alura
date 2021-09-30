const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')
const NaoEncontrado = require('./erros/NaoEncontrado')
const CampoInvalido = require('./erros/CampoInvalido')
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos')
const ValorNaoSuportado = require('./erros/ValorNaoSuportado')
const formatosAceitos = require('./Serializador').formatosAceitos

app.use(bodyParser.json())

app.use((requisicao, resposta, proximo)=>{
    let formatoRequisitado = requisicao.header('Accept')

    if(formatoRequisitado === '*/*'){
        formatoRequisitado = 'application/json'
    }

    if(formatosAceitos.indexOf(formatoRequisitado) === -1){
        resposta.status(406)
        resposta.end()    
        return 
    }
    resposta.setHeader('Content-Type',formatoRequisitado)
    proximo()
})

const roteador = require('./rotas/fornecedores')
// Manupulador de midlles, parametros opcionais 
app.use('/api/fornecedores', roteador) 

// MIDDLEWARE DE ERRO
app.use((erro, requisicao, resposta, proximo)=>{
    let status  = 500
    // Como criei uma classe de Erro com o nome de NaoEncontrado, verifico se o erro que esta
    // acontecendo, vejo com o "instanceof" se ele é uma instancia da minha classe de erros
    // Se for o retorno é 404, se não é outro erro. DESTA FORMA POSSO ENVIAR DOIS ERROS 
    // D I F E R E N T E S NA MESMA REQUISIÇAO
    if(erro instanceof NaoEncontrado ){
        status = 404
    }
    if(erro instanceof CampoInvalido || erro instanceof DadosNaoFornecidos ){
        status = 400
    }
    
    if(erro instanceof ValorNaoSuportado){
        status = 406 // Especificamente usado para que o tipo de valor que o cliente esta 
        // pedindo não é suportado pelo nossa API.
    }
   
    resposta.status(status) 
    resposta.send(
        JSON.stringify({
            mensagem: erro.message,
            id: erro.idErro
        })
    )

})

app.listen(config.get('api.porta'), () => console.log('A API está funcionando!'))