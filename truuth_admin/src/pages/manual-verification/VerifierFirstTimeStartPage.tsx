import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { ContentText, CustomButton } from 'shared_components/src/components/common';
import { JobStartIcon } from 'shared_components/src/common/icons';

/**
 * IProps
 */
interface IProps {
	handleStart: any;
}

/*
 * Styles
 */
const useStyles = makeStyles(() => ({
	content: {
		alignItems: 'center',
		flexDirection: 'column',
		padding: '20px 20px 60px 20px',
		justifyContent: 'center',

		'& .icon': {
			width: '100%',
			maxWidth: 250,
			maxHeight: 250,

			'& svg': {
				width: '100%',
				height: '100%',
			},

			'@media screen and (max-width: 600px)': {
				maxWidth: 150,
				maxHeight: 150,
				marginTop: 60,
			},
		},

		'& .description': {
			fontSize: 24,
			fontWeight: 500,
			lineHeight: 1.21,
			margin: '30px 0',
			textAlign: 'center',

			'@media screen and (max-width: 600px)': {
				fontSize: 16,
			},
		},

		'& .startButton': {
			width: '100%',
			maxWidth: 185,
			height: 50,
		},
	},
}));

const VerifierFirstTimeStartPage = ({ handleStart }: IProps) => {
	const classes = useStyles();

	return (
		<Grid container className={classes.content}>
			<Grid className="icon">
				<JobStartIcon />
			</Grid>
			<ContentText className="description">Cick on start to access your first job</ContentText>
			<CustomButton className="startButton" onClick={handleStart} label="START" />
		</Grid>
	);
};

export default VerifierFirstTimeStartPage;

VerifierFirstTimeStartPage.defaultProps = {
	handleStart: null,
};
