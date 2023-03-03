import React, { useState, useMemo, createContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

function ToggleColorMode(props: { children: any }) {
    const [mode, setMode] = useState<PaletteMode>('light');
    const { children } = props;
    const colorMode = useMemo(() => ({
        toggleColorMode: () => {
            setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        },
    }), []);

    const theme = useMemo(() => createTheme({
        palette: {
            mode,
        },
    }), [mode]);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default ToggleColorMode;
