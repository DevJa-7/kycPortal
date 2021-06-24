import React, { useState, useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Radio, RadioGroup, FormControl, FormControlLabel } from '@material-ui/core';
import styled from 'styled-components';

import { ContentText } from './styledComponents';
import StateItem from './StateItem';
import { ICheckItem, IVerifierCheckItem } from '../../common/constants';

/**
 * Props
 */
interface IProps {
	checklist?: Array<ICheckItem | IVerifierCheckItem>;
	value?: any;
	title?: string;
	editable?: boolean;
	onChange?: any;
}

/**
 * Styles
 */
const useStyles = makeStyles((theme: Theme) => ({
	title: {
		fontFamily: 'Roboto',
		fontSize: 14,
		lineHeight: 1.36,
		color: theme.palette.grey[900],
		marginBottom: 10,

		'@media screen and (max-width: 900px)': {
			fontSize: 16,
		},

		'@media screen and (max-width: 600px)': {
			fontSize: 12,
		},
	},

	items: {
		'& .MuiFormControlLabel-label': {
			fontFamily: 'Robot',
			fontSize: 20,
			lineHeight: 1.3,

			'@media screen and (max-width: 900px)': {
				fontSize: 16,
			},

			'@media screen and (max-width: 600px)': {
				fontSize: 12,
			},
		},
	},
}));

/**
 * Styled Components
 */
const StateCheckItemContainer = styled.div`
	display: flex;
	margin: 25px 0;

	@media screen and (max-width: 600px) {
		margin: 10px 0;
	}
`;

const StateCheckItemWrapper = styled.div`
	display: flex;
	flex-flow: column;
`;

/**
 * Main Component
 */
const StateCheckItem = ({ checklist, value, title, editable, onChange }: IProps) => {
	const classes = useStyles();

	const [selectItem, setSelectItem] = useState('');

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = (event.target as HTMLInputElement).value;
		setSelectItem(value);
		onChange(value);
	};

	const viewCheckList = checklist?.map((item, index) => {
		return <FormControlLabel key={index} value={item.value} control={<Radio />} label={item.label} />;
	});

	useEffect(() => {
		setSelectItem(value?.value);
	}, [value]);

	return (
		<StateCheckItemContainer>
			<StateCheckItemWrapper>
				{title && <ContentText className={classes.title}>{title || ''}</ContentText>}
				{editable && (
					<FormControl component="fieldset">
						<RadioGroup
							aria-label="check-list"
							name="check-list"
							value={selectItem}
							onChange={handleChange}
							className={classes.items}
						>
							{viewCheckList}
						</RadioGroup>
					</FormControl>
				)}
				{!editable && <StateItem type={value?.type} label={value?.label} />}
			</StateCheckItemWrapper>
		</StateCheckItemContainer>
	);
};

StateCheckItem.defaultProps = {
	checklist: [],
	value: {},
	title: '',
	editable: false,
	onChange: null,
};

export default StateCheckItem;
