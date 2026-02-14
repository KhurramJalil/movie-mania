import React, { useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import resolveStyles from '../../utils/resolveStyles';
import { useTheme } from '@mui/material/styles';
import { searchMovie } from '../../features/currentGenreOrCategory';

function Search() {
    const theme = useTheme();
    const raw = useStyles();
    const classes = resolveStyles(raw, theme as any);
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();

    const handleKeyPress = (e:any) => {
        if (e.key === 'Enter') {
            dispatch(searchMovie(query));
        }
    };

    return (
        <div style={classes.searchContainer as any}>
            <TextField
                onKeyPress={handleKeyPress}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                variant="standard"
                InputProps={{
                    sx: classes.input as any,
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    );
}

export default Search;
