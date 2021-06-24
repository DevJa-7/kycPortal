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
    margin-top: 30px;

    .table-container {
        box-shadow: none;
    }

    .table-header {
        font-weight: 700;
    }
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
const TemplateDetailTable = ({
    className,
    data,
}: IProps) => {

    const showTableBody = (obj: any) => {
        const items: any[] = [];
        if (obj) {
            Object.keys(obj).forEach(key => items.push(
                <TableRow key={key}>
                    <CTableCell>{obj[key].key}</CTableCell>
                    <CTableCell>{obj[key].value}</CTableCell>
                    <CTableCell>{obj[key].confidence}</CTableCell>
                </TableRow>
            ))
        }

        return items;
    }

    return (
        <TemplateDocument>
            <TemplateConfidence confidence={parseFloat(data?.confidence || 0)}>
                Confidence : {data?.confidence}
            </TemplateConfidence>
            {data && data.data ? (
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
                            {showTableBody(data?.data)}
                        </TableBody>
                    </Table>
                </CTableContainer>
            ) : null}
        </TemplateDocument>
    )
}

TemplateDetailTable.defaultProps = {
    className: '',
    data: null,
}

export default TemplateDetailTable;
