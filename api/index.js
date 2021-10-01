const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')
const NaoEncontrado = require('./erros/NaoEncontrado')
const CampoInvalido = require('./erros/CampoInvalido')
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos')
const ValorNaoSuportado = require('./erros/ValorNaoSuportado')
const formatosAceitos = require('./Serializador').formatosAceitos
const SerializadorErro = require('./Serializador').SerializadorErro

app.use(bodyParser.json())

// Vai ficar validando se formato é aceito, caso não seja já emite e erro.
app.use((requisicao, resposta, proximo)=>{
    // Acesando pelo Accept vai comter o formato aceito, neste caso  o application/json 
    let formatoRequisitado = requisicao.header('Accept') 

    //Msm que venha '*/*' que seria aceito qualquer tipo de valor na resposta, forço a aceitar JSON
    if(formatoRequisitado === '*/*'){
        formatoRequisitado = 'application/json'
    }

    if(formatosAceitos.indexOf(formatoRequisitado) === -1){
        console.log("ERRO")
        console.log('formatosAceitos:',formatosAceitos)
        console.log('formatoRequisitado:',formatoRequisitado)
        resposta.status(406)
        resposta.end()    
        return 
    }
    // Se tudo der certo, vai setar o content-type passando o formato da resposta
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
    
    const serializador  = new SerializadorErro (
        resposta.getHeader('Content-Type')
    )
    resposta.status(status) 
    resposta.send(
        serializador.serializar({
            mensagem: erro.message,
            id: erro.idErro
        })
    )

})

app.listen(config.get('api.porta'), () => console.log('A API está funcionando!'))