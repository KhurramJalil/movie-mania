import * as React from 'react';
import { useEffect } from 'react';
import { Divider, List, ListItem, ListItemText, ListSubheader, ListItemIcon, Box, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';

import rawStyles from './styles';
import resolveStyles from '../../utils/resolveStyles';
import { useGetGenresQuery } from '../../services/TMDB';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import tempIcons from '../../assets/genres';
import redLogo from '../../assets/images/red-logo.png';
import blueLogo from '../../assets/images/blue-logo.png';
import Image from 'next/image';

const categories = [
    { label: 'Popular', value: 'popular' },
    { label: 'Top Rated', value: 'top_rated' },
    { label: 'Upcoming', value: 'upcoming' },
];

function Sidebar(props: any) {
    const theme = useTheme();
    const raw = rawStyles();
    const classes = resolveStyles(raw, theme as any);
    const dispatch = useDispatch();
    const { setMobileOpen } = props;
    const { data, isFetching } = useGetGenresQuery({}, {});
    const { genreIdOrCategoryName } = useSelector((state: any) => state.currentGenreOrCategory);
    const genreIcons: { [key: string]: any } = tempIcons;

    useEffect(() => {
        setMobileOpen(false);
    }, [genreIdOrCategoryName]);

    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';

    return (
        <>
            <a href={currentPath} style={classes.imageLink as any}>
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Image
                        src={theme.palette.mode === 'light' ? blueLogo : redLogo}
                        alt="MovieMania Logo"
                        width={200}
                        height={80}
                        style={classes.image as any}
                    />
                </div>
            </a>
            <Divider />
            <List>
                <ListSubheader>Categories</ListSubheader>
                {categories.map(({ label, value }) => (
                    <a key={value} style={classes.links as any} href={currentPath} onClick={(e) => { e.preventDefault(); dispatch(selectGenreOrCategory(value)); }}>
                        <ListItem button>
                            <ListItemIcon>
                                <Image src={genreIcons[label.toLowerCase()]} alt={label} width={30} height={30} style={classes.genreImages as any} />
                            </ListItemIcon>
                            <ListItemText primary={label} />
                        </ListItem>
                    </a>
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
                        <a key={name} style={classes.links as any} href={currentPath} onClick={(e) => { e.preventDefault(); dispatch(selectGenreOrCategory(id)); }}>
                            <ListItem button>
                                <ListItemIcon>
                                    <Image src={genreIcons[name.toLowerCase()]} alt={name} width={30} height={30} style={classes.genreImages as any} />
                                </ListItemIcon>
                                <ListItemText primary={name} />
                            </ListItem>
                        </a>
                    ))}
            </List>
        </>
    );
}

export default Sidebar;
