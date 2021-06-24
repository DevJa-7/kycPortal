import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CheckCircleSharpIcon from '@material-ui/icons/CheckCircleSharp';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import RadioButtonUncheckedOutlinedIcon from '@material-ui/icons/RadioButtonUncheckedOutlined';

/**
 * Props
 */
interface IProps {
    valid?: boolean,
    className?: any,
}

/**
 * Styles
 */
const useStyles = makeStyles(() => ({
    valid: {
        color: '#2ecc71',
    },

    invalid: {
        color: '#e74c3c',
    },

    none: {
        color: '#f3f3f3',
    }
}));

/**
 * Main Component
 */
const ValidStateIcon = ({
    valid,
    className,
}: IProps) => {
    const classes = useStyles();

    if (valid === undefined) {
        return <RadioButtonUncheckedOutlinedIcon className={`${classes.invalid} ${className}`} />
    } else if (valid === false) {
        return <CancelOutlinedIcon className={`${classes.invalid} ${className}`} />
    } else {
        return <CheckCircleSharpIcon className={`${classes.valid} ${className}`} />
    }
}

ValidStateIcon.defaultProps = {
    valid: undefined,
    className: '',
}

export default ValidStateIcon;
