import { Slider, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

interface ConfigSliderProps {
    label: string;
    value: number;
    step: number;
    min: number;
    max: number;
    onChange: (event: any, value: number | number[]) => void;
    note?: string;
}

export default function ConfigSlider(props: ConfigSliderProps) {
    return (<>
        <Typography variant="subtitle2">{props.label}</Typography>
        <Slider
            aria-label={props.label}
            defaultValue={props.value}
            value={props.value}
            valueLabelDisplay="auto"
            step={props.step}
            marks
            min={props.min}
            max={props.max}
            onChange={props.onChange}
            />

        {props.note && <Typography variant="body2" fontSize={12} color={grey[700]} sx={{ mb: 1 }}>{props.note}</Typography>}
    </>);
}