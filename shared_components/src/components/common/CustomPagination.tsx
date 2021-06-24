import React from 'react';
import clsx from 'clsx';
import {
    Theme,
    makeStyles,
} from '@material-ui/core';
import { Grid } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

import {
    TEXT_COLOR,
    BORDER_COLOR,
    BACKGROUND_COLOR
} from '../../common/styles';
import { ContentText } from './styledComponents';

/**
 * Props's Interface
 */
interface IProps {
    curPage: number,
    totalPages: number,
    className: string,
    changePage: any,
}

/**
 * Styles 
 */
const useStyles = makeStyles((theme: Theme) => ({
    root: {
        position: 'relative',

        '& > *': {
            marginTop: theme.spacing(2),
        },

        '& .MuiPaginationItem-root': {
            fontSize: 16,
            width: 48.3,
            height: 48.3,
            borderColor: BORDER_COLOR.main,
            color: TEXT_COLOR.light,
            borderRadius: 4,
            '@media screen and (max-width: 1440px)': {
                fontSize: 14,
                width: 40,
                height: 40,
            },
            '@media screen and (max-width: 1280px)': {
                fontSize: 12,
                width: 35,
                height: 35,
            },
        },

        '& .MuiPaginationItem-page.Mui-selected': {
            backgroundColor: BACKGROUND_COLOR.primary,
            color: '#ffffff',
        },
    },

    pageContent: {
        position: 'absolute',
        top: 15,
        left: 0,
        fontSize: 16,
        color: TEXT_COLOR.graylight,
        '@media screen and (max-width: 1440px)': {
            fontSize: 14,
        },
        '@media screen and (max-width: 1280px)': {
            fontSize: 12,
        },
    },

    pagination: {
        '& .MuiPagination-root': {
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
}));

/* 
 * Main Component
 */
const CustomPagination = ({
    curPage,
    totalPages,
    className,
    changePage
}: IProps) => {
    const classes = useStyles();

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        changePage(value);
    };

    return (
        <Grid container alignContent="center" className={clsx(classes.root, className)}>
            <ContentText className={classes.pageContent}>Showing Page {totalPages ? curPage : 0} of {totalPages}</ContentText>
            <Grid container alignItems="center" className={classes.pagination}>
                <Pagination 
                    count={totalPages}
                    disabled={!totalPages}
                    variant="outlined" 
                    shape="rounded" 
                    siblingCount={0} 
                    onChange={handleChange} 
                    page={totalPages ? curPage : 0}
                />
            </Grid>
        </Grid>
    );
};

CustomPagination.defaultProps = {
    curPage: 0,
    totalPages: 0,
    className: '',
    changePage: null,
};

export default CustomPagination;