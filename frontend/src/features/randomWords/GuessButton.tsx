import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchRandomWords, selectRandomWords } from './randomWordsSlice';

type GuessType = 'lyrics' | 'poetry';

const GuessButton = ({ guessType }: { guessType: GuessType }) => {
    const randomWords = useAppSelector(selectRandomWords);
    const dispatch = useAppDispatch();

    const handleClick = () => {
        if (guessType === randomWords.type) {
            console.log('correct! ' + randomWords.type);
        } else {
            console.log('wrong. ' + randomWords.type);
        }

        console.log(randomWords.title + ' by ' + randomWords.artist);

        dispatch(fetchRandomWords());
    };

    return <button onClick={handleClick}>{guessType}</button>;
};

export default GuessButton;
