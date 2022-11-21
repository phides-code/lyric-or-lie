import GuessButton from './features/guesses/GuessButton';
import GuessList from './features/guesses/GuessList';
import RandomWords from './features/randomWords/RandomWords';

const App = () => {
    return (
        <div
            style={{
                margin: '2rem',
            }}
        >
            <RandomWords />
            <GuessButton guessType={'song'} />
            <GuessButton guessType={'poem'} />
            <GuessList />
        </div>
    );
};

export default App;
