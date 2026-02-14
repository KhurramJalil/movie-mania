const useStyles = () => ({
    containerSpaceAround: (theme: any) => ({
        display: 'flex',
        justifyContent: 'space-around',
        margin: '10px 0 !important',
        '@media (max-width:600px)': {
            flexDirection: 'column',
            flexWrap: 'wrap',
        },
    }),
    poster: (theme: any) => ({
        borderRadius: '20px',
        boxShadow: '0.5em 1em 1em rgb(64, 64, 70)',
        width: '80%',
        '@media (max-width:960px)': {
            margin: '0 auto !imporatant',
            width: '50%',
        },
        '@media (max-width:600px)': {
            margin: '0 auto !imporatant',
            width: '100%',
            height: '350px',
            marginBottom: '30px',
        },
    }),
    genresContainer: {
        margin: '10px 0 !imaportant',
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
    },
    genreImage: (theme: any) => ({
        filter: theme?.palette?.mode === 'dark' ? 'invert(1)' : 'invert(0)',
        marginRight: '10px',
    }),
    links: (theme: any) => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textDecoration: 'none',
        '@media (max-width:600px)': {
            padding: '0.5rem 1rem',
        },
    }),
    castImage: {
        width: '100%',
        maxWidth: '7em',
        height: '8em',
        objectFit: 'cover',
        borderRadius: '10px',
    },
    buttonContainer: (theme: any) => ({
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        '@media (max-width:600px)': {
            flexDirection: 'column',
        },
    }),
    modal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    video: (theme: any) => ({
        width: '50%',
        height: '50%',
        '@media (max-width:600px)': {
            width: '90%',
            height: '90%',
        },
    }),
});

export default useStyles;
