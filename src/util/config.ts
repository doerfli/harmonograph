import { MovementParameters, Pendulum } from "@/redux/slices/pendulums";
import { encodeB64 } from "./base64";

export function encodeConfig(pendulums: Array<Pendulum>, dampening: number, rotationInterval: number, maxTime: number) {
    let content = "";
    content += pendulums.map((pendulum) => encodePendulum(pendulum)).join("");
    content += dampening + ",";
    content += rotationInterval + ",";
    content += maxTime + ",";
    // console.log(content);
    return encodeB64(content);
}

function encodePendulum(pendulum: Pendulum) {
    let content = "|";
    content += encodeAxis(pendulum.x);
    content += encodeAxis(pendulum.y);
    return content.substring(0, content.length - 1) + "|";
}

function encodeAxis(axis: MovementParameters) {
    let content = "";
    content += axis.frequency + ",";
    content += axis.amplitude + ",";
    content += axis.phase + ",";
    return content;
}