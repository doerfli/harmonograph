import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface WaveState {
    x: WaveConfig,
    y: WaveConfig
}

export interface WaveConfig {
    frequency: number,
    amplitude: number,
    phase: number,
}

const initialState: WaveState = {
    x: {
        frequency: 1,
        amplitude: 70,
        phase: 0,
    },
    y: {
        frequency: 1,
        amplitude: 70,
        phase: 0.5,
    }
}

export const waveSlice = createSlice({
    name: 'wave',
    initialState,
    reducers: {
        reset: (state) => {
            Object.assign(state, initialState);
        },
        setFrequency: (state, action: PayloadAction<{ axis: string, value: number}>) => {
            const axis = action.payload.axis as keyof typeof state;
            state[axis].frequency = action.payload.value;
        },
        setAmplitude: (state, action: PayloadAction<{ axis: string, value: number}>) => {
            const axis = action.payload.axis as keyof typeof state;
            state[axis].amplitude = action.payload.value;
        },
        setPhase: (state, action: PayloadAction<{ axis: string, value: number}>) => {
            const axis = action.payload.axis as keyof typeof state;
            state[axis].phase = action.payload.value;
        },
    },
});

// Action creators are generated for each case reducer function
export const { 
    reset, 
    setFrequency, 
    setAmplitude, 
    setPhase 
} = waveSlice.actions

export default waveSlice.reducer