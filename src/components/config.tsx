import { addPendulum, removePendulum, reset, setDampening, setMaxTime, setRotationInterval } from "@/redux/slices/pendulums";
import { RootState } from "@/redux/store";
import { encodeB64 } from "@/util/base64";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ConfigSlider from "./config_slider";
import PendulumConfig from "./pendulum_config";

const MAX_PENDULUMS = 4;

export default function Config() {
    const dispatch = useDispatch();

    const pendulums = useSelector((state: RootState) => state.pendulums.pendulums);
    const dampening = useSelector((state: RootState) => state.pendulums.dampening);
    const rotationInterval = useSelector((state: RootState) => state.pendulums.rotationInterval);
    const maxTime = useSelector((state: RootState) => state.pendulums.maxTime);
    const numPendulums = pendulums.length;
    const config = useSelector((state: RootState) => state.pendulums);
    const permalinkId = useSelector((state: RootState) => state.pendulums.encodedConfig);

    const addAction = (<Button variant="text" onClick={() => dispatch(addPendulum())} disabled={numPendulums >= MAX_PENDULUMS} >Add</Button>);
    const removeAction = (<Button variant="text" onClick={() => dispatch(removePendulum())} disabled={numPendulums <= 1} >Remove</Button>);
    const resetAction = (<Button variant="text" onClick={() => dispatch(reset())} >Reset</Button>);
    
    function genPermalink() {
        let baseUrl = "https://harmonograph.bytes.li";
        if (typeof window !== "undefined") {
            const {
                origin
            } = window.location    
            baseUrl = origin;
        }
        return baseUrl + "/c/" + permalinkId;
    }

    return (
    <Box style={{maxHeight: '100vh', overflow: 'auto' }} sx={{ p: 1 }}>
        <Typography variant="h5">Configuration</Typography>
        <Box>
            {addAction}
            {removeAction}
            {resetAction}
        </Box>
        {[...Array(numPendulums)].map((e, i) => 
            <PendulumConfig id={i} key={i} defaultExpanded={i == 0}/>
        )}
        <Box sx={{ mt: 1}}>
            <ConfigSlider
                label="Dampening"
                value={dampening}
                step={0.01}
                min={0}
                max={0.1}
                onChange={(event, value) => dispatch(setDampening(value as number))}
                />
            <ConfigSlider
                label="Rotation interval"
                value={rotationInterval}
                step={0.25}
                min={0.25}
                max={6}
                onChange={(event, value) => dispatch(setRotationInterval(value as number))}
                note="Note: Shorter intervals will create less precise paintings"
                />
            <ConfigSlider
                label="Painting duration"
                value={maxTime}
                step={1}
                min={10}
                max={300}
                onChange={(event, value) => dispatch(setMaxTime(value as number))}
                />
        </Box>
        <Box sx={{ mt: 4 }}>
            <TextField
                id="permalink"
                label="Permalink"
                fullWidth
                type="text"
                variant="outlined"
                inputProps={{
                    readOnly: true,
                }}
                defaultValue={genPermalink()}
                value={genPermalink()}
                placeholder="Permalink"
                />
        </Box>
    </Box>);
}