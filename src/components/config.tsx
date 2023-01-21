import { addPendulum, removePendulum } from "@/redux/slices/pendulums";
import { RootState } from "@/redux/store";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import PendulumConfig from "./pendulum_config";

export default function Config() {
    const dispatch = useDispatch();

    const pendulums = useSelector((state: RootState) => state.pendulums.pendulums);
    const numPendulums = pendulums.length;
    // console.log("numPendulums", numPendulums);

    const addAction = (<Button variant="text" onClick={() => dispatch(addPendulum())} disabled={numPendulums >= 3} >Add Pendulum</Button>);
    const removeAction = (<Button variant="text" onClick={() => dispatch(removePendulum())} disabled={numPendulums > 1} >Remove Pendulum</Button>);
    
    return (<>
        <Typography variant="h5">Configuration</Typography>

        {addAction}
        {removeAction}

        {[...Array(numPendulums)].map((e, i) => 
            <PendulumConfig id={i} key={i} />
        )}
        
    </>);
}