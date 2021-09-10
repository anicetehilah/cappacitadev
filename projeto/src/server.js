const express = require('express')
const app = express()
const dataBase = require('./dataBase/dataBase')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))

app.get('/pokemons', async (req, res) => {
    res.send(await dataBase.mostrarPokemons())
})

app.get('/pokemons/:id', async (req, res) => {
    res.send(await dataBase.mostrarPokemon(req.params.id))
})

app.post('/pokemons', async (req, res) => {
    const pokemon = await dataBase.salvarPokemons({
        geracao: req.body.geracao,
        nome: req.body.nome,
        tipo: req.body.tipo,
        fraqueza: req.body.fraqueza,
        resistencia: req.body.resistencia,
        hp: 100,
        origem: req.body.origem,
    })
    res.send(pokemon)
})

app.put('/pokemons/:id', async (req, res) => {
   const pokemon = await dataBase.alterarPokemon(req.params.id, {
    geracao: req.body.geracao,
    nome: req.body.nome,
    tipo: req.body.tipo,
    fraqueza: req.body.fraqueza,
    resistencia: req.body.resistencia,
    hp: 100,
    origem: req.body.origem,
    id: parseInt(req.params.id)
   })
   res.send(pokemon)
})

app.delete('/pokemons/:id', async (req, res) => {
    res.send(await dataBase.deletarPokemon(req.params.id))
})

app.post('/batalha', (req, res) => {
    res.send(dataBase.batalhaPokemon(req.body.id1, req.body.id2))
})

app.get('/curar/:id', (req, res) => {
    res.send(dataBase.curarPokemon(req.params.id))
})

app.listen(3003)