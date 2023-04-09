import React from 'react';
import { CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
// import { useTheme } from '@mui/styles';

import useStyles from './styles';

import Movies from './Movies/Movies';
import Actors from './Actors/Actors';
import MovieInfo from './MovieInfo/MovieInfo';
import Navbar from './Navbar/Navbar';
import Profile from './Profile/Profile';

function App() {
    const classes = useStyles();
    // const theme: any = useTheme();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Navbar />
            <main className={classes.content}>
                <div className={classes.toolkit} />
                <Routes>
                    {['/', '/Movie-Mania'].map((path, key) => <Route path={path} element={<Movies />} key={key} />)}
                    {['/approved', '/Movie-Mania/approved'].map((path, key) => <Route path={path} element={<Movies />} key={key} />)}
                    {['/movie/:id', '/Movie-Mania/movie/:id'].map((path, key) => <Route path={path} element={<MovieInfo />} key={key} />)}
                    {['/actors/:id', '/Movie-Mania/actors/:id'].map((path, key) => <Route path={path} element={<Actors />} key={key} />)}
                    {['/profile/:id', '/Movie-Mania/profile/:id'].map((path, key) => <Route path={path} element={<Profile />} key={key} />)}
                </Routes>
            </main>
            {/* <div */}
            {/*    style={{ */}
            {/*        textAlign: 'center', */}
            {/*        position: 'fixed', */}
            {/*        bottom: '0px', */}
            {/*        left: '60px', */}
            {/*        right: '0px', */}
            {/*        height: '30px', */}
            {/*        width: '100%', */}
            {/*        backgroundColor: theme.palette.mode === 'light' ? '#1976d2' : '#90caf9', */}
            {/*        color: theme.palette.mode === 'light' ? 'white' : 'rgba(0, 0, 0, 0.87)', */}
            {/*    }} */}
            {/* > */}
            {/*    <span>Contact: Khurram Jalil khurram.jalil@gmail.com</span>&nbsp;&nbsp;|&nbsp;&nbsp; */}
            {/*    <span>Abstract: React/TypeScript version of Filmpire (React/JSX) project</span>&nbsp;&nbsp;|&nbsp;&nbsp; */}
            {/*    <span>Inspired From: https://filmpire.netlify.app/ </span> */}
            {/* </div> */}
        </div>
    );
}

export default App;
