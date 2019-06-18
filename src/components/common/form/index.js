import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
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
import withStyles from '@material-ui/core/styles/withStyles';

import {
    checkEmailValidation,
    checkPasswordValidation,
    checkConfirmPasswordValidation,
} from 'utils/validate';

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 500,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing
            .unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    passwordValidationText: {
        color: '#66696a',
    },
    footer: {
        marginTop: theme.spacing.unit * 3,
        textAlign: 'center',
    },
});

class Form extends PureComponent {
    state = {
        email: '',
        password: '',
        confirmPassword: '',
        hasEmailError: false,
        hasPasswordError: false,
        hasConfirmPasswordError: false,
    };

    handleEmailChange = e => {
        const value = e.target.value;

        this.setState({
            email: value,
            hasEmailError: !checkEmailValidation(value),
        });
    };

    handlePasswordChange = e => {
        const value = e.target.value;
        const { confirmPassword } = this.state;

        this.setState({
            password: value,
            hasPasswordError: !checkPasswordValidation(value),
            hasConfirmPasswordError:
                confirmPassword &&
                !checkConfirmPasswordValidation(confirmPassword, value),
        });
    };

    handleConfirmPasswordChange = e => {
        const value = e.target.value;

        this.setState({
            confirmPassword: value,
            hasConfirmPasswordError: !checkConfirmPasswordValidation(
                value,
                this.state.password,
            ),
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { state } = this;

        this.props.onSubmit({
            email: state.email,
            password: state.password,
            confirmPassword: state.confirmPassword,
        });
    }

    checkIfDisabled = () => {
        const { state, props } = this;

        const hasEmailError = props.hasEmail && (!state.email || state.hasEmailError);
        const hasPasswordError = props.hasPassword && (!state.password || state.hasPasswordError);
        const hasConfirmPasswordError = props.hasConfirmPassword && (!state.confirmPassword || state.hasConfirmPasswordError);

        return hasEmailError || hasPasswordError || hasConfirmPasswordError;
    }

    render() {
        const {
            classes,
            title,
            preface,
            hasEmail,
            hasPassword,
            hasConfirmPassword,
            hidePasswordTitle,
            footerRegister,
        } = this.props;
        const {
            hasEmailError,
            hasPasswordError,
            hasConfirmPasswordError,
        } = this.state;

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
                    <form className={classes.form} onSubmit={this.handleSubmit}>
                        {preface}
                        {hasEmail && (
                            <FormControl
                                margin="normal"
                                required
                                fullWidth
                                error={hasEmailError}
                            >
                                <InputLabel htmlFor="email">Email Address</InputLabel>
                                <Input
                                    id="email"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    onChange={this.handleEmailChange}
                                />
                            </FormControl>
                        )}
                        {hasPassword && (
                            <FormControl
                                margin="normal"
                                required
                                fullWidth
                                error={hasPasswordError}
                            >
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input
                                    name="password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={this.handlePasswordChange}
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
                                error={hasConfirmPasswordError}
                            >
                                <InputLabel htmlFor="confirmPassword">
                                    Confirm Password
                                </InputLabel>
                                <Input
                                    name="confirmPassword"
                                    type="password"
                                    id="confirmPassword"
                                    onChange={this.handleConfirmPasswordChange}
                                />
                            </FormControl>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={this.checkIfDisabled()}
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
}

Form.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Form);
