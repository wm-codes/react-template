import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import {
    checkEmailValidation,
    checkPasswordValidation,
    checkConfirmPasswordValidation,
} from 'utils/validate';

const useStyles = makeStyles(theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
            width: 500,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
    },
    avatar: {
        margin: theme.spacing(),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(),
    },
    submit: {
        marginTop: theme.spacing(3),
    },
    passwordValidationText: {
        color: '#66696a',
    },
    footer: {
        marginTop: theme.spacing(3),
        textAlign: 'center',
    },
}));

const Form = ({
    title,
    preface,
    hidePasswordTitle,
    footerRegister,
    onSubmit,
    hasEmail,
    hasPassword,
    hasConfirmPassword,
}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);

    const handleEmailChange = e => {
        const value = e.target.value;

        setEmail(value);
        setEmailError(!checkEmailValidation(value));
    };

    const handlePasswordChange = e => {
        const value = e.target.value;

        setPassword(value);
        setPasswordError(!checkPasswordValidation(value));
        setConfirmPasswordError(confirmPassword && !checkConfirmPasswordValidation(confirmPassword, value));
    };

    const handleConfirmPasswordChange = e => {
        const value = e.target.value;

        setConfirmPassword(value);
        setConfirmPasswordError(!checkConfirmPasswordValidation(value, password));
    };

    const handleSubmit = e => {
        e.preventDefault();

        onSubmit({
            email: email,
            password: password,
            confirmPassword: confirmPassword,
        });
    };

    const checkIfDisabled = () => {
        const hasEmailError = hasEmail && (!email || emailError);
        const hasPasswordError = hasPassword && (!password || passwordError);
        const hasConfirmPasswordError = hasConfirmPassword && (!confirmPassword || confirmPasswordError);

        return hasEmailError || hasPasswordError || hasConfirmPasswordError;
    };

    const classes = useStyles();

    return (
        <section className={classes.main}>
            <CssBaseline />
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {title}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    {preface}
                    {hasEmail && (
                        <FormControl
                            margin="normal"
                            required
                            fullWidth
                            error={emailError}
                        >
                            <InputLabel htmlFor="email">Email Address</InputLabel>
                            <Input
                                id="email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={handleEmailChange}
                            />
                        </FormControl>
                    )}
                    {hasPassword && (
                        <FormControl
                            margin="normal"
                            required
                            fullWidth
                            error={passwordError}
                        >
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                name="password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={handlePasswordChange}
                            />
                            {!hidePasswordTitle && (
                                <span className={classes.passwordValidationText}>
                                    Must contain more than 8 characters, Uppercase,
                                    Lowercase and Digit
                                </span>
                            )}
                        </FormControl>
                    )}
                    {hasConfirmPassword && (
                        <FormControl
                            margin="normal"
                            required
                            fullWidth
                            error={confirmPasswordError}
                        >
                            <InputLabel htmlFor="confirmPassword">
                                Confirm Password
                            </InputLabel>
                            <Input
                                name="confirmPassword"
                                type="password"
                                id="confirmPassword"
                                onChange={handleConfirmPasswordChange}
                            />
                        </FormControl>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={checkIfDisabled()}
                    >
                        {title}
                    </Button>
                    <div className={classes.footer}>
                        {footerRegister
                            ? <span>Don't have an account yet? <Link to="/sign-up">Sign up</Link></span>
                            : <span>Already have an account? <Link to="/sign-in">Sign in</Link></span>
                        }
                    </div>
                </form>
            </Paper>
        </section>
    );
}

export default memo(Form);
