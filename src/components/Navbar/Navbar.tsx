import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery, Box } from '@mui/material';
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';

import rawStyles from './styles';
import resolveStyles from '../../utils/resolveStyles';

import Search from '../Search/Search';
import Sidebar from '../Sidebar/Sidebar';

import { setUser } from '../../features/auth';
import { fetchToken, createSessionId, moviesApi } from '../../utils/index';
import { ColorModeContext } from '../../utils/ToggleColorMode';

function Navbar() {
    const theme = useTheme();
    const raw = rawStyles();
    const classes = resolveStyles(raw, theme as any);
    const isMobile = useMediaQuery('(max-width:600px)');
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state: any) => state.user);
    const [mobileOpen, setMobileOpen] = useState(false);

    const colorMode = useContext(ColorModeContext);

    const token = typeof window !== 'undefined' ? localStorage.getItem('request_token') : null;
    const sessionIdFromLocalStorage = typeof window !== 'undefined' ? localStorage.getItem('session_id') : null;

    useEffect(() => {
        const logInUser = async () => {
            if (token) {
                if (sessionIdFromLocalStorage) {
                    const { data: userData } = await moviesApi.get(`/account?session_id=${sessionIdFromLocalStorage}`);
                    dispatch(setUser(userData));
                } else {
                    const sessionId = await createSessionId();
                    const { data: userData } = await moviesApi.get(`/account?session_id=${sessionId}`);
                    dispatch(setUser(userData));
                }
            }
        };

        logInUser();
    }, [token]);

    return (
        <>
            <AppBar position="fixed">
                <Toolbar sx={classes.toolbar as any}>
                    {isMobile && (
                        <IconButton
                            color="inherit"
                            edge="start"
                            sx={classes.menuButton as any}
                            onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
                        >
                            <Menu />
                        </IconButton>
                    )}
                    <IconButton
                        color="inherit"
                        sx={{ ml: 1 }}
                        onClick={colorMode.toggleColorMode}
                    >
                        {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>
                    {!isMobile && <Search />}
                    <div>
                        {!isAuthenticated ? (
                            <Button color="inherit" onClick={fetchToken}>
                                Login &nbsp; <AccountCircle />
                            </Button>
                        ) : (
                            <Button
                                color="inherit"
                                onClick={() => (typeof window !== 'undefined' ? window.location.href = `/profile/${user.id}` : undefined)}
                                sx={classes.linkButton as any}
                            >
                                {!isMobile && <>My Movies &nbsp;</>}
                                <Avatar
                                    sx={{ width: 30, height: 30 }}
                                    alt="Profile"
                                    src={`https://www.themoviedb.org/t/p/w64_and_h64_face${user?.avatar?.tmdb?.avatar?.avatar_path}`}
                                />
                            </Button>
                        )}
                    </div>
                    {isMobile && <Search />}
                </Toolbar>
            </AppBar>
            <Box component="nav" sx={classes.drawer as any}>
                {isMobile ? (
                    <Drawer
                        variant="temporary"
                        anchor="left"
                        open={mobileOpen}
                        onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
                        PaperProps={{ sx: classes.drawerPaper as any }}
                        ModalProps={{ keepMounted: true }}
                    >
                        <Sidebar setMobileOpen={setMobileOpen} />
                    </Drawer>
                ) : (
                    <Drawer PaperProps={{ sx: classes.drawerPaper as any }} variant="permanent" open>
                        <Sidebar setMobileOpen={setMobileOpen} />
                    </Drawer>
                )}
            </Box>
        </>
    );
}

export default Navbar;
