import React from 'react';
import { makeStyles, withStyles, Theme } from '@material-ui/core/styles';
import { Grid, TextField } from '@material-ui/core';
import styled from 'styled-components';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { DropzoneArea } from 'material-ui-dropzone';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import DateFnsUtils from '@date-io/date-fns';

import { CommonAutocomplete, ContentText, CustomSelect } from '../common';
import { TEXT_COLOR } from '../../common/styles';
import {
	IVerificationContentDetails,
	DATE_FORMAT_FNS,
	DATE_FORMAT_MOMENT,
	IListType,
} from '../../common/constants';
import UtilSerivce from '../../service/util.service';

/**
 * Props
 */
interface IProps {
	title?: string;
	data?: Array<IVerificationContentDetails>;
	editable?: boolean;
	className?: string;
	onChange?: any;
	selectedIndex?: number;
	onClickItem?: any;
}

/**
 * Styles
 */
const useStyles = makeStyles((theme: Theme) => ({
	title: {
		fontFamily: 'Roboto',
		fontSize: 24,
		lineHeight: 1.31,
		fontWeight: 'bold',
		width: '100%',
		marginBottom: 10,

		'@media screen and (max-width: 1280px)': {
			fontSize: 24,
			marginBottom: 0,
		},

		'@media screen and (max-width: 600px)': {
			fontSize: 16,
		},
	},

	item: {
		'&:nth-child(odd)': {
			paddingRight: 10,
		},

		'&:nth-child(even)': {
			paddingLeft: 10,
		},

		'@media screen and (max-width: 960px)': {
			width: '100%',
			padding: '0 !important',
		},

		'& .MuiDropzoneArea-root': {
			width: '100%',
			maxWidth: 550,
			marginTop: 45,
			minHeight: 200,
			border: 'dashed 1px #b6b6b6',

			'@media screen and (max-width: 1280px)': {
				marginTop: 25,
			},

			'@media screen and (max-width: 600px)': {
				marginTop: 15,
				marginBottom: 0,
				maxWidth: '100%',
			},
		},
	},

	disabledInput: {
		'& .MuiInput-underline.Mui-disabled:before': {
			borderBottomStyle: 'solid',
			borderBottomColor: 'rgba(0, 0, 0, 0.05)',
		},

		'& .MuiFormLabel-root.Mui-disabled': {
			color: TEXT_COLOR.graylight,
		},
	},

	noData: {
		width: '100%',
		textAlign: 'left',
		marginLeft: '0.5em',
		fontSize: '1.2em',
		color: TEXT_COLOR.graylight,
	},

	customSelect: {
		width: '100%',
		maxWidth: 550,
		margin: '44px 0px 0px 0px',

		'@media screen and (max-width: 1280px)': {
			marginTop: 25,
		},

		'@media screen and (max-width: 600px)': {
			marginTop: 15,
			marginBottom: 0,
			maxWidth: '100%',
		},

		'& .MuiInputBase-input': {
			color: theme.palette.grey[900],
			fontSize: 16,
			lineHeight: 1.3,

			'@media screen and (max-width: 1280px)': {
				fontSize: 14,
			},

			'@media screen and (max-width: 600px)': {
				fontSize: 12,
			},
		},

		'& .MuiFormLabel-root': {
			fontSize: '16px !important',
			lineHeight: 1.31,

			'@media screen and (max-width: 1280px)': {
				fontSize: '14px !important',
			},

			'@media screen and (max-width: 600px)': {
				fontSize: '12px !important',
			},
		},

		'& .MuiInputLabel-shrink': {
			top: -15,
			'@media screen and (max-width: 1280px)': {
				top: -5,
			},
			'@media screen and (max-width: 600px)': {
				top: 0,
			},
		},

		'& .MuiInput-underline.Mui-disabled:before': {
			borderBottomColor: 'rgba(0, 0, 0, 0.05)',
			borderBottomStyle: 'solid',
		},
	},
}));

/**
 * Styled Components
 */
const ContentDetailsContainer = styled.div`
	display: flex;
`;

const ContentDetailsWrapper = styled.div`
	display: flex;
	width: 100%;
	flex-flow: column;
`;

const ContentDetailsTextField = withStyles((theme: Theme) => ({
	root: {
		width: '100%',
		maxWidth: 550,
		marginTop: 45,

		'@media screen and (max-width: 1280px)': {
			marginTop: 25,
		},

		'@media screen and (max-width: 600px)': {
			marginTop: 15,
			marginBottom: 0,
			maxWidth: '100%',
		},

		'& .MuiInputBase-input': {
			color: theme.palette.grey[900],
			fontSize: 16,
			lineHeight: 1.3,

			'@media screen and (max-width: 1280px)': {
				fontSize: 14,
			},

			'@media screen and (max-width: 600px)': {
				fontSize: 12,
			},
		},

		'& .MuiFormLabel-root': {
			fontSize: 16,
			lineHeight: 1.31,
			color: TEXT_COLOR.graylight,

			'@media screen and (max-width: 1280px)': {
				fontSize: 14,
			},

			'@media screen and (max-width: 600px)': {
				fontSize: 12,
			},
		},

		'& .MuiInputLabel-shrink': {
			top: -15,
			'@media screen and (max-width: 1280px)': {
				top: -5,
			},
			'@media screen and (max-width: 600px)': {
				top: 0,
			},
		},
	},
}))(TextField);

const ContentDetailsDateField = withStyles((theme: Theme) => ({
	root: {
		width: '100%',
		maxWidth: 550,
		marginTop: 45,

		'@media screen and (max-width: 1280px)': {
			marginTop: 25,
		},

		'@media screen and (max-width: 600px)': {
			marginTop: 15,
			marginBottom: 0,
			maxWidth: '100%',
		},

		'& .MuiInputBase-input': {
			color: theme.palette.grey[900],
			fontSize: 16,
			lineHeight: 1.3,

			'@media screen and (max-width: 1280px)': {
				fontSize: 14,
			},

			'@media screen and (max-width: 600px)': {
				fontSize: 12,
			},
		},

		'& .MuiFormLabel-root': {
			fontSize: 16,
			lineHeight: 1.31,

			'@media screen and (max-width: 1280px)': {
				fontSize: 14,
			},

			'@media screen and (max-width: 600px)': {
				fontSize: 12,
			},
		},

		'& .MuiInputLabel-shrink': {
			top: -15,
			'@media screen and (max-width: 1280px)': {
				top: -5,
			},
			'@media screen and (max-width: 600px)': {
				top: 0,
			},
		},

		'& .MuiInputAdornment-root button': {
			color: (props: any) => (props.disabled ? 'transparent' : 'rgba(0, 0, 0, 0.54)'),
		},
	},
}))(KeyboardDatePicker);

/**
 * Main Component
 */
const ContentDetails = ({
	title,
	data,
	editable,
	className,
	onChange,
	selectedIndex,
	onClickItem,
}: IProps) => {
	const classes = useStyles();

	const handleDateChange = (date: string, key: string, index = -1) => {
		let keyVal = '';
		if (index > -1) {
			keyVal = `medicareNames[${index}].${key}`;
		} else {
			keyVal = key;
		}
		onChange(date, keyVal);
	};

	const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>, key: string, index = -1) => {
		let keyVal = '';
		if (index > -1) {
			keyVal = `medicareNames[${index}].${key}`;
		} else {
			keyVal = key;
		}
		onChange((event.target as HTMLInputElement).value, keyVal);
	};

	const handleAtuoCompleteChange = (value: IListType | null, key: string, index = -1) => {
		const keyVal = key;
		onChange(value, keyVal);
	};

	const checkValidDate = (date: string, isRequired: boolean, id: number) => {
		return (
			(editable === true || selectedIndex === id) &&
			(date === '' || !UtilSerivce.isValidDate(date, DATE_FORMAT_MOMENT)) &&
			isRequired === true
		);
	};

	const getDate = (dt: string | undefined) => {
		const splitedDate = dt ? dt.split('-') : null;
		let res: Date = new Date();
		if (splitedDate && splitedDate.length === 3 && dt) {
			if (parseInt(splitedDate[0], 10) > 30) {
				res = new Date(dt);
			} else {
				res = new Date(`${splitedDate[1]}-${splitedDate[0]}-${splitedDate[2]}`);
			}
		}
		return res;
	};

	const handleClick = (id: number) => {
		if (onClickItem) {
			onClickItem(id);
		}
	};

	const contentDetail = (item: any, index: number) => {
		const itemData = item.text && item.text !== 'N/A' ? item.text : '';
		const itemLabel =
			item.label +
			((editable === true || selectedIndex === index) && item.required === true ? ' *' : '');

		const itemDisabled = !(editable === true || selectedIndex === index) || item.disabled;
		const errMsg = 'This is a mandatory field';

		let invalidData = false;
		switch (item.type) {
			case 'autocomplete':
				invalidData =
					(editable === true || selectedIndex === index) &&
					(item.value === null || item.value === undefined) &&
					item.required === true;
				break;

			case 'number':
				break;

			default:
				invalidData =
					(editable === true || selectedIndex === index) &&
					item.text === '' &&
					item.required === true;
		}

		if (item.type === 'date') {
			invalidData = checkValidDate(item.text, item.required, index);
		}

		const helpText = invalidData ? errMsg : '';

		if (item.type === 'date') {
			return (
				<Grid item sm={12} md={6} className={classes.item} key={index}>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<ContentDetailsDateField
							label={itemLabel}
							className={classes.disabledInput}
							value={itemData !== '' ? getDate(itemData) : null}
							disabled={itemDisabled}
							onChange={(date: MaterialUiPickersDate, value?: string | null | undefined) =>
								handleDateChange(value ?? '', item.key)
							}
							minDate={new Date('1900-01-01')}
							format={DATE_FORMAT_FNS}
							invalidLabel={DATE_FORMAT_FNS}
							error={invalidData}
							helperText={helpText}
							KeyboardButtonProps={{
								'aria-label': 'change date',
							}}
							onClick={() => handleClick(index)}
						/>
					</MuiPickersUtilsProvider>
				</Grid>
			);
		} else if (item.type === 'select') {
			return (
				<Grid item sm={12} md={6} className={classes.item} key={index}>
					<CustomSelect
						id={item.type + '-lists'}
						title={itemLabel}
						selectList={item.list}
						value={itemData}
						disabled={itemDisabled}
						handleChange={(event: React.ChangeEvent<HTMLInputElement>) =>
							handleTextChange(event, item.key, item.index)
						}
						className={classes.customSelect}
						error={invalidData}
						helperText={helpText}
						onClick={() => handleClick(index)}
					/>
				</Grid>
			);
		} else if (item.type === 'autocomplete') {
			return (
				<Grid item sm={12} md={6} className={classes.item} key={index}>
					<CommonAutocomplete
						id={item.type + '-lists'}
						className={classes.customSelect}
						label={itemLabel}
						options={item.list || []}
						getOptionLabel={(option: IListType) => option.display}
						getOptionSelected={(option: IListType, value: IListType) =>
							option.display === value.display
						}
						onChange={(event: object, value: IListType | null, reason: string) =>
							handleAtuoCompleteChange(value, item.key, item.index)
						}
						value={item.value || null}
						error={invalidData}
						helperText={helpText}
						onClick={() => handleClick(index)}
					/>
				</Grid>
			);
		} else if (item.type === 'dropzone') {
			return (
				<Grid
					item
					sm={12}
					md={6}
					className={classes.item}
					key={index}
					onClick={() => handleClick(index)}
				>
					<DropzoneArea
						showPreviews={false}
						showPreviewsInDropzone={true}
						useChipsForPreview
						previewGridProps={{ container: { spacing: 1, direction: 'row' } }}
						previewText="Selected files"
						dropzoneText={'Drag & drop file here'}
					/>
				</Grid>
			);
		} else {
			return (
				<Grid item sm={12} md={6} className={classes.item} key={index}>
					<ContentDetailsTextField
						type={item.type}
						label={itemLabel}
						className={classes.disabledInput}
						value={itemData}
						disabled={itemDisabled}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
							handleTextChange(event, item.key, item.index)
						}
						error={invalidData}
						helperText={helpText}
						multiline={item.multiline || false}
						onClick={() => handleClick(index)}
					/>
				</Grid>
			);
		}
	};

	return (
		<ContentDetailsContainer className={className}>
			<ContentDetailsWrapper>
				{title && <ContentText className={classes.title}>{title}</ContentText>}
				<Grid container>
					{data?.map((item: any, index: number) => contentDetail(item, index))}
					{data && data.length === 0 && (
						<ContentText className={classes.noData}>No Any Data</ContentText>
					)}
				</Grid>
			</ContentDetailsWrapper>
		</ContentDetailsContainer>
	);
};

ContentDetails.defaultProps = {
	title: '',
	data: [],
	editable: false,
	className: '',
	onChange: null,
	selectedIndex: null,
	onClickItem: null,
};

export default ContentDetails;
