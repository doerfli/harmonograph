import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense
import { Point } from "@/types/point";
import { f1 } from "@/util/harmonograph";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";

interface HarmonographProps {
    // config: WaveConfig;
}

export default function Harmonograph(props: HarmonographProps) {
    const wavesConfig = useSelector((state: RootState) => state.waves);
    
    const [ configChanged, setConfigChanged ] = useState(false);
    const [ timeStarted, setTimeStarted ] = useState(0);

    useEffect(() => {
        setConfigChanged(true);
    }, [wavesConfig]);

    let lastPt = { x: 0, y: 0 } as Point;

    const setup = (p5: p5Types, canvasParentRef: Element) => {
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
        console.log(timestamp);

        if (configChanged) {
            // when config changed, restart drawing
            setTimeStarted(p5.millis());
            p5.clear();
            setConfigChanged(false);
        }

        if (timestamp > maxTime) {
            p5.noLoop();
        }

        const warpedTime = timestamp / rotationInterval * p5.TWO_PI;
        let pt = f1(
            warpedTime, 
            wavesConfig.x.frequency, 
            wavesConfig.y.frequency, 
            wavesConfig.x.amplitude * amplitudeScalar, 
            wavesConfig.y.amplitude * amplitudeScalar,
            wavesConfig.x.phase * p5.PI,
            wavesConfig.y.phase * p5.PI, 
            d);
        // const p2 = f1(warpedTime, 1, 4, 1.7 * a, a, 0, p5.PI, d);
        

        // pt = add(pt, p2);

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