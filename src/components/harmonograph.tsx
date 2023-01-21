import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense
import { Point } from "@/types/point";
import { f1 } from "@/util/harmonograph";
import { add } from "@/util/vector";



export default function Harmonograph() {

    let lastPt: Point;

    const setup = (p5: p5Types, canvasParentRef: Element) => {
		p5.createCanvas(1000, 1000)
            .parent(canvasParentRef);
        p5.background(255);

        lastPt = { x: 0, y: 0 } as Point;
	};
    
    const rotationInterval = 3000; // millis
    const a = 200;
    const d = 0.01;
    const maxTime = 60 * 1000; // millis

	const draw = (p5: p5Types) => {
		const timestamp = p5.millis();

        if (timestamp > maxTime) {
            p5.noLoop();
        }

        const warpedTime = timestamp / rotationInterval * p5.TWO_PI;
        let pt = f1(warpedTime, 1, 1, a, a/2, 0, p5.PI /2, d);
        const p2 = f1(warpedTime, 1, 4, 1.7 * a, a, 0, p5.PI, d);
        

        pt = add(pt, p2);

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