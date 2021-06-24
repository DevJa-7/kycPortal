import React from 'react';
import {
    makeStyles,
} from '@material-ui/core/styles';
import { Backdrop } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

/**
 * Props
 */
interface IProps {
    open: boolean,
}

/**
 * Styles
 */
const useStyles = makeStyles(() => ({
    backdrop: {
        zIndex: 2000,
    },
}),
);

/**
 * Main
 */
const Loading = ({
    open
}: IProps) => {
    const classes = useStyles();

    return (
        <Backdrop className={classes.backdrop} open={open}>
            <CircularProgress color="primary" />
        </Backdrop>
    )
}

Loading.defaultProps = {
    open: false,
}

export default Loading;