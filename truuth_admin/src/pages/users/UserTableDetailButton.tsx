import React, { useState } from 'react';
import {
    useHistory,
} from 'react-router-dom';
import clsx from 'clsx';
import {
    makeStyles,
} from '@material-ui/core/styles';
import {
    Menu,
    MenuItem,
    IconButton,
} from '@material-ui/core';
import MoreVert from '@material-ui/icons/MoreVert';

import {
    BOX_SHADOW,
} from 'shared_components/src/common/styles';

/**
 * Props Interface
 */
interface IProps {
    id: string,
    className: string,
    detailId: string,
    tenantAlias: string,
}

/**
 * Styles
 */
const useStyles = makeStyles(() => ({
    menu: {
        '& div.MuiPaper-root': {
            width: 150,
            boxShadow: BOX_SHADOW.primary,

            '& ul': {
                padding: 0,

                '& li': {
                    padding: '15px 22px',
                }
            }
        },
    },

    iconButton: {
        '@media screen and (max-width: 600px)': {
            marginRight: -10,
        }
    }
}));

/**
 * Main Component
 */
const UserTableDetailButton = ({
    id,
    className,
    detailId,
    tenantAlias,
}: IProps) => {
    const history = useHistory();

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleViewUserDetail = () => {
        history.push(`/user-detail/${tenantAlias}/view/${detailId}`);
        setAnchorEl(null);
    };

    const handleEditUserDetail = () => {
        history.push(`/user-detail/${tenantAlias}/edit/${detailId}`);
        setAnchorEl(null);
    }


    return (
        <>
            <IconButton
                edge="start"
                color="inherit"
                aria-controls={id}
                aria-label="open detail"
                aria-haspopup="true"
                onClick={handleClick}
                className={classes.iconButton}
            >
                <MoreVert />
            </IconButton>
            <Menu
                id={id}
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                className={clsx(classes.menu, className)}
            >
                <MenuItem onClick={handleViewUserDetail}>View Details</MenuItem>
                <MenuItem onClick={handleEditUserDetail}>Edit</MenuItem>
            </Menu>
        </>
    );
};

UserTableDetailButton.defaultProps = {
    className: '',
    id: '',
    detailId: '',
}

export default UserTableDetailButton;
