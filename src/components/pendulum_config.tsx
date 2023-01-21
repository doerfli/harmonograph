import { MovementParameters } from "@/redux/slices/pendulums";
import { RootState } from "@/redux/store";
import { Divider, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import AxisConfig from "./axis_config";

interface WaveConfigProps {
    id: number;
}

export default function PendulumConfig(props: WaveConfigProps) {
    const id = props.id;
    const xAxisConfig = useSelector((state: RootState) => state.pendulums.pendulums.at(id)?.x ?? {} as MovementParameters);
    const yAxisConfig = useSelector((state: RootState) => state.pendulums.pendulums.at(id)?.y ?? {} as MovementParameters);
    
    return (<>
        <Typography variant="h6">Pendulum {props.id + 1}</Typography>
        <Typography variant="subtitle1">X-Axis</Typography>
        <AxisConfig config={xAxisConfig} axis='x' id={props.id} />

        <Typography variant="subtitle1">Y-Axis</Typography>
        <AxisConfig config={yAxisConfig} axis='y' id={props.id} />

        <Divider variant="middle" />
        
        {/* TODO: dampening factor */}
        {/* TODO: rotation interval */}
        {/* TODO: maxTime */}
        {/* TODO: color */}
    </>);
}