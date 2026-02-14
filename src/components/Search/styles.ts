const useStyles = () => ({
    searchContainer: (theme: any) => ({
        '@media (max-width:600px)': {
            display: 'flex',
            justifyContainer: 'center',
            width: '100%',
        },
    }),
    input: (theme: any) => ({
        color: theme?.palette?.mode === 'light' ? 'primary' : 'secondary',
        filter: theme?.palette?.mode === 'light' ? 'invert(1)' : 'invert(0)',
        '@media (max-width:600px)': {
            marginTop: '-10px',
            marginBottom: '10px',
        },
    }),
});

export default useStyles;
