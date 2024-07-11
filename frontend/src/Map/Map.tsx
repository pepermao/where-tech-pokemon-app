import { Button } from '@mui/material';
import { Stage, Layer, Rect, Circle } from 'react-konva';
import MapStyled from './Map.style';

const TILE_SIZE = 32;

enum Terrains {
    Grass = "grass",
    Ground = "ground",
    Sea = "sea"
}

interface IMap {
    width: number;
    height: number;
    mapData: any[];
    characterPosition?: { x: number, y: number } | null;
}

const Map = ({
    width,
    height,
    mapData,
    characterPosition = null,
}: IMap) => {
    const showStartButton = !characterPosition;

    const drawTerrain = (type: string) => {
        switch (type) {
            case Terrains.Grass:
                return 'green';
            case Terrains.Ground:
                return 'brown';
            case Terrains.Sea:
                return 'blue';
            default:
                return 'white';
        }
    };

    const handleStartClick = () => {
        const mapConfiguration = { width, height, mapData }
        localStorage.setItem("mapConfiguration", JSON.stringify(mapConfiguration))
        window.location.href = "/game"
    }

    return (
        <MapStyled>
            <h4 className="map-title">Map</h4>
            <Stage width={width * TILE_SIZE} height={height * TILE_SIZE}>
                <Layer>
                    {mapData.map((row: any, y: any) =>
                        row.map((tile: any, x: any) => (
                            <Rect
                                key={`${x}-${y}`}
                                x={x * TILE_SIZE}
                                y={y * TILE_SIZE}
                                width={TILE_SIZE}
                                height={TILE_SIZE}
                                fill={drawTerrain(tile)}
                            />
                        ))
                    )}
                    {characterPosition && (
                        <Circle
                            x={characterPosition.x * TILE_SIZE + TILE_SIZE / 2}
                            y={characterPosition.y * TILE_SIZE + TILE_SIZE / 2}
                            radius={TILE_SIZE / 2 - 2}
                            fill="yellow"
                        />
                    )}
                </Layer>
            </Stage>

            {showStartButton && (
                <Button onClick={handleStartClick}>Start the game</Button>
            )}
        </MapStyled>
    );
};

export default Map;
