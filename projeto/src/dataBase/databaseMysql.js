const { databaseConnection } = require('./connection')

const pokemons = {}

async function salvarPokemons(pokemon) {

    const queryInsertPokemon = `INSERT INTO pokemons(nome_pokemon, tipo) VALUES ('${pokemon.nome}', '${pokemon.tipo}')`

    const result = await databaseConnection.raw(queryInsertPokemon)

    if(result) {
        return {
            nome: pokemon.nome,
            tipo: pokemon.tipo,
            id: result[0].insertId
        }
    } else {
        console.error("Deu erro!")
        return {
            error: "Deu erro na inserção"
        }
    }
}

async function mostrarPokemon(id) {

    const querySelectPokemon = `SELECT * FROM pokemons WHERE id = ${id}`

    const result = await databaseConnection.raw(querySelectPokemon)

    return result[0]

}

async function mostrarPokemons() {

    const querySelectPokemon = `SELECT * FROM pokemons`

    const result = await databaseConnection.raw(querySelectPokemon)

    return result[0]}

function atualizarPokemon(id, pokemon) {
    pokemons[id] = pokemon
    return pokemon
}

function deletarPokemon(id){
    sequence._id = sequence._id - 1
    const pokemonDeletado = pokemons[id]
    pokemons.splice(id, 1)
    pokemons.forEach(pokemon => {
        if(pokemon.id > id) {
            pokemon.id = pokemon.id - 1
        }
    })
    return pokemonDeletado
}

function batalhaPokemon(id1,id2) {
    const superEfetivo = 40
    const efetivo = 20
    const naoEfetivo = 10

    const pokemon1 = pokemons[id1]
    const pokemon2 = pokemons[id2]

    if(pokemon1.hp != 0 && pokemon2.hp != 0) {
        if(pokemon1.tipo == pokemon2.fraqueza) {
            pokemon2.hp = pokemon2.hp - superEfetivo
        } else if(pokemon1.tipo == pokemon2.resistencia) {
            pokemon2.hp = pokemon2.hp - naoEfetivo
        } else {
            pokemon2.hp = pokemon2.hp - efetivo
        }
    }

    if(pokemon1.hp != 0 && pokemon2.hp != 0) {
        if(pokemon2.tipo == pokemon1.fraqueza) {
            pokemon1.hp = pokemon1.hp - superEfetivo
        } else if(pokemon2.tipo == pokemon1.resistencia) {
            pokemon1.hp = pokemon1.hp- naoEfetivo
        } else {
            pokemon1.hp = pokemon1.hp - efetivo
        }
    }

if(pokemon1.hp < 0) pokemon1.hp = 0
if(pokemon2.hp < 0) pokemon2.hp = 0

return `${pokemon1.nome}: ${pokemon1.hp} / ${pokemon2.nome}: ${pokemon2.hp}`

}

function curarPokemon(hp) {
    const pokemonCurado = pokemons[hp]

    if(pokemon1.hp < 100 || pokemon2.hp < 100) {
        pokemonCurado = (pokemons.hp) + 20
    }

    if(pokemon1.hp > 100) pokemon1.hp = 100
    if(pokemon2.hp > 100) pokemon1.hp = 100

    return pokemonCurado

}

module.exports = {salvarPokemons, mostrarPokemon, mostrarPokemons, atualizarPokemon, deletarPokemon, batalhaPokemon, curarPokemon }