import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { encodeConfig } from '@/util/config';

export interface PendulumState {
    pendulums: Pendulum[],
    dampening: number,
    rotationInterval: number,
    maxTime: number,
    encodedConfig: string,
}

export interface Pendulum {
    x: MovementParameters,
    y: MovementParameters,
}

export interface MovementParameters {
    frequency: number,
    amplitude: number,
    phase: number,
}

const circlePendulum = { 
    x: {
        frequency: 1,
        amplitude: 50,
        phase: 0,
    },
    y: {
        frequency: 1,
        amplitude: 50,
        phase: 0.5,
    }
};

// one pendulum configured to go in circles
const initialState: PendulumState = {
    pendulums: [
        circlePendulum
    ],
    dampening: 0.01,
    rotationInterval: 3,
    maxTime: 60,
    encodedConfig: encodeConfig([circlePendulum], 0.01, 3, 60),
}

export const pendulumsSlice = createSlice({
    name: 'wave',
    initialState,
    reducers: {
        reset: (state) => {
            Object.assign(state, initialState);
        },
        setFrequency: (state, action: PayloadAction<{ id: number, axis: string, value: number}>) => {
            const i = action.payload.id;
            const pendulum = state.pendulums.at(i);
            if ( pendulum === undefined ) {
                throw Error(`Pendulum with id ${i} does not exist`);
            }
            const axis = action.payload.axis as keyof typeof pendulum;
            pendulum[axis].frequency = action.payload.value;
            state.encodedConfig = encodeConfig(state.pendulums, state.dampening, state.rotationInterval, state.maxTime);
        },
        setAmplitude: (state, action: PayloadAction<{ id: number, axis: string, value: number}>) => {
            const i = action.payload.id;
            const pendulum = state.pendulums.at(i);
            if ( pendulum === undefined ) {
                throw Error(`Pendulum with id ${i} does not exist`);
            }
            const axis = action.payload.axis as keyof typeof pendulum;
            pendulum[axis].amplitude = action.payload.value;
            state.encodedConfig = encodeConfig(state.pendulums, state.dampening, state.rotationInterval, state.maxTime);
        },
        setPhase: (state, action: PayloadAction<{ id: number, axis: string, value: number}>) => {
            const i = action.payload.id;
            const pendulum = state.pendulums.at(i);
            if ( pendulum === undefined ) {
                throw Error(`Pendulum with id ${i} does not exist`);
            }
            const axis = action.payload.axis as keyof typeof pendulum;
            pendulum[axis].phase = action.payload.value;
            state.encodedConfig = encodeConfig(state.pendulums, state.dampening, state.rotationInterval, state.maxTime);
        },
        addPendulum: (state) => {
            state.pendulums.push(circlePendulum);
            state.encodedConfig = encodeConfig(state.pendulums, state.dampening, state.rotationInterval, state.maxTime);
        },
        removePendulum: (state) => {
            state.pendulums.pop();
            state.encodedConfig = encodeConfig(state.pendulums, state.dampening, state.rotationInterval, state.maxTime);
        },
        setDampening: (state, action: PayloadAction<number>) => {
            state.dampening = action.payload;
            state.encodedConfig = encodeConfig(state.pendulums, state.dampening, state.rotationInterval, state.maxTime);
        },
        setRotationInterval: (state, action: PayloadAction<number>) => {
            state.rotationInterval = action.payload;
            state.encodedConfig = encodeConfig(state.pendulums, state.dampening, state.rotationInterval, state.maxTime);
        },
        setMaxTime: (state, action: PayloadAction<number>) => {
            state.maxTime = action.payload;
            state.encodedConfig = encodeConfig(state.pendulums, state.dampening, state.rotationInterval, state.maxTime);
        },
    },
});

// Action creators are generated for each case reducer function
export const { 
    reset, 
    setFrequency, 
    setAmplitude, 
    setPhase ,
    addPendulum,
    removePendulum,
    setDampening,
    setRotationInterval,
    setMaxTime,
} = pendulumsSlice.actions

export default pendulumsSlice.reducer