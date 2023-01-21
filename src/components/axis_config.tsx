import { setAmplitude, setFrequency, setPhase, WaveConfig } from "@/redux/slices/waves";
import { Slider, Typography } from "@mui/material";
import { useDispatch } from "react-redux";

interface AxisConfigProps {
    config: WaveConfig;
    axis: 'x' | 'y';
}

export default function AxisConfig(props: AxisConfigProps) {
    const dispatch = useDispatch();
    
    return (<>
        <Typography variant="subtitle1">Frequency</Typography>
        <Slider
            aria-label="Frequency"
            defaultValue={props.config.frequency}
            value={props.config.frequency}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={8}
            onChange={(event, value) => dispatch(setFrequency({ value: value as number, axis: props.axis }))}
            />

        <Typography variant="subtitle1">Amplitude</Typography>
        <Slider
            aria-label="Amplitude"
            defaultValue={props.config.amplitude}
            value={props.config.amplitude}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={0}
            max={100}
            onChange={(event, value) => dispatch(setAmplitude({ value: value as number, axis: props.axis }))}
            />
        
        <Typography variant="subtitle1">Phase (&pi;)</Typography>
        <Slider
            aria-label="Phase"
            defaultValue={props.config.phase}
            value={props.config.phase}
            valueLabelDisplay="auto"
            step={0.125}
            marks
            min={0}
            max={2}
            onChange={(event, value) => dispatch(setPhase({ value: value as number, axis: props.axis }))}
            />
    </>);
}