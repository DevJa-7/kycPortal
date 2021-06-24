import React from 'react';
import { FormHelperText, FormControl, TextField } from '@material-ui/core';
import { makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import PhoneInput from 'react-phone-number-input';

import 'react-phone-number-input/style.css';

import { TEXT_COLOR } from '../../common/styles';

/**
 * Props
 */
interface IProps {
	id?: string;
	className?: any;
	onChange: any;
	value?: string;
	error?: boolean;
	helperText?: string;
	required?: boolean;
	defaultCountry?: string;
}

/**
 * Styles
 */
const useStyles = makeStyles((theme: Theme) => ({
	margin: {
		marginBottom: 30,
		'@media screen and (max-width: 1280px)': {
			marginBottom: 25,
		},
		'@media screen and (max-width: 600px)': {
			marginBottom: 20,
		},
	},
}));

/**
 * Custom component
 */
const NewTextField = withStyles((theme: Theme) => ({
	root: {
		width: '100%',

		'& .MuiInputBase-input': {
			color: theme.palette.grey[900],
			fontSize: 20,
			lineHeight: 1.3,
			'@media screen and (max-width: 1280px)': {
				fontSize: 12,
			},
		},

		'& .MuiFormLabel-root': {
			fontSize: 16,
			lineHeight: 1.3125,
			color: TEXT_COLOR.graylight,
			'@media screen and (max-width: 1280px)': {
				fontSize: 11,
			},
		},

		'& .MuiInputLabel-shrink': {
			top: 0,
			'@media screen and (max-width: 600px)': {
				top: -7,
			},
		},
	},
}))(TextField);

const phoneInput = (props, ref) => {
	const classes = useStyles();

	return (
		<NewTextField
			{...props}
			type="text"
			label="Mobile"
			required
			inputRef={ref}
			inputProps={{
				minLength: '8',
				maxLength: '20',
			}}
			className={classes.margin}
		/>
	);
};

/**
 * Main Component
 */
const CommonPhoneInput = ({
	id,
	className,
	onChange,
	value,
	error,
	helperText,
	required,
	defaultCountry,
}: IProps) => {
	return (
		<FormControl className={className} error={error}>
			<PhoneInput
				placeholder="Mobile number starts with country code"
				defaultCountry={defaultCountry}
				id={id}
				value={value}
				onChange={onChange}
				inputComponent={React.forwardRef(phoneInput)}
				helperText={helperText ? helperText : ''}
				error={error}
			/>
			{error && required ? <FormHelperText>{helperText}</FormHelperText> : null}
		</FormControl>
	);
};

CommonPhoneInput.defaultProps = {
	id: '',
	className: '',
	label: '',
	onChange: null,
	value: '',
	error: false,
	helperText: '',
	required: false,
	defaultCountry: '',
};

export default CommonPhoneInput;
