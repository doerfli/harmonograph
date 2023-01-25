import { MovementParameters } from "@/redux/slices/pendulums";
import { RootState } from "@/redux/store";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import AxisConfig from "./axis_config";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface PendulumProps {
    id: number;
    defaultExpanded?: boolean;
}

export default function PendulumConfig(props: PendulumProps) {
    const id = props.id;
    const xAxisConfig = useSelector((state: RootState) => state.pendulums.pendulums.at(id)?.x ?? {} as MovementParameters);
    const yAxisConfig = useSelector((state: RootState) => state.pendulums.pendulums.at(id)?.y ?? {} as MovementParameters);
    
    return (<>
        <Accordion defaultExpanded={props.defaultExpanded}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
                <Typography>Pendulum {props.id + 1}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography variant="subtitle1">X-Axis</Typography>
                <AxisConfig config={xAxisConfig} axis='x' id={props.id} />
                <Typography variant="subtitle1">Y-Axis</Typography>
                <AxisConfig config={yAxisConfig} axis='y' id={props.id} />
            </AccordionDetails>
        </Accordion>
    </>);
}