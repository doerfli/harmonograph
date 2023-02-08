import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense
import { Point } from "@/types/point";
import { f1 } from "@/util/harmonograph";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { add } from "@/util/vector";
import { Box, Button, Typography } from "@mui/material";

const AMPLITUDE_SCALAR = 2;

interface HarmonographProps {
}

export default function Harmonograph(props: HarmonographProps) {
    const pendulums = useSelector((state: RootState) => state.pendulums.pendulums);
    const dampening = useSelector((state: RootState) => state.pendulums.dampening);
    const rotationInterval = useSelector((state: RootState) => state.pendulums.rotationInterval);
    const maxTime = useSelector((state: RootState) => state.pendulums.maxTime);
    
    const [ configChanged, setConfigChanged ] = useState(false);
    const [ timeStarted, setTimeStarted ] = useState(0);
    const [ p5js, setP5js ] = useState<p5Types | null>(null);
    const [ active, setActive ] = useState(true);

    useEffect(() => {
        setConfigChanged(true);
        if (p5js !== null) {
            // delay looping to allow for status change to propagate (Sketch component cannot use callbacked draw method)
            setTimeout(() => {
                p5js.loop();
                setActive(true);
            }, 500);
        }
    }, [pendulums, dampening, rotationInterval, maxTime]);

    let lastPt = { x: 0, y: 0 } as Point;

    const setup = (p5: p5Types, canvasParentRef: Element) => {
        setP5js(p5);
		p5.createCanvas(900, 700)
            .parent(canvasParentRef);
        p5.background(255);

        lastPt = { x: 0, y: 0 } as Point;
	};
    
	const draw = (p5: p5Types) => {
        let timestamp = p5.millis() - timeStarted;
        // console.log(timestamp);

        if (configChanged) {
            // when config changed, restart drawing
            setTimeStarted(p5.millis());
            p5.clear();
            setConfigChanged(false);
        }

        if (timestamp > (maxTime * 1000) && ! configChanged ) {
            p5.noLoop();
            setActive(false);
        }

        const warpedTime = timestamp / (rotationInterval * 1000) * p5.TWO_PI;

        let pt = { x: 0, y: 0 } as Point;

        pendulums.forEach((pendulum) => {
            const p = f1(
                warpedTime,
                pendulum.x.frequency,
                pendulum.y.frequency,
                pendulum.x.amplitude * AMPLITUDE_SCALAR,
                pendulum.y.amplitude * AMPLITUDE_SCALAR,
                pendulum.x.phase * p5.PI,
                pendulum.y.phase * p5.PI,
                dampening,
            );
            pt = add(pt, p);
        });

        if (lastPt.x == 0 && lastPt.y == 0) {
            lastPt.x = pt.x;
            lastPt.y = pt.y;
            return;
        }

        p5.line(lastPt.x + p5.width / 2, lastPt.y + p5.height / 2, pt.x + p5.width / 2, pt.y + p5.height / 2);

        lastPt = pt;
	};

    function stop() {
        p5js?.noLoop();
        setActive(false);
    }

    function restart() {
        setConfigChanged(true);
        if (! active ) {
            // delay looping to allow for status change to propagate (Sketch component cannot use callbacked draw method)
            setTimeout(() => {
                p5js?.loop();
                setActive(true);
            }, 500);
        }
    }

	return (<>
        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', p: 1 }}> 
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
                <Typography variant="subtitle2" sx={{ mr: 2 }}>Painting</Typography>
                <Button onClick={stop} disabled={! active}>Stop</Button>
                <Button onClick={restart}>Restart</Button>
            </Box>
            <Sketch setup={setup} draw={draw} />
        </Box>
    </>);
}