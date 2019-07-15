import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import classNames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

import People from '@material-ui/icons/People';
import Dashboard from '@material-ui/icons/Dashboard';

import { withAuth } from 'auth';

const drawerWidth = 240;

const styles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    title: {
        flexGrow: 1,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    signOut: {
        marginRight: 20,
    },
}));

const MiniDrawer = ({children, authActions, history}) => {

    const [open, changeOpen] = useState(false);

    const handleDrawerOpen = () => changeOpen(true);

    const handleDrawerClose = () => changeOpen(false);

    const handleSignOut = async () => {
        await authActions.logout();
        history.push('/sign-in');
    }

    const classes = styles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={classNames(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar disableGutters={!open}>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={handleDrawerOpen}
                        className={classNames(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        className={classes.title}
                    >
                        Admin
                    </Typography>
                    <Button color="inherit" className={classes.signOut} onClick={handleSignOut}>
                        Sign out
                    </Button>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={classNames(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: classNames({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
                open={open}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>

                    <ListItem button key={'Dashboard'}>
                        <Link to={'/admin/dashboard'}>
                            <ListItemIcon>
                                <Dashboard/>
                            </ListItemIcon>
                            <ListItemText primary={'Dashboard'} />
                        </Link>
                    </ListItem>

                    <ListItem button key={'Users'}>
                        <Link to={'/admin/users'}>
                            <ListItemIcon>
                                <People/>
                            </ListItemIcon>

                            <ListItemText primary={'Users'} />
                        </Link>
                    </ListItem>

                </List>
                <Divider />
            </Drawer>
            <main className={classes.content}>{children}</main>
        </div>
    );
}

export default withRouter(withAuth(MiniDrawer));
