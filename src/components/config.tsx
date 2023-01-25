import { addPendulum, removePendulum, setDampening } from "@/redux/slices/pendulums";
import { RootState } from "@/redux/store";
import { Box, Button, Slider, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import PendulumConfig from "./pendulum_config";

const MAX_PENDULUMS = 4;

export default function Config() {
    const dispatch = useDispatch();

    const pendulums = useSelector((state: RootState) => state.pendulums.pendulums);
    const dampening = useSelector((state: RootState) => state.pendulums.dampening);
    const numPendulums = pendulums.length;

    const addAction = (<Button variant="text" onClick={() => dispatch(addPendulum())} disabled={numPendulums >= MAX_PENDULUMS} >Add Pendulum</Button>);
    const removeAction = (<Button variant="text" onClick={() => dispatch(removePendulum())} disabled={numPendulums <= 1} >Remove Pendulum</Button>);
    
    return (
    <Box style={{maxHeight: '100vh', overflow: 'auto' }} sx={{ p: 1 }}>
        <Typography variant="h5">Configuration</Typography>
        <Box>
            {addAction}
            {removeAction}
        </Box>
        {[...Array(numPendulums)].map((e, i) => 
            <PendulumConfig id={i} key={i} defaultExpanded={i == 0}/>
        )}
        <Box sx={{ mt: 1}}>
            <Typography variant="subtitle2">Dampening</Typography>
            <Slider
                aria-label="Dampening"
                defaultValue={dampening}
                value={dampening}
                valueLabelDisplay="auto"
                step={0.01}
                marks
                min={0}
                max={0.1}
                onChange={(event, value) => dispatch(setDampening(value as number))}
                />
        </Box>
    </Box>);
}