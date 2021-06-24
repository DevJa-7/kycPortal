import {
    makeStyles,
    withStyles,
    Theme,
} from '@material-ui/core/styles';
import {
    Button
} from '@material-ui/core';

/**
 * Colors
 */
export const TEXT_COLOR = {
    graydark: '#43425d',
    light: '#4d4f5c',
    graylight: '#727272',
    icon: '#999999',
    placeholder: '#bcbcbc',
    primary: '#cb5df1',
    state: {
        success: '#66b43c',
        error: '#e0605d',
        waring: '#ebae29',
        valid: '#2ecc71',
        invalid: '#e74c3c',
        none: '#f3f3f3',
    }
};

export const BACKGROUND_COLOR = {
    primary: '#cb5df1',
    state: {
        success: '#eaf7ea',
        error: '#faf0ee',
        warning: '#fdf8e6',
    },
    errorPage: '#f3f3f3',
};

export const BORDER_COLOR = {
    primary: '#707070',
    secondary: '#cb5df1',
    main: '#e8e9ec',
    gray: '#b6b6b6',
    table: '1px solid rgba(182, 182, 182, 0.48)',
};

export const BOX_SHADOW = {
    primary: '0 3px 24px 0 rgba(0, 0, 0, 0.44)',
    secondary: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
};

export const VERIFICATION_STATE_COLOR = {
    inProgress: '#ffab40',
    done: '#69f0ae',
    new: '#3f51b5',
}

export const USER_STATUS_COLOR = {
    enabled: '#69f0ae',
    disabled: '#ffab40'
}

/**
 * Mobile
 */
export const MIDDLE_WIDTH = 900; // [px]
export const MOBILE_WIDTH = 600; // [px]

export const BREAK_POINT_900 = `@media screen and (max-width: ${MIDDLE_WIDTH})`;
export const BREAK_POINT_600 = `@media screen and (max-width: ${MOBILE_WIDTH})`;

/**
 * Header
 */
export const HEADER_HEIGHT = ['70px', '70px', '80px'];
export const HEADER_BACKGROUND_COLOR = '#ffffff';

/**
 * SideBar
 */
export const SIDEBAR_WIDTH = ['200px', '200px'];

/**
 * Card Paper
 */
export const cardStyles = makeStyles((theme: Theme) => {
    return ({
        root: {
            padding: '35px 25px',
            backgroundColor: '#ffffff',
            boxShadow: BOX_SHADOW.secondary,

            '@media screen and (max-width: 900px)': {
                padding: '35px 22px',
            },

            '@media screen and (max-width: 600px)': {
                padding: '17px 0',
            },

            '& > .MuiCardHeader-root': {
                padding: 0,
                marginBottom: 35,
                '@media screen and (max-width: 1280px)': {
                    marginBottom: 30,
                },
                '@media screen and (max-width: 900px)': {
                    marginBottom: 25,
                },
                '@media screen and (max-width: 600px)': {
                    marginBottom: 11.5,
                    padding: '0 16px',
                },
            },

            '& .MuiCardHeader-title': {
                fontSize: 24,
                lineHeight: 1.31,
                color: theme.palette.grey[900],

                '@media screen and (max-width: 1280px)': {
                    fontSize: 20,
                },

                '@media screen and (max-width: 900px)': {
                    fontSize: 20,
                },

                '@media screen and (max-width: 600px)': {
                    fontSize: 17,
                    lineHeight: 1.35,
                },
            },

            '& .MuiCardHeader-avatar': {
                marginRight: 12,
            },

            '& .MuiCardHeader-action': {
                margin: 0,
                width: '47.675%',
                marginTop: 'auto',
                marginBottom: 'auto',
            }
        },
    });
});

/**
 * Common Button
 */
export const CommonButton = withStyles((theme: Theme) => ({
    root: {
        borderRadius: 6,
        padding: '15px 30px',
        fontSize: 20,
        lineHeight: 1.2,
        boxShadow: BOX_SHADOW.secondary,

        '@media screen and (max-width: 1440px)': {
            padding: '11px 23px',
            fontSize: 14,
        },

        '@media screen and (max-width: 1280px)': {
            padding: '11px 23px',
            fontSize: 14,
        },

        '@media screen and (max-width: 900px)': {
            padding: '11px 23px',
            fontSize: 14,
        },

        '@media screen and (max-width: 600px)': {
            padding: '7px 14px',
            fontSize: 12,
            lineHeight: 1.12,
        },
    },
}))(Button);