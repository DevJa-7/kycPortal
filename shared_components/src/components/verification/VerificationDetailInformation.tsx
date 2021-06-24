import React, { useState, useEffect } from 'react';
import {
    makeStyles,
    withStyles,
    Theme
} from '@material-ui/core/styles';
import {
    Grid,
    Avatar,
    Divider,
} from '@material-ui/core';
import styled from 'styled-components';

import {
    ContentImage,
    ContentText,
    StateItem,
} from '../common';

import {
    BOX_SHADOW,
    CommonButton,
    TEXT_COLOR,
} from '../../common/styles';
import {
    AUTH_ROLE,
    STATEITEM_STATES,
} from '../../common/constants';
import {
    IVerificationDetailResult,
    VERIFICATION_RESULTS,
    VERIFICATION_RESULT_VALUE,
    VERIFICATION_STATUS,
} from '../../service/models/verification';
import { getIsMobile } from '../../common/utils';

/**
 * Constants
 */
const MIDDLE_BREAK_POINT = 1200;

/**
 * Props
 */
interface IProps {
    data?: {
        firstName?: string,
        lastName?: string,
        email?: string,
        externalRefId?: string,
        verificationStatus?: string,
        verificationResult?: string,
        verificationReason?: string,
        face?: string,
    },
    roles: string,
    editable: boolean,
    isEdit: boolean,
    handleChange: any,
    handleSave: any,
    handleCancel: any,
    handleEdit: any,
    handleReopenVerification: any,
    handleVerification: any,
    handleVerificationDisabled: any,
}

/**
 * Styles
 */
const USER_PHOTO = {
    width: 121,
    height: 121,

    '@media screen and (max-width: 900px)': {
        width: 100,
        height: 100,
    },

    '@media screen and (max-width: 600px)': {
        width: 80,
        height: 80,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
};

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.grey[50],
        minHeight: 227,
    },

    topShadow: {
        boxShadow: BOX_SHADOW.secondary,
        width: '100%',
        backgroundColor: 'transparent',
    },

    container: {
        padding: 0,
        minHeight: 230,

        '@media screen and (max-width: 1200px)': {
            padding: '0 30px',
        },

        '@media screen and (max-width: 600px)': {
            padding: '0 20px',
        }
    },

    divider: {
        margin: '0 0 0 0',

        '@media screen and (max-width: 1200px)': {
            width: '100%',
            height: 1,
        }
    },

    userInfo: {
        backgroundColor: 'transparent',
        padding: '29px 20px 29px 90px',
        marginBottom: '4px !important',

        '@media screen and (max-width: 1200px)': {
            padding: '29px 0',
        },

        '@media screen and (max-width: 600px)': {
            padding: '15px 0 5px 0',
            flexFlow: 'column',
        },

        '& .photo': {
            ...USER_PHOTO,
            marginRight: 18,

            '& img': {
                color: 'transparent',
                objectFit: 'cover',
                textAlign: 'center',
                textIndent: '5000px',
                width: '100%',
            },
        },

        '& .details': {
            justifyContent: 'space-between',
        },

        '& .progress-status': {
            alignItems: 'start',
            width: 'fit-content',
            marginBottom: '0 !important',

            '@media screen and (max-width: 600px)': {
                alignItems: 'center',
                flexFlow: 'row',
                justifyContent: 'center',

                '& .state': {
                    marginBottom: 0,
                },
            },
        },

        '& .contents': {
            fontFamily: 'Roboto',
            color: theme.palette.grey[900],
            width: 'fit-content',
            marginBottom: 15,

            '@media screen and (max-width: 600px)': {
                width: '100%',
                alignItems: 'center',
            },

            '& .email': {
                fontSize: 24,
                fontWeight: 500,
                lineHeight: 1.33,
                marginBottom: 8,

                '@media screen and (max-width: 1280px)': {
                    fontSize: 20,
                    lineHeight: 1.3,
                    marginBottom: 5,
                },

                '@media screen and (max-width: 600px)': {
                    textAlign: 'center',
                },
            },

            '& .name': {
                fontSize: 16,
                lineHeight: 1.31,
                marginBottom: 8,

                '@media screen and (max-width: 1280px)': {
                    fontSize: 14,
                    lineHeight: 1.36,
                    marginBottom: 5,
                },

                '@media screen and (max-width: 600px)': {
                    textAlign: 'center',
                },
            },

            '& .type': {
                fontSize: 16,
                lineHeight: 1.31,
                marginBottom: 4,

                '@media screen and (max-width: 1280px)': {
                    fontSize: 14,
                    lineHeight: 1.36,
                    marginBottom: 5,
                },

                '@media screen and (max-width: 600px)': {
                    textAlign: 'center',
                },
            },

            '& .state': {
                fontSize: 14,
                lineHeight: 1.36,
                marginBottom: 10,
                color: TEXT_COLOR.graylight,

                '@media screen and (max-width: 1280px)': {
                    fontSize: 12,
                    lineHeight: 1.33,
                },

                '@media screen and (max-width: 600px)': {
                    textAlign: 'center',
                },
            },

            '& .live-check': {
                fontSize: 20,
                lineHeight: 1.3,
                display: 'flex',
                alignItems: 'center',

                '@media screen and (max-width: 600px)': {
                    fontSize: 16,
                    lineHeight: 1.36,
                    margin: '0 auto 5px auto',
                },
            },
        },
    },

    verificationResult: {
        maxWidth: '500px',
        margin: 0,
        marginBottom: 15,

        '& .MuiInput-formControl': {
            marginTop: 0,
        },

        '@media screen and (max-width: 1280px)': {
            maxWidth: '300px',
        },

        '@media screen and (max-width: 600px)': {
            minWidth: '100%',
        },
    },

    verificationStatus: {
        padding: '29px 30px 29px 30px',

        '@media screen and (max-width: 1200px)': {
            padding: '29px 0',
        },

        '@media screen and (max-width: 600px)': {
            padding: '15px 0',
        },
    },

    item: {
        marginBottom: 15,

        '& .name': {
            fontSize: 16,
            lineHeight: 1.3,
            color: TEXT_COLOR.graylight,
            marginBottom: 8,
            width: '100%',

            '@media screen and (max-width: 600px)': {
                fontSize: 14,
            },
        },

        '& .value': {
            fontSize: 16,
            lineHeight: 1.33,
            color: theme.palette.grey[900],
            width: '100%',

            '@media screen and (max-width: 1440px)': {
                fontSize: 14,
            },

            '@media screen and (max-width: 600px)': {
                fontSize: 12,
            },
        }
    },

    verificationState: {
        maxWidth: '100%',

        '& > div': {
            maxWidth: '100%',
        }
    },

    editButton: {
        marginLeft: '7.863%',

        '@media screen and (max-width: 1280px)': {
            paddingTop: 11,
            paddingBottom: 11,
        },
        '@media screen and (max-width: 600px)': {
            width: 'auto',
        }
    },

    saveButton: {
        minWidth: 125,
        marginLeft: 20,
        maxWidth: 201,
        fontSize: 16,
        lineHeight: 1.36,

        '@media screen and (max-width: 1280px)': {
            paddingTop: 11,
            paddingBottom: 11,
            maxWidth: 148,
            fontSize: 14,
        },
        '@media screen and (max-width: 600px)': {
            minWidth: 85,
            width: 'auto',
        }
    },

    cancelButton: {
        minWidth: 125,
        maxWidth: 201,
        fontSize: 16,
        lineHeight: 1.36,

        '@media screen and (max-width: 1280px)': {
            paddingTop: 11,
            paddingBottom: 11,
            maxWidth: 148,
            fontSize: 14,
        },
        '@media screen and (max-width: 600px)': {
            minWidth: 85,
            width: 'auto',
        }
    },

    buttons: {
        marginTop: 15,
    }
}));

/**
 * Styled Components
 */
const UserInfomation = styled.div`
  width: 64.9433%;

  @media screen and (max-width: ${MIDDLE_BREAK_POINT}px) {
    width: 100%;
  }
`;

const VerifictionStatusInfomation = styled.div`
  width: calc(35.0567% - 1px);

  @media screen and (max-width: ${MIDDLE_BREAK_POINT}px) {
    width: 100%;
  }
`;

const Buttons = styled.div`
  text-align: right;
  justify-items: flex-end;
  width: inherit;
`;

const EditButton = withStyles(() => ({
    root: {
        fontSize: 16,
        lineHeight: 1.36,
        '@media screen and (max-width: 1280px)': {
            fontSize: 14,
        },
        '@media screen and (max-width: 600px)': {
            boxShadow: 'none',
        },
    },
}))(CommonButton);


/**
 * Main Component
 */
const VerificationDetailInformation = ({
    data,
    roles,
    editable,
    isEdit,
    handleChange,
    handleSave,
    handleCancel,
    handleEdit,
    handleReopenVerification,
    handleVerification,
    handleVerificationDisabled,
}: IProps) => {

    /**
     * Use styles
     */
    const classes = useStyles();

    /**
     * States
     */
    const [isMobile, setIsMobile] = useState(getIsMobile());
    const [middleBreakPoint, setMiddleBreakPoint] = useState(false);
    const [result, setResult] = useState({value: '', display: '', reason: ''} as IVerificationDetailResult);
    const [state, setState] = useState({} as STATEITEM_STATES);
    const [disabled, setDisabledVerificatioin] = useState(false);


    const resultList = VERIFICATION_RESULTS.slice(0, -2);

    /**
     * Initialize when didMount and updating
     */
    useEffect(() => {
        window.addEventListener('resize', () => {
          const windowWidth = window.screen.width;
          setMiddleBreakPoint((windowWidth <= MIDDLE_BREAK_POINT));
          setIsMobile(getIsMobile());
        });
    }, []);

    useEffect(() => {
        if (data && data?.verificationResult) {
            const idx = VERIFICATION_RESULTS.findIndex(item => item.value == data?.verificationResult);
            if (idx > -1) {
                setResult(VERIFICATION_RESULTS[idx]);

                if (data?.verificationStatus === VERIFICATION_STATUS.PROCESSING &&
                    VERIFICATION_RESULTS[idx].value !== VERIFICATION_RESULT_VALUE.AWAITING_VERIFICATION) {
                    setDisabledVerificatioin(false);
                    handleVerificationDisabled(false);
                } else {
                    setDisabledVerificatioin(true);
                    handleVerificationDisabled(true);
                }

                if (VERIFICATION_RESULTS[idx].value === VERIFICATION_RESULT_VALUE.APPROVED_VERIFIED) {
                    setState(STATEITEM_STATES.success);
                } else {
                    setState(STATEITEM_STATES.warning);
                }
            }
        }
    }, [data?.verificationResult]);

    const handleVerificationResult = (event: React.ChangeEvent<{ value: unknown }>) => {
        const val = event.target.value as string;
        const _result = VERIFICATION_RESULTS.find(item => item.value == val);
        handleChange(_result?.value);
    }

    return (
        <Grid container className={classes.root}>
            <Divider className={classes.topShadow} />
            <Grid container direction="row" className={classes.container}>
                <UserInfomation>
                    <Grid container direction="row" wrap="nowrap" className={classes.userInfo}>
                        <Avatar aria-label="recipe" className="photo">
                            {data?.face ?
                                <ContentImage className="image" src={data?.face ? ('data:image/png;base64,' + data?.face) : ''} />
                            :   <ContentText>{data?.firstName?.slice(0, 1)}</ContentText>
                            }

                        </Avatar>
                        <Grid container className="details">
                            <Grid container direction="column" className="contents">
                                <ContentText className="email">{(data?.email || 'Email: -')}&nbsp;</ContentText>
                                <ContentText className="type">Customer Ref: {(data?.externalRefId || ' -')}&nbsp;</ContentText>
                                <ContentText className="name">Invite Name: {(' -')}&nbsp;</ContentText>
                                {/* {<ContentText className="live-check">Liveness Check &nbsp;&nbsp;&nbsp;<StateItem type={STATEITEM_STATES.success} label="Ok" /></ContentText>} */}
                            </Grid>
                            <Grid container direction="column" className="contents progress-status">
                                <ContentText className="state">Status:&nbsp;&nbsp;</ContentText>
                                {data?.verificationStatus && <StateItem type={STATEITEM_STATES.success} label={data?.verificationStatus || '-'} />}
                            </Grid>
                        </Grid>
                    </Grid>
                </UserInfomation>
                <Divider orientation={middleBreakPoint ? "horizontal" : "vertical" } flexItem className={classes.divider} />
                <VerifictionStatusInfomation>
                    <Grid container direction="column" className={classes.verificationStatus}>
                        <Grid container className={classes.item} direction="column">
                            <ContentText className="name">Verification Result</ContentText>{isEdit}
                            {result?.display ?
                                <StateItem type={state} label={result?.display || '-'} className={classes.verificationState}/>
                            :   <ContentText>-</ContentText>
                            }
                        </Grid>
                        <Grid container className={classes.item} direction="column">
                            <ContentText className="name">Reason for Rejection</ContentText>
                            <ContentText className="value">{result?.reason || '-'}</ContentText>
                        </Grid>
                        <Grid container className={classes.buttons}>
                            {editable ? (
                                <Buttons>
                                    <EditButton
                                        variant={"contained"}
                                        color="primary"
                                        disabled={disabled}
                                        className={classes.editButton}
                                        onClick={handleVerification}
                                    >
                                        COMPLETE VERIFICATION
                                    </EditButton>
                                </Buttons>
                            ) : (roles.includes(AUTH_ROLE.admin)) && (
                                <Buttons>
                                    <EditButton
                                        variant={"contained"}
                                        color="primary"
                                        className={classes.editButton}
                                        onClick={handleReopenVerification}
                                    >
                                        RE-OPEN VERIFICATION
                                    </EditButton>
                                </Buttons>
                            )}
                        </Grid>
                    </Grid>
                </VerifictionStatusInfomation>
            </Grid>
        </Grid>
    )
}

VerificationDetailInformation.defaultProps = {
    data: undefined,
    roles: '',
    editable: false,
    isEdit: false,
    handleChange: null,
    handleSave: null,
    handleCancel: null,
    handleEditCancel: null,
    handleReopenVerification: null,
    handleVerification: null,
    handleVerificationDisabled: null,
}

export default VerificationDetailInformation;