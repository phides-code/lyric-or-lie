import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
    fetchRandomWords,
    selectRandomWords,
} from '../randomWords/randomWordsSlice';
import { guessAdded } from './guessesSlice';

type GuessType = 'nonsense' | 'poem';

const GuessButton = ({ guessType }: { guessType: GuessType }) => {
    const randomWords = useAppSelector(selectRandomWords);
    const dispatch = useAppDispatch();

    const handleClick = () => {
        dispatch(
            guessAdded({
                correct: guessType === randomWords.type,
                words: randomWords.words,
                artist: randomWords.artist,
                title: randomWords.title,
                type: randomWords.type,
                timestamp: Number(new Date()),
            })
        );

        dispatch(fetchRandomWords());
    };

    return (
        <button
            onClick={handleClick}
            style={{
                margin: '0.4rem',
            }}
        >
            {guessType}
        </button>
    );
};

export default GuessButton;
