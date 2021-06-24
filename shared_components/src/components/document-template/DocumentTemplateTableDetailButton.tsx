import React, { useState } from 'react';
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
} from '../../common/styles';
import { ConfirmDialog } from '../common';

/**
 * Props Interface
 */
interface IProps {
    id: string,
    className: string,
    handleViewDocument?: any,
    handleExportDocument?: any,
    handleCloneDocument?: any,
    handleDeleteDocument?: any,
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
            '& .MuiListItem-root': {
                fontSize: 14,
            }
        },
    },

    iconButton: {
        padding: 0,

        '@media screen and (max-width: 600px)': {
            marginRight: -10,
        }
    }
}));

/**
 * Main Component
 */
const DocumentTemplateTableDetailButton = ({
    id,
    className,
    handleViewDocument,
    handleExportDocument,
    handleCloneDocument,
    handleDeleteDocument,
}: IProps) => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const openDeleteModal = () => setConfirmOpen(true);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOpenDeleteModal = () => {
        openDeleteModal();
        handleClose();
    }

    const deletePost = () => {
        handleDeleteDocument();
    };

    const onHandleViewDocument = () => {
        handleViewDocument();
    }

    const onHandleCloneDocument = () => {
        handleCloneDocument();
    }

    const onHandleExportDocument = () => {
        handleExportDocument();
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
                {<MenuItem onClick={onHandleViewDocument}>View Details</MenuItem>}
                {<MenuItem onClick={onHandleExportDocument}>Export</MenuItem>}
                {<MenuItem onClick={onHandleCloneDocument}>Clone</MenuItem>}
                {<MenuItem onClick={handleOpenDeleteModal}>Delete</MenuItem>}
            </Menu>
            <ConfirmDialog
                title="Delete Document Template"
                open={confirmOpen}
                setOpen={setConfirmOpen}
                onConfirm={deletePost}
                cancelLabel="Cancel"
                confirmLabel="Delete"
            >
                Are you sure? You won’t be able to reverse this.
            </ConfirmDialog>
        </>
    );
};

DocumentTemplateTableDetailButton.defaultProps = {
    id: '',
    className: '',
    handleViewDocument: null,
    handleExportDocument: null,
    handleCloneDocument: null,
    handleDeleteDocument: null,
};

export default DocumentTemplateTableDetailButton;
