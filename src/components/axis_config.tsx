import { Slider, Typography } from "@mui/material";

export default function AxisConfig() {
    return (<>
        <Typography variant="subtitle1">Frequency</Typography>
        <Slider
            aria-label="Frequency"
            defaultValue={1}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={8}
            />

        <Typography variant="subtitle1">Amplitude</Typography>
        <Slider
            aria-label="Amplitude"
            defaultValue={70}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={0}
            max={100}
            />
        
        <Typography variant="subtitle1">Phase (&pi;)</Typography>
        <Slider
            aria-label="Phase"
            defaultValue={0}
            valueLabelDisplay="auto"
            step={0.125}
            marks
            min={0}
            max={2}
            />
    </>);
}