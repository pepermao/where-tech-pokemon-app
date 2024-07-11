import { useContext } from "react"
import { PokemonContext } from "../PokemonProvider"

const PokemonList = () => {
    const { myPokemons } = useContext(PokemonContext)
    return (
        <div style={{ flex: "1 1 200px" }}>
            <h4>My pokemons</h4>
            <div style={{ display: "flex", flexDirection: "column" }}>
                {Array.isArray(myPokemons) && myPokemons?.length > 0 && myPokemons.map((pokemon, i) => (
                    <li key={i}>
                        {i + 1}. {pokemon}
                    </li>
                ))}
                {myPokemons?.length <= 0 && (
                    <span>No pokemons captured</span>
                )}
            </div>
        </div>
    )
}

export default PokemonList