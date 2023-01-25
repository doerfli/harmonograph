import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface PendulumState {
    pendulums: Pendulum[],
    dampening: number,
    rotationInterval: number,
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
        },
        setAmplitude: (state, action: PayloadAction<{ id: number, axis: string, value: number}>) => {
            const i = action.payload.id;
            const pendulum = state.pendulums.at(i);
            if ( pendulum === undefined ) {
                throw Error(`Pendulum with id ${i} does not exist`);
            }
            const axis = action.payload.axis as keyof typeof pendulum;
            pendulum[axis].amplitude = action.payload.value;
        },
        setPhase: (state, action: PayloadAction<{ id: number, axis: string, value: number}>) => {
            const i = action.payload.id;
            const pendulum = state.pendulums.at(i);
            if ( pendulum === undefined ) {
                throw Error(`Pendulum with id ${i} does not exist`);
            }
            const axis = action.payload.axis as keyof typeof pendulum;
            pendulum[axis].phase = action.payload.value;
        },
        addPendulum: (state) => {
            state.pendulums.push(circlePendulum);
        },
        removePendulum: (state) => {
            state.pendulums.pop();
        },
        setDampening: (state, action: PayloadAction<number>) => {
            state.dampening = action.payload;
        },
        setRotationInterval: (state, action: PayloadAction<number>) => {
            state.rotationInterval = action.payload;
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
} = pendulumsSlice.actions

export default pendulumsSlice.reducer