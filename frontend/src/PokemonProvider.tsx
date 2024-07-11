import { createContext, useEffect, useState } from "react";


export const PokemonContext = createContext({
    pokemons: [],
    userLogs: [""],
    addUserLog: (_: any) => { },
    myPokemons: [],
    addPokemon: (_: any) => { }
})

export const PokemonProvider = (props: any) => {
    const [pokemons, setPokemons] = useState([]);
    const [userLogs, setUserLogs] = useState([""])
    const [myPokemons, setMyPokemons] = useState<any>([])

    useEffect(() => {
        const fetchPokemons = async () => {
            const apiResult = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50")
            const { results } = await apiResult.json();
            setPokemons(results)
        }
        fetchPokemons()
    }, [])


    const addUserLog = (log: string) => {
        setUserLogs((prev) => [...prev, log])
    }

    const addPokemon = (newPokemon: any) => {
        setMyPokemons((prev: any) => {
            if (prev) {
                return [...prev, newPokemon]
            }

            return [newPokemon]
        })
    }

    return (
        <PokemonContext.Provider
            value={{ pokemons, addUserLog, userLogs, myPokemons, addPokemon }}
        >
            {props.children}
        </PokemonContext.Provider>
    )
}