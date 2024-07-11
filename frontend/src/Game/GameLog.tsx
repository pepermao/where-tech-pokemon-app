import { useContext } from "react"
import { PokemonContext } from "../PokemonProvider"

const GameLog = () => {
    const { userLogs } = useContext(PokemonContext)
    return (
        <div style={{ flex: "1 1 200px" }}>
            <h4>User Logs</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {userLogs.map((log, i) => (
                    <span key={i}>{log}</span>
                ))}
            </div>
        </div>
    )
}

export default GameLog