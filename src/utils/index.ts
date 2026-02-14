import axios from 'axios';

export const moviesApi = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: '732dfe94c237f44327af913ebba97825', // process.env.REACT_APP_TMDB_KEY,
    },
});

export const fetchToken = async () => {
    try {
        const { data } = await moviesApi.get('/authentication/token/new');

        const token = data.request_token;

        if (data.success) {
            if (typeof window !== 'undefined')
                localStorage.setItem('request_token', token);

            window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}/approved`;
        }
    } catch (error) {
        console.log('Sorry, your token could not be created.');
    }
};

export const createSessionId = async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('request_token') : null;
    let sessionIDTemp = null;
    if (token) {
        try {
            const { data: { sessionID } } = await moviesApi.post('authentication/session/new', {
                request_token: token,
            });
            if (typeof window !== 'undefined')
                localStorage.setItem('session_id', sessionID);

            sessionIDTemp = sessionID;
        } catch (error) {
            console.log(error);
        }
    }
    return sessionIDTemp;
};
