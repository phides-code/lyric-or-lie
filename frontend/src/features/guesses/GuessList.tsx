import { useSelector } from 'react-redux';
import { selectGuesses } from './guessesSlice';

const GuessList = () => {
    const guesses = useSelector(selectGuesses);

    return (
        <div>
            {guesses.map((guess) => (
                <div
                    key={guess.timestamp}
                    style={{
                        background: guess.correct ? 'lime' : 'pink',
                        border: '1px solid grey',
                        borderRadius: '0.4rem',
                        width: '20rem',
                        marginTop: '0.8rem',
                        padding: '0.2rem',
                    }}
                >
                    <div>
                        {guess.correct ? 'Right! ' : 'Wrong. '}
                        {guess.type}
                    </div>
                    <div>"{guess.title}"</div>
                    <div>by {guess.artist}</div>
                    <div>
                        <i>
                            {guess.words.map((line) => (
                                <div key={line}>{line}</div>
                            ))}
                        </i>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GuessList;
