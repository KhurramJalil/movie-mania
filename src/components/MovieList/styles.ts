const useStyles = () => ({
    movieContainer: (theme: any) => ({
        display: 'flex',
        justifyContent: 'space-between',
        overflow: 'auto',
        flexWrap: 'wrap',
        '@media (max-width:600px)': {
            justifyContent: 'center',
        },
    }),
});

export default useStyles;
