import './App.css'
import Game from './Game/Game'
import MapForm from './Map/MapForm'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { PokemonProvider } from './PokemonProvider'



//TODO: Pass a json config file to the game page as parameter
//TODO: Create a header component to enable navigation between pages
function App() {
    return (
        <PokemonProvider>
            <div style={{ width: "1280px" }}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<MapForm />} />
                        <Route path="/game" element={<Game />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </PokemonProvider>
    )
}

export default App
