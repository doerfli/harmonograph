import { RootState } from "@/redux/store";
import { Slider, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import AxisConfig from "./axis_config";

export default function WaveConfig() {
    
    const xAxisConfig = useSelector((state: RootState) => state.waves.x);
    const yAxisConfig = useSelector((state: RootState) => state.waves.y);
    
    return (<>
        <Typography variant="h6">X-Axis</Typography>
        <AxisConfig config={xAxisConfig} axis='x' />

        <Typography variant="h6">Y-Axis</Typography>
        <AxisConfig config={yAxisConfig} axis='y' />

        {/* TODO: dampening factor */}
        {/* TODO: rotation interval */}
        {/* TODO: maxTime */}
        {/* TODO: color */}
    </>);
}