import React, { useState, useMemo } from 'react';
import clsx from 'clsx';
import styled from 'styled-components';
import {
    withStyles,
    makeStyles,
    Theme,
    withTheme,
} from '@material-ui/core/styles';
import {
    TextField,
    FormControl,
    InputLabel,
    Input,
    InputAdornment,
    IconButton,
    FormGroup,
    Link,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/VisibilityOutlined';
import VisibilityOff from '@material-ui/icons/VisibilityOffOutlined';

import {
    CustomButton,
    ContentText,
    ContentImage
} from '../common';
import { getImageUrl, getLogoFromConfiguration } from '../../common/utils';

/**
 * Props
 */
interface ErrorStates {
    email: boolean,
    password: boolean,
}

interface IProps {
    handleSignIn: any,
    openForgotPassword: any,
    errors: ErrorStates,
}

/**
 * Constants
 */
    
/*
 * Custom Controls
*/
const LoginTextField = withStyles((theme: Theme) => ({
    root: {
        marginBottom: 30,
        '@media screen and (max-width: 600px)': {
            marginBottom: 25,
        },
        '& .MuiInputBase-input': {
            color: theme.palette.grey[900],
            fontSize: 16,
            lineHeight: 1.31,
            '@media screen and (max-width: 1280px)': {
                fontSize: 16
            },
            '@media screen and (max-width: 600px)': {
                fontSize: 14
            },
        },
        '& .MuiFormLabel-root': {
            fontSize: 14,
            lineHeight: 1.36,
            '@media screen and (max-width: 1280px)': {
                fontSize: 14,
            },
            '@media screen and (max-width: 600px)': {
                fontSize: 12,
            },
        },
    },
}))(TextField);

const passwordControl = makeStyles((theme: Theme) => ({
    root: {
        '& .MuiInputBase-input': {
            color: theme.palette.grey[900],
            fontSize: 16,
            lineHeight: 1.31,
            '@media screen and (max-width: 1280px)': {
                fontSize: 14,
            },
            '@media screen and (max-width: 600px)': {
                fontSize: 12,
            },
        },

        '& .MuiFormLabel-root': {
            fontSize: 14,
            lineHeight: 1.36,
            '@media screen and (max-width: 1280px)': {
                fontSize: 12
            },
            '@media screen and (max-width: 600px)': {
                fontSize: 11
            },
        },

        '& .MuiInputLabel-shrink': {
            top: '-8px',
            '@media screen and (max-width: 600px)': {
                top: -2
            },
        },

        '& .MuiIconButton-root': {
            '& svg': {
                '@media screen and (max-width: 600px)': {
                    width: 21.8,
                    height: 19.1
                },
            }
        }
    },
    errorLabel: {
        margin: 0,
        fontSize: '0.75rem',
        marginTop: 3,
        textAlign: 'left',
        lineHeight: 1.66,
        letterSpacing: '0.03333em',
        marginBottom: 25,
        '@media screen and (max-width: 600px)': {
            marginBottom: 2
        },
    }
}));

/**
 * Styles
 */
const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '60%',
        marginRight: 'auto',
        marginLeft: 'auto',
        minWidth: 185,
        fontSize: 16,
        lineHeight: 1.31,
        padding: 15,

        '@media screen and (max-width: 128px)': {
            padding: 16,
        },

        '@media screen and (max-width: 900px)': {
            width: '100%',
            maxWidth: '100%',
            fontSize: 14,
            padding: 17,
        },
        '@media screen and (max-width: 600px)': {
            padding: 12,
        },
    },

    txtForgot: {
        fontSize: 16,
        lineHeight: 1.31,
        cursor: 'pointer',
        color: theme.palette.grey[900],
        textAlign: 'right',
        marginBottom: 40,

        '@media screen and (max-width: 1280px)': {
            fontSize: 14,
            marginBottom: 50,
        },

        '@media screen and (max-width: 600px)': {
            fontSize: 12,
            marginBottom: 30,
        },

        '&:hover': {
            textDecoration: 'underline',
        }
    }
}));

/**
 * Styled Components
 */
const LoginContainer = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(${(props: {imgWelcomeOpacity: string}) => props.imgWelcomeOpacity});
    background-size: cover;
    background-repeat: no-repeat;
`;

const LoginWrapper = styled.div`
  display: flex;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  align-items: start;
  justify-content: center;

  overflow-y: auto;

  padding: 112px 30px 70px 30px;

  @media screen and (max-width: 600px) {
    padding: 12px 28px;
  }
`;

const LoginContent = withTheme(styled.div`
  display: flex;
  width: 100%;
  max-width: 340px;
  flex-flow: column;
  text-align: left;

  color: ${(props: any) => props.theme.palette.grey[900]};

  @media screen and (max-width: 1280px) {
    max-width: 320px;
  }
`);

const LoginTitle = styled.div`
    display: flex;
    flex-flow: column;
    width: 100%;
    align-items: center;

    .logo-image {
        width: 100%;
        max-width: 180px;
    }

    .logo-label {
        margin-top: 20px;
        font-size: 22px;
        line-height: 1.32;
        text-align: center;
    }

    @media screen and (max-width: 1280px) {
        .logo-label {
            font-size: 22px;
        }
    }

    @media screen and (max-width: 600px) {
        .logo-label {
            font-size: 16px;
            line-height: 11px;
        }
        
        .logo-image {   
            max-width: 92px;
        }
    }
`;

const LoginControls = styled.form`
  display: flex;
  width: 100%;
  flex-flow: column;
  text-align: left;
  
  font-size: 16px;

  margin-top: 35px;

  @media screen and (max-width: 1280px) {
    font-size: 14px;
    margin-top: 25px;
  }

  @media screen and (max-width: 600px) {
    margin-top: 20px;
  }
`;

const LoginControlsLabel = withTheme(styled.div`
  display: flex;
  width: 100%;
  flex-flow: column;
  text-align: left;
  
  font-size: 34px;

  margin-top: 0;
  margin-bottom: 50px;

  .sign-in {
    margin-top: 20px;
    line-height: 1.1765;
    text-align: left;
  }

  .border-sign-in {
    border-bottom: 6px solid ${(props: any) => props.theme.palette.grey[900]};
    border-radius: 11px;
    width: 3.5588em;
  }

  @media screen and (max-width: 900px) {
    font-size: 24px;
  }

  @media screen and (max-width: 600px) {
    display: none;
  }
`);

/**
 * Main Component
 */
const Login = ({
    errors,
    handleSignIn,
    openForgotPassword,
}: IProps) => {
    const classes = useStyles();

    const [email, setEmail] = useState('');
    const passwordClass = passwordControl();
    const [password, setPassword] = useState({
        password: '',
        showPassword: false,
    });

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const enterEmail = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSignIn(email, password.password);
        }
    };

    const enterPassword = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSignIn(email, password.password);
        }
    };

    const handlePasswordChange = (prop: any) => (event: any) => {
        setPassword({ ...password, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setPassword({ ...password, showPassword: !password.showPassword });
    };

    const {
        imgLogo,
        imgWelcomeOpacity
    } = useMemo(() => {
        const imgLogo = getLogoFromConfiguration();
        const imgWelcomeOpacity = getImageUrl('welcome-opacity.jpg');
        return {
            imgLogo,
            imgWelcomeOpacity
        };
    }, []);

    return (
        <LoginContainer imgWelcomeOpacity={imgWelcomeOpacity}>
            <LoginWrapper>
                <LoginContent>
                    <LoginTitle>
                        <ContentImage src={imgLogo} alt="" className="logo-image" />
                        <ContentText className="logo-label">Sign in to your account</ContentText>
                    </LoginTitle>
                    <LoginControls>
                        <FormGroup>
                            <LoginTextField
                                error={errors.email}
                                id="email"
                                type="email"
                                label="Email ID"
                                value={email}
                                helperText={errors.email ? "Invalid Email ID" : ""}
                                onChange={handleEmailChange}
                                onKeyDown={enterEmail}
                                autoFocus={true}
                                name="email"
                                autoComplete="email"
                            />
                            <FormControl className={clsx(passwordClass.root)}>
                                <InputLabel error={errors.password && false} htmlFor="standard-adornment-password">Password</InputLabel>
                                <Input
                                    error={errors.password && false}
                                    id="standard-adornment-password"
                                    type={password.showPassword ? 'text' : 'password'}
                                    value={password.password}
                                    name="password"
                                    onChange={handlePasswordChange('password')}
                                    onKeyDown={enterPassword}
                                    autoComplete="current-password"
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                            >
                                                {password.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <InputLabel error={errors.password} className={passwordClass.errorLabel}>{errors.password ? "Incorrect Username or Password" : ""}&nbsp;</InputLabel>
                            <Link className={classes.txtForgot} onClick={openForgotPassword} id="forgot-password">Forgot Password ?</Link>
                            <CustomButton
                                type="button"
                                className={classes.root}
                                label="SIGN IN"
                                id="sign-in"
                                onClick={() => handleSignIn(email, password.password)}
                            />
                        </FormGroup>
                    </LoginControls>
                </LoginContent>
            </LoginWrapper>
        </LoginContainer>
    );
}

Login.defaultProps = {
    errors: null,
    handleSignIn: null,
    openForgotPassword: null,
}

export default Login;
