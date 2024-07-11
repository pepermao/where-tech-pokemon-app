import { useContext, useEffect, useState } from 'react'
import Map from '../Map/Map'
import GameLog from './GameLog';
import PokemonList from './PokemonList';
import { PokemonContext } from '../PokemonProvider';

const POKEMON_SHOW_PROBABILITY = 20;
const POKEMON_CAPTURE_PROBABILITY = 30

const Game = () => {
    const [configuration, setConfiguration] = useState<any>(null)
    const [characterPosition, setCharacterPosition] = useState({ x: 0, y: 0 });
    const { pokemons, addUserLog, addPokemon } = useContext(PokemonContext)

    useEffect(() => {
        const mapConfigurationJSON: any = localStorage.getItem("mapConfiguration")
        const mapConfiguration = JSON.parse(mapConfigurationJSON)
        setConfiguration(mapConfiguration)
    }, [])

    useEffect(() => {
        if (configuration) {
            onGrassMovement(characterPosition.x, characterPosition.y)
        }
    }, [characterPosition])

    useEffect(() => {
        window.addEventListener('keydown', handleCharacterMovement);
        return () => window.removeEventListener('keydown', handleCharacterMovement);
    }, [configuration]);


    const CanCharacterMove = (x: number, y: number) => {
        const item = x
        const currentArray = configuration.mapData[y]
        return currentArray[item] !== "sea"
    }

    const getRandomPokemon = () => {
        const randomNumber = Math.floor(Math.random() * 50);
        return pokemons[randomNumber]
    }

    const showPokemonAndCapture = () => {
        const shouldShow = Math.round(Math.random() * 100) <= POKEMON_SHOW_PROBABILITY;

        if (shouldShow) {
            const { name: pokemon } = getRandomPokemon()
            const isCaptured = Math.round(Math.random() * 100) <= POKEMON_CAPTURE_PROBABILITY;
            const newLog: string = `The ${pokemon} pokemon has appeared!!! You threw a pokeball and ${isCaptured ? "you captured" : "he ran away"}`
            addUserLog(newLog)
            if (isCaptured) {
                addPokemon(pokemon)
            }
            window.alert(newLog)
        }
    }

    const onGrassMovement = (x: number, y: number) => {
        const item = x
        const currentArray = configuration.mapData[y]

        if (currentArray[item] === "grass") {
            showPokemonAndCapture()
        }
    }


    const handleCharacterMovement = ({ key }: any) => {
        const supportedKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]

        if (supportedKeys.includes(key)) {
            setCharacterPosition((prevPos) => {
                const newPos = { ...prevPos };
                if (key === 'ArrowUp' && prevPos.y > 0 && CanCharacterMove(newPos.x, newPos.y - 1)) newPos.y -= 1;
                if (key === 'ArrowDown' && prevPos.y < configuration.height - 1 && CanCharacterMove(newPos.x, newPos.y + 1)) newPos.y += 1;
                if (key === 'ArrowLeft' && prevPos.x > 0 && CanCharacterMove(newPos.x - 1, newPos.y)) newPos.x -= 1;
                if (key === 'ArrowRight' && prevPos.x < configuration.width - 1 && CanCharacterMove(newPos.x + 1, newPos.y)) newPos.x += 1;
                return newPos;
            });
        }
    };


    //TODO: add loading feedback while getting the configuration file
    return (
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
            {configuration && (
                <Map
                    width={configuration.width}
                    height={configuration.height}
                    mapData={configuration.mapData}
                    characterPosition={characterPosition}
                />
            )}
            <GameLog />
            <PokemonList />
        </div>
    )
}

export default Game