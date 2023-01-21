import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense

interface Point {
    x: number;
    y: number;
    
}

export default function Harmonograph() {

    let lastPt: Point;

    const setup = (p5: p5Types, canvasParentRef: Element) => {
		p5.createCanvas(1000, 1000)
            .parent(canvasParentRef);
        p5.background(255);

        lastPt = { x: 0, y: 0 } as Point;
	};

    function f1(t: number, f1: number, f2: number, a1: number, a2: number, p1: number, p2: number): Point {
        const x = a1 * Math.sin(f1 * t + p1) * Math.exp(-d * t);
        const y = a2 * Math.sin(f2 * t + p2) * Math.exp(-d * t);
        return {x, y} as Point;
    }

    function dampen(v: Point, timeMillis: number): Point {
        const d = (maxTime - timeMillis) / maxTime;
        if (d <= 0) { 
            return { x: 0, y: 0};
        }
        return { x: v.x * d, y: v.y * d };
    }

    function add(a: Point, b: Point): Point {
        return { x: a.x + b.x, y: a.y + b.y };
    }

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
        let pt = f1(warpedTime, 1, 1, a, a/2, 0, p5.PI /2);
        const p2 = f1(warpedTime, 1, 4, 1.7 * a, a, 0, p5.PI);
        

        pt = add(pt, p2);

        if (lastPt.x == 0 && lastPt.y == 0) {
            lastPt.x = pt.x;
            lastPt.y = pt.y;
            return;
        }

        pt = dampen(pt, timestamp);

        p5.line(lastPt.x + p5.width / 2, lastPt.y + p5.height / 2, pt.x + p5.width / 2, pt.y + p5.height / 2);

        lastPt = pt;
	};

	return <Sketch setup={setup} draw={draw} />;

}