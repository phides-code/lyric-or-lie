import GuessButton from './features/randomWords/GuessButton';
import RandomWords from './features/randomWords/RandomWords';

const App = () => {
    return (
        <div>
            <RandomWords />
            <GuessButton guessType={'lyrics'} />
            <GuessButton guessType={'poetry'} />
        </div>
    );
};

export default App;
