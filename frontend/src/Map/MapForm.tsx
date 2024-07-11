import { useState } from 'react'
import { useForm } from "react-hook-form"
import { Button, Typography } from '@mui/material';
import Map from './Map';
import RangeInput from './RangeInput';

const MapForm = () => {
    const { control, handleSubmit } = useForm();
    const [mapData, setMapData] = useState<any>(null)
    const [mapSize, setMapSize] = useState({ width: 0, height: 0 })

    const getMapSize = (size: any) => {
        if (size === 10) {
            return {
                width: 10,
                height: 10
            }
        }

        if (size === 500) {
            return {
                width: 25,
                height: 20
            }
        }

        return {
            width: 40,
            height: 25
        }
    }

    /**
     * Generates a 2D map based on specified proportions of sea and grass tiles,
     * distributing them randomly across the map.
     */
    const generateMapData = (sea: any, grass: any, size: any) => {
        const { width, height } = getMapSize(size);
        setMapSize({ width, height })
        const totalTiles = width * height;
        const seaTiles = Math.floor((sea / 100) * totalTiles);
        const grassTiles = Math.floor((grass / 100) * totalTiles);
        const groundTiles = totalTiles - seaTiles - grassTiles;

        const tiles = [
            ...Array(seaTiles).fill('sea'),
            ...Array(grassTiles).fill('grass'),
            ...Array(groundTiles).fill('ground'),
        ];

        // Shuffle the tiles to distribute them randomly
        for (let i = tiles.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
        }

        // Convert the flat array into a 2D array
        const map = [];
        for (let i = 0; i < height; i++) {
            map.push(tiles.slice(i * width, i * width + width));
        }

        return map;
    };


    const onSubmit = ({ sea, grass, size }: any) => {
        const map = generateMapData(sea, grass, size);
        setMapData(map);
    }

    return (
        <div style={{ margin: "0 auto", width: "100%", display: "flex", justifyContent: "center", gap: 128, flexWrap: "wrap" }}>
            <form style={{ width: "300px", display: "flex", flexDirection: "column", gap: 32 }} onSubmit={handleSubmit(onSubmit)}>
                <Typography variant='h2'>Map configuration</Typography>
                <RangeInput
                    name="sea"
                    label="Sea"
                    control={control}
                />
                <RangeInput
                    name="grass"
                    label="Grass"
                    control={control}
                />

                <RangeInput
                    name="ground"
                    label="Ground"
                    control={control}
                />

                <RangeInput
                    name="size"
                    label="Size"
                    control={control}
                />

                <Button type="submit">Submit</Button>
            </form>
            {mapData && (
                <Map width={mapSize.width} height={mapSize.height} mapData={mapData} />
            )}
        </div>
    )
}

export default MapForm