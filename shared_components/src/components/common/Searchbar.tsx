import React, {
    useState,
    useEffect,
} from 'react';
import clsx from 'clsx';
import {
    Theme,
    makeStyles,
} from '@material-ui/core/styles';
import {
    Input,
    InputLabel,
    FormControl,
    InputAdornment
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import {
    TEXT_COLOR,
} from '../../common/styles';

/**
 * Props's Interface
 */
interface IProps {
    id: string,
    placeholder: string,
    handleSearchbar: any,
    className: string,
    defaultValue: string,
}

/**
 * Styles 
 */
const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: 'fit-content',
        margin: theme.spacing(1),
        marginLeft: 0,
        marginRight: 0,

        '& .MuiInputBase-input': {
            fontSize: 15,

            '@media screen and (max-width: 1280px)': {
                fontSize: 12,
            },

            '@media screen and (max-width: 600px)': {
                fontSize: 12,
                lineHeight: 1.83,
            },
        },

        '& .MuiInputAdornment-root': {
            '& svg': {
                width: 29,
                height: 29,
                color: TEXT_COLOR.placeholder,

                '@media screen and (max-width: 1440px)': {
                    width: 25,
                    height: 25,
                },

                '@media screen and (max-width: 1280px)': {
                    width: 20,
                    height: 20,
                },

                '@media screen and (max-width: 600px)': {
                    width: 21,
                    height: 21,
                },
            },
        },

        '& .MuiInputBase-adornedStart': {
            '@media screen and (max-width: 600px)': {
                margin: '0 !important',
                padding: '10px 8.2px',

                '&:before, &:after': {
                    borderBottom: 'none !important',
                },

                '& input': {
                    '@media screen and (max-width: 600px)': {
                        padding: 0,
                    },
                }
            },
        },
        
        '@media screen and (max-width: 600px)': {
            margin: '0 !important',
            borderRadius: 10,
            backgroundColor: '#7676801f',
        },
    },
}));

/* 
 * Main Component
 */
const SearchBar = ({
    id,
    placeholder,
    handleSearchbar,
    className,
    defaultValue, 
}: IProps) => {
    const classes = useStyles();
    const [value, setValue] = useState('');

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);

    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.keyCode === 13) {
            handleSearchbar(event);
        }
    };

    const handleChange = (event: any) => {
        setValue(event.target.value);
    }

    return (
        <FormControl className={clsx(classes.root, className)}>
            <InputLabel htmlFor={id}></InputLabel>
            <Input
                id={id}
                startAdornment={
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                }
                placeholder={placeholder}
                onChange={handleChange}
                onKeyUp={handleKeyUp}
                // defaultValue={defaultValue}
                value={value}
            />
        </FormControl>
    );
};

SearchBar.defaultProps = {
    id: '',
    placeholder: '',
    handleSearchbar: null,
    className: '',
    defaultValue: '',
};

export default SearchBar;