import React, { useState, useEffect } from 'react';
import {
    makeStyles,
    withStyles,
} from '@material-ui/core/styles';
import {
    Grid,
    Avatar,
    Divider,
    Switch,
    Theme,
    createStyles,
    WithStyles,
} from '@material-ui/core';
import styled from 'styled-components';

import {
    ContentText,
    StateItem,
} from '../common';

import {
    BACKGROUND_COLOR,
    BOX_SHADOW,
    TEXT_COLOR,
} from '../../common/styles';
import { STATEITEM_STATES } from '../../common/constants';

/**
 * Constants
 */
const MIDDLE_BREAK_POINT = 1200;
const ACTIVE = 'ACTIVE';
const INACTIVE = 'INACTIVE';


/**
 * Props
 */
interface IProps {
    data?: {
        firstName?: string,
        lastName?: string,
        email?: string,
        status?: string,
        userType?: string,
        organisation?: string
    },
    edit: boolean,
    handleChangeStatus: any
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
        minHeight: 175,
    },

    topShadow: {
        boxShadow: BOX_SHADOW.secondary,
        width: '100%',
        backgroundColor: 'transparent',
    },

    container: {
        padding: 0,

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
        padding: '29px 65px',
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
                ...USER_PHOTO,
            },
        },

        '& .contents': {
            fontFamily: 'Roboto',
            color: theme.palette.grey[900],

            '& .name': {
                fontSize: 16,
                lineHeight: 1.33,
                marginBottom: 8,

                '@media screen and (max-width: 1280)': {
                    fontSize: 14,
                    lineHeight: 1.36,
                    marginBottom: 5,
                },

                '@media screen and (max-width: 600px)': {
                    textAlign: 'center',
                },
            },

            '& .email': {
                fontSize: 16,
                lineHeight: 1.31,
                marginBottom: 8,

                '@media screen and (max-width: 600px)': {
                    fontSize: 14,
                    lineHeight: 1.36,
                    marginBottom: 5,
                    textAlign: 'center',
                },
            },

            '& .type': {
                fontSize: 16,
                lineHeight: 1.31,
                marginBottom: 4,

                '@media screen and (max-width: 600px)': {
                    fontSize: 14,
                    lineHeight: 1.36,
                    marginBottom: 5,
                    textAlign: 'center',
                },
            },

        },
    },

    userStatus: {
        padding: '29px 10px 29px 30px',

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
            fontSize: 18,
            lineHeight: 1.33,
            color: theme.palette.grey[900],
            width: '100%',

            '@media screen and (max-width: 600px)': {
                fontSize: 16,
            },
        }
    },

    userState: {
        maxWidth: '100%',

        '& > div': {
            maxWidth: '100%',
        }
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

const UserStatusInformation = styled.div`
  width: calc(35.0567% - 1px);

  @media screen and (max-width: ${MIDDLE_BREAK_POINT}px) {
    width: 100%;
  }
`;
/**
* Custom Switch
*/
const switchStyle = (theme: Theme) => createStyles({
    root: {
        width: 42,
        height: 26,
        padding: 0,

    },
    switchBase: {
        padding: 1,
        '&$checked': {
            transform: 'translateX(16px)',
            color: theme.palette.common.white,
            '& + $track': {
                backgroundColor: '#52d869',
                opacity: 1,
                border: 'none',
            },
        },
        '&$focusVisible $thumb': {
            color: '#52d869',
            border: '6px solid #fff',
        },
    },
    thumb: {
        width: 24,
        height: 24,
    },
    track: {
        borderRadius: 26 / 2,
        border: `1px solid ${theme.palette.grey[400]}`,
        backgroundColor: theme.palette.grey[50],
        opacity: 1,
        transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
});

interface ISwitchProps extends WithStyles<typeof switchStyle> {
    classes: any,
    name: string,
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const IOSSwitch = withStyles(switchStyle)(({classes, checked, onChange, name }: ISwitchProps) => {
    return (
        <Switch
            focusVisibleClassName={classes.focusVisible}
            disableRipple
            classes={{
                root: classes.root,
                switchBase: classes.switchBase,
                thumb: classes.thumb,
                track: classes.track,
                checked: classes.checked,
            }}
            checked={checked}
            onChange={onChange}
            name={name}
        />
    );
});
/**
 * Main Component
 */
const UserDetailInformation = ({
    data,
    edit,
    handleChangeStatus
}: IProps) => {
    /**
     * Use styles
     */
    const classes = useStyles();

    /**
     * States
     */
    const [middleBreakPoint, setMiddleBreakPoint] = useState(false);
    const [userStatus, setUserStatus] = useState('Disabled');
    const [userStatusType, setUserStatusType] = useState(STATEITEM_STATES.error);


    /**
     * Initialize when didMount and updating
     */
    useEffect(() => {
        window.addEventListener('resize', () => {
            const windowWidth = window.screen.width;
            setMiddleBreakPoint((windowWidth <= MIDDLE_BREAK_POINT));
        });
    }, []);

    useEffect(() => {
        if (data) {
            if (data?.status === ACTIVE) {
                setUserStatus('Enabled');
                setUserStatusType(STATEITEM_STATES.success);
            } else if (data?.status === INACTIVE) {
                setUserStatus('Disabled');
                setUserStatusType(STATEITEM_STATES.error);
            }
        }
    }, [data]);

    const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const status = event.target.checked === true ? ACTIVE : INACTIVE;
        handleChangeStatus(status, (event.target as HTMLInputElement).name);
    }

    return (
        <>
            <Grid container className={classes.root}>
                <Divider className={classes.topShadow} />
                <Grid container direction="row" className={classes.container}>
                    <UserInfomation>
                        <Grid container direction="row" wrap="nowrap" className={classes.userInfo}>
                            <Avatar aria-label="recipe" className="photo">
                                <ContentText>{data?.firstName?.slice(0, 1)}</ContentText>
                            </Avatar>
                            <Grid container direction="column" className="contents">
                                <ContentText className="name" >{(data?.firstName ?? '') + ' ' + (data?.lastName ?? '')}&nbsp;</ContentText>
                                <ContentText className="email" >{(data?.email ?? '')}&nbsp;</ContentText>
                            </Grid>

                        </Grid>
                    </UserInfomation>
                    <Divider orientation={middleBreakPoint ? "horizontal" : "vertical"} flexItem className={classes.divider} />
                    <UserStatusInformation>
                        <Grid container direction="column" className={classes.userStatus} >
                            <Grid container direction="column" className={classes.item} >
                                <ContentText className="name">Status</ContentText>
                                {(!edit ? (
                                    <StateItem type={userStatusType || 'warning'} label={userStatus} className={classes.userState} />
                                ) : (
                                        <Grid container spacing={10}>
                                            <Grid item>Enabled </Grid>
                                            <Grid item>
                                                <IOSSwitch
                                                    checked={data?.status === ACTIVE}
                                                    onChange={handleSwitchChange}
                                                    name="status"
                                                />
                                            </Grid>
                                        </Grid>
                                    ))}
                            </Grid>
                        </Grid>
                    </UserStatusInformation>
                </Grid>
            </Grid>
        </>
    )
}

UserDetailInformation.defaultProps = {
    data: undefined,
    edit: false,
    handleChange: null,
}

export default UserDetailInformation;
