const useStyles = () => ({
    imageLink: {
        display: 'flex',
        justifyContent: 'center',
        padding: '10% 0',
    },
    image: {
        width: '70%',
    },
    links: (theme: any) => ({
        color: theme?.palette?.text?.primary,
        textDecoration: 'none',
    }),
    genreImages: (theme: any) => ({
        filter: theme?.palette?.mode === 'dark' ? 'invert(1)' : 'dark',
    }),
    bigText: {
        color: 'primary',
        fontSize: 30,
    },
});

export default useStyles;
