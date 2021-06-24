import React from 'react';
import clsx from 'clsx';
import {
    makeStyles,
    Theme,
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

import {
    BORDER_COLOR,
    VERIFICATION_STATE_COLOR
} from '../../common/styles';
import { EmptyTable } from '../common';
import DocumentTableDetailButton from './DocumentTemplateTableDetailButton';
import { IDocumentTemplate } from '../../service/models/document-template';
import UtilService from '../../service/util.service';

/**
 * Props
 */
interface IProps {
    className: string,
    data: IDocumentTemplate[],
    handleViewDocument: any,
    handleExportDocument: any,
    handleCloneDocument: any,
    handleDeleteDocument: any,
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

            '&.name': {
                width: '30% !important',
            },

            '&.document-type': {
                width: '20% !important',
            },

            '&.country': {
                width: '20% !important',
            },

            '&.modifiedAt': {
                width: '15% !important',
            },

            '&.action': {
                width: '10% !important',
                textAlign: 'center',
                '& button':{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }
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

/*
 * Main Component
 */
const DocumentTemplateTable = ({
    className,
    data,
    handleViewDocument,
    handleExportDocument,
    handleCloneDocument,
    handleDeleteDocument,
}: IProps) => {
    const classes = useStyles();

    return (
        <>
            {<TableContainer component={Paper} className={clsx(classes.table, className)} elevation={0}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow className="tableHeader">
                            <TableCell className="name break-word">Name</TableCell>
                            <TableCell className="document-type break-word">Document Type</TableCell>
                            <TableCell className="country break-word">Country</TableCell>
                            <TableCell className="modifiedAt break-word">Modified At</TableCell>
                            <TableCell className="action">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell className="name break-word">{row?.name || '-'}</TableCell>
                                <TableCell className="document-type break-word">{row?.documentType?.name || '-'}</TableCell>
                                <TableCell className="country break-word">{row?.country?.name || '-'}</TableCell>
                                <TableCell className="modifiedAt break-word">{UtilService.getFromNow(row?.updatedAt || row?.createdAt || new Date())}</TableCell>
                                <TableCell className="action">
                                    <DocumentTableDetailButton
                                        id={'detail-btn ' + index}
                                        className=""
                                        handleViewDocument={() => handleViewDocument(row)}
                                        handleExportDocument={() => handleExportDocument(row)}
                                        handleCloneDocument={() => handleCloneDocument(row)}
                                        handleDeleteDocument={() => handleDeleteDocument(row)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                        {(!data || data.length === 0) &&
                            <TableRow>
                                <TableCell colSpan={12}>
                                    <EmptyTable/>
                                </TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>}
        </>
    );
};

DocumentTemplateTable.defaultProps = {
    className: '',
    data: [],
    handleViewDocument: null,
    handleExportDocument: null,
    handleCloneDocument: null,
    handleDeleteDocument: null,
};

export default DocumentTemplateTable;
