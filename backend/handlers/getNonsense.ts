import axios from 'axios';

const getNonsense = async () => {
    console.log('running getNonsense');

    try {
        const axiosResponse = await axios.get(
            'http://metaphorpsum.com/sentences/3'
        );

        const nonsense = axiosResponse.data.split('.');

        return {
            status: 200,
            words: nonsense,
            artist: 'nonsense artist',
            title: 'nonsense title',
            type: 'nonsense',
        };
    } catch (err: any) {
        console.log('getNonsense caught error: ');
        console.log(err.message);
        return { status: 500, error: err.message };
    }
};

export default getNonsense;
