import React from 'react';
import { CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';

import useStyles from './styles';

import Movies from './Movies/Movies';
import Actors from './Actors/Actors';
import MovieInfo from './MovieInfo/MovieInfo';
import Navbar from './Navbar/Navbar';
import Profile from './Profile/Profile';

function App() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Navbar />
            <main className={classes.content}>
                <div className={classes.toolkit} />
                <Routes>
                    {['/', '/Movie-Mania'].map((path, key) => <Route path={path} element={<Movies />} key={key} />)}
                    {/* <Route path="/" element={<Movies />} /> */}
                    <Route path="/approved" element={<Movies />} />
                    <Route path="/movie/:id" element={<MovieInfo />} />
                    <Route path="/actors/:id" element={<Actors />} />
                    <Route path="/profile/:id" element={<Profile />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
