import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
    fetchRandomWords,
    selectRandomWords,
    selectRandomWordsStatus,
} from './randomWordsSlice';

const RandomWords = () => {
    const randomWords = useAppSelector(selectRandomWords);
    const randomWordsStatus = useAppSelector(selectRandomWordsStatus);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (randomWordsStatus === 'idle' && randomWords.words.length === 0) {
            console.log('useEffect running dispatch ...');
            dispatch(fetchRandomWords());
        }
    }, [randomWordsStatus, dispatch, randomWords.words.length]);

    return (
        <div>
            {randomWords.words.map((randomLine) => (
                <div key={Math.floor(Math.random() * 99999)}>{randomLine}</div>
            ))}
        </div>
    );
};

export default RandomWords;
