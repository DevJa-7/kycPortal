import React from 'react';
import clsx from 'clsx';
import {
    TextField
} from '@material-ui/core';
import {
    withStyles,
    makeStyles,
    Theme,
} from '@material-ui/core/styles';

import {
    TEXT_COLOR,
} from '../../common/styles';

/**
 * Props
 */
interface IProps {
    className?: any,
    label?: string,
    name?: string,
    onChange?: any,
    type?: 'email' | 'password' | 'text' | 'number',
    id?: string
}

/**
 * Styles
 */
const useStyles = makeStyles((theme: Theme) => ({
}));

/**
 * Styled Components
 */
const CTextField = withStyles((theme: Theme) => ({
    root: {
        width: '100%',

        '& .MuiInputBase-input': {
            color: theme.palette.grey[900],
            fontSize: 20,
            lineHeight: 1.3
        },

        '& .MuiFormLabel-root': {
            fontSize: 16,
            lineHeight: 1.3125,
            color: TEXT_COLOR.graylight,
        },

        '& .MuiInputLabel-shrink': {
            top: -19,
            '@media screen and (max-width: 600px)': {
                top: -7,
            }
        }
    },
}))(TextField);

/**
 * Main Component
 */
const CustomTextField = ({
    className,
    label,
    name,
    onChange,
    type,
    id,
}: IProps) => {

    return (
        <CTextField className={clsx(className)} id={id} onChange={onChange} type={type} label={label} name={name} />
    );
}

CustomTextField.defaultProps = {
    className: '',
    label: '',
    type: 'text',
    name: '',
    id: '',
    onChange: null,
}

export default CustomTextField;
