import { Point } from "@/types/point";

export function f1(t: number, f1: number, f2: number, a1: number, a2: number, p1: number, p2: number, d: number): Point {
    const x = a1 * Math.sin(f1 * t + p1) * Math.exp(-d * t);
    const y = a2 * Math.sin(f2 * t + p2) * Math.exp(-d * t);
    return {x, y} as Point;
}

