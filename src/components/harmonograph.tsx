import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense
import { Point } from "@/types/point";
import { f1 } from "@/util/harmonograph";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { add } from "@/util/vector";

interface HarmonographProps {
}

export default function Harmonograph(props: HarmonographProps) {
    const pendulums = useSelector((state: RootState) => state.pendulums.pendulums);
    
    const [ configChanged, setConfigChanged ] = useState(false);
    const [ timeStarted, setTimeStarted ] = useState(0);
    const [ p5js, setP5js ] = useState<p5Types | null>(null);

    useEffect(() => {
        setConfigChanged(true);
        if (p5js !== null) {
            // delay looping to allow for status change to propagate (Sketch component cannot use callbacked draw method)
            setTimeout(() => {
                p5js.loop();
            }, 500);
        }
    }, [pendulums]);

    let lastPt = { x: 0, y: 0 } as Point;

    const setup = (p5: p5Types, canvasParentRef: Element) => {
        setP5js(p5);
		p5.createCanvas(600, 600)
            .parent(canvasParentRef);
        p5.background(255);

        lastPt = { x: 0, y: 0 } as Point;
	};
    
    const rotationInterval = 3000; // millis
    const amplitudeScalar = 2;
    const d = 0.01;
    const maxTime = 60 * 1000; // millis

	const draw = (p5: p5Types) => {
        let timestamp = p5.millis() - timeStarted;
        // console.log(timestamp);

        if (configChanged) {
            // when config changed, restart drawing
            setTimeStarted(p5.millis());
            p5.clear();
            setConfigChanged(false);
        }

        if (timestamp > maxTime && ! configChanged ) {
            p5.noLoop();
        }

        const warpedTime = timestamp / rotationInterval * p5.TWO_PI;

        let pt = { x: 0, y: 0 } as Point;

        pendulums.forEach((pendulum) => {
            const p = f1(
                warpedTime,
                pendulum.x.frequency,
                pendulum.y.frequency,
                pendulum.x.amplitude * amplitudeScalar,
                pendulum.y.amplitude * amplitudeScalar,
                pendulum.x.phase * p5.PI,
                pendulum.y.phase * p5.PI,
                d
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

	return <Sketch setup={setup} draw={draw} />;
}