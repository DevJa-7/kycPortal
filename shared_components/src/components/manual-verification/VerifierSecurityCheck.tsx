import React from 'react';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import styled from 'styled-components';

import { ContentText, StateCheckItem } from '../common';
import { IVerifierCheckList, IVerifierCheckItem, VERIFIER_SECURIRY_CHECKLIST } from '../../common/constants';
import { TEXT_COLOR } from '../../common/styles';

/**
 * Props
 */
interface IProps {
	editable?: boolean;
	security: any;
	onChange?: any;
}

/**
 * Styles
 */
const useStyles = makeStyles(() => ({
	title: {
		fontFamily: 'Roboto',
		fontSize: 24,
		lineHeight: 1.31,
		fontWeight: 'bold',
		width: '100%',
		marginBottom: 15,

		'@media screen and (max-width: 1280px)': {
			fontSize: 20,
			marginBottom: 0,
		},

		'@media screen and (max-width: 600px)': {
			fontSize: 16,
		},
	},

	imageItem: {
		marginTop: 20,
		marginBottom: 20,
	},

	noData: {
		width: '100%',
		textAlign: 'left',
		marginLeft: '0.5em',
		fontSize: '1.2em',
		color: TEXT_COLOR.graylight,
	},
}));

/**
 * Styled Components
 */
const VerifierSecurityCheckContainer = styled.div`
	display: flex;
	padding: 20px 0 20px 0;
	margin-top: 15px;
	justify-content: center;

	@media screen and (max-width: 1280px) {
		margin-top: 0;
	}
`;

const VerifierSecurityCheckWrapper = styled.div`
	display: flex;
	width: 100%;
	flex-flow: wrap;
`;

/**
 * Main Component
 */
const VerifierSecurityCheck = ({ editable, security, onChange }: IProps) => {
	const classes = useStyles();

	const getCheckList = (key: string): IVerifierCheckList => {
		return _.get(VERIFIER_SECURIRY_CHECKLIST, key);
	};

	const getCheckItem = (value: string, checklist: IVerifierCheckList): IVerifierCheckItem | undefined => {
		const checkItem = checklist?.values.find((_checkItem) => _checkItem.value === value);
		return checkItem;
	};

	const handleChange = (val: string, key: string) => {
		onChange(val, key);
	};

	const viewSecurityList =
		security &&
		Object.keys(security).map((key: string, index: number) => {
			const checklist = getCheckList(key);
			const checkItem = getCheckItem(security[key], checklist);
			return (
				<Grid container item md={3} sm={6} xs={12} key={index}>
					<StateCheckItem
						checklist={checklist?.values ?? []}
						title={checklist?.label ?? ''}
						value={checkItem}
						editable={editable}
						onChange={(val: string) => handleChange(val, key)}
					/>
				</Grid>
			);
		});

	return (
		<VerifierSecurityCheckContainer>
			<VerifierSecurityCheckWrapper>
				{security && <ContentText className={classes.title}>SECURITY CHECKS</ContentText>}
				<Grid container>
					{viewSecurityList}
					{security && Object.getOwnPropertyNames(security).length === 0 && (
						<ContentText className={classes.noData}>No Any Data</ContentText>
					)}
				</Grid>
			</VerifierSecurityCheckWrapper>
		</VerifierSecurityCheckContainer>
	);
};

VerifierSecurityCheck.defaultProps = {
	editable: false,
	security: undefined,
	onChange: null,
};

export default VerifierSecurityCheck;
