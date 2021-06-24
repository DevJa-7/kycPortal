import { createMuiTheme } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';

export const lightTheme = createMuiTheme({
    palette: {
        primary: {
            main: purple[400],
        },
        secondary: {
            light: '#F7C24D',
            main: '#FFB000',
            dark: '#EF9700',
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
});