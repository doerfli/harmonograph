import { MovementParameters, Pendulum } from "@/redux/slices/pendulums";
import { decodeB64, encodeB64 } from "./base64";

export function encodeConfig(pendulums: Array<Pendulum>, dampening: number, rotationInterval: number, maxTime: number): string {
    let content = "";
    content += pendulums.map((pendulum) => encodePendulum(pendulum)).join("");
    content += dampening + ",";
    content += rotationInterval + ",";
    content += maxTime + ",";
    return encodeB64(content);
}

function encodePendulum(pendulum: Pendulum) {
    let content = encodeAxis(pendulum.x);
    content = content.substring(0, content.length - 1) + ";";
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

export function decodeConfig(encodedConfig: string): { pendulums: Array<Pendulum>, dampening: number, rotationInterval: number, maxTime: number } {
    const decoded = decodeB64(encodedConfig);
    const pendulums = decodePendulums(decoded);
    const restOfConfig = decoded.split("|").slice(pendulums.length);
    // console.log(restOfConfig);
    const dampening = parseFloat(restOfConfig[0].split(",")[0]);
    const rotationInterval = parseFloat(restOfConfig[0].split(",")[1]);
    const maxTime = parseFloat(restOfConfig[0].split(",")[2]);
    return { pendulums, dampening, rotationInterval, maxTime };
}

function decodePendulums(decoded: string): Array<Pendulum> {
    const pendulums = [];
    const pendulumStrings = decoded.split("|").slice(0, -1);
    for (const pendulumString of pendulumStrings) {
        const pendulum = decodePendulum(pendulumString);
        pendulums.push(pendulum);
    }
    return pendulums;
}

function decodePendulum(pendulumString: string): Pendulum {
    const x = decodeAxis(pendulumString.split(";")[0]);
    const y = decodeAxis(pendulumString.split(";")[1]);
    return { x, y };
}

function decodeAxis(axisString: string): MovementParameters {
    const frequency = parseFloat(axisString.split(",")[0]);
    const amplitude = parseFloat(axisString.split(",")[1]);
    const phase = parseFloat(axisString.split(",")[2]);
    return { frequency, amplitude, phase };
}
