import React from 'react';
import { TextField, FormHelperText, FormControl } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { TEXT_COLOR } from '../../common/styles';
import { IListType } from '../../common/constants';

/**
 * Props
 */
interface IProps {
	id?: string;
	className?: any;
	label?: string;
	options: Array<any>;
	getOptionSelected?: any;
	getOptionLabel: any;
	onChange: any;
	value?: IListType | any[] | null;
	error?: boolean;
	helperText?: string;
	onClick?: any;
	multiple?: boolean;
	required?: boolean;
}

/**
 * Styles
 */
const useStyles = makeStyles((theme: Theme) => ({
	root: {
		minWidth: 120,
		color: theme.palette.grey[900],

		'& .MuiInputLabel-root': {
			color: TEXT_COLOR.graylight,

			'@media screen and (max-width: 1440px)': {
				fontSize: 14,
			},

			'@media screen and (max-width: 1280px)': {
				fontSize: 12,
			},

			'@media screen and (max-width: 600px)': {
				fontSize: 12,
				lineHeight: 1.33,
			},
		},

		'& .MuiInputBase-root': {
			fontSize: 16,
			lineHeight: 1.2,

			'@media screen and (max-width: 1440px)': {
				fontSize: 14,
			},

			'@media screen and (max-width: 1280px)': {
				fontSize: 12,
			},

			'@media screen and (max-width: 600px)': {
				fontSize: 14,
				lineHeight: 1.36,
			},
		},

		'& .MuiAutocomplete-popper': {
			fontSize: 16,
			lineHeight: 1.2,

			'@media screen and (max-width: 1440px)': {
				fontSize: 14,
			},

			'@media screen and (max-width: 1280px)': {
				fontSize: 12,
			},

			'@media screen and (max-width: 600px)': {
				fontSize: 14,
				lineHeight: 1.36,
			},
		},
	},
}));

/**
 * Main Component
 */
const CommonAutocomplete = ({
	id,
	className,
	label,
	getOptionLabel,
	getOptionSelected,
	options,
	onChange,
	value,
	error,
	helperText,
	onClick,
	multiple,
	required,
}: IProps) => {
	const classes = useStyles();

	return (
		<FormControl className={className} error={error}>
			<Autocomplete
				options={options}
				getOptionLabel={getOptionLabel}
				id={id}
				autoSelect
				includeInputInList
				renderInput={(params: any) => (
					<TextField {...params} label={required ? label + ' *' : label} error={error} />
				)}
				className={classes.root}
				loading
				onChange={onChange}
				value={value}
				multiple={multiple}
				{...(getOptionSelected ? { getOptionSelected } : {})}
			/>
			{error && required ? <FormHelperText>{helperText}</FormHelperText> : null}
		</FormControl>
	);
};

CommonAutocomplete.defaultProps = {
	id: '',
	className: '',
	label: '',
	options: [],
	getOptionSelected: null,
	getOptionLabel: null,
	onChange: null,
	value: null,
	error: false,
	helperText: '',
	onClick: null,
	multiple: false,
	required: false,
};

export default CommonAutocomplete;
