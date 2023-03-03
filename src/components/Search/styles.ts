import { makeStyles } from '@mui/styles';

export default makeStyles((theme: any) => ({
    searchContainer: {
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            justifyContainer: 'center',
            width: '100%',
        },
    },
    input: {
        color: theme.palette.mode === 'light' ? 'primary' : 'secondary',
        filter: theme.palette.mode === 'light' ? 'invert(1)' : 'invert(0)',
        [theme.breakpoints.down('sm')]: {
            marginTop: '-10px',
            marginBottom: '10px',
        },
    },
}));
