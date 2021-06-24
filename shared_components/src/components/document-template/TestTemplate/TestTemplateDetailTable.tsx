import React from 'react';
import {
    Table,
    TableRow,
    TableBody,
    TableCell,
    TableHead,
    TableContainer,
} from '@material-ui/core';
import styled from 'styled-components';

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
    }
`;

const TemplateHeader = styled.div`
    padding: 0px 30px;
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

const TemplateConfidence = styled.div<{
    confidence: number
}>`
    background: ${(props: any) => 
        props.confidence > 0.98 ? `#4caf50` :
        ((props.confidence > 0.9 && props.confidence <= 0.98) ? '#fb9e32' : '#f44336')
    };
    padding: 20px 30px;
    color: #fff2f2;
    font-weight: 500;
    font-size: 20px;
    line-height: 2.25;

    '@media screen and (max-width: 1280px)': {
        padding: 20px;
    },
    '@media screen and (max-width: 900px)': {
        padding: 16px;
    },
`;

const CTableCell = styled(TableCell)`
    border-bottom: none;
`;

const CTableContainer = styled(TableContainer)`
    box-shadow: none;
    border: solid 1px rgba(224, 224, 224, 1);
    border-top: 0px;
`;

/**
 * Main Components
 */
const TestTemplateDetailTable = ({
    className,
    data,
}: IProps) => {

    return (
        <TemplateDocument>
            <TemplateHeader>
                {data?.bestMatch?.template}
            </TemplateHeader>
            <TemplateConfidence confidence={parseFloat(data?.document?.confidence || 0)}>
                Confidence : {data?.document?.confidence}
            </TemplateConfidence>
            {data && data.document ? (
                <CTableContainer>
                    <Table size="small" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <CTableCell className="table-header">Field Name</CTableCell>
                                <CTableCell className="table-header">Value</CTableCell>
                                <CTableCell className="table-header">Confidence</CTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.document.data.map((item: any, index: number) => (
                                item.key && (
                                    <TableRow key={index}>
                                        <CTableCell>{item.key}</CTableCell>
                                        <CTableCell>{item.value}</CTableCell>
                                        <CTableCell>{item.confidence}</CTableCell>
                                    </TableRow>
                                )
                            ))}
                        </TableBody>
                    </Table>
                </CTableContainer>
            ) : null}
        </TemplateDocument>
    )
}

TestTemplateDetailTable.defaultProps = {
    className: '',
    data: null,
}

export default TestTemplateDetailTable;
