import React, { useEffect } from 'react';
import { Divider, List, ListItem, ListItemText, ListSubheader, ListItemIcon, Box, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { useGetGenresQuery } from '../../services/TMDB';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import tempIcons from '../../assets/genres';
import redLogo from '../../assets/images/red-logo.png';
import blueLogo from '../../assets/images/blue-logo.png';

const categories = [
    { label: 'Popular', value: 'popular' },
    { label: 'Top Rated', value: 'top_rated' },
    { label: 'Upcoming', value: 'upcoming' },
];

function Sidebar(props: any) {
    const theme:any = useTheme();
    const classes = useStyles();
    const dispatch = useDispatch();
    const { setMobileOpen } = props;
    const { data, isFetching } = useGetGenresQuery({}, {});
    const { genreIdOrCategoryName } = useSelector((state:any) => state.currentGenreOrCategory);
    const genreIcons: { [key: string]: any } = tempIcons;

    useEffect(() => {
        setMobileOpen(false);
    }, [genreIdOrCategoryName]);

    return (
        <>
            <Link to={window.location.pathname} className={classes.imageLink}>
                <img
                    className={classes.image}
                    src={theme.palette.mode === 'light' ? blueLogo : redLogo}
                    alt="MovieMania Logo"
                />
            </Link>
            <Divider />
            <List>
                <ListSubheader>Categories</ListSubheader>
                {categories.map(({ label, value }) => (
                    <Link key={value} className={classes.links} to={window.location.pathname}>
                        <ListItem button onClick={() => dispatch(selectGenreOrCategory(value))}>
                            <ListItemIcon>
                                <img src={genreIcons[label.toLowerCase()]} className={classes.genreImages} height={30} />
                            </ListItemIcon>
                            <ListItemText primary={label} />
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider />
            <List>
                <ListSubheader>Genres</ListSubheader>
                {isFetching ? (
                    <Box display="flex" justifyContent="center">
                        <CircularProgress size="4rem" />
                    </Box>
                )
                    : data?.genres?.map(({ name, id }: any) => (
                        <Link key={name} className={classes.links} to={window.location.pathname}>
                            <ListItem button onClick={() => dispatch(selectGenreOrCategory(id))}>
                                <ListItemIcon>
                                    <img src={genreIcons[name.toLowerCase()]} className={classes.genreImages} height={30} />
                                </ListItemIcon>
                                <ListItemText primary={name} />
                            </ListItem>
                        </Link>
                    ))}
            </List>
        </>
    );
}

export default Sidebar;
