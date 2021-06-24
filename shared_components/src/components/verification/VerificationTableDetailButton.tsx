import React, { useState, useEffect } from 'react';
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
    VERIFICATION_STATUS,
    IVerificationResult,
} from '../../service/models/verification';
import {
    BOX_SHADOW,
} from '../../common/styles';
import { AUTH_ROLE } from '../../common/constants';
import { ConfirmDialog } from '../../components/common';

/**
 * Props Interface
 */
interface IProps {
    id: string,
    className: string,
    detailId: string,
    tenantAlias: string,
    roles: string,
    state: string,
    verificationResult?: IVerificationResult,
    handleResendInvite?: any,
    handleView?: any,
    handleEdit?: any,
    handleDelete?: any,
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
const VerificationTableDetailButton = ({
    id,
    className,
    detailId,
    tenantAlias,
    roles,
    state,
    verificationResult,
    handleResendInvite,
    handleView,
    handleEdit,
    handleDelete,
}: IProps) => {
    const history = useHistory();

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [enableView, setEnableView] = useState(false);
    const [enableInvite, setEnableInvite] = useState(false);
    const [enableEdit, setEnableEdit] = useState<any>(false);
    const [enableDelete, setEnableDelete] = useState<any>(false);
    const [confirmOpen, setConfirmOpen] = useState(false);

    useEffect(() => {
        setEnableView(
            (roles?.includes(AUTH_ROLE.admin) && (state == VERIFICATION_STATUS.DONE || state == VERIFICATION_STATUS.PROCESSING))
            || ((roles?.includes(AUTH_ROLE.client) || roles?.includes(AUTH_ROLE.agent)) && (state == VERIFICATION_STATUS.DONE))
        );
        setEnableInvite(!roles?.includes(AUTH_ROLE.admin) && (state == VERIFICATION_STATUS.NEW || state == VERIFICATION_STATUS.IN_PROGRESS));
        setEnableEdit(roles?.includes(AUTH_ROLE.admin) && (state == VERIFICATION_STATUS.PROCESSING) && (verificationResult?.requiresManualVerification));
        setEnableDelete(state !== VERIFICATION_STATUS.DELETE);
    }, [roles, state, verificationResult]);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleViewVerificationDetail = () => {
        handleView(tenantAlias, detailId);
        setAnchorEl(null);
    }

    const handleEditVerificationDetail = () => {
        handleEdit(tenantAlias, detailId);
        setAnchorEl(null);
    }

    const handleResendInviteVerification = () => {
        handleResendInvite(tenantAlias, detailId);
        setAnchorEl(null);
    }

    const handleDeleteVerification = () => {
        setConfirmOpen(true);
    }

    const deletePost = () => {
        handleDelete(detailId, tenantAlias);
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
                {enableView && <MenuItem onClick={handleViewVerificationDetail}>View Details</MenuItem>}
                {enableInvite && <MenuItem onClick={handleResendInviteVerification}>Resend Invite</MenuItem>}
                {enableEdit && <MenuItem onClick={handleEditVerificationDetail}>Edit</MenuItem>}
                {enableDelete && <MenuItem onClick={handleDeleteVerification}>Delete</MenuItem>}
            </Menu>
            <ConfirmDialog
                title="Delete Verification"
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

VerificationTableDetailButton.defaultProps = {
    className: '',
    id: '',
    detailId: '',
    roles: '',
    state: VERIFICATION_STATUS.NEW,
    verificationResult: {},
}

export default VerificationTableDetailButton;