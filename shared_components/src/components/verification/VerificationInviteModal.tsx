import React, {
    useState,
} from 'react';
import {
    Theme,
    createStyles,
    withStyles,
    makeStyles
} from '@material-ui/core/styles';
import {
    Grid,
    TextField,
    IconButton,
    Dialog,
    Typography,
} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import { ChevronLeft } from '@material-ui/icons';
import styled from 'styled-components';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import {
    TEXT_COLOR,
    BOX_SHADOW,
    BORDER_COLOR,
} from '../../common/styles';
import { CustomButton } from '../common';

/**
 * Props
 */
interface IProps {
    isMobile: boolean,
    sendInvite: any,
    generateInviteUrl: any,
    sendCopyToClipboard: any,
}

const allyProps = (index: any) => {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;
  
    return (
        <TabPannelContainer
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
            <Box pt={3}>
                <Typography variant="h6">{children}</Typography>
            </Box>
            )}
        </TabPannelContainer>
    );
}
/*
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
        }
    },

    container: {
        width: '100%',

        '& .MuiPaper-root': {
            padding: '47px 51px',
            maxWidth: 495,
            width: '100%',
            borderRadius: 12,
            borderColor: BORDER_COLOR.primary,
            color: theme.palette.grey[900],
            
            '@media screen and (max-width: 1440)': {
                maxWidth: 473,
                padding: '41px 36px',
            },

            '@media screen and (max-width: 1280px)': {
                maxWidth: 376,
                padding: '41px 36px',
            },

            '@media screen and (max-width: 600px)': {
                maxWidth: '100%',
                padding: 0,
                margin: 0,
                height: '100%',
                maxHeight: '100%',
                borderRadius: 0,
            },
        },
    },

    title: {
        '& .content': {
            fontSize: 24,
            lineHeight: 1.192,
        },

        '& .closeButton': {
            color: TEXT_COLOR.graylight,
            width: 20,
            height: 20,
        }
    },

    content: {
        marginTop: 47,
        fontSize: 20,
        lineHeight: 1.8,
        color: theme.palette.grey[900],

        '& .closeButton': {
            color: theme.palette.grey[900],
            width: 20,
            height: 20
        }
    },

    ctrlNewKYC: {
        marginTop: 63,

        '& .txtForgot': {
            font: '20px',
            lineHeight: 1.2,
            cursor: 'pointer',

            '&:hover': {
                textDecoration: 'underline',
            }
        }
    },

    submit: {
        alignContent: 'center',

        '& button': {
            minWidth: 185,
            margin: '62.5px auto 5px auto',

            '@media screen and (max-width: 1440)': {
                margin: '35px auto 0 auto',
            },

            '@media screen and (max-width: 1280px)': {
                margin: '35px auto 0 auto',
            },

            '@media screen and (max-width: 600px)': {
                minWidth: 0,
                width: '100%',
                maxWidth: 300,
                marginTop: 20,
                padding: 15,
            },
        }
    },

    inviteButton: {
        marginLeft: 20
    },

    copyButton: {
        float: 'right',
        marginTop: '1rem'
    },

    width80: {
        width: '80%',
    },

    tabBtn: {
        '@media screen and (max-width: 1280px)': {
            fontSize: '14px',
            minWidth: '120px',
            padding: '0px',
        },
        '@media screen and (max-width: 800px)': {
            fontSize: '12px',
            minWidth: '100px',
            padding: '0px',
        }
    },

}));

/*
 * Styled Components
*/
const TabPannelContainer = styled.div`
`;

const NewKYCTextField = withStyles((theme: Theme) => ({
    root: {
        width: '100%',

        '& .MuiInputBase-input': {
            color: theme.palette.grey[900],
            fontSize: 20,
            lineHeight: 1.3,
            '@media screen and (max-width: 1280px)': {
                fontSize: 12,
            }
        },

        '& .MuiFormLabel-root': {
            fontSize: 16,
            lineHeight: 1.3125,
            color: TEXT_COLOR.graylight,
            '@media screen and (max-width: 1280px)': {
                fontSize: 11,
            }
        },

        '& .MuiInputLabel-shrink': {
            top: 0,
            '@media screen and (max-width: 600px)': {
                top: -7,
            }
        }
    },
}))(TextField);

const styles = (theme: Theme) => createStyles({
    root: {
        margin: 0,
        padding: theme.spacing(0),

        '& .MuiTypography-root': {
            fontFamily: 'Roboto',
            fontSize: 24,
            lineHeight: 1.308,

            '@media screen and (max-width: 1280px)': {
                fontSize: 20,
            },

            '@media screen and (max-width: 600px)': {
                fontSize: 17,
                lineHeight: 1.35,
                padding: '51px 0 14px 0',
                textAlign: 'center',
                fontWeight: '500',
                boxShadow: BOX_SHADOW.secondary,
            },
        }
    },

    closeButton: {
        position: 'absolute',
        right: 25,
        top: 32,
        color: TEXT_COLOR.graylight,

        '& .MuiSvgIcon-root': {
            fontSize: '2.15rem',
            '@media screen and (max-width: 1280px)': {
                fontSize: '1.95rem',
            },
        },

        '@media screen and (max-width: 600px)': {
            top: 45,
            left: 20,
            padding: 0,
        },
    },
});

const InvitationLink = styled.span`
    padding-top: 24px;
    font-size: 16px;
    line-height: 22px;
    display: flex;
`;

const InvitationComment = styled.span`
    font-size: 12px;
    line-height: 18px;
    display: flex;
`;

export interface DialogTitleProps {
    id: string;
    children: React.ReactNode;
    isMobile: boolean;
    onClose: () => void;
    classes: any;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
    const { children, classes, onClose, isMobile, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    {isMobile ? <ChevronLeft /> : <CloseIcon />}
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(0),
        paddingTop: '40px !important',
        '@media screen and (max-width: 1280px)': {
            paddingTop: '25px !important',
        },
        '@media screen and (max-width: 600px)': {
            padding: '46px 18.5px',
            flex: 'initial',
        },
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(0),
        '@media screen and (max-width: 600px)': {
            padding: '0 18.5px',
        },
    },
}))(MuiDialogActions);

const FormContainer = styled.form``;

/**
 * Main Component
 */
const VerificationInviteModal = ({
    isMobile,
    sendInvite,
    generateInviteUrl,
    sendCopyToClipboard,
}: IProps) => {

    const classes = useStyles();
    const refForm = React.createRef<any>();
    const refCreateForm = React.createRef<any>();

    const [open, setOpen] = useState(false);
    const [inviteData, setInviteData] = useState({
        email: '', 
        externalRefId: '', 
        firstName: '',
        lastName: '', 
        organisation: '',
    });
    const [inviteUrlData, setInviteUrlData] = useState({
        email: '',
        externalRefId: '',
        firstName: '',
        lastName: '',
        organisation: '',
    });
    const [value, setValue] = useState(0);
    const [urlGenerated, setUrlGenerated] = useState(null);

    const handleOpen = () => {
        setOpen(true);
        setUrlGenerated(null);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const validate = () => {
        return  refForm.current.reportValidity();
    }

    const validateCreateForm = () => {
        return  refCreateForm.current.reportValidity();
    }

    const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        submitData();
    }

    const handleChage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInviteData({
            ...inviteData,
            [event.target.name]: event.target.value
        });
    }

    const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInviteUrlData({
            ...inviteUrlData,
            [event.target.name]: event.target.value
        })
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            submitData();
        }
    };

    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const submitData = () => {
        if (validate()) {
            sendInvite(inviteData)
                .then((res: any) => {
                    handleClose();
                })
                .catch((err: any) => {
                    console.error('invite for kyc error', err);
                });
        }
    }

    const handleGenerateLink = () => {
        if (validateCreateForm()) {
            generateInviteUrl(inviteUrlData)
                .then((res: any) => {
                    if (res.status === 'success') {
                        setUrlGenerated(res.res.inviteUrl);
                    } else {
                        console.error('generate invite url error');
                    }
                })
                .catch((err: any) => {
                    console.error('generate invite url error', err);
                })
        }
    }

    const handleCopyToClipboard = () => {

        if (urlGenerated) {
            const elem = document.createElement('p');
            elem.textContent = urlGenerated;
            document.body.appendChild(elem);

            const selection = document.getSelection() as any;
            const range = document.createRange();

            range.selectNode(elem);
            selection.removeAllRanges();
            selection.addRange(range);
            document.execCommand('copy')

            selection.removeAllRanges();
            document.body.removeChild(elem);
            sendCopyToClipboard();
        }
    }

    return (
        <>
            <CustomButton onClick={handleOpen} className={classes.inviteButton} label="INVITE FOR KYC" />
            <Grid container justify="flex-end">
                <Dialog
                    onClose={handleClose}
                    aria-labelledby="new-kyc-invitation-title"
                    open={open}
                    className={classes.container}
                >
                    <DialogTitle id="new-kyc-invitation-title" onClose={handleClose} isMobile={isMobile} >
                        New KYC Invitation
                    </DialogTitle>
                    <DialogContent>
                        <Tabs
                            value={value}
                            onChange={handleTabChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="fullWidth"
                            aria-label="full width tabs"
                            className={classes.width80}
                        >
                            <Tab label="Create Invite" className={classes.tabBtn} {...allyProps(0)} />
                            <Tab label="Send Invite" className={classes.tabBtn} {...allyProps(1)} />
                        </Tabs>

                        <TabPanel value={value} index={0}>
                            <FormContainer noValidate={true} ref={refCreateForm} className={classes.width80}>
                                <NewKYCTextField
                                    id={'customer-email-id-' + value}
                                    type="email"
                                    label="Customer Email ID"
                                    name="email"
                                    className={classes.margin}
                                    required
                                    autoFocus
                                    onChange={handleUrlChange}
                                    onKeyDown={handleKeyPress}
                                    inputProps={{ maxLength: 319,
                                        pattern:'(^(?=.{1,64}@)([_A-Za-z0-9-\+!#$%&‘*+–/=?^_`{|}~]+(\.[_A-Za-z0-9-\+!#$%&‘*+–/=?^_`{|}~]+)*))@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$'
                                    }}
                                />
                                <NewKYCTextField
                                    id={'first-name-' + value}
                                    type="text"
                                    label="First Name"
                                    name="firstName"
                                    className={classes.margin}
                                    onChange={handleUrlChange}
                                    onKeyDown={handleKeyPress}
                                    inputProps={{maxLength: 30, pattern:"^[a-zA-Z][a-zA-Z ]*[a-zA-Z]", title: "Enter only Alphabetic characters and space" }}
                                />
                                <NewKYCTextField
                                    id={'last-name-' + value}
                                    type="text"
                                    label="Last Name"
                                    name="lastName"
                                    className={classes.margin}
                                    onChange={handleUrlChange}
                                    onKeyDown={handleKeyPress}
                                    inputProps={{maxLength: 35, pattern:"^[a-zA-Z][a-zA-Z ]*[a-zA-Z]", title: "Enter only Alphabetic characters and space" }}
                                />
                                <NewKYCTextField
                                    id={'customer-reference-' + value}
                                    type="text"
                                    label="Customer Reference"
                                    name="externalRefId"
                                    onChange={handleUrlChange}
                                    onKeyDown={handleKeyPress}
                                    inputProps={{maxLength: 40, pattern:"[a-zA-Z0-9 ]+", title: "Enter only AlphabeticNumeric characters" }}
                                />
                            </FormContainer>
                            <InvitationLink>
                                Invitation Link
                            </InvitationLink>
                            <InvitationComment>
                                Share this link with your customer to allow them to access
                            </InvitationComment>
                            {urlGenerated ? (
                                <>
                                    <NewKYCTextField
                                        id="generate-url"
                                        type="text"
                                        label="Link"
                                        name="generatedLink"
                                        value={urlGenerated}
                                    />
                                    <CustomButton
                                        className={classes.copyButton}
                                        label="copy to clipboard"
                                        variant="outlined"
                                        onClick={handleCopyToClipboard}
                                    />
                                </>
                            ) : (
                                <DialogActions className={classes.submit}>
                                    <CustomButton label="GENERATE LINK" variant="outlined" onClick={handleGenerateLink} />
                                </DialogActions>
                            )}
                        </TabPanel>

                        <TabPanel value={value} index={1}>
                            <FormContainer noValidate={true} ref={refForm} className={classes.width80}>
                                <NewKYCTextField
                                    id={'customer-email-id-' + value}
                                    type="email"
                                    label="Customer Email ID"
                                    name="email"
                                    className={classes.margin}
                                    required
                                    autoFocus
                                    onChange={handleChage}
                                    onKeyDown={handleKeyPress}
                                    inputProps={{ maxLength: 319, 
                                        pattern:'(^(?=.{1,64}@)([_A-Za-z0-9-\+!#$%&‘*+–/=?^_`{|}~]+(\.[_A-Za-z0-9-\+!#$%&‘*+–/=?^_`{|}~]+)*))@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$'
                                    }}
                                />
                                <NewKYCTextField
                                    id={'first-name-' + value}
                                    type="text"
                                    label="First Name"
                                    name="firstName"                                
                                    className={classes.margin}
                                    onChange={handleChage}
                                    onKeyDown={handleKeyPress}
                                    inputProps={{maxLength: 30, pattern:"^[a-zA-Z][a-zA-Z ]*[a-zA-Z]", title: "Enter only Alphabetic characters and space" }}
                                />
                                <NewKYCTextField
                                    id={'last-name-' + value}
                                    type="text"
                                    label="Last Name"
                                    name="lastName"
                                    className={classes.margin}
                                    onChange={handleChage}
                                    onKeyDown={handleKeyPress}
                                    inputProps={{maxLength: 35, pattern:"^[a-zA-Z][a-zA-Z ]*[a-zA-Z]", title: "Enter only Alphabetic characters and space" }}
                                />
                                <NewKYCTextField
                                    id={'customer-reference-' + value}
                                    type="text"
                                    label="Customer Reference"
                                    name="externalRefId"
                                    onChange={handleChage}
                                    onKeyDown={handleKeyPress}
                                    inputProps={{maxLength: 40, pattern:"[a-zA-Z0-9 ]+", title: "Enter only AlphabeticNumeric characters" }}
                                />
                            </FormContainer>
                            <DialogActions className={classes.submit}>
                                <CustomButton label="SEND EMAIL" onClick={handleSubmit} />
                            </DialogActions>
                        </TabPanel>

                    </DialogContent>
                </Dialog>
            </Grid>
        </>
    );
}

VerificationInviteModal.defaultProps = {
    isMobile: false,
    sendInvite: null,
    generateInviteUrl: null,
    sendCopyToClipboard: null,
}

export default VerificationInviteModal;
