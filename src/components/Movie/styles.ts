const useStyles = () => ({
    movie: {
        padding: '10px',
    },
    title: (theme: any) => ({
        color: theme?.palette?.text?.primary,
        textOverflow: 'ellipsis',
        width: '230px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        marginTop: '10px',
        marginBottom: 0,
        textAlign: 'center',
    }),
    links: (theme: any) => ({
        alignItems: 'center',
        fontWeight: 'bolder',
        textDecoration: 'none',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
            cursor: 'pointer',
        },
    }),
    image: {
        borderRadius: '20px',
        height: '300px',
        marginBottom: '10px',
        '&:hover': {
            transform: 'scale(1.05)',
        },
    },
});

export default useStyles;
