const PokemonGame = new Game();

//TODO: Aca se deberia selecionar un pokemon apartir de una pokédex ;)
const ownPokemon = new Pokemon('Pikachu',100,PokemonGame.setRandomSkillsToPokemons())
const IAPokemon = new Pokemon('Squirtle',100,PokemonGame.setRandomSkillsToPokemons())

PokemonGame.startGame(ownPokemon, IAPokemon)



console.log(PokemonGame)

