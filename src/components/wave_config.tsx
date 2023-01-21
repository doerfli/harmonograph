import { Slider, Typography } from "@mui/material";
import AxisConfig from "./axis_config";

export default function WaveConfig() {
    return (<>
        <Typography variant="h6">X-Axis</Typography>
        <AxisConfig />

        <Typography variant="h6">Y-Axis</Typography>
        <AxisConfig />
    </>);
}