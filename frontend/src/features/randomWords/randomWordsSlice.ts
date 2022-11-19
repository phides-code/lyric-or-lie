import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';

type RandomWordsState = {
    randomWords: {
        status: number | null;
        type: string;
        words: string[];
    };
    status: 'idle' | 'loading' | 'failed';
};

const initialState: RandomWordsState = {
    randomWords: {
        status: null,
        type: '',
        words: [],
    },
    status: 'idle',
};

export const fetchRandomWords = createAsyncThunk(
    'randomWords/fetchRandomWords',
    async () => {
        const axiosResponse = await axios.get('/api/getrandomwords');
        console.log('*** got data: ');
        console.log(axiosResponse.data);
        return axiosResponse.data;
    }
);

export const randomWordsSlice = createSlice({
    name: 'randomWords',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRandomWords.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchRandomWords.fulfilled, (state, action) => {
                state.status = 'idle';
                state.randomWords = action.payload;
            })
            .addCase(fetchRandomWords.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const selectRandomWords = (state: RootState) =>
    state.randomWords.randomWords;
export const selectRandomWordsStatus = (state: RootState) =>
    state.randomWords.status;

export default randomWordsSlice.reducer;
