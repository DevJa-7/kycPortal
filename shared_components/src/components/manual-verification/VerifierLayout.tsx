import React, { useMemo } from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import ScheduleIcon from '@material-ui/icons/Schedule';

import { CommonPage, ContentText, CustomButton } from '../common';
import { ManuealVerifyIcon } from '../../common/icons';
import { BORDER_COLOR, TEXT_COLOR } from '../../common/styles';
import { VERIFIER_QUEUE_STATS } from '../../common/constants/manual-verification';
import { VERIFIER_JOB_TYPES } from '../../service/models/manual-verification';

/**
 * IProps
 */
interface IProps {
	className?: any;
	children?: React.ReactNode;
	timeout?: number;
	jobNumber?: string;
	jobType?: VERIFIER_JOB_TYPES;
	isStartPage: boolean;
}

/*
 * Styles
 */
const useStyles = makeStyles(() => ({
	root: {
		minHeight: 'calc(100vh - 170px)',

		'& .MuiCardHeader-action': {
			textAlign: 'right',
			width: 'fit-content',
		},

		'& .card-header-bottom': {
			'@media screen and (max-width: 600px)': {
				margin: '0 16px',
			},
		},

		'& .MuiCardHeader-root': {
			marginBottom: 25,

			'@media screen and (max-width: 900px)': {
				marginBottom: 20,
			},

			'@media screen and (max-width: 600px)': {
				marginBottom: 15,
			},
		},
	},

	title: {
		marginBottom: 20,
		paddingBottom: 0,
	},

	button: {
		width: 171,

		'@media screen and (max-width: 900px)': {
			width: 100,
		},

		'@media screen and (max-width: 600px)': {
			width: 'auto',
		},
	},
}));

/**
 * Main component
 */
const VerifierLayout = ({ className, children, timeout, jobNumber, jobType, isStartPage }: IProps) => {
	const classes = useStyles();

	const jobTypeStats = useMemo(() => {
		if (!jobType) {
			return null;
		}

		let _jobTypeStats;

		switch (jobType) {
			case VERIFIER_JOB_TYPES.ocr:
				_jobTypeStats = VERIFIER_QUEUE_STATS.ocr;
				break;

			case VERIFIER_JOB_TYPES.authenticity:
				_jobTypeStats = VERIFIER_QUEUE_STATS.authenticity;
				break;

			case VERIFIER_JOB_TYPES.faceMatch:
				_jobTypeStats = VERIFIER_QUEUE_STATS.faceMatch;
				break;

			case VERIFIER_JOB_TYPES.nameMatch:
				_jobTypeStats = VERIFIER_QUEUE_STATS.nameMatch;
				break;

			default:
				_jobTypeStats = null;
		}

		return _jobTypeStats;
	}, [jobType]);

	const handleSkipButton = () => {
		console.log('=====skip button====');
	};

	const { minForTimeout, secForTimeout } = useMemo(() => {
		if (!timeout) {
			return {
				minForTimeout: 0,
				secForTimeout: 0,
			};
		}

		const _minForTimeout = Math.floor((timeout ?? 0) / 60);
		const _secForTimeout = (timeout ?? 0) % 60;

		return {
			minForTimeout: _minForTimeout,
			secForTimeout: _secForTimeout,
		};
	}, [timeout]);

	const getTimeoutString = (num: number) => {
		return String(num).padStart(2, '0');
	};

	return (
		<Wrapper className={className}>
			{/* <CommonPage
				className={`${classes.root} ${classes.title}`}
				avatar={<ManuealVerifyIcon />}
				title={'Manual Verification'}
			>
				<TitleWrapper>
					{Object.getOwnPropertyNames(VERIFIER_JOB_STATS).map((key) => {
						const { label } = VERIFIER_JOB_STATS[key];

						let value: any = jobStats[key];
						if (value && key === 'avgTimePerJob') {
							value = `${Math.floor(value / 60)}min ${value % 60}sec`;
						}
						return (
							<StatTile key={key}>
								<StatLabelWrapper>
									<ContentText>{label}</ContentText>
								</StatLabelWrapper>
								<StatValueWrapper>
									<ContentText className="value">{value ?? '-'}</ContentText>
								</StatValueWrapper>
							</StatTile>
						);
					})}
				</TitleWrapper>
			</CommonPage> */}
			{isStartPage ? (
				<StartPageContentWrapper>{children}</StartPageContentWrapper>
			) : (
					<CommonPage
						className={`${classes.root}`}
						avatar={<ManuealVerifyIcon />}
						title={`Assigned Job #${jobNumber}`}
					// action={
					// 	<CustomButton
					// 		label="SKIP"
					// 		className={classes.button}
					// 		onClick={handleSkipButton}
					// 		variant="outlined"
					// 	/>
					// }
					>
						<VerifierContentWrapper>
							<HeaderWrapper>
								<HeaderContent>
									<ContentText className="title">{jobTypeStats?.pageTitle ?? '-'}</ContentText>
									<ContentText className="description">
										{jobTypeStats?.description ?? '-'}
									</ContentText>
								</HeaderContent>
								{/* <TimeoutClockWrapper>
									<TimeoutLeft>
										<StopIcon />
									</TimeoutLeft>
									<TimeoutClock>
										<TimeoutTime>
											<ScheduleIcon />
											<ContentText className="time">
												Timeout in: {getTimeoutString(minForTimeout)}:
											{getTimeoutString(secForTimeout)}
											</ContentText>
										</TimeoutTime>
									</TimeoutClock>
								</TimeoutClockWrapper> */}
							</HeaderWrapper>
							{children}
						</VerifierContentWrapper>
					</CommonPage>
				)}
		</Wrapper>
	);
};

export default VerifierLayout;

VerifierLayout.defaultProps = {
	children: null,
	className: '',
	timeout: 0,
	jobNumber: '',
	jobType: undefined,
	isStartPage: true,
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

// const TitleWrapper = styled.div`
// 	display: grid;
// 	width: 100%;
// 	grid-template-columns: repeat(4, 1fr);
// 	column-gap: 28px;
// 	row-gap: 20px;
// 	padding: 20px 30px;

// 	@media screen and (max-width: 1630px) {
// 		grid-template-columns: repeat(2, 1fr);
// 	}

// 	@media screen and (max-width: 800px) {
// 		grid-template-columns: repeat(1, 1fr);
// 	}
// `;

// const StatTile = styled.div`
// 	display: flex;
// 	flex-direction: column;
// 	justify-content: center;
// 	align-items: center;
// 	background: #ffffff;
// 	border: solid 1px rgba(182, 182, 182, 0.52);
// 	box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
// 	box-sizing: border-box;

// 	font-size: 22px;
// 	font-weight: 300;
// 	line-height: 1.23;
// 	color: #222b45;
// 	text-align: center;

// 	width: 100%;

// 	@media screen and (max-width: 1300px) {
// 		font-size: 20px;
// 	}

// 	@media screen and (max-width: 900px) {
// 		font-size: 18px;
// 	}
// `;

// const StatLabelWrapper = styled.div`
// 	display: flex;
// 	box-sizing: border-box;
// 	padding: 16px;
// 	border-bottom: solid 1px #b6b6b680;
// 	width: 100%;
// 	justify-content: center;
// `;

// const StatValueWrapper = styled.div`
// 	display: flex;
// 	box-sizing: border-box;
// 	padding: 15px;
// 	width: 100%;
// 	justify-content: center;
// `;

const VerifierContentWrapper = styled.div`
	display: flex;
	padding: 20px 0 30px 40px;
	width: 100%;
	flex-direction: column;

	@media screen and (max-width: 600px) {
		padding: 15px 18px;
	}
`;

const HeaderWrapper = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;

	@media screen and (max-width: 1200px) {
		flex-direction: column;
	}
`;

const HeaderContent = styled.div`
	display: flex;
	flex-direction: column;

	.title {
		font-size: 24px;
		font-weight: bold;
		line-height: 1.21;
		margin-bottom: 7px;

		@media screen and (max-width: 900px) {
			font-size: 22px;
		}

		@media screen and (max-width: 600px) {
			font-size: 20px;
		}
	}

	.description {
		font-size: 16px;
		line-height: 1.19;

		@media screen and (max-width: 900px) {
			font-size: 14px;
		}

		@media screen and (max-width: 600px) {
			font-size: 12px;
		}
	}
`;

const TimeoutClockWrapper = styled.div`
	display: flex;
	align-items: center;

	@media screen and (max-width: 1200px) {
		margin-top: 15px;
		margin-left: auto;
	}
`;

const TimeoutClock = styled.div`
	display: flex;
	flex-direction: row;
	border-radius: 10px;
	border: solid 1px ${BORDER_COLOR.primary};
	width: fit-content;
`;

const TimeoutTime = styled.div`
	display: flex;
	padding: 10px;
	box-sizing: border-box;
	align-items: center;

	font-size: 16px;
	color: ${TEXT_COLOR.graydark};

	@media screen and (max-width: 900px) {
		font-size: 14px;
		padding: 5px;
	}

	@media screen and (max-width: 600px) {
		font-size: 12px;
	}

	svg {
		fill: ${TEXT_COLOR.graylight};
		width: 20px;
		height: 20px;

		@media screen and (max-width: 900px) {
			width: 18px;
			height: 18px;
		}

		@media screen and (max-width: 600px) {
			width: 16px;
			height: 16px;
		}
	}

	.time {
		margin-left: 5px;
		white-space: nowrap;
	}
`;

const TimeoutLeft = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;

	margin-right: 10px;

	background: red;
	border-radius: 50%;
	width: 28px;
	height: 28px;
	padding: 8px;

	@media screen and (max-width: 900px) {
		width: 26px;
		height: 26px;
	}

	@media screen and (max-width: 600px) {
		width: 24px;
		height: 24px;
	}
`;

const StopIcon = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	background: #ffffff;
`;

const StartPageContentWrapper = styled.div`
	transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
	box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
	background-color: #ffffff;
	min-height: calc(100vh - 171px);
	align-items: center;
	display: flex;
`;
