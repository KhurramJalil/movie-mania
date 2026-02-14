import type { AppProps } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import { CssBaseline, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import store from '../app/store';
import ToggleColorMode from '../utils/ToggleColorMode';
import rawStyles from '../components/styles';
import resolveStyles from '../utils/resolveStyles';
import Navbar from '../components/Navbar/Navbar';
import '../index.css';

export default function MyApp({ Component, pageProps }: AppProps) {
    const theme = useTheme();
    const raw = rawStyles();
    const classes = resolveStyles(raw, theme as any);

    return (
        <Provider store={store}>
            <ToggleColorMode>
                <Box component="div" sx={classes.root as any}>
                    <CssBaseline />
                    <Navbar />
                    <Box component="main" sx={classes.content as any}>
                        <Box sx={classes.toolkit as any} />
                        <Component {...pageProps} />
                    </Box>
                </Box>
            </ToggleColorMode>
        </Provider>
    );
}
