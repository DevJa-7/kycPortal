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
    BACKGROUND_COLOR,
    USER_STATUS_COLOR
} from 'shared_components/src/common/styles';
import {
    ContentText,
    EmptyTable
} from 'shared_components/src/components/common';
import UserTableDetailButton from './UserTableDetailButton';
import { getIsMobile } from 'shared_components/src/common/utils';
import {
    IUsersDocument,
    USER_STATUS,
    USER_STATUS_DISPLAY
} from 'shared_components/src/service/models/user';
import UtilService from 'shared_components/src/service/util.service';

/**
 * Props
 */
interface IProps {
    className: string,
    data: IUsersDocument[],
    tenantAlias: string,
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
                maxWidth: '18% !important',
            },

            '&.firstname': {
                maxWidth: '10% !important',
            },

            '&.lastname': {
                maxWidth: '10% !important',
            },

            '&.status': {
                maxWidth: '10% !important',
            },

            '&.action': {
                maxWidth: '10% !important',
                textAlign: 'center',
                '& button': {
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }
            },

            '@media screen and (max-width: 1440px)': {
                fontSize: '16px !important',

                '&.verification-id, &.agent': {
                    display: 'none'
                },
            },

            '@media screen and (max-width: 1280px)': {
                fontSize: '12px !important',
            },
        },

        '& .MuiTableCell-body': {

            fontSize: '14px !important',
            '@media screen and (max-width: 1440px)': {
                fontSize: '12px !important',
            },
            '@media screen and (max-width: 1280px)': {
                fontSize: '11px !important',
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

        '@media screen and (max-width: 600px)': {
            background: '#fafafa',
            paddingTop: 21,
            minWidth: 0,
            borderLeft: 0,
            borderRight: 0,
        }
    },
    enabled: {
        color: `${USER_STATUS_COLOR.enabled} !important`,
    },
    disabled: {
        color: `${USER_STATUS_COLOR.disabled} !important`,
    }
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
const UserTable = ({
    className,
    data,
    tenantAlias,
}: IProps) => {
    const classes = useStyles();

    const [isMobile, setIsMobile] = useState(getIsMobile());

    useEffect(() => {
        window.addEventListener('resize', () => {
            setIsMobile(getIsMobile());
        });
    }, []);

    const tableItems = (data && data.length > 0) ?
        data.map((item, index) => {
            let strRoles = '';
            item?.roles?.map(role => {
                if (!strRoles) {
                    strRoles = role;
                } else {
                    strRoles += ', ' + role;
                }
            })
            return (
                <TableItemContainer key={index}>
                    <TableItemHeader>
                        <ContentText>{item.email}</ContentText>
                        <UserTableDetailButton id={'detail-btn ' + index} className="" detailId={item.username} tenantAlias={tenantAlias} />
                    </TableItemHeader>
                    <TableItemField>
                        <ContentText className="name">First Name:&nbsp;</ContentText>
                        <ContentText className="value">{item.givenName || '-'}</ContentText>
                    </TableItemField>
                    <TableItemField>
                        <ContentText className="name">Last Name Ref:&nbsp;</ContentText>
                        <ContentText className="value">{item.familyName || '-'}</ContentText>
                    </TableItemField>
                    <TableItemField>
                        <ContentText className="name">Email:&nbsp;</ContentText>
                        <ContentText className="value">{item.email}</ContentText>
                    </TableItemField>
                    <TableItemField>
                        <ContentText className="name">Role:&nbsp;</ContentText>
                        <ContentText className="value">{strRoles}</ContentText>
                    </TableItemField>
                    <TableItemField>
                        <ContentText className="status">Status:&nbsp;</ContentText>
                        <ContentText className={clsx(
                            (item.status === USER_STATUS.ENABLED) && classes.enabled,
                            (item.status === USER_STATUS.DISABLED) && classes.disabled,
                            "state"
                        )}>
                            {USER_STATUS_DISPLAY[item.status.toString()]}
                        </ContentText>
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
                                <TableCell className="firstName">First Name</TableCell>
                                <TableCell className="lastName">Last  Name</TableCell>
                                <TableCell className="email">Email</TableCell>
                                <TableCell className="type">Role</TableCell>
                                <TableCell className="status">Status</TableCell>
                                <TableCell className="action">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row, index) => {
                                let strRoles = '';
                                row?.roles?.map(role => {
                                    if (!strRoles) {
                                        strRoles = role;
                                    } else {
                                        strRoles += ', ' + role;
                                    }
                                });

                                return (
                                    <TableRow key={index}>
                                        <TableCell className="firstName">{row.givenName}</TableCell>
                                        <TableCell className="lastName">{row.familyName}</TableCell>
                                        <TableCell className="email break-word">{row.email || '-'}</TableCell>
                                        <TableCell className="type">{strRoles}</TableCell>
                                        <TableCell
                                            className={clsx(
                                                (row.status === USER_STATUS.ENABLED) && classes.enabled,
                                                (row.status === USER_STATUS.DISABLED) && classes.disabled,
                                            )}
                                        >
                                            {USER_STATUS_DISPLAY[row.status.toString()]}
                                        </TableCell>

                                        <TableCell className="action">
                                            <UserTableDetailButton id={'detail-btn ' + index} className="" detailId={row.username} tenantAlias={tenantAlias} />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                            {(!data || data.length === 0) &&
                                <TableRow>
                                    <TableCell colSpan={9}>
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

UserTable.defaultProps = {
    className: '',
    data: [],
    tenantAlias: '',
};

export default UserTable;
