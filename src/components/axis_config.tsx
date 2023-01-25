import { MovementParameters, setAmplitude, setFrequency, setPhase } from "@/redux/slices/pendulums";
import { Slider, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import ConfigSlider from "./config_slider";

interface AxisConfigProps {
    id: number;
    config: MovementParameters;
    axis: 'x' | 'y';
}

export default function AxisConfig(props: AxisConfigProps) {
    const dispatch = useDispatch();
    
    return (<>
        <ConfigSlider 
            label="Frequency"
            value={props.config.frequency}
            step={1}
            min={1}
            max={8}
            onChange={(event, value) => dispatch(setFrequency({ id: props.id, value: value as number, axis: props.axis }))}
            />

        <ConfigSlider
            label="Amplitude"
            value={props.config.amplitude}
            step={1}
            min={0}
            max={100}
            onChange={(event, value) => dispatch(setAmplitude({ id: props.id, value: value as number, axis: props.axis }))}
            />

        <ConfigSlider
            label="Phase"
            value={props.config.phase}
            step={0.125}
            min={0}
            max={2}
            onChange={(event, value) => dispatch(setPhase({ id: props.id, value: value as number, axis: props.axis }))}
            />
    </>);
}