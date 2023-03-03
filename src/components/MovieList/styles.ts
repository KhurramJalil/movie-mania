import { makeStyles } from '@mui/styles';

export default makeStyles((theme: any) => ({
    movieContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        overflow: 'auto',
        flexWrap: 'wrap',
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center',
        },
    },
}));
