import * as React from 'react';
import { CssBaseline } from '@mui/material';

import useStyles from './styles';

import Movies from './Movies/Movies';
import Navbar from './Navbar/Navbar';

function App() {
    const classes = useStyles();

    return (
        <div style={classes.root as any}>
            <CssBaseline />
            <Navbar />
            <main style={classes.content as any}>
                <div style={classes.toolkit as any} />
                {/* App was previously using react-router-dom. With Next routing, components are mounted on pages; App is retained for potential embedding but routes are handled by Next pages. */}
                <Movies />
            </main>
        </div>
    );
}

export default App;
