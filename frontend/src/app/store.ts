import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import randomWordsReducer from '../features/randomWords/randomWordsSlice';
import guessesReducer from '../features/guesses/guessesSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        randomWords: randomWordsReducer,
        guesses: guessesReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
