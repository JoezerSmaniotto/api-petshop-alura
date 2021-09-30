const Modelo = require('./ModeloTabelaFornecedor')
const NaoEncontrado = require('../../erros/NaoEncontrado')

module.exports = {
    listar () {
        return Modelo.findAll()
    },
    inserir (fornecedor) {
        return Modelo.create(fornecedor)
    },
    async pegarPorId(id){ // pq esse é async e o listar não é ?
        const encontrado = await Modelo.findOne({
            where:{
                id:id
            }
        })
        if(!encontrado){
            throw new NaoEncontrado()
        }

        return encontrado
    },   

    async atualizar(id, dadosParaAtualizar){
        return Modelo.update(
            dadosParaAtualizar, // Aqui os dados que seram atualizados
            {
                where:{id:id}  // Informações de quem irá atualizar 
            }
        )
    },

    remover(id){
        return Modelo.destroy({
            where:{id:id}
        })
    }
}