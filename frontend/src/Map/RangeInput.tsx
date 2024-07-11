import { Slider } from '@mui/material'
import { Controller } from 'react-hook-form'

interface IRangeInput {
    name: string;
    label: string;
    control: any;
}

const RangeInput = ({ name, label, control }: IRangeInput) => {
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <Controller
                name={name}
                defaultValue={10}
                render={({ field }) => (
                    <Slider step={10} max={30} min={10} id={name} {...field} />
                )}
                control={control}
            />
            {name === "size" ? (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>100 (10x10)</span>
                    <span>500 (25x20)</span>
                    <span>1000 (40x25)</span>
                </div>
            ) : (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>10%</span>
                    <span>30%</span>
                </div>
            )}
        </div>
    )
}

export default RangeInput