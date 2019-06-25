import React, { PureComponent } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';

import { withAuth } from 'auth';

import Nav from './nav';

const styles = theme => ({
    header: {
        position: 'fixed',
        width: '100%',
        left: 0,
        right: 0,
        zIndex: 99,
        background: '#fff',
        boxShadow: '0 1px 5px rgba(0, 0, 0, .15)',
        fontSize: 17,
        lineHeight: 1.65,
        padding: '0 45px',
        height: 70,
        '& > .content': {
            width: '100%',
            maxWidth: 1200,
            height: 80,
            margin: '0 auto',
            '& .logo': {
                height: 50,
            },
        },
    },
    logo: {
        display: 'flex',
    },
    entry: {
        '& > li': {
            listStyleType: 'none',
            '& button': {
                marginRight: 10,
                '& a': {
                    textDecoration: 'none',
                },
            },
        },
    },
    languageSelect: {
        display: 'flex',
        alignItems: 'center',
    },
    flags: {
        width: 20,
        height: 20,
        backgroundSize: 'contain',
        marginLeft: 5,
    },
});

class Header extends PureComponent {
    forgetButtonCLickHandler = () => this.setState({
        isForgetPopupOpen: true,
        isLoginPopupOpen: false,
    });

    handleLogout = e => {
        e.preventDefault();

        this.props.authActions.logout();
        this.props.history.push('/');
    }

    render() {
        const { classes, authState } = this.props;

        return (
            <AppBar
                className={classes.header}
                position="fixed"
                color="default"
            >
                <div className="content flex horizontal jBetween aCenter">
                    <div className={classes.logo}>
                        <Link to="/">
                            <img
                                alt="Reactin Logo"
                                src="https://cloudinary-res.cloudinary.com/image/upload/v1538583988/cloudinary_logo_for_white_bg.svg"
                                width="120"
                            />
                        </Link>
                    </div>
                    <Nav isLoggedIn={!!authState.user} />
                    {!authState.user && !authState.isLoading
                        ? (
                            <ul className={`${classes.entry} flex horizontal noGrow`}>
                                <li>
                                    <Button
                                        color="inherit"
                                        variant="outlined"
                                    >
                                        <Link to="/sign-in">
                                            Sign In
                                        </Link>
                                    </Button>
                                </li>
                            </ul>
                        )
                        : (
                            <Button
                                color="inherit"
                                variant="outlined"
                                onClick={this.handleLogout}
                            >
                                Sign Out
                            </Button>
                        )
                    }
                </div>
            </AppBar>
        );
    }
}

export default withRouter(withAuth(withStyles(styles)(Header)));
