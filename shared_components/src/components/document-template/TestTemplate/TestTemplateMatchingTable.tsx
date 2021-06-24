import React, {
    useEffect,
} from 'react';
import {
    Table,
    TableRow,
    TableBody,
    TableCell,
    TableHead,
    TableContainer,
} from '@material-ui/core';
import {
    makeStyles,
    Theme,
} from '@material-ui/core/styles';
import styled from 'styled-components';
import {
    TEXT_COLOR
} from '../../../common/styles';

/**
 * Constants
 */

/**
 * Props
 */
interface IProps {
    className?: any,
    data: any,
}

/**
 * Styles
 */
// const useStyles = makeStyels((theme: Theme) => ({
//     root: {

//     },

//     tableContainer: {

//     }
// }));

/**
 * Styled Components
 */
const TemplateDocument = styled.div`
    padding: 0px;
    width: 100%;

    .table-container {
        box-shadow: none;
    }

    .table-header {
        font-weight: 700;
        color: ${TEXT_COLOR.primary};
    }
`;

const TemplateHeader = styled.div`
    padding: 20px 30px;
    font-weight: 500;
    font-size: 20px;
    line-height: 2.25;
    '@media screen and (max-width: 1280px)': {
        padding-left: 20px;
    },
    '@media screen and (max-width: 900px)': {
        padding-left: 16px;
    },
`;

const CTableRow = styled(TableRow)`
    background: rgba(0, 0, 0, 0.16);
`;

const CTableContainer = styled(TableContainer)`
    box-shadow: none;
    border: solid 1px rgba(224, 224, 224, 1);
    border-bottom: 0px;
`;

/**
 * Main Components
 */
const TestTemplateMatchingTable = ({
    className,
    data,
}: IProps) => {

    useEffect(() => {
        if (data) {
            data?.matches.sort((a: any, b: any) => (
                a.confidence < b.confidence) ? 1 : -1
            )
        }
    }, [data]);

    return (
        <TemplateDocument>
            <TemplateHeader>
                Matching Template with confidence
            </TemplateHeader>
            {data && data.document ? (
                <CTableContainer>
                    <Table aria-label="simple table">
                        <TableHead>
                            <CTableRow>
                                <TableCell className="table-header">Template</TableCell>
                                <TableCell className="table-header">Confidence</TableCell>
                            </CTableRow>
                        </TableHead>
                        <TableBody>
                            {data?.matches.map((item: any, index: number) => (
                                <TableRow key={index}>
                                    <TableCell>{item.template}</TableCell>
                                    <TableCell>{item.confidence}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CTableContainer>
            ) : null}
        </TemplateDocument>
    )
}

TestTemplateMatchingTable.defaultProps = {
    className: '',
    data: null,
}

export default TestTemplateMatchingTable;
