const drawerWidth = 240;

const useStyles = () => ({
    toolbar: {
        height: '80px',
        display: 'flex',
        justifyContent: 'space-between',
        marginLeft: '240px',
        '@media (max-width:600px)': {
            marginLeft: 0,
            flexWrap: 'wrap',
        },
    },
    menuButton: {
        marginRight: '16px',
        '@media (min-width:600px)': {
            display: 'none',
        },
    },
    drawer: {
        '@media (min-width:600px)': {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    drawerPaper: {
        width: drawerWidth,
    },
    linkButton: {
        '&:hover': {
            color: 'white !important',
            textDecoration: 'none',
        },
    },
});

export default useStyles;
