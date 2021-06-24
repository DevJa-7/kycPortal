import { createMuiTheme, ThemeOptions } from '@material-ui/core';

export const AdminTheme = {
    palette: {
        primary: {
            main: '#ab47bc',
        },
        secondary: {
            main: '#9c0de2', //3b86ff
            // light: '#c3daff',
            // dark: '#EF9700',
        },
        // Used by `getContrastText()` to maximize the contrast between
        // the background and the text.
        contrastThreshold: 3,
        // Used by the functions below to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0.2,
    },
    shape: {
        borderRadius: 0
    },
};

export const makeTheme = (theme: ThemeOptions) => createMuiTheme(theme);