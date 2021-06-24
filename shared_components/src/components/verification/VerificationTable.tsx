import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import {
    makeStyles,
    Theme,
    withTheme
} from '@material-ui/core/styles';
import {
    Paper,
    Table,
    TableRow,
    TableBody,
    TableCell,
    TableHead,
    TableContainer,
} from '@material-ui/core';
import styled from 'styled-components';

import {
    TEXT_COLOR,
    BORDER_COLOR,
    VERIFICATION_STATE_COLOR
} from '../../common/styles';
import {
    ContentText,
    EmptyTable
} from '../common';
import VerificationTableDetailButton from './VerificationTableDetailButton';
import { getIsMobile } from '../../common/utils';
import {
    IVerificationDocument,
    VERIFICATION_STATUS,
    VERIFICATION_STATUS_DISPLAY,
    VERIFICATION_RESULTS,
    VERIFICATION_RESULT_VALUE,
} from '../../service/models/verification';
import UtilService from '../../service/util.service';
import { AUTH_ROLE } from '../../common/constants';

/**
 * Props
 */
interface IProps {
    className: string,
    data: IVerificationDocument[],
    tenantAlias: string,
    roles: string,
    handleResendInvite?: any,
    handleView?: any,
    handleEdit?: any,
    handleDelete?: any,
}

/**
 * Styles
 */
const tableBorder = BORDER_COLOR.table;
const useStyles = makeStyles((theme: Theme) => ({
    table: {
        borderRadius: 0,
        borderLeft: tableBorder,
        borderTop: tableBorder,
        borderRight: tableBorder,

        '& .tableHeader': {
            backgroundColor: theme.palette.grey[100],
        },

        '& .MuiTable-root': {
            minWidth: 800,
        },

        '& .MuiTableCell-root': {
            borderBottom: tableBorder,
            lineHeight: 1.3125,
            padding: '15px 10px',
            color: theme.palette.grey[900],

            '&:first-child': {
                paddingLeft: 26
            },

            '&:last-child': {
                paddingRight: 26
            },

            '&.break-word': {
                wordBreak: 'break-word',
            },

            '&.email': {
                width: '18% !important',
            },

            '&.external-refid': {
                width: '15% !important',
            },

            '&.firstname': {
                width: '10% !important',
            },

            '&.lastname': {
                width: '10% !important',
            },

            '&.updated-at': {
                width: '12.5% !important',
            },

            '&.state': {
                width: '12.5% !important',
            },

            '&.verification-status': {
                maxWidth: '10% !important',
            },

            '&.action': {
                width: '10% !important',
                textAlign: 'center',
                '& button': {
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }
            },

            '&.verification-id': {
                width: '15% !important',
            },

            '&.agent': {
                width: '15% !important',
            },

            '@media screen and (max-width: 1000px)': {
                '&.verification-id': {
                    display: 'none'
                },
            },
        },

        '& .MuiTableCell-head': {
            color: theme.palette.primary.main,
            fontSize: `16px !important`,
            lineHeight: 1.333,

            '@media screen and (max-width: 1440px)': {
                fontSize: '14px !important',
            },

            '@media screen and (max-width: 1280px)': {
                fontSize: '12px !important',
            },
        },

        '& .MuiTableCell-body': {
            fontSize: `14px !important`,

            '@media screen and (max-width: 1440px)': {
                fontSize: '12px !important',
            },
            '@media screen and (max-width: 1280px)': {
                fontSize: '11px !important',
            },
        },

        '@media screen and (max-width: 600px)': {
            background: '#fafafa',
            paddingTop: 21,
            minWidth: 0,
            borderLeft: 0,
            borderRight: 0,
        }
    },
    inProgress: {
        color: `${VERIFICATION_STATE_COLOR.inProgress} !important`,
    },
    done: {
        color: `${VERIFICATION_STATE_COLOR.done} !important`,
    },
    new: {
        color: `${VERIFICATION_STATE_COLOR.new} !important`,
    },
}));

/**
 * Styled Components
 */
const TableItemContainer = styled.div`
    display: flex;
    flex-flow: column;
    width: 100%;
    padding: 18px;
    background: #FFFFFF;

    &:not(first-child) {
        border-bottom: ${BORDER_COLOR.table};
    }

    &:last-child {
        border-bottom: ${BORDER_COLOR.table};
    }
`;

const TableItemHeader = withTheme(styled.div`
    display: flex;
    width: 100%;
    font-family: Roboto;
    font-size: 17px;
    font-weight: 500;
    line-height: 1.35;
    color: ${(props: any) => props.theme.palette.grey[900]};
    justify-content: space-between;

    & .MuiIconButton-root {
        padding: 0;
        margin-left: 0;
    }
`);

const TableItemField = withTheme(styled.div`
    width: 100%;
    display: flex;
    font-family: Roboto;
    font-size: 14px;
    line-height: 1.36;
    margin-top: 7px;

    & .name {
        color: ${TEXT_COLOR.graylight};
    }

    & .value {
        color: ${(props: any) => props.theme.palette.grey[900]};
    }

    & .state {
        margin-left: auto;
        margin-right: 0;
    }
`);

/*
 * Main Component
 */
const VerificationTable = ({
    className,
    data,
    tenantAlias,
    roles,
    handleResendInvite,
    handleView,
    handleEdit,
    handleDelete,
}: IProps) => {
    const classes = useStyles();

    const [isMobile, setIsMobile] = useState(getIsMobile());

    useEffect(() => {
        window.addEventListener('resize', () => {
            setIsMobile(getIsMobile());
        });
    }, []);

    const getVerificationResult = (item: IVerificationDocument) => {
        let _result = '';
        if (item.status === VERIFICATION_STATUS.NEW || item.status === VERIFICATION_STATUS.IN_PROGRESS) {
            _result = '-';
        } else if (item.status === VERIFICATION_STATUS.PROCESSING) {
            if (hasAdminRoles()) {
                const _res = VERIFICATION_RESULTS.find(_item => _item.value == item.result?.verificationStatus);
                _result = _res?.display || '-';
                if (item.result?.requiresManualVerification) {
                    const res = VERIFICATION_RESULTS.find(_item => _item.value == VERIFICATION_RESULT_VALUE.AWAIT_MANUAL_VERIFICATION);
                    _result = res?.display || '-';
                }
            } else {
                _result = '-';
            }
        } else {
            const _res = VERIFICATION_RESULTS.find(_item => _item.value == item.result?.verificationStatus);
            _result = _res?.display || '-';
        }

        return _result;
    };

    const hasAdminRoles = () => {
        return roles?.includes(AUTH_ROLE.admin);
    }

    const hasClientRoles = () => {
        return roles?.includes(AUTH_ROLE.client);
    }

    const tableItems = (data && data.length > 0) ?
        data.map((item, index) => {
            return (
                item.inviteeDetails &&
                <TableItemContainer key={index}>
                    <TableItemHeader>
                        <ContentText>{item.inviteeDetails?.email || ""}</ContentText>
                        <VerificationTableDetailButton
                            id={'detail-btn ' + index}
                            className=""
                            detailId={item._id}
                            tenantAlias={tenantAlias}
                            roles={roles}
                            state={item.status}
                            handleResendInvite={handleResendInvite}
                            handleView={handleView}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    </TableItemHeader>
                    <TableItemField>
                        <ContentText className="name">ID:&nbsp;</ContentText>
                        <ContentText className="value">{item.verificationID || '-'}</ContentText>
                    </TableItemField>
                    <TableItemField>
                        <ContentText className="name">Customer Ref:&nbsp;</ContentText>
                        <ContentText className="value">{item.externalRefId || '-'}</ContentText>
                    </TableItemField>
                    <TableItemField>
                        <ContentText className="name">First Name:&nbsp;</ContentText>
                        <ContentText className="value">{item.inviteeDetails?.firstName || '-'}</ContentText>
                    </TableItemField>
                    <TableItemField>
                        <ContentText className="name">Last Name:&nbsp;</ContentText>
                        <ContentText className="value">{item.inviteeDetails?.lastName || '-'}</ContentText>
                    </TableItemField>
                    {(hasAdminRoles() || hasClientRoles()) &&
                        <TableItemField>
                            <ContentText className="name">Agent:&nbsp;</ContentText>
                            <ContentText className="value">{item?.agentDetails?.lastName + ' ' + item?.agentDetails?.lastName}</ContentText>
                        </TableItemField>
                    }
                    <TableItemField>
                        <ContentText className="name">Modified At:&nbsp;</ContentText>
                        <ContentText className="value">{UtilService.getFromNow(item.updatedAt)}</ContentText>
                        <ContentText className={clsx(
                            (item.status === VERIFICATION_STATUS.IN_PROGRESS) && classes.inProgress,
                            (item.status === VERIFICATION_STATUS.PROCESSING) && classes.inProgress,
                            (item.status === VERIFICATION_STATUS.DONE) && classes.done,
                            (item.status === VERIFICATION_STATUS.NEW) && classes.new,
                            "state"
                        )}>
                            {VERIFICATION_STATUS_DISPLAY[item.status]}
                        </ContentText>
                    </TableItemField>
                    <TableItemField>
                        <ContentText className="name">Verification Result:&nbsp;</ContentText>
                        {getVerificationResult(item)}
                    </TableItemField>
                </TableItemContainer>
            );
        })
        : <TableItemContainer>
            <EmptyTable />
        </TableItemContainer>
        ;

    return (
        <>
            {!isMobile ? (
                <TableContainer component={Paper} className={clsx(classes.table, className)} elevation={0}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow className="tableHeader">
                                <TableCell className="email break-word">Email</TableCell>
                                <TableCell className="verification-id break-word">Verification ID</TableCell>
                                <TableCell className="external-refid break-word">Customer Ref</TableCell>
                                <TableCell className="firstname break-word">First Name</TableCell>
                                <TableCell className="lastname break-word">Last Name</TableCell>
                                {(hasAdminRoles() || hasClientRoles()) &&
                                    <TableCell className="agent break-word">Agent</TableCell>
                                }
                                <TableCell className="updated-at break-word">Modified At</TableCell>
                                <TableCell className="state break-word">Status</TableCell>
                                <TableCell className="verification-status">Verification Result</TableCell>
                                <TableCell className="action">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row, index) => (
                                row.inviteeDetails &&
                                <TableRow key={index}>
                                    <TableCell className="email break-word">{row.inviteeDetails?.email || '-'}</TableCell>
                                    <TableCell className="verification-id break-word">{row.verificationID}</TableCell>
                                    <TableCell className="external-refid break-word">{row.externalRefId || '-'}</TableCell>
                                    <TableCell className="firstname break-word">{row.inviteeDetails?.firstName || '-'}</TableCell>
                                    <TableCell className="lastname break-word">{row.inviteeDetails?.lastName || '-'}</TableCell>
                                    {(hasAdminRoles() || hasClientRoles()) &&
                                        <TableCell className="agent break-word">{row.agentDetails?.firstName + ' ' + row.agentDetails?.lastName}</TableCell>
                                    }
                                    <TableCell className="updated-at break-word">{UtilService.getFromNow(row.updatedAt)}</TableCell>
                                    <TableCell
                                        className={clsx(
                                            (row.status === VERIFICATION_STATUS.PROCESSING) && classes.inProgress,
                                            (row.status === VERIFICATION_STATUS.IN_PROGRESS) && classes.inProgress,
                                            (row.status === VERIFICATION_STATUS.DONE) && classes.done,
                                            (row.status === VERIFICATION_STATUS.NEW) && classes.new,
                                            'state break-word'
                                        )}
                                    >
                                        {VERIFICATION_STATUS_DISPLAY[row.status]}
                                    </TableCell>
                                    <TableCell className="verification-status">{getVerificationResult(row)}</TableCell>
                                    <TableCell className="action">
                                        <VerificationTableDetailButton
                                            id={'detail-btn ' + index}
                                            className=""
                                            detailId={row._id}
                                            tenantAlias={tenantAlias}
                                            roles={roles}
                                            state={row.status}
                                            verificationResult={row.result}
                                            handleResendInvite={handleResendInvite}
                                            handleView={handleView}
                                            handleEdit={handleEdit}
                                            handleDelete={handleDelete}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                            {(!data || data.length === 0) &&
                                <TableRow>
                                    <TableCell colSpan={12}>
                                        <EmptyTable />
                                    </TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                    <TableContainer component={Paper} className={clsx(classes.table, className)} elevation={0}>
                        {tableItems}
                    </TableContainer>
                )}
        </>
    );
};

VerificationTable.defaultProps = {
    className: '',
    data: [],
    tenantAlias: '',
    roles: AUTH_ROLE.none,
};

export default VerificationTable;