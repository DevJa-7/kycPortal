import React, { useMemo } from 'react';
import clsx from 'clsx';
import {
    makeStyles,
    Theme,
} from '@material-ui/core/styles';
import {
    Select,
    MenuItem,
    InputLabel,
    FormControl,
} from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';

import {
    TEXT_COLOR,
    BOX_SHADOW,
} from '../../common/styles';
import { IListType } from '../../common/constants';

interface IProps {
    id: string,
    title: string,
    selectList: Array<IListType>,
    name?: string,
    value: string,
    handleChange: any,
    className: string,
    disabled?: boolean,
    error?: boolean,
    helperText?: string,
    onClick?: any,
}

const useStyles = makeStyles((theme: Theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        color: theme.palette.grey[900],

        '& .MuiFormLabel-root': {
            color: TEXT_COLOR.graylight,

            '@media screen and (max-width: 1440px)': {
                fontSize: 14,
            },

            '@media screen and (max-width: 1280px)': {
                fontSize: 12,
            },

            '@media screen and (max-width: 600px)': {
                fontSize: 12,
                lineHeight: 1.33,
            },
        },

        '& .MuiSvgIcon-root.MuiSelect-icon': {
            '& svg': {
                fill: theme.palette.grey[900],
            }
        },

        '& .MuiSelect-root': {
            fontSize: 16,
            lineHeight: 1.2,

            '@media screen and (max-width: 1440px)': {
                fontSize: 14,
            },

            '@media screen and (max-width: 1280px)': {
                fontSize: 12,
            },

            '@media screen and (max-width: 600px)': {
                fontSize: 14,
                lineHeight: 1.36,
            },
        },

        '& .MuiInputBase-input': {
            color: theme.palette.grey[900]
        },
    },

    select: {
        padding: 0
    },

    menuList: {
        padding: 0,
        minWidth: 228,

        '& li': {
            padding: '15px 22px',
        },

        '@media screen and (max-width: 1440px)': {
            '& .MuiListItem-root': {
                fontSize: 14,
            }
        },

        '@media screen and (max-width: 1280px)': {
            minWidth: 180,

            '& .MuiListItem-root': {
                fontSize: 12,
            }
        },

        '@media screen and (max-width: 600px)': {
            minWidth: 197,

            '& .MuiListItem-root': {
                fontSize: 14,
            }
        }
    },

    menu: {
        boxShadow: BOX_SHADOW.primary,

        '@media screen and (max-width: 600px)': {
            minWidth: '0 !important',
            right: 16,
            left: 'auto !important',
        }
    },

    icon: {
        fill: '#FFFFFF'
    },

    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const CustomSelect = ({
    id,
    title,
    name,
    selectList,
    value,
    handleChange,
    className,
    disabled,
    error,
    helperText,
    onClick,
}: IProps) => {
    const classes = useStyles();

    const curValue = useMemo(() => {
        const _value = selectList?.find(item => item.value === value);
        if (_value) {
            return value;
        }

        return '';
    }, [selectList, value]);

    return (
        <FormControl className={clsx(classes.formControl, className)} error={error} onClick={onClick}>
            <InputLabel id={id}>{title}</InputLabel>
            <Select
                labelId={id}
                id={id + "select"}
                name={name}
                disabled={disabled}
                value={curValue}
                onChange={handleChange}
                className={classes.select}
                MenuProps={{
                    classes: {
                        list: classes.menuList,
                        paper: classes.menu
                    }
                }}
            >
                {selectList.map((item, index) => <MenuItem value={item.value || ''} key={index}>{item.display || ''}</MenuItem>)}
            </Select>
            {error && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
};

CustomSelect.defaultProps = {
    id: '',
    title: '',
    name: '',
    selectList: [],
    value: '',
    handleChange: null,
    className: '',
    disabled: false,
    error: false,
    helperText: '',
    onClick: null,
}

export default CustomSelect;