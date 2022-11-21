import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

type Guess = {
    correct: boolean;
    words: string[];
    artist: string;
    title: string;
    type: string;
    timestamp: number;
};

type GuessesState = {
    guesses: Guess[];
};

const initialState: GuessesState = {
    guesses: [],
};

export const guessesSlice = createSlice({
    name: 'guesses',
    initialState,
    reducers: {
        guessAdded(state, action) {
            const guesses = state.guesses;

            if (guesses.length > 3) {
                guesses.pop();
            }

            guesses.push(action.payload);
            guesses.sort((a, b) => b.timestamp - a.timestamp);
        },
    },
});

export const selectGuesses = (state: RootState) => state.guesses.guesses;

export const { guessAdded } = guessesSlice.actions;

export default guessesSlice.reducer;
